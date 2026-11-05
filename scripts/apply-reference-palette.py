from pathlib import Path

import re

sage='#658861';sand='#e5c192';taupe='#7a6a54';ivory='#fdfaf3'
css=Path('src/index.css')
text=css.read_text(encoding='utf-8-sig')
greens={'#00695a','#005246'}
darks={'#471108','#34251e','#79685c','#705447','#a3432b','#c26433'}
def replace(m):
 c=m.group().lower()
 if c in {sage,sand,taupe,ivory}:return c
 if len(c)==9: return sand
 if c in greens:return sage
 if c in darks:return taupe
 if c in {'#ffb887','#f9e7c8','#e9ddc9','#f5e0cc','#f5e8c8','#f6e8ce','#f2e8d5','#f2e8d6','#f1e5d0','#f4ead7','#f6eddc'}:return sand
 if c in {'#e4e9d9','#e7edde','#e8eddf','#e9ecdc'}:return ivory
 if c=='#eee7d9':return sand
 return ivory
text=re.sub(r'#[0-9a-fA-F]{3,8}\b',replace,text)
text=re.sub(r':white(?=[;}])',':'+ivory,text)
text+='\n/* Four-color palette supplied by Miklos. */\n.btn{background:var(--taupe);color:var(--paper)}.btn:hover{background:var(--sand);color:var(--taupe)}.btn.cream{background:var(--sand);color:var(--taupe)}.module-card:hover{box-shadow:none}.slide-canvas{box-shadow:none}.overview-overlay,.sidebar-backdrop{background:var(--taupe)}.roast-spectrum button>span{background:var(--taupe)!important}.hero-image-wrap>img,.landing-visual>img{filter:none}\n'
css.write_text(text,encoding='utf-8')
print('Applied the interface palette only. Source photos and illustrations are never recolored.')
