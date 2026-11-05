from pathlib import Path
from PIL import Image,ImageOps
import shutil
originals=Path('source/extracted-images'); originals.mkdir(exist_ok=True)
for p in Path('public/images').glob('*'):
 if p.suffix.lower() not in ['.jpg','.jpeg','.png']: continue
 im=ImageOps.exif_transpose(Image.open(p))
 im.thumbnail((1600,1400))
 im.save(p.with_suffix('.webp'),'WEBP',quality=85,method=6)
 shutil.move(str(p),str(originals/p.name))
print('Optimized local assets; originals preserved in source/extracted-images.')
