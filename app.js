const projects = [
  {
    id: 1,
    category: "sm",
    categoryLabel: "운영·SM",
    title: "전시통합정보시스템 유지보수",
    period: "2022.11 ~ 2024.05",
    client: "(주)휴비즈아이씨티",
    role: "웹 시스템 유지운영 및 결함 조치",
    tech: "Java, Spring, JSP, Oracle",
    desc: "전시 및 대관 정보 통합 시스템의 안정적 운영을 위한 실시간 오류 해결 및 기능 보완",
    tasks: [
      "시스템 정기 점검, 예외 로그 모니터링 및 실시간 버그 수정",
      "관리자 요구사항 기반 통계 및 리포트 조회 모듈 추가 구축",
      "DB 쿼리 점검 및 데이터 무결성 보장을 통한 서비스 안정성 확보"
    ]
  },
  {
    id: 2,
    category: "public",
    categoryLabel: "공공",
    title: "[경북TP] 홈페이지 추가개발 및 연계",
    period: "2023.04 ~ 2023.08",
    client: "(주)휴비즈아이씨티 / 경북테크노파크",
    role: "대외 포털 컴포넌트 및 SSO 인터페이스 개발",
    tech: "eGovFrame, Java, MyBatis, SSO",
    desc: "경북테크노파크 대외 웹사이트 기능 추가 및 사내 그룹웨어 SSO 단일 인증 연계",
    tasks: [
      "대외 웹사이트 사용자 편의 기능 및 게시판 컴포넌트 개발",
      "사내 그룹웨어 시스템과의 SSO 인증 및 사내 데이터 연계 인터페이스 구축",
      "부서별 권한 제어 모듈 반영 및 공공 보안 가이드 준수"
    ]
  },
  {
    id: 3,
    category: "public",
    categoryLabel: "공공",
    title: "경주시 평생학습 포털 & 진흥원 기능 개선",
    period: "2023.04 ~ 2023.12",
    client: "(주)휴비즈아이씨티 / 지자체",
    role: "수강 신청 프로세스 개편 및 인증 API 연동",
    tech: "Java, eGovFrame, MyBatis, 간편인증 API",
    desc: "평생교육 수강 신청, 정원 관리 프로세스 개선 및 간편 본인인증 연동",
    tasks: [
      "온·오프라인 강좌 개설 및 실시간 정원 마감 처리 로직 구축",
      "휴대폰 및 간편인증 API 연동과 개인정보 안전 보관 처리",
      "조회 쿼리 튜닝을 통한 동시 접속 시 페이지 응답 시간 단축"
    ]
  },
  {
    id: 4,
    category: "public",
    categoryLabel: "공공",
    title: "원스톱 기업지원 서비스 플랫폼 구축",
    period: "2023.06 ~ 2023.10",
    client: "(주)휴비즈아이씨티",
    role: "온라인 접수 백엔드 개발 및 레거시 개편",
    tech: "eGovFrame, Java, Spring MVC, Oracle",
    desc: "중소기업 지원 사업 신청·접수 자동화 및 웹 접근성 표준 준수",
    tasks: [
      "지원 사업 단계별 서류 온라인 접수 및 심사 프로세스 개발",
      "노후 웹사이트 리팩토링 및 웹 표준/웹 접근성 가이드라인 충족",
      "심사 단계별 상태 전이 트랜잭션 로직 설계"
    ]
  },
  {
    id: 5,
    category: "enterprise",
    categoryLabel: "기업솔루션",
    title: "대구경북기업인라운지 웹 구축",
    period: "2023.11 ~ 2023.12",
    client: "(주)휴비즈아이씨티",
    role: "포털 프론트엔드/백엔드 풀스택 구축",
    tech: "Java, Spring, JSP, MySQL",
    desc: "기업인 간 정보 교류 및 네트워킹을 위한 공간 예약 및 커뮤니티 플랫폼",
    tasks: [
      "반응형 웹 화면 및 회원/권한 관리 로직 구축",
      "라운지 공간 및 시설 온라인 예약 신청/승인 백엔드 개발",
      "관리자 운영 효율화를 위한 신청 데이터 엑셀 추출 기능 제공"
    ]
  },
  {
    id: 6,
    category: "enterprise",
    categoryLabel: "기업솔루션",
    title: "포스코스틸리온 모바일 iHR 구축",
    period: "2024.07 ~ 2024.10",
    client: "(주)휴비즈아이씨티 / 포스코스틸리온",
    role: "모바일 인사 시스템 웹 API 개발",
    tech: "Java, Spring Boot, REST API, Oracle",
    desc: "임직원 근태, 결재, 인사정보 조회가 가능한 사내 모바일 iHR 시스템 구축",
    tasks: [
      "모바일 브라우저 전용 인사 조회 및 결재 승인 REST API 구현",
      "ERP 레거시 기간계 DB와의 실시간 데이터 정합성 검증",
      "모바일 환경을 고려한 데이터 페이로드 경량화 및 응답 속도 최적화"
    ]
  },
  {
    id: 7,
    category: "enterprise",
    categoryLabel: "기업솔루션",
    title: "공사원가관리 시스템 구축",
    period: "2024.10 ~ 2024.12",
    client: "(주)휴비즈아이씨티",
    role: "UI 컴포넌트 개발 및 데이터 연동",
    tech: "Java, Spring, Web Grid, JavaScript",
    desc: "공사 내역별 원가 산정 및 현장별 집계 데이터를 동적으로 처리하는 시스템",
    tasks: [
      "공사 세부 내역별 원가 산정을 위한 웹 그리드 컴포넌트 연동",
      "대량 집계 데이터 동적 계산 및 실시간 상태 반영",
      "공종별 원가 비교 차트 및 데이터 정합성 검증"
    ]
  },
  {
    id: 8,
    category: "enterprise",
    categoryLabel: "기업솔루션",
    title: "DOE 수주견적관리 시스템 개발",
    period: "2025.04 ~ 2025.10",
    client: "(주)휴비즈아이씨티",
    role: "견적 산출 비즈니스 로직 및 워크플로우 개발",
    tech: "Java, Spring MVC, MyBatis, Oracle",
    desc: "엔지니어링 견적 자동 산출 및 단계별 결재 워크플로우를 처리하는 백엔드 개발",
    tasks: [
      "견적 산출 공식 알고리즘 및 단계별 원가 계산 로직 개발",
      "견적서 승인/반려 결재 워크플로우 트랜잭션 제어",
      "견적 이력 버전 관리 및 대용량 엑셀 다운로드 모듈 구현"
    ]
  },
  {
    id: 9,
    category: "public",
    categoryLabel: "공공",
    title: "[포항문화재단] 포항문화포털 구축",
    period: "2025.07 ~ 2025.12",
    client: "(주)휴비즈아이씨티 / 포항문화재단",
    role: "전자정부프레임워크 백엔드 개발",
    tech: "eGovFrame, Java, MyBatis, PostgreSQL",
    desc: "포항문화재단 통합 대민 포털 구축 및 문화행사 예매·접수 서비스 개발",
    tasks: [
      "전자정부프레임워크 기반 문화예술 통합 포털 백엔드 구축",
      "행사/공연 온라인 예매 및 신청자 동시 처리 로직 점검",
      "MyBatis 쿼리 튜닝 및 관리자 CMS 공통 게시판 모듈 커스터마이징"
    ]
  }
];

// URL 쿼리 파라미터 기반 탭 전환 (?section=xxx)
function switchSection(sectionName) {
  const sections = document.querySelectorAll('.view-section');
  const navItems = document.querySelectorAll('.nav-item');

  sections.forEach(sec => sec.classList.remove('active'));
  navItems.forEach(btn => btn.classList.remove('active'));

  const targetSec = document.getElementById(`section-${sectionName}`);
  const targetNav = document.querySelector(`.nav-item[data-section="${sectionName}"]`);

  if (targetSec) targetSec.classList.add('active');
  if (targetNav) targetNav.classList.add('active');

  const newUrl = new URL(window.location);
  newUrl.searchParams.set('section', sectionName);
  window.history.pushState({}, '', newUrl);

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 프로젝트 카드 렌더링
function renderProjects(list) {
  const container = document.getElementById('projectContainer');
  if (!container) return;
  container.innerHTML = '';

  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'proj-item';
    card.onclick = () => openDetailModal(item.id);
    card.innerHTML = `
      <div>
        <span class="proj-badge">${item.categoryLabel}</span>
        <h4>${item.title}</h4>
        <p>${item.desc}</p>
      </div>
      <div class="proj-foot">
        <span>${item.tech.split(',')[0]}</span>
        <span>${item.period}</span>
      </div>
    `;
    container.appendChild(card);
  });
}

// 필터링
function filterCardList(category, event) {
  document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
  if (event) event.target.classList.add('active');

  if (category === 'all') {
    renderProjects(projects);
  } else {
    renderProjects(projects.filter(p => p.category === category));
  }
}

// 모달 열기/닫기
function openDetailModal(id) {
  const p = projects.find(item => item.id === id);
  if (!p) return;

  document.getElementById('modalCategory').innerText = p.categoryLabel;
  document.getElementById('modalTitle').innerText = p.title;
  document.getElementById('modalPeriod').innerText = p.period;
  document.getElementById('modalRole').innerText = p.role;
  document.getElementById('modalClient').innerText = p.client;
  document.getElementById('modalTech').innerText = p.tech;

  const taskList = document.getElementById('modalTasks');
  taskList.innerHTML = '';
  p.tasks.forEach(t => {
    const li = document.createElement('li');
    li.innerText = t;
    taskList.appendChild(li);
  });

  document.getElementById('modalOverlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeDetailModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function closeModalOnOverlay(e) {
  if (e.target.id === 'modalOverlay') closeDetailModal();
}

// 초기화
window.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const currentSection = params.get('section') || 'intro';
  switchSection(currentSection);
  renderProjects([...projects].reverse());
});

window.addEventListener('popstate', () => {
  const params = new URLSearchParams(window.location.search);
  const currentSection = params.get('section') || 'intro';
  switchSection(currentSection);
});
