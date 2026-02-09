import re
from pathlib import Path
regex = re.compile(r'["\'](\.?\.?/assets/images/[\w%\-\./\s@]+)["\']')
paths=set()
for html in Path('.').rglob('*.html'):
    if '_validation' in html.parts:
        continue
    text=html.read_text(encoding='utf-8',errors='ignore')
    for m in regex.finditer(text):
        path = m.group(1)
        paths.add(path)
for p in sorted(paths):
    print(p)
