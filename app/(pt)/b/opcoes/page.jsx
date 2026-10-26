import clubStyles from "../club.module.css";
import { EngravedLogo } from "../engraved-logo";
import styles from "./opcoes.module.css";

export const metadata = {
  title: "VIA — Opções do cartão",
  robots: {
    index: false,
    follow: false,
  },
};

const options = [
  {
    key: "A",
    variant: "ink",
    name: "Tinta gravada",
    description: "O logo afunda no papel e recebe as cores da VIA, foscas. Sem brilho nenhum.",
  },
  {
    key: "B",
    variant: "filament",
    name: "Fio no fundo",
    description: "Sulco escuro e, lá no fundo, um fio fino de neon. A luz vem de dentro do papel.",
  },
  {
    key: "C",
    variant: "blind",
    name: "Gravação seca",
    description: "Preto no preto, só o relevo. Um contorno finíssimo de neon desenha a borda.",
  },
];

export default function Page() {
  return (
    <main className={`${clubStyles.root} ${styles.page}`} id="conteudo-principal">
      <h1 className={styles.heading}>Cartão VIA — gravação do logo</h1>
      {options.map((option) => (
        <section className={styles.option} key={option.key} aria-labelledby={`opcao-${option.key}`}>
          <div className={clubStyles.card}>
            <span className={clubStyles.paper} />
            <span className={clubStyles.sheen} />
            <EngravedLogo
              id={`opcao-${option.key}-logo`}
              variant={option.variant}
              className={styles.logo}
            />
          </div>
          <div className={styles.caption}>
            <h2 className={styles.name} id={`opcao-${option.key}`}>
              <span>{option.key}</span> {option.name}
            </h2>
            <p className={styles.description}>{option.description}</p>
          </div>
        </section>
      ))}
    </main>
  );
}
