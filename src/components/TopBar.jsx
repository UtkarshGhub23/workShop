export default function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span className="brand-emoji">🤝</span>
          FRIENDSHIP<span className="brand-year">DAY</span>
        </div>
        <div className="seats-badge">
          <span className="pulse-dot"></span>
          38 / 60 spots filled
        </div>
      </div>
    </header>
  );
}
