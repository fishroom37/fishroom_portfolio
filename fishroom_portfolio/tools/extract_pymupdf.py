import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
import fitz

path = r'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
doc = fitz.open(path)
print("PAGES:", len(doc))
outdir = r'C:\Users\user\Desktop\fishroom_portfolio'
for i, page in enumerate(doc):
    txt = page.get_text("text")
    print(f"\n===== PAGE {i+1} =====")
    print(txt[:1000])
    pix = page.get_pixmap(matrix=fitz.Matrix(3, 3))
    imgpath = f"{outdir}\\page{i+1}.png"
    pix.save(imgpath)
    print("IMG_SAVED:", imgpath)