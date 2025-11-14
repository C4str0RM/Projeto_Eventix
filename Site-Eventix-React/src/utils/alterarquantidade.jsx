export const alterarQuantidade = (id, delta) => {
  setQuantidades((prev) => {
    const atual = prev[id] || 1;
    const novo = Math.max(1, atual + delta);
    return { ...prev, [id]: novo };
  });
};
