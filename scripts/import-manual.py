from pathlib import Path
import json,re
from pypdf import PdfReader

source=Path('asset-parts/Cafe_de_La_Rue_Basic_Barista_Training_Manual_36_pages.pdf')
if not source.exists():source=Path('public/manuals')/source.name
reader=PdfReader(source)
pages=[p.extract_text() or '' for p in reader.pages]
def clean(text):
 return '\n'.join(line.strip() for line in text.splitlines() if line.strip() and not line.startswith('CAFE DE LA RUE  •') and not re.fullmatch(r'\d+',line.strip()))
def compact(text):return re.sub(r'\s+',' ',text).strip()
specs=[
 ('fundamentals','Coffee & Barista Fundamentals','Build coffee knowledge, professional hygiene, essential skills and a reliable café workflow.','coffee','image4',[5,6]),
 ('beans','Beans, Origins & Roasting','Explore Philippine coffee, processing, roasting, freshness and sensory evaluation.','bean','image8',[7,8]),
 ('equipment','Grinders & Espresso Machines','Understand equipment components, grinder control, cleaning and safe operation.','coffee','image37',[10,11,12]),
 ('espresso','Espresso Extraction & Calibration','Measure dose and yield, dial in by taste, and document repeatable espresso recipes.','scale','image37',[13,14,15]),
 ('milk','Milk Steaming & Texturing','Practice aeration, microfoam, temperature control, pouring and safe milk handling.','milk','image24',[16,17]),
 ('recipes','Hot & Iced Coffee Recipes','Prepare 16 sample training recipes with measured ingredients and service checks.','book','image28',list(range(18,35))),
 ('operations','Café Operations & Service','Develop opening, closing, sanitation, inventory, service and teamwork routines.','sparkles','image13',[35,36])
]
modules=[]
for number,(slug,title,description,icon,image,nums) in enumerate(specs,1):
 mid='manual-'+slug
 if slug=='recipes':continue
 chunks=[clean(pages[n-1]) for n in nums]
 offsets=[];joined=''
 for n,chunk in zip(nums,chunks):
  offsets.append((len(joined),len(joined)+len(chunk),n));joined+=chunk+'\n'
 objective_text=joined.split('Learning objectives\n',1)[1].split('Core lessons\n',1)[0]
 objectives=[compact(s).lstrip('• ').strip() for s in objective_text.split('\n') if s.startswith('•')]
 slides=[dict(id=mid+'-objectives',moduleId=mid,title=title,lead='Learning objectives from the student training manual.',type='cards',facts=[dict(label='Objective '+str(i+1),text=o) for i,o in enumerate(objectives)],source=[nums[0]])]
 core_start=joined.index('Core lessons\n')+len('Core lessons\n')
 core_end=joined.find('Student notes:',core_start)
 if core_end<0:core_end=len(joined)
 matches=list(re.finditer(r'^(\d{2}) (.+)$',joined[core_start:core_end],re.M))
 for i,m in enumerate(matches):
  start=core_start+m.start();body_start=core_start+m.end();end=core_start+(matches[i+1].start() if i+1<len(matches) else core_end-core_start)
  body=joined[body_start:end].strip();concept,sep,practice=body.partition('In practice:')
  facts=[dict(label='The concept',text=compact(concept))]
  if sep:facts.append(dict(label='In practice',text=compact(practice)))
  page_nums=[n for a,b,n in offsets if b>start and a<end]
  slide=dict(id=mid+'-'+m.group(1),moduleId=mid,title=m.group(2),type='editorial',facts=facts,source=page_nums)
  if slug in ['fundamentals','beans','equipment','espresso','milk']:slide['image']=image
  slides.append(slide)
 if slug=='beans':slides.append(dict(id=mid+'-comparison',moduleId=mid,title='Species & processing comparison',type='table',source=[8],table=dict(headers=['Category','Typical characteristics','Important qualification'],rows=[['Arabica','Broad aroma and acidity range','Quality varies by lot'],['Robusta','Often fuller and more bitter','High-quality examples can be complex'],['Liberica / Excelsa','Distinctive aromatics','Trade naming varies'],['Washed','Fruit removed before drying','Methods vary by producer'],['Natural','Whole fruit dried','Careful drying essential'],['Honey','Some mucilage retained','Not flavored with honey']])) )
 if slug=='equipment':slides.append(dict(id=mid+'-vocabulary',moduleId=mid,title='Equipment vocabulary',type='table',source=[12],table=dict(headers=['Term','Function'],rows=[['Group head','Delivers brew water to coffee puck'],['Basket','Holds ground coffee'],['Portafilter','Secures basket to group'],['Burrs','Grind beans at adjustable spacing'],['Steam wand','Heats and textures milk'],['Backflush','Machine-specific group cleaning procedure']])) )
 if slug=='espresso':
  slides.append(dict(id=mid+'-starting-recipe',moduleId=mid,title='A starting recipe, not a fixed standard',type='table',lead='Adjust to the coffee, grinder, basket, machine, water and taste.',source=[14,15],table=dict(headers=['Parameter','Training starting value'],rows=[['Dry dose','18 g'],['Beverage yield','36 g'],['Brew ratio','1:2'],['Time','Approximately 25–30 seconds; use a consistent timing convention']])) )
  slides.append(dict(id=mid+'-ratio-calculator',moduleId=mid,title='Dose to beverage yield',type='calculator',lead='Apply the manual’s mass-based espresso ratio.',source=[13,14]))
 modules.append(dict(id=mid,number=str(number).zfill(2),title=title,description=description,icon=icon,image=image,slides=slides))

recipes=[]
photos={'Espresso':'image37','Americano':'image26','Cappuccino':'image29','Café Latte':'image28','Flat White':'image27','Mocha':'image30'}
for page in range(19,35):
 text=clean(pages[page-1]);lines=text.splitlines();title=re.match(r'\d{2} \| (.+)',lines[0]).group(1)
 temp,cup,summary=re.match(r'(HOT|ICED) · (\d+ mL (?:cup|demitasse)) (.+)',lines[1]).groups()
 start=lines.index('Training measurement')+1;stop=next(i for i,l in enumerate(lines) if l.startswith('Method:'))
 ingredients=[dict(label=lines[i],text=lines[i+1]) for i in range(start,stop,2)]
 def field(label,next_label=None):
  value=text.split(label+':',1)[1]
  if next_label:value=value.split(next_label+':',1)[0]
  return compact(value)
 liquid=next((f['text']+' '+f['label'].lower() for f in ingredients if 'water' in f['label'].lower() or 'milk' in f['label'].lower() and 'condensed' not in f['label'].lower()),'None')
 extra=[f['text']+' '+f['label'].lower() for f in ingredients if f['label'] not in ['Espresso','Ground coffee','Espresso yield'] and not any(k in f['label'].lower() for k in ['water','steamed milk','cold milk'])]
 recipes.append(dict(id='manual-'+re.sub('[^a-z0-9]+','-',title.lower()).strip('-'),name=title,cup=cup,espresso='36 g',liquid=liquid,extra='; '.join(extra) or 'None',notes=field('Method','Serving'),difference=summary,source=page,temperature=temp,ingredients=ingredients,serving=field('Serving','Quality standard'),quality=field('Quality standard','Common mistakes'),mistakes=field('Common mistakes','Preparation checklist'),**({'image':photos[title]} if title in photos else {})))
slug,title,description,icon,image,nums=specs[5];mid='manual-recipes'
recipe_module=dict(id=mid,number='06',title=title,description=description,icon=icon,image=image,slides=[dict(id=mid+'-guidelines',moduleId=mid,title='Sample training formulas',type='cards',lead='All formulas are illustrative training recipes, not proprietary Cafe de La Rue formulas.',source=[18],facts=[dict(label='Espresso baseline',text='18 g coffee to 36 g espresso. All ingredient quantities must be tested against actual equipment, cup capacity, ice displacement and ingredient specifications.'),dict(label='Before preparation',text='Confirm size, temperature, sweetness, dairy choice and allergens. Measure ingredients using a scale or calibrated measuring tool.'),dict(label='Service checks',text='Use fresh espresso, clean cups, safe milk handling and clean ice tools. Follow shop-approved service and labeling procedures.')])]+[dict(id=mid+'-'+r['id'],moduleId=mid,title=r['name'],type='recipe',recipeId=r['id'],source=[r['source']]) for r in recipes])
modules.insert(5,recipe_module)
recipe_slides=[]
for slide in recipe_module['slides']:
 recipe_slides.append(slide)
 if slide['type']!='recipe':continue
 recipe=next(r for r in recipes if r['id']==slide['recipeId'])
 recipe_slides.append(dict(id=slide['id']+'-service',moduleId=recipe_module['id'],title=recipe['name']+': preparation & service',type='cards',lead=recipe['serving'],facts=[dict(label=label,text=recipe[key]) for label,key in [('Method','notes'),('Quality standard','quality'),('Common mistakes','mistakes')]],source=slide['source']))
recipe_module['slides']=recipe_slides
modules[-1]['slides'].append(dict(id='manual-download',moduleId=modules[-1]['id'],title='Keep your training manual',type='manual',lead='View or download the full 36-page student manual for independent review.',source=[36]))
modules[0]['slides'].insert(0,dict(id='manual-welcome',moduleId=modules[0]['id'],title='Welcome to Cafe de La Rue',type='cards',lead='Build skills through guided demonstrations, supervised practice and independent review.',facts=[dict(label='Learn actively',text='Read before each demonstration. Record measurements and observations, and practice through repetition.'),dict(label='Practice safely',text='Ask your trainer before operating unfamiliar equipment and follow equipment-specific instructions.'),dict(label='Course scope',text='This internal Cafe de La Rue course is not an official TESDA assessment or government-issued qualification. Recipes are illustrative training formulas.')],source=[3]))
Path('src/data/manualModules.json').write_text(json.dumps(modules,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
Path('src/data/manualRecipes.json').write_text(json.dumps(recipes,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print(json.dumps({'modules':len(modules),'slides':sum(len(m['slides']) for m in modules),'recipes':len(recipes),'lessons':[(m['title'],len(m['slides'])) for m in modules]},ensure_ascii=False))
