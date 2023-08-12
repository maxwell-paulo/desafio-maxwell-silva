import erros from "./erros.js";
import valorDacompra from "./valor-da-compra.js";

class CaixaDaLanchonete {
  calcularValorDaCompra(metodoDePagamento, itens) {
    // instanciando e invocando as mensagens de erro
    const mensagemDeErro = erros(metodoDePagamento, itens);

    if (mensagemDeErro) {
      return mensagemDeErro;
    }

    // retornando o valor da compra
    return valorDacompra(metodoDePagamento, itens);
  }
}

export { CaixaDaLanchonete };
