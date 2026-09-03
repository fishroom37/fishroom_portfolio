const projectsData = [
  {
    id: 1,
    category: "sm",
    categoryName: "운영·SM",
    title: "전시통합정보시스템 유지보수",
    period: "2022.11 ~ 2024.05 (1년 6개월)",
    client: "(주)휴비즈아이씨티",
    role: "웹 시스템 SM 운영 관리 및 결함 수정",
    tech: "Java, Spring, JSP, Oracle",
    summary: "전시 및 대관 정보 통합 시스템의 안정적 운영을 위한 상시 예외 처리 및 기능 보완",
    tasks: [
      "전시 및 대관 정보 통합 시스템 정기 점검, 예외 처리 및 실시간 버그 수정",
      "사용자 및 관리자 요구사항에 따른 신규 리포트 출력 및 조회 화면 추가 개발",
      "DB 인덱스 점검 및 데이터 정합성 관리를 통한 시스템 가동 안정성 확보"
    ]
  },
  {
    id: 2,
    category: "public",
    categoryName: "공공·지자체",
    title: "[경북TP] 홈페이지 추가개발 및 그룹웨어 연계",
    period: "2023.04 ~ 2023.08 (5개월)",
    client: "(주)휴비즈아이씨티 / 경북테크노파크",
    role: "대외 웹 서비스 및 사내 연계 인터페이스 개발",
    tech: "eGovFrame, Java, MyBatis, SSO",
    summary: "경북테크노파크 웹사이트 기능 확장 및 사내 그룹웨어 SSO 단일 인증 연계 모듈 구축",
    tasks: [
      "경북테크노파크 대외 웹사이트 신규 게시판 컴포넌트 및 사용자 인터페이스 추가 개발",
      "사내 그룹웨어 시스템과의 SSO 인증 및 사내 데이터 연계 인터페이스 개발",
      "부서별 세부 권한 제어 및 공공 보안 가이드라인 준수"
    ]
  },
  {
    id: 3,
    category: "public",
    categoryName: "공공·지자체",
    title: "경주시 평생학습 포털 & 진흥원 기능 개선",
    period: "2023.04 ~ 2023.12 (9개월)",
    client: "(주)휴비즈아이씨티 / 지자체",
    role: "대민 교육 포털 기능 개선 및 백엔드 개발",
    tech: "Java, eGovFrame, MyBatis, 간편인증 API",
    summary: "평생교육 수강 신청, 정원 관리 프로세스 개선 및 대민 본인인증 모듈 연동",
    tasks: [
      "온·오프라인 평생교육 강좌 개설, 수강 신청 및 실시간 정원 관리 프로세스 개편",
      "대민 본인인증(휴대폰/간편인증) 모듈 연동 및 개인정보 안전 조치 적용",
      "사용자 피드백을 수용한 UI 개선 및 조회 쿼리 최적화로 응답 속도 향상"
    ]
  },
  {
    id: 4,
    category: "public",
    categoryName: "공공·지자체",
    title: "원스톱 기업지원 서비스 플랫폼 구축 및 고도화",
    period: "2023.06 ~ 2023.10 (5개월)",
    client: "(주)휴비즈아이씨티",
    role: "전자정부프레임워크 백엔드 개발 및 레거시 개편",
    tech: "eGovFrame, Java, Spring MVC, Oracle",
    summary: "중소기업 지원 사업 온라인 접수 프로세스 자동화 및 노후 시스템 고도화",
    tasks: [
      "전자정부프레임워크 기반 기업 지원 사업 온라인 신청·접수 시스템 개발",
      "노후 홈페이지 기능 개선 및 웹 표준/접근성 가이드라인 준수 작업",
      "심사 평가 프로세스 연동 및 접수 상태 단계별 트랜잭션 관리 모듈 구현"
    ]
  },
  {
    id: 5,
    category: "enterprise",
    categoryName: "기업 솔루션",
    title: "대구경북기업인라운지 웹사이트 구축",
    period: "2023.11 ~ 2023.12 (2개월)",
    client: "(주)휴비즈아이씨티",
    role: "웹 애플리케이션 프론트/백엔드 구축",
    tech: "Java, Spring, JSP, JavaScript, MySQL",
    summary: "기업인 간 교류 및 네트워킹을 위한 공간 예약 및 커뮤니티 플랫폼",
    tasks: [
      "대구경북 기업인 교류 지원용 포털 웹사이트 반응형 화면 신규 구축",
      "회원 가입, 커뮤니티, 시설/공간 온라인 예약 신청 및 승인 로직 구현",
      "관리자 CMS 구축을 통한 공지사항 및 신청자 승인 프로세스 자동화"
    ]
  },
  {
    id: 6,
    category: "enterprise",
    categoryName: "기업 솔루션",
    title: "포스코스틸리온 모바일 iHR 시스템 구축",
    period: "2024.07 ~ 2024.10 (4개월)",
    client: "(주)휴비즈아이씨티 / 포스코스틸리온",
    role: "모바일 인사 시스템 웹 API 및 응용SW 개발",
    tech: "Java, Spring Boot, REST API, Oracle",
    summary: "임직원 근태, 결재, 인사정보 조회가 가능한 사내 모바일 iHR 시스템 개발",
    tasks: [
      "모바일 브라우저 전용 인사정보 조회, 근태관리, 결재 승인 REST API 구현",
      "사내 ERP/HR 기간계 레거시 데이터베이스와의 실시간 연동 및 데이터 정합성 검증",
      "모바일 접근 환경에 맞춘 데이터 페이로드 경량화 및 응답 속도 최적화"
    ]
  },
  {
    id: 7,
    category: "enterprise",
    categoryName: "기업 솔루션",
    title: "공사원가관리 시스템 구축",
    period: "2024.10 ~ 2024.12 (3개월)",
    client: "(주)휴비즈아이씨티",
    role: "UI/UX 화면 개발 및 데이터 입출력 연동",
    tech: "Java, Spring, Web Grid, JavaScript",
    summary: "복잡한 공사 내역별 원가 산정 및 현장별 집계 데이터를 동적으로 처리하는 시스템",
    tasks: [
      "공사 항목별 원가 산정 및 내역 관리를 위한 웹 UI 컴포넌트 개발",
      "웹 그리드(Grid) 연동을 통한 대용량 공사비 집계 데이터 동적 표출 및 실시간 계산",
      "현장별·공종별 집계 데이터 시각화 및 인터페이스 개선"
    ]
  },
  {
    id: 8,
    category: "enterprise",
    categoryName: "기업 솔루션",
    title: "DOE 수주견적관리 시스템 개발",
    period: "2025.04 ~ 2025.10 (7개월)",
    client: "(주)휴비즈아이씨티",
    role: "시스템 및 응용SW 백엔드 로직 개발",
    tech: "Java, Spring MVC, MyBatis, Oracle",
    summary: "엔지니어링 견적 자동 산출 알고리즘 및 결재 워크플로우를 처리하는 백엔드 개발",
    tasks: [
      "제조/엔지니어링 수주 견적 자동 산출 및 원가 계산 비즈니스 로직 구현",
      "견적 데이터 등록·승인 결재 워크플로우 처리 및 트랜잭션 관리",
      "견적 버전별 이력 관리 및 대용량 견적서 엑셀 변환/다운로드 모듈 구축"
    ]
  },
  {
    id: 9,
    category: "public",
    categoryName: "공공·지자체",
    title: "[포항문화재단] 포항문화포털 플랫폼 구축",
    period: "2025.07 ~ 2025.12 (5개월)",
    client: "(주)휴비즈아이씨티 / 포항문화재단",
    role: "전자정부프레임워크 백엔드 및 대민 웹 개발",
    tech: "eGovFrame, Java, MyBatis, PostgreSQL",
    summary: "포항문화재단 대민 문화포털 신규 구축 및 통합 예약·신청 시스템 개발",
    tasks: [
      "전자정부프레임워크(eGovFrame) 기반 문화예술 통합 대민 포털 서비스 백엔드 개발",
      "문화 행사/공연/전시 정보 조회 및 온라인 예약·접수 모듈 구현",
      "MyBatis 기반 복잡 쿼리 튜닝 및 관리자 CMS 커스터마이징"
    ]
  }
];

function renderCards(list) {
  const container = document.getElementById('projectContainer');
  container.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'proj-card';
    card.onclick = () => openModal(p.id);
    card.innerHTML = `
      <div class="card-top">
        <div class="card-badges">
          <span class="category-badge">${p.categoryName}</span>
          <span class="period-badge">${p.period.split(' ')[0]}</span>
        </div>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
      </div>
      <div class="card-bottom">
        <span class="tech-pill">${p.tech.split(',')[0]} 외</span>
        <span class="action-prompt">자세히 보기 &rarr;</span>
      </div>
    `;
    container.appendChild(card);
  });
}

function filterProjects(cat, event) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  if (event) event.target.classList.add('active');
  if (cat === 'all') {
    renderCards(projectsData);
  } else {
    const filtered = projectsData.filter(p => p.category === cat);
    renderCards(filtered);
  }
}

function openModal(id) {
  const p = projectsData.find(item => item.id === id);
  if (!p) return;
  document.getElementById('modalCategory').innerText = p.categoryName;
  document.getElementById('modalTitle').innerText = p.title;
  document.getElementById('modalPeriod').innerText = p.period;
  document.getElementById('modalClient').innerText = p.client;
  document.getElementById('modalRole').innerText = p.role;
  document.getElementById('modalTech').innerText = p.tech;

  const ul = document.getElementById('modalTasks');
  ul.innerHTML = '';
  p.tasks.forEach(task => {
    const li = document.createElement('li');
    li.innerText = task;
    ul.appendChild(li);
  });

  document.getElementById('modalBackdrop').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalBackdrop').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOnOutside(e) {
  if (e.target.id === 'modalBackdrop') closeModal();
}

window.onload = () => {
  renderCards([...projectsData].reverse());
};
