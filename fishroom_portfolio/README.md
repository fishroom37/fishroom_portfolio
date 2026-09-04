# 🌊 웹 개발자 포트폴리오

경력관리시스템(소프트웨어기술자 경력관리) 기록을 바탕으로 만든 1인 포트폴리오 웹사이트입니다.
정적 HTML/CSS/JS 구성으로 빌드 단계 없이 **Cloudflare Pages**에 바로 배포할 수 있습니다.

## 🔧 사이트 구성

| 파일 | 설명 |
| --- | --- |
| `index.html` | 메인 페이지 (단일 페이지) |
| `assets/css/style.css` | 스타일 |
| `assets/js/data.js` | **사이트 내용(이름/프로젝트/경력) — 여기를 수정하세요** |
| `assets/js/main.js` | 렌더링 로직 |
| `404.html` | 404 페이지 |
| `_headers` | 보안 헤더 설정 |
| `favicon.svg` | 파비콘 |

## ✏️ 내용 수정 방법

**모든 내용은 `assets/js/data.js` 한 파일에서 관리**됩니다.

1. `SITE.name` → 본인 이름
2. `SITE.email`, `SITE.github`, `SITE.location` → 연락처 정보
3. `SITE.about` → 자기소개 문구
4. `SITE.projects[].url` → 각 프로젝트의 공개 URL (없으면 `""` 유지)
5. `SITE.projects[].description` → 프로젝트 설명 다듬기
6. `SITE.skills` → 기술 스택 (본인에 맞게)

> 💡 `data.js` 상단에 TODO 주석이 있으니 파일을 열어 순서대로 채워가면 됩니다.

## 🚀 로컬에서 미리보기

```bash
# Python이 있는 경우
python -m http.server 8080
# 브라우저에서 http://localhost:8080 열기
```

또는 VS Code **Live Server** 확장으로 열어도 됩니다.

## ☁️ Cloudflare Pages 배포 (Git 연동)

1. 이 폴더를 **GitHub 저장소**로 올립니다.

```bash
git init
git add .
git commit -m "init: 포트폴리오 사이트"
git branch -M main
git remote add origin https://github.com/본인아이디/본인저장소.git
git push -u origin main
```

2. [Cloudflare Dashboard](https://dash.cloudflare.com) 로그인
3. **Workers & Pages → Create → Pages → Connect to Git**
4. GitHub 저장소를 연결하고 배포 설정:
   - **Production branch**: `main`
   - **Build command**: *(비워두기)*
   - **Build output directory**: `/` *(루트)*
5. **Save and Deploy** → 몇 초 안에 배포됩니다.
6. 배포된 `*.pages.dev` 주소에서 사이트 확인

### 🎯 커스텀 도메인 연결 (선택)
Cloudflare Pages → 프로젝트 → **Custom domains**에서
Cloudflare에 등록된 도메인을 연결하거나 새로 구매해 연결할 수 있습니다.

### 📦 직접 업로드 방식 (Git 없이 빠른 테스트)
Cloudflare **Workers & Pages → Create → Pages → Upload assets**에서
이 폴더의 파일을 드래그앤드롭으로 업로드해도 즉시 배포됩니다.

## 📄 라이선스

프로젝트 내용 및 포트폴리오 콘텐츠의 소유권은 본인에게 있습니다.