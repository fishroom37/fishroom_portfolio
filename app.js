<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>권기현 | 백엔드 엔지니어 포트폴리오</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Pretendard:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="layout">
    <!-- Left Sidebar Navigation -->
    <aside class="sidebar">
      <div class="sidebar-header">
        <h1 class="logo">Gihyeon Kwon</h1>
        <p class="role">Backend SW Engineer</p>
      </div>

      <nav class="nav-menu">
        <button class="nav-item active" data-section="intro" onclick="switchSection('intro')">Intro</button>
        <button class="nav-item" data-section="about" onclick="switchSection('about')">About</button>
        <button class="nav-item" data-section="skills" onclick="switchSection('skills')">Skills</button>
        <button class="nav-item" data-section="experience" onclick="switchSection('experience')">Experience</button>
        <button class="nav-item" data-section="projects" onclick="switchSection('projects')">Projects</button>
      </nav>

      <div class="sidebar-footer">
        <div class="status-indicator">
          <span class="dot"></span>
          <span>구직 중 (대구·경산)</span>
        </div>
        <p class="copyright">© 2026 Gihyeon Kwon.</p>
      </div>
    </aside>

    <!-- Main Content Area -->
    <main class="content-area">
      <!-- Section: Intro -->
      <section id="section-intro" class="view-section active">
        <div class="intro-box">
          <span class="sub-heading">Hello, World!</span>
          <h2 class="main-title">안정적인 백엔드 로직과<br>신뢰할 수 있는 데이터 처리를 만듭니다.</h2>
          <p class="intro-desc">
            건축 현장에서 익힌 끈기와 구조적 분석 능력을 토대로 소프트웨어 분야로 전향한 3년 차 백엔드 엔지니어 권기현입니다.<br>
            전자정부프레임워크(eGovFrame) 기반 공공 포털 구축부터 기업 맞춤형 솔루션까지, 실제 동작하는 비즈니스 가치를 안정적인 코드로 풀어냅니다.
          </p>
          <div class="quick-links">
            <button class="btn btn-primary" onclick="switchSection('projects')">프로젝트 둘러보기</button>
            <button class="btn btn-secondary" onclick="switchSection('experience')">경력 사항 확인</button>
          </div>
        </div>
      </section>

      <!-- Section: About -->
      <section id="section-about" class="view-section">
        <h2 class="section-title">About Me</h2>
        <div class="card about-card">
          <h3>도면에서 시스템 아키텍처로의 전환</h3>
          <p>
            대학에서 건축을 전공하고 사회 초년생으로 2년간 현장 실무를 수행하며 하나의 구조물을 완성해 나가는 책임감과 끈기를 체득했습니다. 
            이후 IT 개발의 매력에 이끌려 전환을 결심했고, 교육 과정을 거쳐 약 3년 2개월간 웹 백엔드 실무에 매진해 왔습니다.
          </p>
          <p>
            건축 현장에서 다진 꼼꼼함과 설계 관점은 데이터베이스 쿼리를 다듬고, 복잡한 비즈니스 규칙을 안정적인 프로그램 코드로 녹여내는 데 가장 큰 밑바탕이 되었습니다.
          </p>
          <div class="info-grid">
            <div class="info-item">
              <span class="label">거주지</span>
              <span class="val">대구광역시 수성구 지산동</span>
            </div>
            <div class="info-item">
              <span class="label">총 실무 경력</span>
              <span class="val">3년 2개월 (2022.11 ~ 2025.12)</span>
            </div>
            <div class="info-item">
              <span class="label">핵심 강점</span>
              <span class="val">eGovFrame, 트랜잭션 관리, 쿼리 튜닝</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Section: Skills -->
      <section id="section-skills" class="view-section">
        <h2 class="section-title">Skills & Technologies</h2>
        <div class="skills-wrapper">
          <div class="skill-category card">
            <h3>Backend Core</h3>
            <ul class="skill-list">
              <li><strong>Java:</strong> 객체지향 설계 및 비즈니스 로직 안정성 확보</li>
              <li><strong>전자정부프레임워크(eGovFrame):</strong> 공공/대민 포털 표준 가이드 기반 개발</li>
              <li><strong>Spring MVC / Spring Boot:</strong> 계층형 구조 설계 및 REST API 연동</li>
              <li><strong>MyBatis:</strong> 복잡한 업무 쿼리 매핑 및 동적 SQL 작성</li>
            </ul>
          </div>

          <div class="skill-category card">
            <h3>Database & Infra</h3>
            <ul class="skill-list">
              <li><strong>Oracle / PostgreSQL:</strong> 대용량 업무 테이블 설계, 인덱스 및 실행계획 분석</li>
              <li><strong>Transaction Control:</strong> 데이터 무결성을 보장하는 다중 결재 트랜잭션 처리</li>
            </ul>
          </div>

          <div class="skill-category card">
            <h3>Frontend & Security</h3>
            <ul class="skill-list">
              <li><strong>Web UI:</strong> JavaScript, jQuery, HTML5, CSS3, 웹 그리드 연동</li>
              <li><strong>보안/가이드:</strong> SW개발보안(시큐어 코딩) 이수, 개인정보보호 기술적 조치 적용</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section: Experience -->
      <section id="section-experience" class="view-section">
        <h2 class="section-title">Experience</h2>
        <div class="timeline">
          <div class="timeline-item card">
            <div class="time-header">
              <span class="company">(주)휴비즈아이씨티</span>
              <span class="period">2022.11 ~ 2025.12 (3년 2개월)</span>
            </div>
            <div class="position">SW개발팀 / 전임연구원 (백엔드 개발)</div>
            <p class="exp-summary">전자정부프레임워크 및 Java 기반 공공기관 웹 포털, 기업 대내외 시스템 구축 및 운영 업무 총괄 수행.</p>
            <ul class="exp-bullets">
              <li>공공 대민 포털 4개, 기업 엔터프라이즈 솔루션 5개 등 총 9개 메인 프로젝트 완수</li>
              <li>공사원가관리 및 견적 자동 산출 시스템 등 복잡 비즈니스 로직 설계 담당</li>
              <li>지자체 시스템 성능 개선 및 사용자 민원 해결을 위한 상시 SM 운영 관리</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Section: Projects -->
      <section id="section-projects" class="view-section">
        <div class="section-header-flex">
          <h2 class="section-title">Projects</h2>
          <div class="filter-group">
            <button class="filter-chip active" onclick="filterCardList('all', event)">전체</button>
            <button class="filter-chip" onclick="filterCardList('public', event)">공공</button>
            <button class="filter-chip" onclick="filterCardList('enterprise', event)">기업솔루션</button>
            <button class="filter-chip" onclick="filterCardList('sm', event)">운영SM</button>
          </div>
        </div>
        <div class="project-card-grid" id="projectContainer"></div>
      </section>
    </main>
  </div>

  <!-- Detail Modal -->
  <div class="modal-overlay" id="modalOverlay" onclick="closeModalOnOverlay(event)">
    <div class="modal-window">
      <button class="modal-close-btn" onclick="closeDetailModal()">&times;</button>
      <span class="modal-badge" id="modalCategory">공공</span>
      <h2 class="modal-title" id="modalTitle">프로젝트 명칭</h2>
      
      <div class="modal-meta-grid">
        <div><strong>수행 기간:</strong> <span id="modalPeriod"></span></div>
        <div><strong>담당 역할:</strong> <span id="modalRole"></span></div>
        <div><strong>소속/발주:</strong> <span id="modalClient"></span></div>
        <div><strong>기술 스택:</strong> <span id="modalTech"></span></div>
      </div>

      <div class="modal-content-body">
        <h3>주요 업무 및 기여 내용</h3>
        <ul id="modalTasks"></ul>
      </div>
    </div>
  </div>

  <script src="app.js"></script>
</body>
</html>
