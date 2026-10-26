/*
 * Logo da VIA gravado no papel (baixo-relevo). A luz vem de cima: a parede
 * superior do sulco fica na sombra, a inferior pega luz, e a borda do papel
 * logo abaixo do sulco ganha um fio claro.
 *
 * Variantes:
 * - "ink": o sulco recebe a tinta nas cores da VIA, fosca, com grão de foil
 *   acetinado que pega a luz do ponteiro.
 * - "filament": sulco escuro com um fio fino de neon no fundo.
 * - "blind": gravação seca, só com um contorno finíssimo de neon.
 */

const strokes = (
  <>
    <path d="M6 6 L20 40 L34 6" />
    <path d="M46 6 L46 40" />
    <path d="M58 40 L72 6 L86 40" />
  </>
);

const strokeProps = {
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export function EngravedLogo({ id, variant = "ink", className }) {
  const url = (name) => `url(#${id}-${name})`;

  return (
    <svg className={className} viewBox="-14 -14 120 74" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-brand`} x1="0" y1="0" x2="92" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6a2ce6" />
          <stop offset="0.34" stopColor="#2e6be8" />
          <stop offset="0.58" stopColor="#00b8d4" />
          <stop offset="1" stopColor="#39d67a" />
        </linearGradient>

        <filter id={`${id}-deboss`} x="-20%" y="-40%" width="140%" height="180%">
          <feOffset in="SourceAlpha" dy="2.8" result="down" />
          <feGaussianBlur in="down" stdDeviation="1.5" result="downBlur" />
          <feComposite in="SourceAlpha" in2="downBlur" operator="out" result="topWall" />
          <feFlood floodColor="#000" floodOpacity="0.92" />
          <feComposite in2="topWall" operator="in" result="topShade" />

          <feOffset in="SourceAlpha" dy="-1.2" result="up" />
          <feGaussianBlur in="up" stdDeviation="0.6" result="upBlur" />
          <feComposite in="SourceAlpha" in2="upBlur" operator="out" result="bottomWall" />
          <feFlood floodColor="#fff" floodOpacity="0.2" />
          <feComposite in2="bottomWall" operator="in" result="bottomLight" />

          <feOffset in="SourceAlpha" dy="1.1" result="lipDown" />
          <feComposite in="lipDown" in2="SourceAlpha" operator="out" result="lip" />
          <feFlood floodColor="#fff" floodOpacity="0.13" />
          <feComposite in2="lip" operator="in" result="lipLight" />

          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="topShade" />
            <feMergeNode in="bottomLight" />
            <feMergeNode in="lipLight" />
          </feMerge>
        </filter>

        {/* Foil fosco: o grão do pigmento vira relevo e pega uma luz baixa. */}
        <filter id={`${id}-satin`} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="1.3" numOctaves="2" seed="7" result="grain" />
          <feSpecularLighting
            in="grain"
            surfaceScale="1"
            specularConstant="0.45"
            specularExponent="16"
            lightingColor="#ffffff"
            result="shine"
          >
            <fePointLight data-light="" x="30" y="-40" z="80" />
          </feSpecularLighting>
          <feComposite in="shine" in2="SourceAlpha" operator="in" result="shineIn" />
          <feComposite in="SourceGraphic" in2="shineIn" operator="arithmetic" k1="0" k2="1" k3="0.14" k4="0" />
        </filter>

        <filter id={`${id}-soft`} x="-20%" y="-40%" width="140%" height="180%">
          <feGaussianBlur stdDeviation="1.4" />
        </filter>

        <mask id={`${id}-ring`} maskUnits="userSpaceOnUse" x="-14" y="-14" width="120" height="74">
          <g {...strokeProps} stroke="#fff" strokeWidth="12.9">
            {strokes}
          </g>
          <g {...strokeProps} stroke="#000" strokeWidth="11.5">
            {strokes}
          </g>
        </mask>
      </defs>

      {variant === "ink" ? (
        <g filter={url("deboss")}>
          <g filter={url("satin")}>
            <g {...strokeProps} stroke={url("brand")} strokeWidth="12">
              {strokes}
            </g>
          </g>
        </g>
      ) : null}

      {variant === "filament" ? (
        <>
          <g {...strokeProps} stroke="#040404" strokeWidth="12" filter={url("deboss")}>
            {strokes}
          </g>
          <g transform="translate(0 0.8)">
            <g {...strokeProps} stroke={url("brand")} strokeWidth="3" opacity="0.55" filter={url("soft")}>
              {strokes}
            </g>
            <g {...strokeProps} stroke={url("brand")} strokeWidth="1.6">
              {strokes}
            </g>
          </g>
        </>
      ) : null}

      {variant === "blind" ? (
        <>
          <g {...strokeProps} stroke="#080808" strokeWidth="12" filter={url("deboss")}>
            {strokes}
          </g>
          <g mask={url("ring")}>
            <g {...strokeProps} stroke={url("brand")} strokeWidth="14">
              {strokes}
            </g>
          </g>
        </>
      ) : null}
    </svg>
  );
}
