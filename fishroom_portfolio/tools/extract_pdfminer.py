import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

from pdfminer.high_level import extract_text

path = r'C:\Users\user\Desktop\소프트웨어기술자 경력관리시스템.pdf'
text = extract_text(path)
print(text)