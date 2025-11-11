export const calcularTempoRestante = (dataEvento) => {
  const hoje = new Date();
  const data = new Date(dataEvento);
  const diffMs = data - hoje;
  if (diffMs <= 0) return "Hoje ou já passou";
  const diffDias = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const meses = Math.floor(diffDias / 30);
  const dias = diffDias % 30;
  let texto = "Faltam ";
  if (meses > 0) texto += `${meses} ${meses === 1 ? "mês" : "meses"}`;
  if (dias > 0)
    texto += `${meses > 0 ? " e " : ""}${dias} ${dias === 1 ? "dia" : "dias"}`;
  return texto;
};
