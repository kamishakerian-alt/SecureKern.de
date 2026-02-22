from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

root = Path(r"c:\Users\skk2abt\Desktop\WP_Projetcs\SecureKern.de")
partners = root / "site" / "assets" / "images" / "partners"
visual = root / "site" / "assets" / "images" / "visual-assets"
partners.mkdir(parents=True, exist_ok=True)
visual.mkdir(parents=True, exist_ok=True)

navy = (0x00,0x3D,0x5B,255)
teal = (0x00,0x88,0x6B,255)
white = (255,255,255,255)

names = [
    "bosch", "siemens", "schneider", "claroty", "nozomi", "dragos", "fortinet", "palo-alto", "cisco", "hirschmann"
]

for n in names:
    img = Image.new("RGBA", (200,100), (255,255,255,0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle((2,2,198,98), radius=14, fill=white, outline=(210,220,230,255), width=2)
    d.rectangle((2,76,198,98), fill=teal)
    label = n.upper().replace('-', ' ')
    try:
        font = ImageFont.truetype("arial.ttf", 26)
        font_small = ImageFont.truetype("arial.ttf", 12)
    except Exception:
        font = ImageFont.load_default()
        font_small = ImageFont.load_default()
    bbox = d.textbbox((0,0), label, font=font)
    tw = bbox[2]-bbox[0]
    th = bbox[3]-bbox[1]
    d.text(((200-tw)//2, (76-th)//2 - 2), label, fill=navy, font=font)
    sub = "PLACEHOLDER"
    sb = d.textbbox((0,0), sub, font=font_small)
    sw = sb[2]-sb[0]
    d.text(((200-sw)//2, 82), sub, fill=(240,255,250,255), font=font_small)
    img.save(partners / f"{n}-logo.png", "PNG")

# Hero WebP (industrial abstract, no people)
hero = Image.new("RGB", (1920,1080), (5,22,38))
d = ImageDraw.Draw(hero, 'RGBA')
for y in range(1080):
    t = y / 1079
    r = int(5 + (0-5)*t)
    g = int(22 + (61-22)*t)
    b = int(38 + (91-38)*t)
    d.line([(0,y),(1919,y)], fill=(r,g,b,255), width=1)

# grid + panels
for x in range(0,1920,120):
    d.line([(x,0),(x,1080)], fill=(0,136,107,35), width=1)
for y in range(0,1080,90):
    d.line([(0,y),(1920,y)], fill=(0,136,107,25), width=1)

# scada screens blocks
blocks = [(140,120,760,430),(840,150,1770,500),(220,520,950,930),(1020,560,1760,970)]
for (x1,y1,x2,y2) in blocks:
    d.rounded_rectangle((x1,y1,x2,y2), radius=18, fill=(10,35,58,160), outline=(0,136,107,170), width=3)
    for gx in range(x1+24, x2-24, 70):
        d.line([(gx,y1+20),(gx,y2-20)], fill=(0,136,107,40), width=1)
    for gy in range(y1+20, y2-20, 56):
        d.line([(x1+20,gy),(x2-20,gy)], fill=(0,136,107,40), width=1)

# signal lines
for i,yy in enumerate([280,320,360,700,740,780]):
    pts = []
    for x in range(100,1820,120):
        offset = ((x//120 + i) % 3 - 1) * 18
        pts.append((x, yy+offset))
    d.line(pts, fill=(25,179,148,160), width=3)

# subtle glow circles
for cx,cy,r in [(430,250,140),(1290,300,180),(640,760,160),(1460,760,150)]:
    d.ellipse((cx-r,cy-r,cx+r,cy+r), fill=(0,136,107,28))

hero.save(visual / "hero-scada.webp", "WEBP", quality=88, method=6)
print("generated partners png + hero webp")
