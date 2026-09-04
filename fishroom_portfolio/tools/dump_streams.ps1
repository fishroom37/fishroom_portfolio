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
    $objs.Add([pscustomobject]@{ Dict = $dict; Data = [byte[]]$dataBytes; Start = $streamStart })
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
    if ($o.Dict -match 'FlateDecode') {
        $d = Decompress-Flate $o.Data
        if ($d -ne $null) {
            $s = $latin.GetString($d)
            if ($s -match 'BT|Tj|TJ') {
                Write-Output "=== STREAM $i ==="
                Write-Output "=== FIRST 3000 CHARS ==="
                Write-Output $s.Substring(0, [Math]::Min(3000, $s.Length))
                Write-Output ''
            }
        }
    }
    $i++
}