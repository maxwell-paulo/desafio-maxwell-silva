import cardapio from "./cardapio.js";

function erros(metodoDePagamento, itens) {
  // separando os itens da quantidade
  const itensSeparados = itens.map((itemDoCardapio) =>
    itemDoCardapio.split(",")
  );

  // pegando todos os códigos de produtos
  const codigos = cardapio.map((itemDoCardapio) => itemDoCardapio.codigo);

  // checando se a forma de pagamento é valida
  if (
    metodoDePagamento.toLowerCase() !== "debito" &&
    metodoDePagamento.toLowerCase() !== "credito" &&
    metodoDePagamento.toLowerCase() !== "dinheiro"
  ) {
    return "Forma de pagamento inválida!";
  }

  // checando se existem itens no carrinho
  if (itens.length === 0) {
    return "Não há itens no carrinho de compra!";
  }

  // checando se no pedido tem chantily e café ou se no pedido tem queijo e sanduiche
  const chantilyECafe = [];
  const queijoESanduiche = [];

  for (let itemPedido of itens) {
    if (itemPedido.includes("chantily") || itemPedido.includes("cafe")) {
      chantilyECafe.push(itemPedido);
    }
    if (itemPedido.includes("queijo") || itemPedido.includes("sanduiche")) {
      queijoESanduiche.push(itemPedido);
    }
  }

  // checando se o pedido com item extra tem o item princial
  if (
    (chantilyECafe.length === 1 && chantilyECafe[0].includes("chantily")) ||
    (queijoESanduiche.length === 1 && queijoESanduiche[0].includes("queijo"))
  ) {
    return "Item extra não pode ser pedido sem o principal";
  }

  // checando se tem tem algum item com quantidade zerada
  for (let itemPedido of itensSeparados) {
    if (itemPedido[1] === "0") {
      return "Quantidade inválida!";
    }

    // checando se tem algum item com a quantidade mas sem informar qual o item
    if (!isNaN(Number(itemPedido[0])) || !codigos.includes(itemPedido[0])) {
      return "Item inválido!";
    }
  }
}

export default erros;
