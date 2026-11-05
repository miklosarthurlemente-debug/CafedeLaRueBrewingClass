Add-Type -AssemblyName System.IO.Compression.FileSystem
$z=[IO.Compression.ZipFile]::OpenRead((Join-Path $PWD 'Basic Barista Traincing Course PPT - Cafe dela Rue.pptx'))
$manifest=@()
foreach($n in 2..39){
 $e=$z.GetEntry("ppt/slides/_rels/slide$n.xml.rels")
 if(!$e){continue}
 $r=[IO.StreamReader]::new($e.Open())
 [xml]$x=$r.ReadToEnd()
 $r.Dispose()
 foreach($rel in $x.Relationships.Relationship){
  if($rel.Type -match '/image$'){
   $name=[IO.Path]::GetFileName($rel.Target)
   $a=$z.GetEntry('ppt/media/'+$name)
   if($a -and $name -match '\.(png|jpg|jpeg)$'){
    $dest=Join-Path $PWD ('public/images/'+$name)
    if(!(Test-Path $dest)){[IO.Compression.ZipFileExtensions]::ExtractToFile($a,$dest)}
    $manifest+=@{slide=$n;file=$name;bytes=$a.Length}
   }
  }
 }
}
$manifest | ConvertTo-Json | Set-Content source/assets.json
$manifest | ForEach-Object { "$($_.slide) $($_.file) $($_.bytes)" }
$z.Dispose()
