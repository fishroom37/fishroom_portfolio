/* ============================================================
 *  포트폴리오 데이터 설정 파일
 *  이 파일만 수정하면 사이트 내용이 모두 바뀝니다.
 * ============================================================ */

const SITE = {
  /* ---------- 기본 정보 ---------- */
  name: "권기현",
  role: "웹 서비스 개발자",
  description: "기업·공공 웹 서비스의 구축과 운영·유지보수를 경험한 웹 개발자",
  about: [
    "기업·공공 웹 서비스의 구축부터 운영·유지보수까지 함께한 웹 개발자 권기현입니다.",
    "포스코 계열사 내부 시스템과 포항문화재단, 경주시, 경북테크노파크 등 공공기관의 시스템 구축에 참여하며, 사용자 관점의 화면 설계와 유지보수하기 쉬운 구조를 고민해 왔습니다.",
    "새로운 기술을 익혀 실제 업무에 적용하는 것을 즐기며, 명확한 커뮤니케이션과 문서화를 중요하게 생각합니다."
  ],
  email: "732778@gmail.com",
  github: "https://github.com/fishroom37",
  location: "대구, 대한민국",

  /* ---------- 기술 스택 ---------- */
  skills: [
    { name: "HTML5 / CSS3", group: "Frontend", level: "" },
    { name: "JavaScript / jQuery", group: "Frontend", level: "" },
    { name: "웹 접근성 / NUX 표준", group: "Frontend", level: "" },
    { name: "UI/UX 화면 개발", group: "Frontend", level: "" },
    { name: "JSP / Servlet", group: "Backend", level: "" },
    { name: "Spring / MyBatis", group: "Backend", level: "" },
    { name: "Oracle / MySQL", group: "데이터베이스", level: "" },
    { name: "SVN / Git", group: "협업 · 도구", level: "" },
    { name: "시스템 유지보수", group: "협업 · 도구", level: "" }
  ],

  /* ---------- 참여 프로젝트 (기술경력) ---------- */
  projects: [
    {
      title: "포항문화포털 플랫폼 구축",
      org: "포항문화재단",
      period: "2025.07.30 - 2025.12.10",
      category: "응용 SW 개발",
      type: "구축",
      role: "개발",
      url: "https://phcf.or.kr/phcf/index.do",
      description: "지역 문화 정보 통합 포털 플랫폼 구축에 참여했습니다. 포털의 사용자 화면과 관리 기능 개발, 콘텐츠 연동을 담당했습니다."
    },
    {
      title: "DOE 수주견적관리 시스템 구축(포스코 계열사 내부 시스템)",
      org: "(주)휴비즈아이씨티",
      period: "2025.04.01 - 2025.10.15",
      category: "시스템 SW 개발",
      type: "구축",
      role: "개발",
      url: "",
      description: "수주·견적 업무를 관리하는 시스템 개발에 참여했습니다. 견적 작성, 결재, 수주 이력 관리 기능을 구현했습니다."
    },
    {
      title: "공사원가관리 시스템 구축(포스코 계열사 내부 시스템)",
      org: "(주)휴비즈아이씨티",
      period: "2024.10.15 - 2024.12.31",
      category: "UI/UX 개발",
      type: "구축",
      role: "UI/UX 개발",
      url: "",
      description: "공사 원가 데이터를 구조화해 관리하는 시스템의 UI/UX 화면 개발을 담당했습니다."
    },
    {
      title: "포스코스틸리온 모바일 iHR 시스템 구축(포스코 계열사 내부 시스템)",
      org: "포스코스틸리온",
      period: "2024.07.15 - 2024.10.31",
      category: "응용 SW 개발",
      type: "용역",
      role: "개발",
      url: "",
      description: "포스코스틸리온의 모바일 인사(HR) 시스템 구축 용역에 참여했습니다."
    },
    {
      title: "SW전문인재양성사업 (2차)",
      org: "고용노동부",
      period: "2024.01.01 - 2024.05.08",
      category: "IT기술교육",
      type: "교육",
      role: "참여",
      url: "",
      description: "SW 전문 인재 양성 교육과정에 참여하며 실무 역량을 향상했습니다."
    },
    {
      title: "대구경북기업인라운지 웹사이트 구축",
      org: "대구경북지역 기업지원기관",
      period: "2023.11.13 - 2023.12.15",
      category: "응용 SW 개발",
      type: "구축",
      role: "개발",
      url: "https://dgbiz.kr/ko/main/index.do",
      description: "기업인 라운지의 공식 웹사이트를 구축했습니다. 안내 페이지와 콘텐츠 관리 기능을 개발했습니다."
    },
    {
      title: "원스톱 기업지원 서비스 플랫폼 구축 및 홈페이지 고도화",
      org: "기업지원 유관기관",
      period: "2023.06.01 - 2023.10.02",
      category: "응용 SW 개발",
      type: "구축/고도화",
      role: "개발",
      url: "",
      description: "기업지원 서비스를 한곳에서 이용할 수 있는 플랫폼 구축과 기존 홈페이지의 고도화 작업에 참여했습니다."
    },
    {
      title: "경주시 평생학습 홈페이지 기능 개선",
      org: "경주시",
      period: "2023.05.09 - 2023.09.05",
      category: "응용 SW 개발",
      type: "운영/개선",
      role: "개발",
      url: "https://www.gyeongju.go.kr/gjlll/main/index.do",
      description: "경주시 평생학습 홈페이지의 기능 개선 작업을 진행했습니다."
    },
    {
      title: "홈페이지 추가개발 및 그룹웨어 기능연계",
      org: "경북테크노파크(경북TP)",
      period: "2023.04.11 - 2023.08.31",
      category: "응용 SW 개발",
      type: "구축",
      role: "개발",
      url: "https://www.gbtp.or.kr/main.do",
      description: "경북TP 홈페이지 추가 개발과 그룹웨어 기능 연계 작업에 참여했습니다."
    },
    {
      title: "기능 개선 및 유지보수",
      org: "경북인재평생교육진흥원",
      period: "2023.04.01 - 2023.12.31",
      category: "응용 SW 개발",
      type: "유지보수",
      role: "유지보수",
      url: "https://www.gtlef.or.kr/edu/main.do",
      description: "경북인재평생교육진흥원 시스템의 기능 개선과 유지보수를 담당했습니다."
    },
    {
      title: "SW전문인재양성사업 (1차)",
      org: "고용노동부",
      period: "2023.01.01 - 2023.12.31",
      category: "IT기술교육",
      type: "교육",
      role: "참여",
      url: "",
      description: "대학생들 대상으로 교육 및 프로젝트 수행 협업"
    },
    {
      title: "전시통합정보시스템 유지보수(국립대구과학관 내부시스템)",
      org: "전시·박람회 운영기관",
      period: "2022.11.14 - 2024.05.08",
      category: "응용 SW 개발",
      type: "유지보수",
      role: "유지보수",
      url: "",
      description: "시스템 기능 관리 및 내부 데이터 관리"
    }
  ],
/* ---------- 학력 · 교육 ---------- */
  education: [
    {
      title: "건축공학 전문학사",
      org: "영남이공대학",
      period: "졸업",
      desc: ""
    }
  ],

  trainings: [
    {
      title: "[개인정보 보호법] 주요 법 개정사항",
      org: "개인정보보호위원회",
      period: "2024.04.18",
      desc: ""
    },
    {
      title: "AI 인공지능 기본과정",
      org: "정보통신산업진흥원",
      period: "2024.04.15 - 2024.04.26",
      desc: ""
    },
    {
      title: "[NEW] 개인정보 안전성 확보조치",
      org: "개인정보보호위원회",
      period: "2024.04.08",
      desc: ""
    },
    {
      title: "[NEW] 개인정보 안전성 확보조치",
      org: "개인정보보호위원회",
      period: "2024.04.05 - 2024.04.08",
      desc: ""
    },
    {
      title: "블록체인 BM과정 (Web3.0 비즈니스모델)",
      org: "(재)포항테크노파크",
      period: "2024.02.15 - 2024.03.26",
      desc: ""
    },
    {
      title: "SW개발보안 기본과정 (개발자 대상) [1차]",
      org: "한국인터넷진흥원",
      period: "2023.06.15",
      desc: ""
    }
  ]
};