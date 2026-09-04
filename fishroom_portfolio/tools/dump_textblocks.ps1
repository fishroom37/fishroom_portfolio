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
    $objs.Add([pscustomobject]@{ Data = [byte[]]$dataBytes })
    $pos = $e.Index + $e.Length
}

function Decompress-Flate([byte[]]$data) {
    $ms = New-Object System.IO.MemoryStream(,$data)
    $out = New-Object System.IO.MemoryStream
    try {
        $z = New-Object System.IO.Compression.ZLibStream($ms, [System.IO.Compression.CompressionMode]::Decompress)
        $z.CopyTo($out)
        $z.Dispose()
        return $out.ToArray()
    } catch { return $null }
}

$i = 0
foreach ($o in $objs) {
    $d = Decompress-Flate $o.Data
    if ($d -eq $null) { $i++; continue }
    $s = $latin.GetString($d)
    if ($s -match '\bBT\b') {
        # 텍스트 관련 연산자만 추출
        $textOps = [regex]::Matches($s, '(?s)[TfTmTdTD*]+|</?[^>]*>|\[[^\]]*\]\s*TJ|<[0-9A-Fa-f]+>\s*Tj|\([^)]*\)\s*Tj|[A-Za-z0-9.]+')
        Write-Output "===== CONTENT STREAM $i (len=$($s.Length)) ====="
        $outLines = [regex]::Matches($s, 'BT.*?ET', 'Singleline')
        Write-Output ("BT_BLOCKS: " + $outLines.Count)
        $bi = 0
        foreach ($bm in $outLines) {
            $bi++
            Write-Output ("--- Block $bi ---")
            Write-Output $bm.Value
        }
        Write-Output ''
    }
    $i++
}