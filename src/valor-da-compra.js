import cardapio from "./cardapio.js";

function valorDacompra(metodoDePagamento, itens) {
  let valorFinal = 0;

  // separando o item da quantidade
  const itensSeparados = itens.map((item) => item.split(","));

  // buscando os valores dos itens pedidos
  const itemsPedidos = cardapio.reduce((valor, itemDoCardapio) => {
    for (let itemPedido of itensSeparados) {
      if (itemPedido[0] === itemDoCardapio.codigo) {
        valor.push(itemDoCardapio.valor.split(" "));
      }
    }
    return valor;
  }, []);

  // calculando o valor final
  itensSeparados.forEach((itemPedido, indice) => {
    itemsPedidos.forEach((valor, i) => {
      if (indice === i) {
        valorFinal +=
          Number(itemPedido[1]) * parseFloat(valor[1].replace(",", "."));
      }
    });
  });

  // acrescentando 3% nas compras em crédito e dando desconto de 5% nas compras em dinheiro
  if (metodoDePagamento === "credito") {
    valorFinal *= 1.03;
  }
  if (metodoDePagamento === "dinheiro") {
    valorFinal *= 0.95;
  }

  // deixando o valor com duas casas decímais
  valorFinal = valorFinal.toFixed(2);

  // formantando e transformando o valor em String
  const valorFinalFormatado = String(valorFinal).replace(".", ",");

  return `R$ ${valorFinalFormatado}`;
}

export default valorDacompra;
