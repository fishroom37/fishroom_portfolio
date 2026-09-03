:root {
  --bg-main: #f8fafc;
  --bg-sidebar: #ffffff;
  --card-bg: #ffffff;
  --border: #e2e8f0;
  --border-light: #f1f5f9;
  --text-primary: #0f172a;
  --text-secondary: #64748b;
  --text-muted: #94a3b8;
  --primary: #2563eb;
  --primary-hover: #1d4ed8;
  --primary-light: #eff6ff;
  --font-mono: 'JetBrains Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--bg-main);
  color: var(--text-primary);
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
  line-height: 1.6;
}

/* Layout */
.layout {
  display: flex;
  min-height: 100vh;
}

/* Sidebar */
.sidebar {
  width: 280px;
  background-color: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  padding: 40px 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 20;
}

.logo {
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text-primary);
}

.role {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  margin-top: 4px;
}

.nav-menu {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 40px 0;
}

.nav-item {
  background: none;
  border: none;
  text-align: left;
  padding: 10px 14px;
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-secondary);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.nav-item:hover {
  background-color: var(--border-light);
  color: var(--text-primary);
}

.nav-item.active {
  background-color: var(--primary-light);
  color: var(--primary);
}

.status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #10b981;
  margin-bottom: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #10b981;
  border-radius: 50%;
}

.copyright {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

/* Content Area */
.content-area {
  margin-left: 280px;
  flex: 1;
  padding: 60px 80px;
  max-width: 1050px;
}

.view-section {
  display: none;
}

.view-section.active {
  display: block;
  animation: fadeIn 0.25s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Common Components */
.section-title {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  margin-bottom: 28px;
}

.card {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 24px;
}

/* Intro Section */
.intro-box {
  padding-top: 40px;
}

.sub-heading {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--primary);
  font-weight: 600;
}

.main-title {
  font-size: 2.4rem;
  font-weight: 800;
  line-height: 1.35;
  margin: 16px 0 20px;
  letter-spacing: -1px;
}

.intro-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.8;
  max-width: 720px;
}

.quick-links {
  margin-top: 36px;
  display: flex;
  gap: 12px;
}

.btn {
  padding: 12px 22px;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.btn-primary {
  background-color: var(--primary);
  color: #fff;
}

.btn-primary:hover { background-color: var(--primary-hover); }

.btn-secondary {
  background-color: #fff;
  border-color: var(--border);
  color: var(--text-primary);
}

.btn-secondary:hover { background-color: var(--border-light); }

/* About Section */
.about-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.about-card p {
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.info-item .label {
  display: block;
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.info-item .val {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
}

/* Skills Section */
.skills-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.skill-category h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 14px;
}

.skill-list {
  list-style: none;
}

.skill-list li {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  position: relative;
  padding-left: 14px;
}

.skill-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--primary);
}

/* Experience Section */
.time-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.company {
  font-size: 1.2rem;
  font-weight: 700;
}

.period {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}

.position {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--primary);
  margin-bottom: 14px;
}

.exp-summary {
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.exp-bullets {
  list-style: none;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.exp-bullets li {
  margin-bottom: 6px;
  padding-left: 14px;
  position: relative;
}

.exp-bullets li::before {
  content: "-";
  position: absolute;
  left: 0;
}

/* Projects Section */
.section-header-flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-group {
  display: flex;
  gap: 8px;
}

.filter-chip {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
}

.filter-chip.active {
  background-color: var(--text-primary);
  color: #fff;
  border-color: var(--text-primary);
}

.project-card-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.proj-item {
  background-color: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.proj-item:hover {
  border-color: var(--primary);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
  transform: translateY(-2px);
}

.proj-badge {
  display: inline-block;
  font-size: 0.75rem;
  background-color: var(--primary-light);
  color: var(--primary);
  padding: 2px 8px;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 10px;
}

.proj-item h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 6px;
}

.proj-item p {
  font-size: 0.88rem;
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 14px;
}

.proj-foot {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
  border-top: 1px solid var(--border-light);
  padding-top: 10px;
  display: flex;
  justify-content: space-between;
}

/* Modal */
.modal-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(4px);
  z-index: 100;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-overlay.active { display: flex; }

.modal-window {
  background: #fff;
  border-radius: 14px;
  width: 100%;
  max-width: 620px;
  max-height: 85vh;
  overflow-y: auto;
  padding: 32px;
  position: relative;
}

.modal-close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-muted);
}

.modal-badge {
  font-size: 0.8rem;
  background-color: var(--primary-light);
  color: var(--primary);
  padding: 3px 8px;
  border-radius: 4px;
  font-weight: 600;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: 800;
  margin: 10px 0 16px;
}

.modal-meta-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;
  background-color: var(--bg-main);
  padding: 14px;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 20px;
}

.modal-content-body h3 {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.modal-content-body ul {
  list-style: none;
}

.modal-content-body ul li {
  font-size: 0.92rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
  padding-left: 14px;
  position: relative;
}

.modal-content-body ul li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: var(--primary);
}

/* Responsive */
@media (max-width: 860px) {
  .layout { flex-direction: column; }
  .sidebar { width: 100%; position: relative; padding: 24px; }
  .content-area { margin-left: 0; padding: 30px 20px; }
  .info-grid { grid-template-columns: 1fr; }
  .project-card-grid { grid-template-columns: 1fr; }
}
