import { Club } from "./club";

// Versão B, experimental: fica fora da busca até virar a página principal.
export const metadata = {
  title: "VIA — Marketing, conteúdo e tecnologia",
  description: "A VIA cria marcas, cuida do marketing e desenvolve sites e sistemas.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function Page() {
  return <Club />;
}
