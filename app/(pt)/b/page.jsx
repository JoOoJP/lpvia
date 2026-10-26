import { Club } from "./club";

// Versão B, experimental: fica fora da busca até virar a página principal.
export const metadata = {
  title: "VIA — Acesso por convite",
  description: "Quem sabe, sabe.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <Club />;
}
