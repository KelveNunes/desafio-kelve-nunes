class CaixaDaLanchonete {
    tabelaItensValores = {
        cafe: 3.00,
        chantily: 1.50,
        suco: 6.20,
        sanduiche: 6.50,
        queijo: 2.00,
        salgado: 7.25,
        combo1: 9.50,
        combo2: 7.50
    };

    calcularValorDaCompra(metodoDePagamento, itens) {
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        let total = 0;
        let temItemPrincipal = false;
        let cafePresente = false;
        let sanduichePresente = false;

        for (const item of itens) {
            const [produto, quantidade] = item.split(",");

            if (!this.tabelaItensValores[produto]) {
                return "Item inválido!";
            }

            if (quantidade === "0") {
                return "Quantidade inválida!";
            }

            if (produto === "cafe") {
                cafePresente = true;
            } else if (produto === "sanduiche") {
                sanduichePresente = true;
            }

            if (produto === "chantily" && !cafePresente) {
                return "Item extra não pode ser pedido sem o principal";
            } else if (produto === "queijo" && !sanduichePresente) {
                return "Item extra não pode ser pedido sem o principal";
            }

            if (produto !== "queijo " && produto !== "chantily") {
                temItemPrincipal = true;
            }

            if (this.tabelaItensValores[produto] && quantidade !== "0") {
                total += this.tabelaItensValores[produto] * parseInt(quantidade);
            }
        }

        if (!temItemPrincipal) {
            return "Item extra não pode ser pedido sem o principal";
        }

        if (metodoDePagamento !== "credito" && metodoDePagamento !== "dinheiro" && metodoDePagamento !== "debito") {
            return "Forma de pagamento inválida!";
        }

        if (metodoDePagamento === "credito" && itens.some(item => item.split(",")[0] === "chantily" && item.split(",")[1] !== "0")) {
            return "Item extra não pode ser pedido sem o principal";
        }

        let valorFinal = total;

        if (metodoDePagamento === "credito") {
            valorFinal *= 1.03; // Adicionar 3% para pagamento no crédito
        } else if (metodoDePagamento === "dinheiro") {
            valorFinal *= 0.95; // Aplicar 5% de desconto para pagamento em dinheiro
        }

        return `R$ ${valorFinal.toFixed(2).replace('.', ',')}`;
    }
}

export { CaixaDaLanchonete };