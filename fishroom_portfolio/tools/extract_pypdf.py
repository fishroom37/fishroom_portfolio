import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from pypdf import PdfReader

path = r'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
reader = PdfReader(path)
print("PAGES:", len(reader.pages))
for i, page in enumerate(reader.pages):
    print(f"\n===== PAGE {i+1} =====")
    try:
        text = page.extract_text()
        print(text)
    except Exception as e:
        print("ERROR:", e)