import React from "react";

function ModalIngresso({
  evento,
  ingressos,
  erroIngressos,
  quantidades,
  setQuantidades,
  adicionarAoCarrinho,
  fechar,
}) {
  return (
    <div className="modal-overlay" onClick={fechar}>
      <div className="modal-conteudo" onClick={(e) => e.stopPropagation()}>
        <button className="fechar-modal" onClick={fechar}>✕</button>
        <img src={evento.imagem || "/img/padrao.jpg"} alt={evento.titulo || "Evento"} />
        <h2>{evento.titulo || "Evento"}</h2>
        <p>
          {evento.data
            ? new Date(evento.data).toLocaleDateString("pt-BR")
            : "Data indefinida"}{" "}
          — {evento.local || "Local não informado"}
        </p>

        <h4>Tipos de ingresso:</h4>
        {erroIngressos && <p className="erro-ingressos">{erroIngressos}</p>}

        <ul>
          {ingressos.length > 0 ? (
            ingressos.map((ingresso, index) => (
              <li key={ingresso.id || index}>
                <strong>{ingresso.tipo}</strong> – {ingresso.nome || ingresso.tipo} –{" "}
                {`R$${(ingresso.valor ?? 0).toFixed(2)}`}
                <br />
                <small>{ingresso.obs || ingresso.descricao || "Sem descrição"}</small>
                <div className="quantidade-wrapper">
                  <button onClick={() =>
                    setQuantidades((prev) => ({
                      ...prev,
                      [ingresso.id]: Math.max(1, (prev[ingresso.id] || 1) - 1),
                    }))
                  }>−</button>
                  <input
                    type="number"
                    min="1"
                    value={quantidades[ingresso.id] || 1}
                    onChange={(e) =>
                      setQuantidades((prev) => ({
                        ...prev,
                        [ingresso.id]: Math.max(1, parseInt(e.target.value, 10)),
                      }))
                    }
                  />
                  <button onClick={() =>
                    setQuantidades((prev) => ({
                      ...prev,
                      [ingresso.id]: (prev[ingresso.id] || 1) + 1,
                    }))
                  }>+</button>
                  <button
                    className="btn-adicionar"
                    onClick={() =>
                      adicionarAoCarrinho(ingresso.tipo, quantidades[ingresso.id] || 1)
                    }
                  >
                    Adicionar
                  </button>
                </div>
              </li>
            ))
          ) : (
            <li>Os ingressos para este evento ainda não foram disponibilizados.</li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ModalIngresso;
