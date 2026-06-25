const HEARTS = [
  { emoji: "💛", className: "heart-1" },
  { emoji: "🧡", className: "heart-2" },
  { emoji: "💜", className: "heart-3" },
  { emoji: "💖", className: "heart-4" },
  { emoji: "💝", className: "heart-5" },
  { emoji: "🤍", className: "heart-6" },
  { emoji: "💗", className: "heart-7" },
  { emoji: "🩷", className: "heart-8" },
];

export default function FloatingHearts() {
  return (
    <div className="floating-hearts" aria-hidden="true">
      {HEARTS.map((h) => (
        <div key={h.className} className={`heart ${h.className}`}>
          {h.emoji}
        </div>
      ))}
    </div>
  );
}
