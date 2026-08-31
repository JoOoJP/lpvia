export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      ↗
    </span>
  );
}

/*
 * Os glifos ← e → da fonte não são espelhos: a cabeça da seta esquerda sai
 * menor e mais fina que a da direita. Desenhada aqui, a esquerda é a mesma
 * forma da direita invertida — as duas ficam idênticas em qualquer fonte.
 */
export function ArrowIcon({ direction = "right", className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={direction === "left" ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M4 12h16" />
      <path d="m13.6 5.6 6.4 6.4-6.4 6.4" />
    </svg>
  );
}
