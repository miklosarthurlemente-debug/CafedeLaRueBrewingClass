from PIL import Image, ImageOps, ImageDraw
from pathlib import Path
files=list(Path('public/images').glob('*'))
out=Image.new('RGB',(1000, ((len(files)+4)//5)*155),'#eee6d7')
d=ImageDraw.Draw(out)
for i,p in enumerate(files):
 im=Image.open(p).convert('RGBA'); im.thumbnail((190,125))
 x=(i%5)*200; y=(i//5)*155
 out.paste(im,(x,y),im); d.text((x+5,y+128),p.name,fill='black')
out.save('source/contact.jpg')
