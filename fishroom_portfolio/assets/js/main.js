/* ============================================================
 *  메인 스크립트 - SITE 객체의 데이터를 화면에 렌더링
 * ============================================================ */
(function () {
  "use strict";

  const d = SITE;
  const $ = (sel) => document.querySelector(sel);
  const escapeHTML = (str) =>
    String(str ?? "").replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* ---------- 다크 모드 ---------- */
  const root = document.documentElement;
  const themeToggle = $("#themeToggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (themeToggle) themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
    try { localStorage.setItem("theme", theme); } catch (e) { /* ignore */ }
  }

  function initTheme() {
    let saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) { /* ignore */ }
    const prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(saved || (prefersDark ? "dark" : "light"));
    if (themeToggle) {
      themeToggle.addEventListener("click", () => {
        applyTheme(root.getAttribute("data-theme") === "dark" ? "light" : "dark");
      });
    }
  }

  /* ---------- 텍스트 채우기 ---------- */
  function fillProfile() {
    document.title = `${d.name} | ${d.role} 포트폴리오`;
    $("#brandName").textContent = d.name;
    $("#heroName").textContent = d.name;
    $("#heroRole").textContent = d.role;
    $("#heroDesc").textContent = d.description;

    $("#heroMetaLocation").textContent = `📍 ${d.location}`;
    $("#heroMetaEmail").textContent = `✉️ ${d.email}`;
    $("#heroMetaGithub").textContent = `🐙 ${d.github.replace(/^https?:\/\//, "")}`;

    $("#aboutText").innerHTML = d.about
      .map((t) => `<p>${escapeHTML(t)}</p>`)
      .join("");

    $("#contactEmail").href = `mailto:${d.email}`;
    $("#contactEmailText").textContent = d.email;
    $("#contactGithub").href = d.github;
    $("#contactGithubText").textContent = d.github.replace(/^https?:\/\//, "");

    $("#footerText").textContent = `© ${new Date().getFullYear()} ${d.name}. All rights reserved.`;
  }

  /* ---------- 기술 스택 (그룹별) ---------- */
  function renderSkills() {
    const box = $("#skillsBox");
    const groups = {};
    d.skills.forEach((s) => {
      const g = s.group || "기술";
      (groups[g] = groups[g] || []).push(s);
    });
    box.innerHTML = Object.keys(groups)
      .map(
        (g) => `
        <div class="skill-group">
          <h3 class="skill-group-title">${escapeHTML(g)}</h3>
          <div class="skill-items">
            ${groups[g]
              .map(
                (s) => `
                <div class="skill-item">
                  <span class="skill-name">${escapeHTML(s.name)}</span>
                  ${s.level ? `<span class="skill-level">${escapeHTML(s.level)}</span>` : ""}
                </div>`
              )
              .join("")}
          </div>
        </div>`
      )
      .join("");
  }

  /* ---------- 프로젝트 ---------- */
  let currentFilter = "전체";

  function projectCategories() {
    const cats = ["전체"];
    d.projects.forEach((p) => {
      if (!cats.includes(p.category)) cats.push(p.category);
    });
    return cats;
  }

  function renderFilterBar() {
    const bar = $("#filterBar");
    bar.innerHTML = projectCategories()
      .map(
        (c) => `
        <button class="chip ${c === currentFilter ? "active" : ""}"
                role="tab" aria-selected="${c === currentFilter}"
                data-filter="${escapeHTML(c)}">${escapeHTML(c)}</button>`
      )
      .join("");
    bar.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        currentFilter = chip.dataset.filter;
        renderFilterBar();
        renderProjects();
        renderProjectTech();
      });
    });
  }
/* 프로젝트 카드 스크롤 표시 (재렌더링 후에도 동작하도록 재관찰) */
  let cardObserver = null;

  function observeProjectCards() {
    if (cardObserver) cardObserver.disconnect();
    cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05 }
    );
    document.querySelectorAll(".project-card").forEach((el) => cardObserver.observe(el));
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    const list = d.projects.filter(
      (p) => currentFilter === "전체" || p.category === currentFilter
    );
    if (list.length === 0) {
      grid.innerHTML = `<p class="empty">해당 분류의 프로젝트가 없습니다.</p>`;
      return;
    }
    grid.innerHTML = list
      .map(
        (p) => `
        <article class="project-card">
          <div class="project-top">
            <span class="project-category">${escapeHTML(p.category)}</span>
            <span class="project-type">${escapeHTML(p.type)}</span>
            <span class="project-period">${escapeHTML(p.period)}</span>
          </div>
          <h3 class="project-title">${escapeHTML(p.title)}</h3>
          <p class="project-org">${escapeHTML(p.org)} · ${escapeHTML(p.role)}</p>
          <p class="project-desc">${escapeHTML(p.description)}</p>
          <div class="project-tech" data-tech-for="${escapeHTML(p.title)}"></div>
          <div class="project-links">
            ${
              p.url
                ? `<a class="link" href="${escapeHTML(p.url)}" target="_blank" rel="noopener">프로젝트 보기 →</a>`
                : `<span class="link link-muted">비공개 프로젝트 (내부 시스템)</span>`
            }
          </div>
        </article>`
      )
      .join("");
    observeProjectCards();
    renderProjectTech();
  }

  function renderProjectTech() {
    d.projects.forEach(p => {
      const container = $(`.project-tech[data-tech-for="${escapeHTML(p.title)}"]`);
      if (container && p.tech) {
        container.innerHTML = p.tech.map(t => `<span class="tech-tag">${escapeHTML(t)}</span>`).join('');
      }
    });
  }

  /* ---------- 학력 · 교육 타임라인 ---------- */
  function renderEducation() {
    const tl = $("#eduTimeline");
    const eduItems = (d.education || []).map((e) => ({
      period: e.period,
      title: e.title,
      role: e.org,
      desc: e.desc,
      tag: "학력",
    }));
    const trainItems = (d.trainings || []).map((t) => ({
      period: t.period,
      title: t.title,
      role: t.org,
      desc: t.desc,
      tag: "교육",
    }));
    const items = [...eduItems, ...trainItems];
    tl.innerHTML = items
      .map(
        (it) => `
        <div class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <p class="timeline-period">${escapeHTML(it.period)}</p>
            <span class="timeline-tag">${escapeHTML(it.tag)}</span>
            <h4 class="timeline-title">${escapeHTML(it.title)}</h4>
            <p class="timeline-role">${escapeHTML(it.role)}</p>
            ${it.desc ? `<p class="timeline-desc">${escapeHTML(it.desc)}</p>` : ""}
          </div>
        </div>`
      )
      .join("");
}
/* ---------- UI 상태 (헤더 스크롤, 모바일 메뉴) ---------- */
  function addUIBehaviors() {
    const header = $("#siteHeader");
    const scrollTop = $("#scrollTop");
    window.addEventListener("scroll", () => {
      const top = window.scrollY > 10;
      header.classList.toggle("scrolled", top);
      scrollTop.classList.toggle("visible", top);
    });

    const toggle = $("#navToggle");
    const nav = $("#nav");
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );

    // 섹션 스크롤 표시 효과
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".section").forEach((el) => observer.observe(el));
  }

  /* ---------- 초기화 ---------- */
  function init() {
    initTheme();
    fillProfile();
    renderSkills();
    renderFilterBar();
    renderProjects();
    renderEducation();
    addUIBehaviors();
  }

  document.addEventListener("DOMContentLoaded", init);
})();