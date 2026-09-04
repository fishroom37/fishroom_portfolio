import sys, io
import pymupdf

path = r'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
out = r'C:\Users\user\Desktop\fishroom_portfolio\pymupdf_direct.txt'

doc = pymupdf.open(path)
lines = []
lines.append("PAGES: %d" % len(doc))
for i, page in enumerate(doc):
    lines.append("\n===== PAGE %d =====" % (i+1))
    lines.append(page.get_text("text"))
    # 각 라인에 좌표 추가 (blocks)
    lines.append("--- BLOCKS ---")
    for b in page.get_text("blocks"):
        lines.append("[x0=%.1f y0=%.1f x1=%.1f y1=%.1f] %s" % (b[0], b[1], b[2], b[3], b[4].replace("\n", " / ")))

with open(out, 'w', encoding='utf-8') as f:
    f.write("\n".join(lines))
print("WROTE", out)