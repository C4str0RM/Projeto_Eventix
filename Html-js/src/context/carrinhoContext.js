import { supabase } from "../config/supabaseClient.js";

class CarrinhoContext {
  constructor() {
    this.itens = [];
    this.quantidade = 0;
    this.observadores = [];
  }

  async carregarCarrinho(usuarioId) {
    if (!usuarioId) return;

    const { data: carrinho, error } = await supabase
      .from("carrinho")
      .select("id, ingresso_id, quantidade")
      .eq("usuario_id", usuarioId)
      .eq("status", "ativo");

    if (error) {
      console.error("Erro ao carregar carrinho:", error.message);
      return;
    }

    this.itens = carrinho || [];
    this.quantidade = this.itens.reduce(
      (acc, item) => acc + item.quantidade,
      0
    );

    this.notificar();
  }

  async adicionarItem(usuarioId, ingressoId, quantidade = 1) {
    const { error } = await supabase.from("carrinho").insert({
      usuario_id: usuarioId,
      ingresso_id: ingressoId,
      quantidade,
      status: "ativo",
    });

    if (error) {
      console.error("Erro ao adicionar item:", error.message);
      return;
    }

    await this.carregarCarrinho(usuarioId);
  }

  async removerItem(carrinhoId, usuarioId) {
    const { error } = await supabase
      .from("carrinho")
      .delete()
      .match({ id: carrinhoId });

    if (error) {
      console.error("Erro ao remover item:", error.message);
      return;
    }

    await this.carregarCarrinho(usuarioId);
  }

  inscrever(callback) {
    this.observadores.push(callback);
  }

  notificar() {
    this.observadores.forEach((cb) => cb(this));
  }
}

export const carrinhoContext = new CarrinhoContext();
