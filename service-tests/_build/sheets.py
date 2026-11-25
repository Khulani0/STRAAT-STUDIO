# Builds the contact sheets in evidence/ from the generated files. Run after evidence.mjs.
from PIL import Image
tmp='/tmp/claude-1000/-home-sojama-STRAAT-STUDIO/187b30fa-4dbb-4b69-87d4-22cd247057f9/scratchpad/ev'
bg=(205,210,220)
def sheet(items,width,fname,pad=14):
    h=max(i.height for i in items); W=sum(i.width for i in items)+pad*(len(items)+1)
    s=Image.new('RGB',(W,h+2*pad),bg); x=pad
    for i in items: s.paste(i,(x,pad)); x+=i.width+pad
    if s.width>width: r=width/s.width; s=s.resize((width,int(s.height*r)),Image.LANCZOS)
    s.save(fname)
def L(p,h=None,w=None,bgc=None):
    im=Image.open(p).convert('RGBA')
    if h: im=im.resize((int(im.width*h/im.height),h),Image.LANCZOS)
    if w: im=im.resize((w,int(im.height*w/im.width)),Image.LANCZOS)
    base=Image.new('RGB',im.size,bgc or (255,255,255)); base.paste(im,mask=im.split()[3]); return base
guide=L(tmp+'/guide-1.png',h=900)
c=Image.new('RGB',(560,900),bg); y=14
for name,bgc in [('colour',(255,255,255)),('white',(15,27,45)),('dark',(243,245,248))]:
    im=L(f'logo-pack/png/straat-studio-logo-{name}-1200w.png',w=500,bgc=bgc)
    pnl=Image.new('RGB',(530,100),bgc); pnl.paste(im,(15,(100-im.height)//2)); c.paste(pnl,(14,y)); y+=112
sq=L('logo-pack/png/straat-studio-square-640.png',w=250); c.paste(sq,(14,y))
fav=Image.new('RGB',(260,250),(255,255,255)); x=8
for s in (16,32,48,180):
    f=L(f'logo-pack/favicon/favicon-{s}.png'); fav.paste(f,(x,20)); x+=f.width+10
c.paste(fav,(280,y)); y2=y+262
for w,xx in ((128,14),(256,170)): c.paste(L(f'logo-pack/png/straat-studio-mark-{w}w.png',w=min(w,200)),(xx,y2))
sheet([guide,c],2000,'evidence/logo-pack-contact-sheet.png')
poster=L(tmp+'/poster-1.png',h=900); s1=L('poster-pack/whatsapp-status-1080x1080.png',h=430); s2=L('poster-pack/whatsapp-status-1080x1920.png',h=900)
cf=L(tmp+'/card-1.png',w=420); cb=L(tmp+'/card-2.png',w=420)
col=Image.new('RGB',(430,900),bg); col.paste(s1,(0,0)); col.paste(cf,(0,s1.height+14)); col.paste(cb,(0,s1.height+14+cf.height+14))
sheet([poster,s2,col],2000,'evidence/poster-pack-contact-sheet.png')
sheet([L(tmp+'/ty-1.png',h=900),L(tmp+'/messages.png',w=1000)],1700,'evidence/review-kit-contact-sheet.png')
files=__import__('glob').glob('posts-sample-month/images/*.png'); files.sort(); tw=360
ps=Image.new('RGB',(tw*4+50,tw*3+40),bg)
for i,f in enumerate(files): ps.paste(Image.open(f).convert('RGB').resize((tw,tw),Image.LANCZOS),(10+(i%4)*(tw+10),10+(i//4)*(tw+10)))
ps.save('evidence/posts-sample-month-contact-sheet.png')
sheet([L('poster-pack/whatsapp-status-1080x1080.png',w=390),L(tmp+'/poster-1.png',w=390),L('posts-sample-month/images/post-02-2026-12-04.png',w=390),L(tmp+'/ty-1.png',w=390)],1700,'evidence/phone-size-check.png')
print('sheets ok')
