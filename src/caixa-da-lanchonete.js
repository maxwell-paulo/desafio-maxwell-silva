import cardapio from "./cardapio.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    if (
      metodoDePagamento.toLowerCase() !== "debito" &&
      metodoDePagamento.toLowerCase() !== "credito" &&
      metodoDePagamento.toLowerCase() !== "dinheiro"
    ) {
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    const chantilySemCafe = itens.filter((iten) => {
      if (iten.includes("chantily") || iten.includes("cafe")) {
        return iten;
      }
    });

    const queijoSemSanduiche = itens.filter((iten) => {
      if (iten.includes("queijo") || iten.includes("sanduiche")) {
        return iten;
      }
    });

    if (
      (chantilySemCafe.length === 1 &&
        chantilySemCafe[0].includes("chantily")) ||
      (queijoSemSanduiche.length === 1 &&
        queijoSemSanduiche[0].includes("queijo"))
    ) {
      return "Item extra não pode ser pedido sem o principal";
    }

    const itensSeparados = itens.map((iten) => iten.split(","));
    const codigos = cardapio.map((item) => item.codigo);

    for (let array of itensSeparados) {
      if (array[1] === "0") {
        return "Quantidade inválida!";
      }

      if (!isNaN(Number(array[0])) || !codigos.includes(array[0])) {
        return "Item inválido!";
      }
    }

    const itemsPedidos = cardapio.reduce((valor, itemDoCardapio) => {
      for (let itemPedido of itensSeparados) {
        if (itemPedido[0] === itemDoCardapio.codigo) {
          valor.push(itemDoCardapio.valor.split(" "));
        }
      }
      return valor;
    }, []);

    let valorFinal = 0;

    itensSeparados.forEach((itemPedido, indice) => {
      itemsPedidos.forEach((valor, i) => {
        if (indice === i) {
          valorFinal +=
            Number(itemPedido[1]) * parseFloat(valor[1].replace(",", "."));
        }
      });
    });

    if (metodoDePagamento === "credito") {
      valorFinal *= 1.03;
    }
    if (metodoDePagamento === "dinheiro") {
      valorFinal *= 0.95;
    }

    valorFinal = valorFinal.toFixed(2);

    const valorFinalFormatado = String(valorFinal).replace(".", ",");

    return `R$ ${valorFinalFormatado}`;
  }
}

export { CaixaDaLanchonete };
