import { useState, useEffect, useRef } from "react";

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg: #06090d;
  --surface: #111922;
  --surface2: #1a2533;
  --surface3: #243245;
  --border: rgba(255,255,255,0.1);
  --border-bright: rgba(255,255,255,0.2);
  --border-strong: rgba(255,255,255,0.32);
  --gold: #ffc940;
  --gold-bright: #ffd966;
  --gold-dim: rgba(255,201,64,0.18);
  --gold-glow: rgba(255,201,64,0.35);
  --red: #ff5470;
  --red-dim: rgba(255,84,112,0.15);
  --green: #4ade80;
  --green-dim: rgba(74,222,128,0.15);
  --green-glow: rgba(74,222,128,0.3);
  --blue: #60a5fa;
  --blue-dim: rgba(96,165,250,0.15);
  --blue-glow: rgba(96,165,250,0.3);
  --purple: #c084fc;
  --purple-dim: rgba(192,132,252,0.15);
  --text: #f1f5f9;
  --text-dim: rgba(241,245,249,0.65);
  --text-faint: rgba(241,245,249,0.35);
  --font-display: 'Rajdhani', sans-serif;
  --font-mono: 'IBM Plex Mono', monospace;
  --font-body: 'IBM Plex Sans', sans-serif;
  --shadow-sm: 0 2px 8px rgba(0,0,0,0.4);
  --shadow-md: 0 4px 16px rgba(0,0,0,0.5);
  --shadow-lg: 0 8px 32px rgba(0,0,0,0.6);
}

body { background: var(--bg); color: var(--text); font-family: var(--font-body); min-height: 100vh; }

.app {
  min-height: 100vh;
  background: var(--bg);
  background-image:
    radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255,201,64,0.1) 0%, transparent 55%),
    radial-gradient(ellipse 50% 50% at 95% 90%, rgba(96,165,250,0.08) 0%, transparent 50%),
    radial-gradient(ellipse 40% 40% at 5% 60%, rgba(192,132,252,0.06) 0%, transparent 50%);
}

/* NAV */
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  height: 56px;
  border-bottom: 1px solid var(--border);
  background: rgba(8,12,16,0.95);
  position: sticky; top: 0; z-index: 100;
  backdrop-filter: blur(12px);
}

.nav-brand {
  font-family: var(--font-display);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--gold);
  text-transform: uppercase;
}

.nav-brand span { color: var(--text-dim); font-weight: 400; font-size: 13px; letter-spacing: 3px; display: block; line-height: 1; margin-top: -2px; }

.nav-tabs {
  display: flex;
  gap: 4px;
}

.nav-tab {
  padding: 6px 18px;
  font-family: var(--font-display);
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  background: none;
  border: 1px solid transparent;
  color: var(--text-dim);
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;
}

.nav-tab:hover { color: var(--text); border-color: var(--border); }
.nav-tab.active { color: var(--gold); border-color: rgba(240,192,64,0.3); background: var(--gold-dim); }

/* MAIN */
.main { max-width: 1100px; margin: 0 auto; padding: 32px 24px 80px; }

/* SECTION LABEL */
.label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 3px;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 10px;
}

/* CARDS */
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 20px;
}

.card + .card { margin-top: 16px; }

/* INPUTS */
.input {
  background: rgba(255,255,255,0.06);
  border: 1.5px solid var(--border-bright);
  border-radius: 6px;
  color: var(--text);
  font-family: var(--font-mono);
  font-size: 13px;
  padding: 10px 14px;
  outline: none;
  transition: all 0.2s;
  width: 100%;
}
.input::placeholder { color: var(--text-faint); }
.input:hover { border-color: var(--border-strong); background: rgba(255,255,255,0.08); }
.input:focus { border-color: var(--gold); background: rgba(255,255,255,0.08); box-shadow: 0 0 0 3px var(--gold-dim); }
.input option { background: #1a2533; color: #f1f5f9; }

/* BUTTONS */
.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.15s;
  white-space: nowrap;
  text-transform: uppercase;
}
.btn:disabled { opacity: 0.3; cursor: not-allowed; }
.btn-gold { background: linear-gradient(135deg, var(--gold) 0%, var(--gold-bright) 100%); color: #06090d; box-shadow: 0 2px 12px var(--gold-glow); }
.btn-gold:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 4px 20px var(--gold-glow); }
.btn-gold:active:not(:disabled) { transform: translateY(0); }
.btn-ghost { background: rgba(255,255,255,0.04); border: 1.5px solid var(--border-bright); color: var(--text); font-size: 13px; font-family: var(--font-body); font-weight: 500; letter-spacing: 0; text-transform: none; }
.btn-ghost:hover:not(:disabled) { border-color: var(--border-strong); background: rgba(255,255,255,0.08); }
.btn-danger { background: var(--red-dim); border: 1.5px solid rgba(255,84,112,0.4); color: var(--red); font-size: 12px; font-family: var(--font-body); font-weight: 500; letter-spacing: 0; text-transform: none; padding: 6px 11px; }
.btn-danger:hover { background: rgba(255,84,112,0.2); border-color: var(--red); }
.btn-sm { padding: 6px 12px; font-size: 14px; }

/* STATUS BADGE */
.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
}
.badge-have { background: rgba(64,200,120,0.15); color: var(--green); border: 1px solid rgba(64,200,120,0.25); }
.badge-want { background: rgba(240,192,64,0.12); color: var(--gold); border: 1px solid rgba(240,192,64,0.25); }
.badge-new { background: rgba(64,144,240,0.12); color: var(--blue); border: 1px solid rgba(64,144,240,0.2); }
.badge-set { background: rgba(255,255,255,0.05); color: var(--text-dim); border: 1px solid var(--border); }

/* FLEX UTILS */
.row { display: flex; gap: 10px; align-items: center; }
.row-between { display: flex; justify-content: space-between; align-items: center; }
.col { display: flex; flex-direction: column; gap: 8px; }
.gap-16 { gap: 16px; }
.mt-8 { margin-top: 8px; }
.mt-16 { margin-top: 16px; }
.mt-24 { margin-top: 24px; }
.mt-32 { margin-top: 32px; }
.w-full { width: 100%; }
.flex-1 { flex: 1; }

/* COLLECTION TRACKER */
.focus-header {
  background: linear-gradient(135deg, var(--surface2) 0%, var(--surface) 100%);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.focus-name {
  font-family: var(--font-display);
  font-size: 36px;
  font-weight: 700;
  letter-spacing: 2px;
  color: var(--text);
  text-transform: uppercase;
}

.stats-row {
  display: flex;
  gap: 24px;
  margin-top: 12px;
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.stat-val {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
}

.stat-val.gold { color: var(--gold); }
.stat-val.green { color: var(--green); }
.stat-val.dim { color: var(--text-dim); }

.stat-lbl {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-faint);
}

/* CARD LIST */
.card-list { display: flex; flex-direction: column; gap: 8px; }

.card-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.card-item:hover { border-color: var(--border-bright); background: var(--surface2); }
.card-item.have { opacity: 0.45; }
.card-item.have:hover { opacity: 0.7; }
.card-item.want { border-left: 2px solid var(--gold); }

.card-item-name {
  font-family: var(--font-body);
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  flex: 1;
}

.card-item-meta {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
}

.card-item-price {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text);
  text-align: right;
  min-width: 70px;
}

.strikethrough { text-decoration: line-through; color: var(--text-faint); }

/* SHOW MODE */
.show-mode-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(8px);
}

.show-mode-panel {
  background: var(--surface);
  border: 1px solid var(--border-bright);
  border-radius: 12px;
  width: min(480px, 95vw);
  padding: 28px;
  position: relative;
}

.show-mode-title {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  margin-bottom: 4px;
}

.show-result {
  margin-top: 20px;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.show-result.have { background: rgba(64,200,120,0.1); border: 1px solid rgba(64,200,120,0.25); }
.show-result.want { background: rgba(240,192,64,0.08); border: 1px solid rgba(240,192,64,0.2); }
.show-result.unknown { background: rgba(64,144,240,0.08); border: 1px solid rgba(64,144,240,0.2); }

.show-result-icon { font-size: 40px; line-height: 1; margin-bottom: 8px; }
.show-result-label { font-family: var(--font-display); font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; }
.show-result-label.have { color: var(--green); }
.show-result-label.want { color: var(--gold); }
.show-result-label.unknown { color: var(--blue); }
.show-result-sub { font-family: var(--font-mono); font-size: 11px; color: var(--text-dim); margin-top: 6px; }

/* TRADE ADVISOR */
/* TRADE OFFERS GRID — SIDE BY SIDE */
.trade-offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-top: 12px;
}

.trade-offer-card {
  background: linear-gradient(135deg, rgba(96,165,250,0.07) 0%, var(--surface) 100%);
  border: 2px solid rgba(96,165,250,0.35);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.2s;
  box-shadow: 0 0 18px rgba(96,165,250,0.06), var(--shadow-md);
}

.trade-offer-card:hover {
  border-color: rgba(96,165,250,0.6);
  transform: translateY(-2px);
  box-shadow: 0 0 28px rgba(96,165,250,0.15), var(--shadow-lg);
}

.trade-offer-card.winner {
  border-color: var(--gold);
  background: linear-gradient(135deg, rgba(255,201,64,0.1) 0%, var(--surface) 100%);
  box-shadow: 0 0 32px var(--gold-glow), var(--shadow-lg);
}

.trade-offer-header {
  padding: 14px 18px;
  background: rgba(96,165,250,0.1);
  border-bottom: 2px solid rgba(96,165,250,0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.trade-offer-card.winner .trade-offer-header {
  background: rgba(255,201,64,0.12);
  border-bottom-color: rgba(255,201,64,0.3);
}

.trade-offer-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--text);
}

/* OFFER STEPPER NAV (kept for legacy but now hidden in grid view) */
.offer-nav {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.offer-nav-btn {
  width: 34px; height: 34px;
  border-radius: 6px;
  border: 1px solid var(--border-bright);
  background: var(--surface);
  color: var(--text-dim);
  font-size: 16px;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: all 0.15s;
  flex-shrink: 0;
}

.offer-nav-btn:hover:not(:disabled) { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
.offer-nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }

.offer-nav-dots {
  display: flex;
  gap: 6px;
  align-items: center;
}

.offer-nav-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--border-bright);
  cursor: pointer;
  transition: all 0.15s;
  border: none;
  padding: 0;
}

.offer-nav-dot.active { background: var(--gold); transform: scale(1.2); }
.offer-nav-dot:hover { background: rgba(240,192,64,0.5); }

.score-ring {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 2px solid var(--border-bright);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: var(--font-display);
  font-size: 17px;
  font-weight: 700;
  color: var(--text-dim);
  transition: all 0.3s;
}

.score-ring.high { border-color: var(--gold); color: var(--gold); background: var(--gold-dim); }
.score-ring.med { border-color: rgba(64,144,240,0.5); color: var(--blue); background: rgba(64,144,240,0.1); }
.score-ring.low { border-color: rgba(232,64,64,0.4); color: var(--red); background: rgba(232,64,64,0.08); }

.trade-offer-body { padding: 16px 18px; }

.item-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 7px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  gap: 8px;
}

.item-line:last-child { border-bottom: none; }

.item-line-name {
  font-size: 13px;
  color: var(--text);
  flex: 1;
}

.item-line-type {
  font-family: var(--font-mono);
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 3px;
  background: rgba(255,255,255,0.05);
  color: var(--text-dim);
  border: 1px solid var(--border);
}

.item-line-val {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--gold);
  min-width: 55px;
  text-align: right;
}

.add-item-area {
  padding: 12px 18px 16px;
  border-top: 1px solid var(--border);
  display: flex;
  gap: 8px;
}

/* AI ANALYSIS */
.analysis-box {
  margin-top: 20px;
  background: var(--surface);
  border: 1px solid var(--border-bright);
  border-radius: 8px;
  overflow: hidden;
}

.analysis-header {
  padding: 14px 20px;
  background: linear-gradient(90deg, rgba(240,192,64,0.1) 0%, transparent 100%);
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 10px;
}

.analysis-header-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--gold);
}

.analysis-body {
  padding: 20px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);
  font-family: var(--font-body);
}

.analysis-body p + p { margin-top: 12px; }

.verdict-row {
  display: flex;
  gap: 12px;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  flex-wrap: wrap;
}

.verdict-card {
  flex: 1;
  min-width: 160px;
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 6px;
  padding: 14px;
  text-align: center;
}

.verdict-card.top { border-color: rgba(240,192,64,0.4); background: rgba(240,192,64,0.05); }

.verdict-rank {
  font-family: var(--font-display);
  font-size: 32px;
  font-weight: 700;
  color: var(--gold);
  line-height: 1;
}

.verdict-name {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-dim);
  margin-top: 4px;
  letter-spacing: 1px;
}

.verdict-reason {
  font-size: 12px;
  color: var(--text-dim);
  margin-top: 6px;
  line-height: 1.5;
}

/* LOADING */
.pulse-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--gold);
  animation: pulse 1.2s ease-in-out infinite;
  margin: 0 2px;
}
.pulse-dot:nth-child(2) { animation-delay: 0.2s; }
.pulse-dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes pulse {
  0%, 100% { opacity: 0.2; transform: scale(0.8); }
  50% { opacity: 1; transform: scale(1); }
}

.shimmer {
  background: linear-gradient(90deg, var(--surface) 0%, var(--surface2) 50%, var(--surface) 100%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 4px;
  height: 14px;
}
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

/* FILTER BAR */
.filter-bar {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin-bottom: 16px;
  align-items: center;
}

.filter-chip {
  padding: 5px 12px;
  border-radius: 4px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.15s;
}

.filter-chip:hover { border-color: var(--border-bright); color: var(--text); }
.filter-chip.active { background: var(--gold-dim); border-color: rgba(240,192,64,0.4); color: var(--gold); }

.search-input-wrap { position: relative; flex: 1; min-width: 200px; }
.search-input-wrap .search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
  color: var(--text-faint); font-size: 14px; pointer-events: none;
}
.search-input-wrap .input { padding-left: 34px; }

/* EMPTY STATE */
.empty {
  text-align: center;
  padding: 60px 20px;
  color: var(--text-faint);
}
.empty-icon { font-size: 48px; margin-bottom: 16px; opacity: 0.4; }
.empty-title { font-family: var(--font-display); font-size: 22px; font-weight: 600; letter-spacing: 2px; text-transform: uppercase; color: var(--text-dim); margin-bottom: 8px; }
.empty-sub { font-size: 14px; line-height: 1.6; }

/* DIVIDER */
.divider { height: 1px; background: var(--border); margin: 24px 0; }

/* TEXT */
.text-gold { color: var(--gold); }
.text-green { color: var(--green); }
.text-red { color: var(--red); }
.text-dim { color: var(--text-dim); }
.text-mono { font-family: var(--font-mono); }
.text-sm { font-size: 13px; }
.text-xs { font-size: 11px; }
.bold { font-weight: 600; }

/* FOCUS SELECTOR */
.focus-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
.focus-chip {
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-dim);
  font-family: var(--font-body);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s;
  display: flex; align-items: center; gap: 8px;
}
.focus-chip:hover { border-color: var(--border-bright); color: var(--text); }
.focus-chip.active { border-color: rgba(240,192,64,0.5); background: var(--gold-dim); color: var(--gold); }
.focus-chip .chip-count { font-family: var(--font-mono); font-size: 11px; color: inherit; opacity: 0.7; }

/* TAG */
.tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  background: rgba(255,255,255,0.05);
  border: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text);
}
.tag .remove-tag {
  cursor: pointer; color: var(--text-faint); font-size: 14px; line-height: 1;
  transition: color 0.15s;
}
.tag .remove-tag:hover { color: var(--red); }

/* YOUR ITEMS BOX */
.your-items-box {
  background: linear-gradient(135deg, rgba(74,222,128,0.08) 0%, var(--surface) 100%);
  border: 2px solid rgba(74,222,128,0.4);
  border-radius: 12px;
  padding: 20px 22px;
  margin-bottom: 24px;
  box-shadow: 0 0 24px rgba(74,222,128,0.08), var(--shadow-md);
}

.your-items-box-header {
  font-family: var(--font-display);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--green);
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  text-shadow: 0 0 12px var(--green-glow);
}

/* TRADE RATE — COMPACT */
.rate-panel {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.rate-panel-toggle {
  padding: 10px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.rate-panel-toggle:hover { background: rgba(255,255,255,0.02); }

.rate-panel-toggle-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rate-panel-toggle-title {
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-dim);
}

.rate-pills {
  display: flex;
  gap: 6px;
}

.rate-pill {
  padding: 2px 10px;
  border-radius: 20px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
}

.rate-pill.my { background: rgba(64,200,120,0.12); color: var(--green); border: 1px solid rgba(64,200,120,0.2); }
.rate-pill.their { background: rgba(64,144,240,0.1); color: var(--blue); border: 1px solid rgba(64,144,240,0.15); }

.rate-chevron {
  color: var(--text-faint);
  font-size: 12px;
  transition: transform 0.2s;
}
.rate-chevron.open { transform: rotate(180deg); }

.rate-panel-body {
  border-top: 1px solid var(--border);
  padding: 16px;
}

.rate-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
@media (max-width: 580px) { .rate-cols { grid-template-columns: 1fr; } }

.rate-side-label {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-bottom: 6px;
}

.rate-display {
  font-family: var(--font-display);
  font-size: 28px;
  font-weight: 700;
  line-height: 1;
  margin-bottom: 6px;
  transition: color 0.2s;
}

.rate-display.full { color: var(--green); }
.rate-display.good { color: var(--gold); }
.rate-display.low { color: var(--red); }

.rate-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background: var(--border-bright);
  outline: none;
  margin-bottom: 8px;
  cursor: pointer;
}

.rate-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: var(--gold);
  cursor: pointer;
  transition: transform 0.15s;
}

.rate-slider::-webkit-slider-thumb:hover { transform: scale(1.2); }

.rate-presets { display: flex; gap: 5px; flex-wrap: wrap; }

.rate-preset {
  padding: 3px 8px;
  border-radius: 3px;
  border: 1px solid var(--border);
  background: transparent;
  color: var(--text-dim);
  font-family: var(--font-mono);
  font-size: 10px;
  cursor: pointer;
  transition: all 0.15s;
}

.rate-preset:hover { border-color: var(--border-bright); color: var(--text); }
.rate-preset.active { background: var(--gold-dim); border-color: rgba(240,192,64,0.4); color: var(--gold); }

.rate-math {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rate-math-block {
  flex: 1;
  min-width: 110px;
  background: var(--surface2);
  border-radius: 6px;
  padding: 8px 12px;
  border: 1px solid var(--border);
}

.rate-math-val {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--text);
  line-height: 1;
}

.rate-math-lbl {
  font-family: var(--font-mono);
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-faint);
  margin-top: 3px;
}

.rate-math-arrow { color: var(--text-faint); font-size: 16px; }

.delta-positive { color: var(--green); }
.delta-negative { color: var(--red); }
.delta-zero { color: var(--text-dim); }

/* COLLECTION GRID */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.collection-card {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.collection-card:hover { border-color: rgba(240,192,64,0.4); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.collection-card.have { border-left: 3px solid var(--green); }
.collection-card.want { border-left: 3px solid var(--gold); }

.collection-card-img {
  width: 100%;
  display: block;
  aspect-ratio: 3/4;
  object-fit: cover;
  background: var(--surface);
}

.collection-card-img-placeholder {
  width: 100%;
  aspect-ratio: 3/4;
  background: linear-gradient(135deg, var(--surface) 0%, var(--surface2) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  color: var(--text-faint);
}

.collection-card-info { padding: 10px; }
.collection-card-name { font-size: 12px; font-weight: 500; color: var(--text); line-height: 1.3; margin-bottom: 3px; }
.collection-card-set { font-family: var(--font-mono); font-size: 10px; color: var(--text-faint); margin-bottom: 4px; }
.collection-card-bottom { display: flex; justify-content: space-between; align-items: center; gap: 6px; margin-top: 6px; }
.collection-card-price { font-family: var(--font-mono); font-size: 11px; color: var(--gold); font-weight: 500; }

.collection-card-status-badge {
  position: absolute;
  top: 6px; right: 6px;
  padding: 2px 7px;
  border-radius: 3px;
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.collection-card-status-badge.have { background: rgba(64,200,120,0.92); color: #080c10; }
.collection-card-status-badge.want { background: rgba(240,192,64,0.92); color: #080c10; }

.collection-card-remove {
  position: absolute;
  top: 6px; left: 6px;
  width: 22px; height: 22px;
  border-radius: 50%;
  background: rgba(8,12,16,0.85);
  border: 1px solid var(--border);
  color: var(--text-dim);
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.15s;
}

.collection-card:hover .collection-card-remove { opacity: 1; }
.collection-card-remove:hover { background: rgba(232,64,64,0.9); color: #fff; }

.collection-card.have .collection-card-img { opacity: 1; }
.collection-card.want { background: rgba(240,192,64,0.03); }
.api-search-results {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 10px;
  margin-top: 12px;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 4px;
}

.api-card-result {
  background: var(--surface2);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.15s;
  position: relative;
}

.api-card-result:hover { border-color: rgba(240,192,64,0.5); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.api-card-result.already-have { opacity: 0.4; pointer-events: none; }

.api-card-img { width: 100%; display: block; aspect-ratio: 3/4; object-fit: cover; background: var(--surface); }
.api-card-img-placeholder { width: 100%; aspect-ratio: 3/4; background: var(--surface); display: flex; align-items: center; justify-content: center; color: var(--text-faint); font-size: 28px; }

.api-card-info { padding: 8px; }
.api-card-name { font-size: 11px; font-weight: 500; color: var(--text); line-height: 1.3; margin-bottom: 2px; }
.api-card-set { font-family: var(--font-mono); font-size: 9px; color: var(--text-faint); }
.api-card-price { font-family: var(--font-mono); font-size: 11px; color: var(--gold); margin-top: 3px; }

.api-card-badge {
  position: absolute;
  top: 5px; right: 5px;
  background: rgba(64,200,120,0.9);
  color: #080c10;
  font-size: 9px;
  font-weight: 700;
  padding: 2px 5px;
  border-radius: 3px;
  font-family: var(--font-mono);
}

.api-card-add-overlay {
  position: absolute;
  inset: 0;
  background: rgba(240,192,64,0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.15s;
  font-size: 28px;
}

.api-card-result:hover .api-card-add-overlay { opacity: 1; }

/* SEARCH/ADD PANEL — TOP OF COLLECTION */
.search-add-panel {
  background: linear-gradient(135deg, rgba(255,201,64,0.06) 0%, var(--surface) 100%);
  border: 2px solid rgba(255,201,64,0.3);
  border-radius: 12px;
  padding: 20px 22px;
  margin-bottom: 20px;
  box-shadow: 0 0 24px rgba(255,201,64,0.06), var(--shadow-md);
}

.search-add-header {
  display: flex; align-items: center; gap: 8px;
  margin-bottom: 14px;
}

.search-add-title {
  font-family: var(--font-display);
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--gold);
  text-shadow: 0 0 10px var(--gold-glow);
}

/* CONDITION PILL */
.condition-pill {
  background: rgba(192,132,252,0.15);
  border: 1px solid rgba(192,132,252,0.4);
  border-radius: 4px;
  color: var(--purple);
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 700;
  padding: 2px 6px;
  cursor: pointer;
  outline: none;
  transition: all 0.15s;
}
.condition-pill:hover { background: rgba(192,132,252,0.25); border-color: var(--purple); }
.condition-pill option { background: #1a2533; color: var(--text); }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
`;

// ── MOCK DATA ──────────────────────────────────────────────────────────────────

const MOCK_COLLECTION = [
  { id: "c1", name: "Charizard VMAX 074/073", set: "Champion's Path", type: "Rainbow Rare", value: 174.18, condition: "NM", status: "have", focus: "Charizard" },
  { id: "c2", name: "Charizard ex 223/197", set: "Obsidian Flames", type: "Special Illustration Rare", value: 109.46, condition: "NM", status: "have", focus: "Charizard" },
  { id: "c3", name: "Charizard 6/108", set: "EX Power Keepers", type: "Reverse Holo", value: 144.84, condition: "LP", status: "have", focus: "Charizard" },
  { id: "c4", name: "Charizard-EX 100/106", set: "Flashfire", type: "Ultra Rare", value: 266.08, condition: "NM", status: "have", focus: "Charizard" },
  { id: "c5", name: "Charizard 146/144", set: "Skyridge", type: "Secret Rare", value: 2524.86, condition: "NM", status: "have", focus: "Charizard" },
  { id: "c6", name: "Pikachu 049/203", set: "Evolving Skies", type: "Reverse Holo", value: 0.60, condition: "NM", status: "have", focus: "Pikachu" },
  { id: "c7", name: "Pikachu ex 063/193", set: "Paldea Evolved", type: "Double Rare", value: 4.17, condition: "NM", status: "have", focus: "Pikachu" },
  { id: "c8", name: "Pikachu 065/202", set: "Sword & Shield Base", type: "Reverse Holo", value: 1.26, status: "have", focus: "Pikachu" },
  { id: "c9", name: "Mimikyu 97/149", set: "Sun & Moon Base", type: "Holo Rare", value: 18.50, status: "have", focus: "Mimikyu" },
  { id: "c10", name: "Mimikyu VMAX 115/264", set: "Fusion Strike", type: "Rare Holo V", value: 12.00, status: "have", focus: "Mimikyu" },
];

const MOCK_WANTS = [
  { id: "w1", name: "Charizard 4/102", set: "Base Set", type: "Holo Rare", value: 380.00, status: "want", focus: "Charizard" },
  { id: "w2", name: "Charizard 3/110", set: "Legendary Collection", type: "Reverse Holo", value: 1110.97, status: "want", focus: "Charizard" },
  { id: "w3", name: "Shining Charizard 107/105", set: "Neo Destiny 1st Ed.", type: "Secret Rare", value: 2067.48, status: "want", focus: "Charizard" },
  { id: "w4", name: "Charizard-EX XY121", set: "XY Black Star Promos", type: "Promo", value: 163.31, status: "want", focus: "Charizard" },
  { id: "w5", name: "Surfing Pikachu V 021/028 (JP)", set: "25th Anniversary Collection", type: "Double Rare", value: 6.64, status: "want", focus: "Pikachu" },
  { id: "w6", name: "Ash's Pikachu SM112", set: "SM Black Star Promos", type: "Promo", value: 28.00, status: "want", focus: "Pikachu" },
  { id: "w7", name: "Flying Pikachu V 006/025", set: "25th Anniversary Collection", type: "Ultra Rare", value: 22.00, status: "want", focus: "Pikachu" },
  { id: "w8", name: "Mimikyu ex 250/193", set: "Paldea Evolved", type: "Special Illustration Rare", value: 35.00, status: "want", focus: "Mimikyu" },
  { id: "w9", name: "Mimikyu 097/189", set: "Darkness Ablaze", type: "Rare Holo", value: 8.50, status: "want", focus: "Mimikyu" },
];

const FOCUSES = ["All", "Charizard", "Pikachu", "Mimikyu"];

const ITEM_TYPES = ["Card", "Sealed Pack", "Booster Box", "ETB", "Slab (PSA)", "Slab (BGS)", "Bundle"];

// ── HELPERS ────────────────────────────────────────────────────────────────────

function scoreClass(s) {
  if (s >= 75) return "high";
  if (s >= 50) return "med";
  return "low";
}

function LoadingDots() {
  return <span style={{display:'inline-flex',alignItems:'center',gap:0}}>
    <span className="pulse-dot"/><span className="pulse-dot"/><span className="pulse-dot"/>
  </span>;
}

// ── COLLECTION TRACKER ────────────────────────────────────────────────────────

function CollectionTracker({ onSendToTrade }) {
  const [allCards, setAllCards] = useState([...MOCK_COLLECTION, ...MOCK_WANTS]);
  const [activeFocus, setActiveFocus] = useState("All");
  const [filterStatus, setFilterStatus] = useState("all");
  const [search, setSearch] = useState("");
  const [showMode, setShowMode] = useState(false);
  const [showQuery, setShowQuery] = useState("");
  const [showResult, setShowResult] = useState(null);
  const showInputRef = useRef(null);

  // API card search
  const [apiSearch, setApiSearch] = useState("");
  const [apiResults, setApiResults] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [addStatus, setAddStatus] = useState("have");
  const [addFocus, setAddFocus] = useState("Other");
  const [addCondition, setAddCondition] = useState("NM");
  const searchTimeout = useRef(null);

  const CONDITIONS = ["NM", "LP", "MP", "HP", "DMG"];
  const CONDITION_MULT = { NM: 1.0, LP: 0.85, MP: 0.65, HP: 0.45, DMG: 0.25 };
  const CONDITION_LABEL = { NM: "Near Mint", LP: "Lightly Played", MP: "Moderately Played", HP: "Heavily Played", DMG: "Damaged" };

  async function searchCards(q) {
    if (!q.trim()) { setApiResults([]); return; }
    setApiLoading(true);
    setApiError("");
    try {
      const res = await fetch(`https://api.pokemontcg.io/v2/cards?q=name:"${encodeURIComponent(q)}"&pageSize=20&orderBy=-set.releaseDate`);
      const data = await res.json();
      setApiResults(data.data || []);
    } catch (e) {
      setApiError("Search failed — check your connection");
    }
    setApiLoading(false);
  }

  function handleApiSearchChange(e) {
    const q = e.target.value;
    setApiSearch(q);
    clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => searchCards(q), 500);
  }

  function addFromApi(card) {
    const tcgPrice = card.tcgplayer?.prices;
    const nmPrice = tcgPrice
      ? (tcgPrice.holofoil?.market || tcgPrice.normal?.market || tcgPrice.reverseHolofoil?.market || tcgPrice["1stEditionHolofoil"]?.market || 0)
      : 0;
    const priceVal = nmPrice * (CONDITION_MULT[addCondition] || 1);
    const newCard = {
      id: `api-${card.id}-${addCondition}`,
      name: `${card.name} ${card.number}/${card.set?.printedTotal || card.set?.total || "?"}`,
      set: card.set?.name || "Unknown Set",
      type: card.rarity || "—",
      value: priceVal,
      condition: addCondition,
      status: addStatus,
      focus: addFocus || card.name,
      image: card.images?.small,
    };
    setAllCards(prev => {
      if (prev.find(c => c.id === newCard.id)) return prev;
      return [...prev, newCard];
    });
  }

  const filtered = allCards.filter(c => {
    const focusMatch = activeFocus === "All" || c.focus === activeFocus;
    const statusMatch = filterStatus === "all" || c.status === filterStatus;
    const searchMatch = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.set.toLowerCase().includes(search.toLowerCase());
    return focusMatch && statusMatch && searchMatch;
  });

  const haveCount = allCards.filter(c => (activeFocus === "All" || c.focus === activeFocus) && c.status === "have").length;
  const wantCount = allCards.filter(c => (activeFocus === "All" || c.focus === activeFocus) && c.status === "want").length;
  const totalVal = allCards.filter(c => (activeFocus === "All" || c.focus === activeFocus) && c.status === "have").reduce((s,c) => s + c.value, 0);

  function toggleStatus(id) {
    setAllCards(prev => prev.map(c => c.id === id ? { ...c, status: c.status === "have" ? "want" : "have" } : c));
  }

  function updateCondition(id, newCondition) {
    setAllCards(prev => prev.map(c => {
      if (c.id !== id) return c;
      const oldMult = CONDITION_MULT[c.condition || "NM"] || 1;
      const newMult = CONDITION_MULT[newCondition] || 1;
      const nmPrice = c.value / oldMult;
      return { ...c, condition: newCondition, value: nmPrice * newMult };
    }));
  }

  function removeCard(id) {
    setAllCards(prev => prev.filter(c => c.id !== id));
  }

  function doShowSearch() {
    const q = showQuery.trim().toLowerCase();
    if (!q) return;
    const match = allCards.find(c => c.name.toLowerCase().includes(q) || c.set.toLowerCase().includes(q));
    if (match) {
      setShowResult({ type: match.status, card: match });
    } else {
      setShowResult({ type: "unknown", card: null, query: showQuery });
    }
  }

  function sendWantsToTrade() {
    const wants = allCards.filter(c => c.status === "want" && (activeFocus === "All" || c.focus === activeFocus));
    onSendToTrade(wants);
  }

  return (
    <div>
      {/* SHOW MODE OVERLAY */}
      {showMode && (
        <div className="show-mode-overlay" onClick={e => { if (e.target === e.currentTarget) { setShowMode(false); setShowResult(null); setShowQuery(""); } }}>
          <div className="show-mode-panel">
            <div className="row-between" style={{marginBottom:4}}>
              <div className="show-mode-title">🎪 Show Mode</div>
              <button className="btn btn-ghost btn-sm" onClick={() => { setShowMode(false); setShowResult(null); setShowQuery(""); }}>✕ Exit</button>
            </div>
            <div className="text-dim text-sm" style={{marginBottom:20}}>Quick-check any card against your collection</div>

            <div className="row">
              <input
                ref={showInputRef}
                className="input flex-1"
                placeholder="Card name or set…"
                value={showQuery}
                onChange={e => { setShowQuery(e.target.value); setShowResult(null); }}
                onKeyDown={e => e.key === "Enter" && doShowSearch()}
                autoFocus
              />
              <button className="btn btn-gold" onClick={doShowSearch}>Check</button>
            </div>

            {showResult && (
              <div className={`show-result ${showResult.type}`}>
                <div className="show-result-icon">
                  {showResult.type === "have" ? "✅" : showResult.type === "want" ? "⭐" : "🔍"}
                </div>
                <div className={`show-result-label ${showResult.type}`}>
                  {showResult.type === "have" ? "Already Own It" : showResult.type === "want" ? "On Your Want List!" : "Not in Collection"}
                </div>
                {showResult.card && (
                  <div className="show-result-sub">
                    {showResult.card.name} · {showResult.card.set}<br/>
                    <span className="text-gold">${showResult.card.value.toFixed(2)}</span>
                  </div>
                )}
                {showResult.type === "unknown" && (
                  <div className="show-result-sub">"{showResult.query}" not found — add it?</div>
                )}
              </div>
            )}

            {/* WANT LIST PREVIEW */}
            <div style={{marginTop:24}}>
              <div className="label">Your Want List ({wantCount})</div>
              <div style={{maxHeight:220, overflowY:"auto", display:"flex", flexDirection:"column", gap:6}}>
                {allCards.filter(c => c.status === "want").map(c => (
                  <div key={c.id} className="card-item want" style={{padding:"8px 12px"}}>
                    <div style={{flex:1}}>
                      <div className="card-item-name" style={{fontSize:13}}>{c.name}</div>
                      <div className="card-item-meta">{c.set}</div>
                    </div>
                    <div className="card-item-price">${c.value.toFixed(2)}</div>
                  </div>
                ))}
                {allCards.filter(c => c.status === "want").length === 0 && (
                  <div className="text-dim text-sm" style={{padding:"12px 0", textAlign:"center"}}>No want list items</div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FOCUS SELECTOR */}
      <div className="focus-header">
        <div className="row-between" style={{flexWrap:"wrap", gap:12}}>
          <div>
            <div className="label">Collection Focus</div>
            <div className="focus-name">{activeFocus === "All" ? "All Pokémon" : activeFocus}</div>
          </div>
          <div className="row" style={{gap:8, flexWrap:"wrap"}}>
            <button className="btn btn-ghost" onClick={() => setShowMode(true)}>🎪 Show Mode</button>
            <button className="btn btn-gold btn-sm" onClick={sendWantsToTrade}>Send Wants → Trade Advisor</button>
          </div>
        </div>

        <div className="focus-chips">
          {["All", "Charizard", "Pikachu", "Mimikyu"].map(f => {
            const count = allCards.filter(c => (f === "All" || c.focus === f) && c.status === "want").length;
            return (
              <button key={f} className={`focus-chip ${activeFocus === f ? "active" : ""}`} onClick={() => setActiveFocus(f)}>
                {f}
                {f !== "All" && <span className="chip-count">{count} want</span>}
              </button>
            );
          })}
        </div>

        <div className="stats-row">
          <div className="stat">
            <div className="stat-val green">{haveCount}</div>
            <div className="stat-lbl">Owned</div>
          </div>
          <div className="stat">
            <div className="stat-val gold">{wantCount}</div>
            <div className="stat-lbl">Wanted</div>
          </div>
          <div className="stat">
            <div className="stat-val dim">${totalVal.toLocaleString("en-US", {minimumFractionDigits:2, maximumFractionDigits:2})}</div>
            <div className="stat-lbl">Collection Value</div>
          </div>
        </div>
      </div>

      {/* SEARCH & ADD CARDS — UP TOP NOW */}
      <div className="search-add-panel">
        <div className="search-add-header">
          <span style={{fontSize:18}}>🔍</span>
          <div className="search-add-title">Search & Add Cards</div>
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, alignItems:"center"}}>
          <div style={{position:"relative"}}>
            <span style={{position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", color:"var(--text-faint)", fontSize:13, pointerEvents:"none"}}>🔍</span>
            <input
              className="input"
              style={{paddingLeft:34}}
              placeholder="Search any Pokémon card… (e.g. Charizard, Mimikyu)"
              value={apiSearch}
              onChange={handleApiSearchChange}
            />
          </div>
          <select className="input" value={addFocus} onChange={e => setAddFocus(e.target.value)} style={{width:"auto"}} title="Focus group">
            {["Charizard","Pikachu","Mimikyu","Other"].map(f => <option key={f}>{f}</option>)}
          </select>
          <select className="input" value={addCondition} onChange={e => setAddCondition(e.target.value)} style={{width:"auto"}} title="Condition">
            {CONDITIONS.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="input" value={addStatus} onChange={e => setAddStatus(e.target.value)} style={{width:"auto"}}>
            <option value="have">Have</option>
            <option value="want">Want</option>
          </select>
        </div>

        <div style={{marginTop:8, fontSize:11, color:"var(--text-faint)", fontFamily:"var(--font-mono)"}}>
          Adding as: <span style={{color: addStatus === "have" ? "var(--green)" : "var(--gold)"}}>{addStatus === "have" ? "✅ Have" : "⭐ Want"}</span> · {CONDITION_LABEL[addCondition]} ({Math.round(CONDITION_MULT[addCondition]*100)}% of NM price)
        </div>

        {apiLoading && (
          <div style={{textAlign:"center", padding:"20px 0", color:"var(--text-dim)", fontFamily:"var(--font-mono)", fontSize:12}}>
            Searching <LoadingDots />
          </div>
        )}

        {apiError && (
          <div style={{color:"var(--red)", fontSize:12, marginTop:10, fontFamily:"var(--font-mono)"}}>{apiError}</div>
        )}

        {apiResults.length > 0 && (
          <>
            <div className="label" style={{marginTop:14, marginBottom:0}}>
              {apiResults.length} results — click a card to add
            </div>
            <div className="api-search-results">
              {apiResults.map(card => {
                const alreadyHave = allCards.some(c => c.id === `api-${card.id}-${addCondition}`);
                const tcgPrice = card.tcgplayer?.prices;
                const nmPrice = tcgPrice
                  ? (tcgPrice.holofoil?.market || tcgPrice.normal?.market || tcgPrice.reverseHolofoil?.market || tcgPrice["1stEditionHolofoil"]?.market || null)
                  : null;
                const adjPrice = nmPrice ? nmPrice * CONDITION_MULT[addCondition] : null;
                return (
                  <div
                    key={card.id}
                    className={`api-card-result ${alreadyHave ? "already-have" : ""}`}
                    onClick={() => !alreadyHave && addFromApi(card)}
                    title={`${card.name} · ${card.set?.name}`}
                  >
                    {card.images?.small
                      ? <img src={card.images.small} alt={card.name} className="api-card-img" loading="lazy" />
                      : <div className="api-card-img-placeholder">🃏</div>
                    }
                    <div className="api-card-add-overlay">{addStatus === "have" ? "✅" : "⭐"}</div>
                    {alreadyHave && <div className="api-card-badge">ADDED</div>}
                    <div className="api-card-info">
                      <div className="api-card-name">{card.name} {card.number}/{card.set?.printedTotal || card.set?.total}</div>
                      <div className="api-card-set">{card.set?.name}</div>
                      {adjPrice !== null
                        ? <div className="api-card-price">${adjPrice.toFixed(2)} <span style={{color:"var(--text-faint)", fontSize:9}}>({addCondition})</span></div>
                        : <div className="api-card-price" style={{color:"var(--text-faint)"}}>No price</div>
                      }
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {!apiLoading && apiSearch && apiResults.length === 0 && (
          <div style={{textAlign:"center", padding:"20px 0", color:"var(--text-faint)", fontSize:13}}>No cards found for "{apiSearch}"</div>
        )}
      </div>

      <div className="divider" />

      {/* COLLECTION FILTER + LIST */}
      <div className="filter-bar">
        <div className="search-input-wrap" style={{maxWidth:300}}>
          <span className="search-icon">🔍</span>
          <input className="input" placeholder="Filter your collection…" value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        {["all","have","want"].map(s => (
          <button key={s} className={`filter-chip ${filterStatus === s ? "active" : ""}`} onClick={() => setFilterStatus(s)}>
            {s === "all" ? "All" : s === "have" ? "✅ Have" : "⭐ Want"}
          </button>
        ))}
      </div>

      {/* CARD GRID WITH IMAGES */}
      {filtered.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">🃏</div>
          <div className="empty-title">No Cards Yet</div>
          <div className="empty-sub">Use the search above to add cards to your collection</div>
        </div>
      ) : (
        <div className="collection-grid">
          {filtered.map(c => (
            <div key={c.id} className={`collection-card ${c.status}`} onClick={() => toggleStatus(c.id)}>
              {c.image
                ? <img src={c.image} alt={c.name} className="collection-card-img" loading="lazy" />
                : <div className="collection-card-img-placeholder">🃏</div>
              }
              <div className={`collection-card-status-badge ${c.status}`}>
                {c.status === "have" ? "✓ HAVE" : "★ WANT"}
              </div>
              <button className="collection-card-remove" onClick={e => { e.stopPropagation(); removeCard(c.id); }}>✕</button>
              <div className="collection-card-info">
                <div className="collection-card-name">{c.name}</div>
                <div className="collection-card-set">{c.set}</div>
                <div className="collection-card-bottom">
                  {c.condition && (
                    <select
                      value={c.condition}
                      onClick={e => e.stopPropagation()}
                      onChange={e => updateCondition(c.id, e.target.value)}
                      className="condition-pill"
                      title={CONDITION_LABEL[c.condition]}
                    >
                      {CONDITIONS.map(cd => <option key={cd} value={cd}>{cd}</option>)}
                    </select>
                  )}
                  <div className="collection-card-price">${c.value.toFixed(2)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── TRADE ADVISOR ─────────────────────────────────────────────────────────────

const EMPTY_OFFER = (n) => ({ id: `offer-${n}`, label: `Offer ${n}`, items: [] });

function TradeAdvisor({ injectedWants }) {
  const [myItems, setMyItems] = useState([
    { id: "my1", name: "Charizard-GX SV49/SV94", type: "Card", value: 624 },
  ]);
  const [myName, setMyName] = useState(""); const [myType, setMyType] = useState("Card"); const [myVal, setMyVal] = useState("");

  const [offers, setOffers] = useState([
    {
      id: "offer-1", label: "Offer 1",
      items: [
        { id: "o1a", name: "Charizard 4/102 Base Set", type: "Card", value: 380 },
        { id: "o1b", name: "Pikachu Promo SM112", type: "Card", value: 244 },
      ]
    },
    {
      id: "offer-2", label: "Offer 2",
      items: [
        { id: "o2a", name: "Scarlet & Violet ETB", type: "ETB", value: 420 },
        { id: "o2b", name: "151 Booster Bundle", type: "Sealed Pack", value: 204 },
      ]
    },
    {
      id: "offer-3", label: "Offer 3",
      items: [
        { id: "o3a", name: "PSA 9 Charizard ex 223/197", type: "Slab (PSA)", value: 624 },
      ]
    },
  ]);

  const [offerInputs, setOfferInputs] = useState({});
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [wantBanner, setWantBanner] = useState(null);
  const [myRate, setMyRate] = useState(80);
  const [theirRate, setTheirRate] = useState(100);
  const MY_PRESETS = [70, 75, 80, 85, 90, 100];
  const THEIR_PRESETS = [80, 85, 90, 95, 100];
  const [activeOfferIdx, setActiveOfferIdx] = useState(0);
  const [rateOpen, setRateOpen] = useState(false);

  useEffect(() => {
    if (injectedWants && injectedWants.length > 0) {
      setWantBanner(injectedWants);
    }
  }, [injectedWants]);

  function addMyItem() {
    if (!myName.trim()) return;
    setMyItems(prev => [...prev, { id: `my-${Date.now()}`, name: myName.trim(), type: myType, value: parseFloat(myVal) || 0 }]);
    setMyName(""); setMyVal("");
  }

  function removeMyItem(id) { setMyItems(p => p.filter(i => i.id !== id)); }

  function addOfferItem(offerId) {
    const inp = offerInputs[offerId] || {};
    if (!inp.name?.trim()) return;
    setOffers(prev => prev.map(o => o.id === offerId ? {
      ...o, items: [...o.items, { id: `item-${Date.now()}`, name: inp.name.trim(), type: inp.type || "Card", value: parseFloat(inp.value) || 0 }]
    } : o));
    setOfferInputs(prev => ({ ...prev, [offerId]: {} }));
  }

  function removeOfferItem(offerId, itemId) {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, items: o.items.filter(i => i.id !== itemId) } : o));
  }

  function addOffer() {
    setOffers(prev => {
      const next = [...prev, EMPTY_OFFER(prev.length + 1)];
      setActiveOfferIdx(next.length - 1);
      return next;
    });
  }

  function removeOffer(id) {
    setOffers(prev => {
      const next = prev.filter(o => o.id !== id);
      setActiveOfferIdx(i => Math.min(i, Math.max(0, next.length - 1)));
      return next;
    });
  }

  function updateOfferInput(offerId, field, val) {
    setOfferInputs(prev => ({ ...prev, [offerId]: { ...(prev[offerId] || {}), [field]: val } }));
  }

  const myTotal = myItems.reduce((s, i) => s + i.value, 0);
  const myAdjusted = myTotal * (myRate / 100);

  function offerAdjusted(offer) {
    return offer.items.reduce((s, i) => s + i.value, 0) * (theirRate / 100);
  }

  function rateColor(r) {
    if (r >= 100) return "full";
    if (r >= 85) return "good";
    return "low";
  }

  async function analyze() {
    if (offers.every(o => o.items.length === 0)) return;
    setLoading(true);
    setAnalysis(null);

    const wantsCtx = wantBanner ? `\nThe collector's active want list includes: ${wantBanner.map(w => w.name).join(", ")}.` : "";

    const rateCtx = `\nTrade rate context: The vendor is offering ${myRate}% trade credit on the collector's items (market value $${myTotal.toFixed(2)} → effective trade credit $${myAdjusted.toFixed(2)}). The vendor's items are priced at ${theirRate}% of market value. Net trade gap per offer is factored below.`;

    const prompt = `You are an expert Pokémon TCG trade advisor and market analyst with deep knowledge of 30 years of card price history.

A collector is trading away: ${myItems.map(i => `${i.name} (${i.type}, $${i.value})`).join(", ")}.
Market value: $${myTotal.toFixed(2)}. Effective trade credit at ${myRate}%: $${myAdjusted.toFixed(2)}.${rateCtx}${wantsCtx}

They have received ${offers.length} trade offer(s). For each offer the NET POSITION (adjusted credit minus adjusted offer value) is shown:

${offers.map((o, i) => {
  const offerFaceVal = o.items.reduce((s,x) => s + x.value, 0);
  const adjOffer = offerFaceVal * (theirRate / 100);
  const gap = myAdjusted - adjOffer;
  const gapStr = gap > 0.5 ? `collector owes $${gap.toFixed(2)} cash` : gap < -0.5 ? `collector receives $${Math.abs(gap).toFixed(2)} back` : "even trade";
  return `OFFER ${i+1} — ${o.label}:
${o.items.map(item => `  - ${item.name} (${item.type}, face $${item.value}, adjusted $${(item.value * theirRate/100).toFixed(2)})`).join("\n")}
  Face total: $${offerFaceVal.toFixed(2)} | Adjusted at ${theirRate}%: $${adjOffer.toFixed(2)} | Net: ${gapStr}`;
}).join("\n\n")}

Analyze each offer across these dimensions:
1. PRICE HISTORY & LIFECYCLE TRENDS — Full 30-year price trajectory where applicable. Identify spike/crash/recovery patterns, trend momentum.
2. REPRINT RISK — How likely is TPCi to reprint this? Set age, legal status, product history.
3. GRADING UPSIDE — PSA/BGS pop report logic. Is there grading potential that could 2-5x value?
4. COLLECTOR DEMAND — Fan favorite status, nostalgia cycle, community sentiment, iconic Pokémon premium.
5. TOURNAMENT/META — Competitive relevance driving price spikes vs. pure collectible demand.
6. TRADE RATE FAIRNESS — Factor in the ${myRate}% trade credit. Does the net gap make this offer better or worse than it appears at face value?

For EACH offer, give a SPECULATION SCORE out of 100 and a paragraph of analysis. Then give an overall RECOMMENDATION ranked 1st, 2nd, 3rd.

Format your response as JSON:
{
  "offers": [
    {
      "id": "offer-1",
      "score": 82,
      "analysis": "paragraph here",
      "keyRisk": "short risk summary",
      "keyUpside": "short upside summary"
    }
  ],
  "recommendation": {
    "rank1": "offer-1",
    "rank2": "offer-2",
    "rank3": "offer-3",
    "summary": "2-3 sentence overall verdict paragraph"
  }
}`;

    try {
      const res = await fetch("https://empty-term-1f24pokeedge-proxy.dlmgallant.workers.dev", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-haiku-4-5",
          max_tokens: 4000,
          messages: [{ role: "user", content: prompt }]
        })
      });
      const data = await res.json();
      const text = data.content.map(b => b.text || "").join("");
      // Extract JSON block — Haiku sometimes adds commentary after the JSON
      let clean = text.trim();
      // Try to find content inside ```json fences first
      const fenceMatch = clean.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (fenceMatch) {
        clean = fenceMatch[1].trim();
      } else {
        // Otherwise find the first { and the matching closing }
        const start = clean.indexOf("{");
        if (start !== -1) {
          let depth = 0;
          for (let i = start; i < clean.length; i++) {
            if (clean[i] === "{") depth++;
            else if (clean[i] === "}") {
              depth--;
              if (depth === 0) { clean = clean.slice(start, i + 1); break; }
            }
          }
        }
      }
      const parsed = JSON.parse(clean);
      setAnalysis(parsed);
    } catch (err) {
      setAnalysis({ error: "Analysis failed. Please try again." });
    }
    setLoading(false);
  }

  const offerAnalysis = (offerId) => analysis?.offers?.find(o => o.id === offerId);
  const rank = (offerId) => {
    if (!analysis?.recommendation) return null;
    const r = analysis.recommendation;
    if (r.rank1 === offerId) return 1;
    if (r.rank2 === offerId) return 2;
    if (r.rank3 === offerId) return 3;
    return null;
  };

  return (
    <div>
      {wantBanner && (
        <div style={{background:"rgba(240,192,64,0.07)", border:"1px solid rgba(240,192,64,0.25)", borderRadius:8, padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap"}}>
          <div>
            <span className="text-gold bold text-sm">⭐ Want list loaded from Collection — </span>
            <span className="text-dim text-sm">{wantBanner.length} cards. AI will prioritize trades that fill your gaps.</span>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={() => setWantBanner(null)}>✕ Clear</button>
        </div>
      )}

      {/* TRADE RATE PANEL — COMPACT COLLAPSIBLE */}
      <div className="rate-panel">
        <div className="rate-panel-toggle" onClick={() => setRateOpen(o => !o)}>
          <div className="rate-panel-toggle-left">
            <span style={{fontSize:14}}>📊</span>
            <span className="rate-panel-toggle-title">Trade Rates</span>
            <div className="rate-pills">
              <span className="rate-pill my">You {myRate}%</span>
              <span className="rate-pill their">Them {theirRate}%</span>
            </div>
          </div>
          <span className={`rate-chevron ${rateOpen ? "open" : ""}`}>▼</span>
        </div>

        {rateOpen && (
          <div className="rate-panel-body">
            <div className="rate-cols">
              <div>
                <div className="rate-side-label">Vendor credit on your cards</div>
                <div className={`rate-display ${rateColor(myRate)}`}>{myRate}%</div>
                <input type="range" min={50} max={100} step={1} value={myRate} onChange={e => setMyRate(Number(e.target.value))} className="rate-slider" />
                <div className="rate-presets">
                  {MY_PRESETS.map(p => <button key={p} className={`rate-preset ${myRate === p ? "active" : ""}`} onClick={() => setMyRate(p)}>{p}%</button>)}
                </div>
              </div>
              <div>
                <div className="rate-side-label">Their items — % of face value</div>
                <div className={`rate-display ${rateColor(theirRate)}`}>{theirRate}%</div>
                <input type="range" min={50} max={100} step={1} value={theirRate} onChange={e => setTheirRate(Number(e.target.value))} className="rate-slider" />
                <div className="rate-presets">
                  {THEIR_PRESETS.map(p => <button key={p} className={`rate-preset ${theirRate === p ? "active" : ""}`} onClick={() => setTheirRate(p)}>{p}%</button>)}
                </div>
              </div>
            </div>
            {myItems.length > 0 && (
              <div className="rate-math">
                <div className="rate-math-block">
                  <div className="rate-math-val">${myTotal.toFixed(2)}</div>
                  <div className="rate-math-lbl">Face value</div>
                </div>
                <div className="rate-math-arrow">→</div>
                <div className="rate-math-block" style={{borderColor: myRate < 100 ? "rgba(240,192,64,0.3)" : "var(--border)"}}>
                  <div className="rate-math-val text-gold">${myAdjusted.toFixed(2)}</div>
                  <div className="rate-math-lbl">Your credit ({myRate}%)</div>
                </div>
                <div className="rate-math-arrow">vs</div>
                {offers.map(offer => {
                  const adjVal = offerAdjusted(offer);
                  const delta = myAdjusted - adjVal;
                  const deltaClass = Math.abs(delta) < 1 ? "delta-zero" : delta > 0 ? "delta-negative" : "delta-positive";
                  const deltaLabel = Math.abs(delta) < 1 ? "Even" : delta > 0 ? `-$${delta.toFixed(2)}` : `+$${Math.abs(delta).toFixed(2)}`;
                  return (
                    <div key={offer.id} className="rate-math-block" style={{textAlign:"center"}}>
                      <div className={`rate-math-val ${deltaClass}`}>{deltaLabel}</div>
                      <div className="rate-math-lbl">{offer.label}</div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {/* YOUR ITEMS */}
      <div className="your-items-box">
        <div className="your-items-box-header">
          <span>↑</span> Your Items — Trading Away
        </div>
        <div style={{display:"flex", flexWrap:"wrap", gap:8, marginBottom:myItems.length ? 12 : 0}}>
          {myItems.map(item => (
            <div key={item.id} className="tag">
              <span>{item.name}</span>
              <span className="text-gold text-mono" style={{fontSize:11}}>${item.value}</span>
              <span className="badge badge-set" style={{fontSize:10, padding:"1px 5px"}}>{item.type}</span>
              <span className="remove-tag" onClick={() => removeMyItem(item.id)}>×</span>
            </div>
          ))}
        </div>
        <div style={{display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, alignItems:"center"}}>
          <input className="input" placeholder="Card / item name" value={myName} onChange={e => setMyName(e.target.value)} onKeyDown={e => e.key === "Enter" && addMyItem()} />
          <select className="input" value={myType} onChange={e => setMyType(e.target.value)} style={{width:"auto"}}>
            {ITEM_TYPES.map(t => <option key={t}>{t}</option>)}
          </select>
          <input className="input" placeholder="$Value" value={myVal} onChange={e => setMyVal(e.target.value)} style={{width:90}} type="number" />
          <button className="btn btn-gold" onClick={addMyItem} disabled={!myName.trim()}>+ Add</button>
        </div>
        {myItems.length > 0 && (
          <div className="mt-8" style={{textAlign:"right"}}>
            <span className="text-dim text-sm">Total: </span>
            <span className="text-gold text-mono bold">${myTotal.toFixed(2)}</span>
            {myRate < 100 && <span className="text-dim text-sm"> → <span className="text-green text-mono">${myAdjusted.toFixed(2)}</span> credit</span>}
          </div>
        )}
      </div>

      {/* OFFERS */}
      <div className="row-between mt-24" style={{marginBottom:14}}>
        <div className="label" style={{margin:0}}>Trade Offers ({offers.length})</div>
        <div className="row" style={{gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={addOffer}>+ Add Offer</button>
          <button className="btn btn-gold" onClick={analyze} disabled={loading || myItems.length === 0 || offers.every(o => o.items.length === 0)}>
            {loading ? <LoadingDots /> : "⚡ Analyze Trades"}
          </button>
        </div>
      </div>

      {/* OFFERS — ONE AT A TIME */}
      <div className="row-between mt-24" style={{marginBottom:12}}>
        <div className="label" style={{margin:0}}>Trade Offers</div>
        <div className="row" style={{gap:8}}>
          <button className="btn btn-ghost btn-sm" onClick={addOffer}>+ Add Offer</button>
          <button className="btn btn-gold" onClick={analyze} disabled={loading || myItems.length === 0 || offers.every(o => o.items.length === 0)}>
            {loading ? <LoadingDots /> : "⚡ Analyze All"}
          </button>
        </div>
      </div>

      {offers.length > 0 && (
        <div className="trade-offers-grid">
          {offers.map(offer => {
            const oa = offerAnalysis(offer.id);
            const r = rank(offer.id);
            const inp = offerInputs[offer.id] || {};
            const total = offer.items.reduce((s,i) => s + i.value, 0);
            const adjTotal = offerAdjusted(offer);
            const delta = myAdjusted - adjTotal;
            const deltaLabel = Math.abs(delta) < 1 ? "even" : delta > 0 ? `you owe $${delta.toFixed(2)}` : `+$${Math.abs(delta).toFixed(2)} back`;
            const deltaColor = Math.abs(delta) < 1 ? "var(--text-dim)" : delta > 0 ? "var(--red)" : "var(--green)";
            return (
              <div key={offer.id} className={`trade-offer-card ${r === 1 ? "winner" : ""}`}>
                <div className="trade-offer-header">
                  <div>
                    <div className="trade-offer-title">{offer.label}</div>
                    <div style={{display:"flex", gap:8, alignItems:"center", marginTop:2, flexWrap:"wrap"}}>
                      <span className="text-dim" style={{fontSize:12, fontFamily:"var(--font-mono)"}}>${total.toFixed(2)} face</span>
                      {theirRate < 100 && <span style={{fontSize:12, fontFamily:"var(--font-mono)", color:"var(--gold)"}}>→ ${adjTotal.toFixed(2)} adj.</span>}
                      {myItems.length > 0 && <span style={{fontSize:11, fontFamily:"var(--font-mono)", color:deltaColor}}>({deltaLabel})</span>}
                    </div>
                  </div>
                  <div className="row" style={{gap:8}}>
                    {oa && <div className={`score-ring ${scoreClass(oa.score)}`}>{oa.score}</div>}
                    {r && <span className="badge badge-want">#{r}</span>}
                    <button className="btn btn-danger btn-sm" onClick={() => removeOffer(offer.id)}>✕</button>
                  </div>
                </div>

                <div className="trade-offer-body">
                  {offer.items.length === 0 && (
                    <div className="text-dim text-sm" style={{padding:"8px 0"}}>No items yet — add below</div>
                  )}
                  {offer.items.map(item => (
                    <div key={item.id} className="item-line">
                      <span className="item-line-name">{item.name}</span>
                      <span className="item-line-type">{item.type}</span>
                      <span className="item-line-val">${item.value}</span>
                      <span style={{cursor:"pointer", color:"var(--text-faint)", fontSize:14}} onClick={() => removeOfferItem(offer.id, item.id)}>✕</span>
                    </div>
                  ))}
                  {oa && (
                    <div style={{marginTop:12, padding:"10px 12px", background:"var(--surface2)", borderRadius:6, border:"1px solid var(--border)"}}>
                      <div style={{fontSize:13, lineHeight:1.65, color:"var(--text-dim)"}}>{oa.analysis}</div>
                      <div className="row mt-8" style={{gap:8, flexWrap:"wrap"}}>
                        <div style={{flex:1, minWidth:120}}>
                          <div className="label" style={{marginBottom:3, fontSize:9}}>Key Upside</div>
                          <div className="text-green text-xs">{oa.keyUpside}</div>
                        </div>
                        <div style={{flex:1, minWidth:120}}>
                          <div className="label" style={{marginBottom:3, fontSize:9}}>Key Risk</div>
                          <div className="text-red text-xs">{oa.keyRisk}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="add-item-area">
                  <input className="input flex-1" placeholder="Add item to this offer…" value={inp.name || ""} onChange={e => updateOfferInput(offer.id, "name", e.target.value)} onKeyDown={e => e.key === "Enter" && addOfferItem(offer.id)} style={{fontSize:12}} />
                  <input className="input" placeholder="$" value={inp.value || ""} onChange={e => updateOfferInput(offer.id, "value", e.target.value)} style={{width:70, fontSize:12}} type="number" />
                  <button className="btn btn-ghost btn-sm" onClick={() => addOfferItem(offer.id)}>+</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* OVERALL VERDICT */}
      {analysis && !analysis.error && analysis.recommendation && (
        <div className="analysis-box mt-32">
          <div className="analysis-header">
            <span style={{fontSize:20}}>🧠</span>
            <div className="analysis-header-title">AI Verdict</div>
          </div>
          <div className="analysis-body">
            <p>{analysis.recommendation.summary}</p>
            <div className="verdict-row">
              {[analysis.recommendation.rank1, analysis.recommendation.rank2, analysis.recommendation.rank3].filter(Boolean).map((offerId, i) => {
                const o = offers.find(x => x.id === offerId);
                const oa = offerAnalysis(offerId);
                return (
                  <div key={offerId} className={`verdict-card ${i === 0 ? "top" : ""}`}>
                    <div className="verdict-rank">#{i+1}</div>
                    <div className="verdict-name">{o?.label || offerId}</div>
                    {oa && <div className="verdict-reason">Score: {oa.score}/100</div>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {analysis?.error && (
        <div style={{marginTop:20, padding:16, background:"rgba(232,64,64,0.08)", border:"1px solid rgba(232,64,64,0.2)", borderRadius:8, color:"var(--red)", fontSize:14}}>
          {analysis.error}
        </div>
      )}
    </div>
  );
}

// ── ROOT ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [tab, setTab] = useState("collection");
  const [injectedWants, setInjectedWants] = useState(null);

  function handleSendToTrade(wants) {
    setInjectedWants(wants);
    setTab("trade");
  }

  return (
    <>
      <style>{STYLES}</style>
      <div className="app">
        <nav className="nav">
          <div className="nav-brand">
            PokeEdge
            <span>TCG Trade Advisor</span>
          </div>
          <div className="nav-tabs">
            <button className={`nav-tab ${tab === "collection" ? "active" : ""}`} onClick={() => setTab("collection")}>Collection</button>
            <button className={`nav-tab ${tab === "trade" ? "active" : ""}`} onClick={() => setTab("trade")}>Trade Advisor</button>
          </div>
        </nav>
        <div className="main">
          {tab === "collection"
            ? <CollectionTracker onSendToTrade={handleSendToTrade} />
            : <TradeAdvisor injectedWants={injectedWants} />
          }
        </div>
      </div>
    </>
  );
}
