# PDF 텍스트 추출 v2: 글꼴별 CMap 적용 + 좌표 기반 재구성
$ErrorActionPreference = 'Stop'
$pdf = 'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
$latin = [System.Text.Encoding]::GetEncoding('ISO-8859-1')
$bytes = [System.IO.File]::ReadAllBytes($pdf)
$txt = $latin.GetString($bytes)

# 1) 객체 스트림 수집
$streamRe = [regex]'(?s)stream\r?\n'
$endRe = [regex]'(?s)\r?\nendstream'
$streams = New-Object System.Collections.Generic.List[object]
$pos = 0
while ($true) {
    $m = $streamRe.Match($txt, $pos)
    if (-not $m.Success) { break }
    $ss = $m.Index + $m.Length
    $e = $endRe.Match($txt, $ss)
    if (-not $e.Success) { break }
    $len = $e.Index - $ss
    # 앞쪽 object 번호
    $headEnd = $m.Index
    $objm = [regex]::Match($txt.Substring(0, $headEnd), '(\d+)\s+\d+\s+obj\s*<<')
    $objNo = 0
    if ($objm.Success) { $objNo = [int]$objm.Groups[1].Value }
    else {
        $jm = [regex]::Match($txt.Substring(0, $headEnd), '(\d+)\s+\d+\s+obj\s*$', 'Multiline')
        if ($jm.Success) { $objNo = [int]$jm.Groups[1].Value }
    }
    $streams.Add([pscustomobject]@{ Obj = $objNo; Data = [byte[]]($bytes[$ss..($ss + $len - 1)]) })
    $pos = $e.Index + $e.Length
}

function Decompress-Flate([byte[]]$data) {
    $ms = New-Object System.IO.MemoryStream(,$data)
    $out = New-Object System.IO.MemoryStream
    try {
        $z = New-Object System.IO.Compression.ZLibStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
        $z.CopyTo($out); $z.Dispose()
        return $out.ToArray()
    } catch { return $null }
}

$decoded = @{}
foreach ($s in $streams) {
    $d = Decompress-Flate $s.Data
    if ($d -ne $null) {
        $decoded[$s.Obj] = $latin.GetString($d)
    }
}

# 2) ToUnicode CMap 파싱 (객체번호별 맵)
function Read-CMap([string]$content) {
    $map = @{}
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $src = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $dstHex = $mm.Groups[2].Value
        $nb = $dstHex.Length / 2
        $dstBytes = New-Object byte[] $nb
        for ($i = 0; $i -lt $dstHex.Length; $i += 2) { $dstBytes[$i/2] = [Convert]::ToByte($dstHex.Substring($i, 2), 16) }
        $map[$src] = [System.Text.Encoding]::BigEndianUnicode.GetString($dstBytes)
    }
    foreach ($mm in [regex]::Matches($content, '<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>\s*<([0-9A-Fa-f]+)>')) {
        $lo = [Convert]::ToInt32($mm.Groups[1].Value, 16)
        $hi = [Convert]::ToInt32($mm.Groups[2].Value, 16)
        $dst0 = [Convert]::ToInt32($mm.Groups[3].Value, 16)
        for ($cid = $lo; $cid -le $hi; $cid++) { $map[$cid] = [char]($dst0 + ($cid - $lo)) }
    }
    return $map
}

$cmapByObj = @{}
foreach ($kv in $decoded.GetEnumerator()) {
    if ($kv.Value -match 'beginbf(char|range)') {
        $cmapByObj[$kv.Key] = Read-CMap $kv.Value
    }
}
Write-Output "CMAPS_PARSED: $($cmapByObj.Count)"

# 3) 컨텐츠 스트림 파싱
function Decode-CIDText([string]$hexStr, $map) {
    $sb = New-Object System.Text.StringBuilder
    # Identity-H: 2바이트 단위. 4바이트 hex는 2 CID
    for ($i = 0; $i + 2 -le $hexStr.Length; $i += 2) {
        if ($i + 4 -le $hexStr.Length -and [int]$hexStr.Substring($i, 4) -match '^[0-9A-Fa-f]{4}$') {
            $cid = [Convert]::ToInt32($hexStr.Substring($i, 4), 16)
            if ($map.ContainsKey($cid)) { [void]$sb.Append($map[$cid]) }
            else { [void]$sb.Append([char]0xFFFD) }
            $i += 2
        } else {
            $cid = [Convert]::ToInt32($hexStr.Substring($i, 2), 16)
            if ($map.ContainsKey($cid)) { [void]$sb.Append($map[$cid]) }
            else { [void]$sb.Append([char]0xFFFD) }
        }
    }
    return $sb.ToString()
}

$contentPages = @()  # 페이지 컨텐츠 객체번호 순서
foreach ($pn in @(21,24,29)) {
    if ($decoded.ContainsKey($pn)) { $contentPages += $pn }
}

$textRuns = @()  # 각 텍스트 런 저장
$pageIdx = 0
foreach ($cp in $contentPages) {
    $pageIdx++
    $content = $decoded[$cp]
    Write-Output "===== PAGE $pageIdx (obj $cp, len $($content.Length)) ====="
    # 순차 토큰 파싱
    $idx = 0
    $curFont = ''
    $curX = 0.0
    $curY = 0.0
    $blocks = [regex]::Matches($content, '(?s)BT(.*?)ET')
    $bi = 0
    foreach ($bm in $blocks) {
        $bi++
        $body = $bm.Groups[1].Value
        # 블록 안에서 순차 처리
        $runText = ''
        $runX = $null
        $runY = $null
        $runFont = ''
        # 재파싱: 연산자 순서대로
        $ops = [regex]::Matches($body, '/F(\d+)\s+[\d.]+\s+Tf|([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+([\d.]+)\s+([\d.]+)\s+([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+Tm|([-+]?[\d.]+)\s+([-+]?[\d.]+)\s+Td|<([0-9A-Fa-f]+)>\s*Tj|<([0-9A-Fa-f]+)>\s*TJ|\[[^\]]*\]\s*TJ')
        $tx = $null; $ty = $null
        foreach ($op in $ops) {
            if ($op.Groups[1].Success) {  # Tf
                $curFont = '/F' + $op.Groups[1].Value
            } elseif ($op.Groups[2].Success) {  # Tm
                $tx = [double]$op.Groups[6].Value
                $ty = [double]$op.Groups[7].Value
            } elseif ($op.Groups[8].Success) {  # Td
                if ($tx -ne $null) { $tx += [double]$op.Groups[8].Value }
                if ($ty -ne $null) { $ty += [double]$op.Groups[9].Value }
            } elseif ($op.Groups[10].Success) {  # <hex> Tj
                $hex = $op.Groups[10].Value
                $fontObj = $pageFontMap[$curFont]
                $tucObj = $fontObjToUnicode[$fontObj]
                $map = $null
                if ($tucObj -ne $null) { $map = $cmapByObj[$tucObj] }
                $decodedText = ''
                if ($map -ne $null) { $decodedText = Decode-CIDText $hex $map }
                else { $decodedText = "<NO_MAP_$curFont>" }
                # 런에 추가 (같은 행 이어붙이기위해 기록)
                if ($runX -eq $null) { $runX = $tx; $runY = $ty; $runFont = $curFont }
                $runText += $decodedText
            }
        }
        if ($runText -ne '') {
            $textRuns += [pscustomobject]@{ Page = $pageIdx; Block = $bi; Font = $runFont; X = $runX; Y = $runY; Text = $runText }
            Write-Output ("  B{0}: font={1} x={2} y={3} | {4}" -f $bi, $runFont, $runX, $runY, $runText)
        }
    }
}

$outPath = 'C:\Users\user\Desktop\fishroom_portfolio\career_runs.txt'
$sb = New-Object System.Text.StringBuilder
foreach ($r in $textRuns) {
    [void]$sb.AppendLine("P$($r.Page) B$($r.Block) $($r.Font) x=$($r.X) y=$($r.Y) | $($r.Text)")
}
[System.IO.File]::WriteAllText($outPath, $sb.ToString(), (New-Object System.Text.UTF8Encoding($true)))
Write-Output "WROTE: $outPath (runs=$($textRuns.Count))"
# F번호 -> ToUnicode 객체번호 매핑 (폰트 객체 dict에서 파싱)
$fontToUnicode = @{}
$fontRe = [regex]'(?s)(\d+)\s+\d+\s+obj\s*<<[^>]*?/Type\s*/Font[^>]*?/ToUnicode\s+(\d+)\s+0\s+R'
foreach ($fm in $fontRe.Matches($txt)) {
    $fontObj = [int]$fm.Groups[1].Value
    $tuc = [int]$fm.Groups[2].Value
    # F번호 매핑
}
# 페이지 리소스에서 F번호 확인
$pageFontMap = @{}
$pageRe = [regex]'(?s)/Type\s*/Page.*?/Font\s*<<(.*?)>>'
foreach ($pm in $pageRe.Matches($txt)) {
    $inner = $pm.Groups[1].Value
    foreach ($fm in [regex]::Matches($inner, '/F(\d+)\s+(\d+)\s+0\s+R')) {
        $pageFontMap[('/F' + $fm.Groups[1].Value)] = [int]$fm.Groups[2].Value
    }
}
# 폰트객체 -> ToUnicode
$fontObjToUnicode = @{}
$foRe = [regex]'(?s)(\d+)\s+\d+\s+obj\s*<<.*?/Type\s*/Font.*?/ToUnicode\s+(\d+)\s+0\s+R'
foreach ($fm in $foRe.Matches($txt)) {
    $fontObjToUnicode[[int]$fm.Groups[1].Value] = [int]$fm.Groups[2].Value
}
Write-Output "FONT_OBJ_TO_UNICODE: $($fontObjToUnicode.Count)"
foreach ($k in $pageFontMap.GetEnumerator()) {
    $tucObj = $fontObjToUnicode[$k.Value]
    Write-Output ("  {0} -> fontobj {1} -> ToUnicode obj {2} (cmap loaded={3})" -f $k.Key, $k.Value, $tucObj, $cmapByObj.ContainsKey($tucObj))
}