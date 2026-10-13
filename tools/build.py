import re,sys,glob,os
sys.path.insert(0,os.path.dirname(__file__));from partials import HDR,FTR,HEAD
for f in sys.argv[1:] or [x for x in glob.glob('*.html') if not re.match(r'index_v|styleguide',x)]:
  s=open(f).read()
  s=re.sub(r'<!--HDR-->.*?<!--/HDR-->','<!--HDR-->'+HDR+'<!--/HDR-->',s,flags=re.S)
  s=re.sub(r'<!--FTR-->.*?<!--/FTR-->','<!--FTR-->'+FTR+'<!--/FTR-->',s,flags=re.S)
  s=re.sub(r'<!--FONTS-->.*?<!--/FONTS-->','<!--FONTS-->'+HEAD+'<!--/FONTS-->',s,flags=re.S)
  open(f,'w').write(s);print('built',f)
