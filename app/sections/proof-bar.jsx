const markets = ["Moikato", "Dra. Camila Bresciani", "A Tardinha", "Brasil + Reino Unido"];

export function ProofBar() {
  return (
    <section className="proof-bar" aria-label="Projetos e mercados">
      <p>Estratégia que já ganhou forma em</p>
      <div>
        {markets.map((market) => (
          <span key={market}>{market}</span>
        ))}
      </div>
    </section>
  );
}
