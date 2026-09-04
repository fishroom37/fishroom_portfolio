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
    $objStart = $txt.LastIndexOf('obj', $m.Index)
    $dictStart = $txt.LastIndexOf('<<', $objStart)
    # object number
    $num = 0
    $objHead = $txt.Substring(0, $objStart)
    $nm = [regex]::Match($objHead, '(\d+)\s+\d+\s+obj\s*$')
    if ($nm.Success) { $num = [int]$nm.Groups[1].Value }
    $dict = ''
    if ($dictStart -ge 0) { $dict = $txt.Substring($dictStart, $m.Index - $dictStart) }
    $objs.Add([pscustomobject]@{ Obj = $num; Dict = $dict; Data = [byte[]]$dataBytes })
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
    $head = ''
    $hasTj = $false
    $hasTJ = $false
    $hasBf = $false
    $hasBT = $false
    if ($d -ne $null) {
        $s = $latin.GetString($d)
        $head = ($s.Substring(0, [Math]::Min(80, $s.Length)) -replace "[`r`n]", ' ')
        $hasTj = [regex]::IsMatch($s, '<[0-9A-Fa-f]{4}>\s*Tj|\{[^\}]*\}\s*TJ')
        $hasTJ = $s -match '\[[^\]]*\]\s*TJ'
        $hasBf = $s -match 'beginbf(char|range)'
        $hasBT = [regex]::IsMatch($s, '\bBT\b')
    }
    $dictInfo = if ($o.Dict) { ($o.Dict -replace "[`r`n]", ' ') } else { '' }
    Write-Output ("OBJ {0}: len={1} Tj={2} TJ={3} bf={4} BT={5} head=[{6}] dict=[{7}]" -f $o.Obj, $o.Data.Length, $hasTj, $hasTJ, $hasBf, $hasBT, $head, $dictInfo)
    $i++
}