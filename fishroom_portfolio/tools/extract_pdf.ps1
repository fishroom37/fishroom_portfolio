# PDF 텍스트 추출 스크립트 (Chrome/Skia PDF 대상)
$ErrorActionPreference = 'Stop'
$pdf = 'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
$latin = [System.Text.Encoding]::GetEncoding('ISO-8859-1')
$bytes = [System.IO.File]::ReadAllBytes($pdf)
$txt = $latin.GetString($bytes)

$streamRe = [regex]'(?s)stream\r?\n'
$endRe = [regex]'(?s)\r?\nendstream'
$objs = New-Object System.Collections.Generic.List[object]
$pos = 0
while ($true) {
    $m = $streamRe.Match($txt, $pos)
    if (-not $m.Success) { break }
    $streamStart = $m.Index + $m.Length
    $e = $endRe.Match($txt, $streamStart)
    if (-not $e.Success) { break }
    $len = $e.Index - $streamStart
    $dataBytes = $bytes[$streamStart..($streamStart + $len - 1)]
    $dictStart = $txt.LastIndexOf('obj', $m.Index)
    $dict = ''
    if ($dictStart -ge 0) { $dict = $txt.Substring($dictStart, $m.Index - $dictStart) }
    $objs.Add([pscustomobject]@{ Dict = $dict; Data = [byte[]]$dataBytes })
    $pos = $e.Index + $e.Length
}
Write-Output "STREAMS: $($objs.Count)"

function Decompress-Flate([byte[]]$data) {
    $ms = New-Object System.IO.MemoryStream(,$data)
    $out = New-Object System.IO.MemoryStream
    try {
        $z = New-Object System.IO.Compression.ZLibStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
        $z.CopyTo($out)
        $z.Dispose()
        return $out.ToArray()
    } catch {
        return $null
    }
}

$decoded = New-Object System.Collections.Generic.List[object]
foreach ($o in $objs) {
    if ($o.Dict -match 'FlateDecode') {
        $d = Decompress-Flate $o.Data
        if ($d -ne $null) {
            $decoded.Add([pscustomobject]@{ Dict = $o.Dict; Content = $latin.GetString($d) })
        }
    }
}
Write-Output "DECODED_STREAMS: $($decoded.Count)"

$cmaps = $decoded | Where-Object { $_.Content -match 'beginbf(char|range)' }
Write-Output "CMAPS: $($cmaps.Count)"

$map = @{}
foreach ($c in $cmaps) {
    $content = $c.Content
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $src = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $dstHex = $mm.Groups[2].Value
        $dstBytes = New-Object byte[] ($dstHex.Length / 2)
        for ($i = 0; $i -lt $dstHex.Length; $i += 2) {
            $dstBytes[$i/2] = [Convert]::ToByte($dstHex.Substring($i, 2), 16)
        }
        $dstStr = [System.Text.Encoding]::BigEndianUnicode.GetString($dstBytes)
        $map[$src] = $dstStr
    }
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $lo = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $hi = [Convert]::ToInt32($mm.Groups[2].Value, 16)
        $dst0 = [Convert]::ToInt32($mm.Groups[3].Value, 16)
        for ($cid = $lo; $cid -le $hi; $cid++) {
            $u = $dst0 + ($cid - $lo)
            $map[$cid] = [char]$u
        }
    }
}
Write-Output "CMAP_ENTRIES: $($map.Count)"

$contentStreams = $decoded | Where-Object { $_.Content -match 'BT|Tj|TJ|Tm|Td' -and $_.Content -notmatch 'beginbf' }
Write-Output "CONTENT_STREAMS: $($contentStreams.Count)"
function Convert-CIDHexToText([string]$hexStr) {
    $sb = New-Object System.Text.StringBuilder
    for ($i = 0; $i -lt $hexStr.Length; $i += 4) {
        if ($i + 4 -le $hexStr.Length) {
            $cid = [Convert]::ToInt32($hexStr.Substring($i, 4), 16)
            if ($map.ContainsKey($cid)) {
                [void]$sb.Append($map[$cid])
            } else {
                [void]$sb.Append([char]0xFFFD)
            }
        }
    }
    return $sb.ToString()
}

$allText = New-Object System.Text.StringBuilder
$pageNo = 0
foreach ($cs in $contentStreams) {
    $pageNo++
    $content = $cs.Content
    $blockRe = [regex]'(?s)BT(.*?)ET'
    [void]$allText.AppendLine("===== PAGE $pageNo =====")
    foreach ($bm in $blockRe.Matches($content)) {
        $block = $bm.Groups[1].Value
        $lines = New-Object System.Collections.Generic.List[object]
        $pieces = [regex]::Split($block, '(?s)(T\*|TD|Td)')
        $buf = ''
        foreach ($p in $pieces) {
            $t = ''
            foreach ($sm in [regex]::Matches($p, '<([0-9A-Fa-f]+)>\s*Tj')) {
                $t += Convert-CIDHexToText $sm.Groups[1].Value
            }
            foreach ($sm in [regex]::Matches($p, '\[([^\]]*)\]\s*TJ')) {
                foreach ($hm in [regex]::Matches($sm.Groups[1].Value, '(?s)<([0-9A-Fa-f]+)>|\(([^()]*)\)')) {
                    if ($hm.Groups[1].Value) { $t += Convert-CIDHexToText $hm.Groups[1].Value }
                    elseif ($hm.Groups[2].Value) { $t += $hm.Groups[2].Value }
                }
            }
            if ($t -match '\S') {
                if ($buf -match '\S') {
                    $lines.Add($buf)
                    $buf = ''
                }
                $buf += $t
            }
        }
        if ($buf -match '\S') { $lines.Add($buf) }
        foreach ($l in $lines) { [void]$allText.AppendLine($l) }
    }
}

$outPath = 'C:\Users\user\Desktop\fishroom_portfolio\career_extracted.txt'
[System.IO.File]::WriteAllText($outPath, $allText.ToString(), [System.Text.Encoding]::UTF8)
Write-Output "WROTE: $outPath"