import sys, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

# 가설: PDF 안에서는 한글이 "EUC-KR/CP949 바이트가 UTF-16 코드포인트로 저장"된 것일 수 있다.
# 검증: 관측된 문자들
samples = {
    "관찰_번호": "踰덊샇",
    "관찰_개발": "媛쒕컻",
    "관찰_회사명": "?뚯궗紐?",
    "관찰_과제명": "洹쇰Т湲곌컙",
    "관찰_구분": "寃쎈젰",
    "관찰_등재": "湲곗닠",
}

# 시도 1: 관찰문자를 UTF-16BE/CP949 바이트로 보고,
# 그 바이트 시퀀스를 여러 방식으로 디코드 해보기

def try_decode(source_chars, encoding_a, encoding_b):
    # source_chars에서 각 유니코드 코드포인트를 b로 인코딩 후 a로 디코드
    raw = source_chars.encode(encoding_b, errors='replace')
    try:
        out = raw.decode(encoding_a)
        return out
    except Exception as e:
        return f'ERR {e}'

for name, s in samples.items():
    print(f"{name} [{s}] len={len(s)}")
    print("   utf8bytes->cp949:", try_decode(s, 'cp949', 'utf-8'))
    print("   utf16bytes->cp949:", try_decode(s, 'cp949', 'utf-16-be'))
    print("   latin1bytes->cp949:", try_decode(s, 'cp949', 'latin-1'))

# 시도 2: 올바른 한글 "개발"을 여러 인코딩 파이프라인으로 변환해 관찰문자 "媛쒕컻"가 나오는지
target = "媛쒕컻"
for source_word in ["개발", "번호", "회사명"]:
    utf8 = source_word.encode('utf-8')
    try:
        cp = utf8.decode('cp949')
        print(f"'{source_word}' utf8->cp949 = '{cp}'", "MATCH!" if cp == target else "")
    except Exception as e:
        print(f"'{source_word}' utf8->cp949 ERR: {e}")