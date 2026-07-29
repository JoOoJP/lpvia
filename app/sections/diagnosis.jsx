/*
 * Os quatro sintomas variam de construção de propósito. Escritos no mesmo
 * molde — "X, mas não Y" — a lista lê como preenchimento de formulário.
 */
const symptoms = [
  "O marketing produz. A demanda não vem.",
  "Os leads chegam e morrem no funil.",
  "A marca parece menor do que a empresa é.",
  "Boa parte da operação ainda roda no braço.",
];

export function Diagnosis() {
  return (
    <section className="diagnosis section">
      <div className="section-intro">
        <p className="eyebrow">O PROBLEMA VEM ANTES DA FERRAMENTA</p>
        <h2>
          Nem todo negócio que precisa crescer
          <span> precisa de mais tráfego.</span>
        </h2>
      </div>
      <div className="diagnosis-grid">
        <div className="diagnosis-copy">
          <p>
            O gargalo quase nunca está onde a empresa acha que está. Pedem
            anúncio quando o atendimento não responde. Pedem conteúdo quando
            falta ter o que dizer.
          </p>
          <strong>
            A gente descobre o que precisa mudar antes de propor qualquer coisa.
          </strong>
        </div>
        <ul>
          {symptoms.map((symptom, index) => (
            <li key={symptom}>
              <span>0{index + 1}</span>
              {symptom}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
