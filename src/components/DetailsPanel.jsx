import { useEffect, useRef } from "react";

const AGENDA = [
  { time: "10:00 AM", title: "Welcome Circle & Warm Hugs", desc: "Ice-breakers, friendship bands exchange & group photos" },
  { time: "11:30 AM", title: "Memory Lane — Share Your Story", desc: "Open-mic stories of friendship, laughter & happy tears" },
  { time: "01:00 PM", title: "🍕 Friendship Feast", desc: "Potluck-style lunch with everyone's favorite dishes" },
  { time: "02:30 PM", title: "Creative Corner — Make Together", desc: "DIY friendship crafts, letter writing & art jam" },
  { time: "04:00 PM", title: "Games & Challenges", desc: "Team games, trivia nights & hilarious dares" },
  { time: "06:00 PM", title: "Golden Hour — Sunset Celebration", desc: "Music, bonfire vibes & the friendship pledge" },
];

const PERKS = [
  { icon: "heart", label: "Handmade friendship bands" },
  { icon: "camera", label: "Professional group photos" },
  { icon: "music", label: "Live acoustic music session" },
  { icon: "chat", label: "Private memories group chat" },
  { icon: "gift", label: "Surprise friendship goodie bag" },
  { icon: "star", label: "Memories for a lifetime" },
];

const PERK_ICONS = {
  heart: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  camera: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
  music: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>,
  chat: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
  gift: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>,
  star: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
};

export default function DetailsPanel() {
  const panelRef = useRef(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const targets = el.querySelectorAll(".agenda-card, .perk-item, .stat-pill");

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
    );

    targets.forEach((t, i) => {
      t.style.opacity = "0";
      t.style.transform = "translateY(16px)";
      t.style.transitionDelay = `${i * 50}ms`;
      t.style.transition = "opacity 0.45s ease, transform 0.45s ease";
      requestAnimationFrame(() => obs.observe(t));
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section className="panel panel-details" id="details" aria-label="Event Details" ref={panelRef}>
      <div className="panel-inner">

        {/* Hero */}
        <div className="detail-hero">
          <div className="detail-tag">🎉 August 3, 2026 · Friendship Day</div>
          <h1>Because Life Is<br /><span className="gradient-text">Better Together.</span></h1>
          <p className="detail-lead">
            A heartwarming day of connection, laughter, and creating memories that last a lifetime.
            Come celebrate the bonds that make us who we are — old friends, new friends, and everyone in between.
          </p>
        </div>

        {/* Stats */}
        <div className="stats-row">
          {[
            { num: "1", lbl: "Beautiful Day" },
            { num: "60", lbl: "Friends" },
            { num: "∞", lbl: "Memories" },
            { num: "💛", lbl: "Pure Love" },
          ].map((s) => (
            <div className="stat-pill" key={s.lbl}>
              <span className="stat-num">{s.num}</span>
              <span className="stat-lbl">{s.lbl}</span>
            </div>
          ))}
        </div>

        {/* Agenda */}
        <div className="schedule-block">
          <h2 className="block-title">The Day Unfolds</h2>
          <div className="agenda-card">
            <ul className="day-sessions">
              {AGENDA.map((item) => (
                <li key={item.time}>
                  <span className="session-time">{item.time}</span>
                  <div className="session-info">
                    <strong>{item.title}</strong>
                    <span>{item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Perks */}
        <div className="perks-block">
          <h2 className="block-title">What Awaits You</h2>
          <div className="perks-grid">
            {PERKS.map((p) => (
              <div className="perk-item" key={p.icon}>
                <div className="perk-icon">{PERK_ICONS[p.icon]}</div>
                <span>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="quote-block">
          <blockquote>
            "A friend is someone who knows all about you and still loves you."
            <cite>— Elbert Hubbard</cite>
          </blockquote>
        </div>

      </div>
    </section>
  );
}
