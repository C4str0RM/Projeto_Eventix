const fs = require("fs");
const path = require("path");

function verificarMediaQueriesNaPasta(pasta) {
  fs.readdirSync(pasta).forEach((item) => {
    const caminho = path.join(pasta, item);
    const stats = fs.statSync(caminho);

    if (stats.isDirectory()) {
      verificarMediaQueriesNaPasta(caminho);
    } else if (path.extname(caminho) === ".css") {
      const conteudo = fs.readFileSync(caminho, "utf-8");
      const possuiMediaQuery = /@media\s*\(/.test(conteudo);

      const status = possuiMediaQuery ? "✅ " : "⚠️ ";
      console.log(
        `${caminho}: ${status} ${
          possuiMediaQuery ? " POSSUI media query" : " NÃO POSSUI media query"
        }`
      );
    }
  });
}

/* 👇 Altere aqui se sua pasta de estilos for diferente */
const pastaCSS = path.join(__dirname, "Html-version", "Styles");
verificarMediaQueriesNaPasta(pastaCSS);
