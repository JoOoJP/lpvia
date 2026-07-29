/*
 * Marca VIA reconstruída a partir do manual de identidade: três traços de
 * ponta arredondada — V, I e o Λ do A — atravessados por um gradiente único da
 * esquerda para a direita.
 *
 * É um redesenho a partir de imagem, não o vetor original do manual. Se o
 * arquivo do designer aparecer, ele substitui este componente.
 */
export function ViaMark({ title }) {
  return (
    <svg
      className="via-mark"
      viewBox="0 0 92 46"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      <defs>
        <linearGradient id="via-mark-fill" x1="0" y1="0" x2="92" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#5B12D1" />
          <stop offset="0.34" stopColor="#2E6BE8" />
          <stop offset="0.58" stopColor="#00B8D4" />
          <stop offset="0.8" stopColor="#17C9A8" />
          <stop offset="1" stopColor="#39D67A" />
        </linearGradient>
      </defs>
      <g
        fill="none"
        stroke="url(#via-mark-fill)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 6 L20 40 L34 6" />
        <path d="M46 6 L46 40" />
        <path d="M58 40 L72 6 L86 40" />
      </g>
    </svg>
  );
}
