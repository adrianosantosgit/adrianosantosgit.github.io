function comparePrices() {
    const price1 = parseFloat(document.getElementById('price1').value);
    const quantity1 = parseFloat(document.getElementById('quantity1').value);
    const price2 = parseFloat(document.getElementById('price2').value);
    const quantity2 = parseFloat(document.getElementById('quantity2').value);

    const unitPrice1 = price1 / quantity1;
    const unitPrice2 = price2 / quantity2;

    let resultText = `Preço por unidade do Produto 1: R$ ${unitPrice1.toFixed(2)}\n`;
    resultText += `Preço por unidade do Produto 2: R$ ${unitPrice2.toFixed(2)}\n\n`;
    
    if (unitPrice1 > unitPrice2) {
        resultText += 'O Produto 1 tem o maior preço por unidade.';
    } else if (unitPrice1 < unitPrice2) {
        resultText += 'O Produto 2 tem o maior preço por unidade.';
    } else {
        resultText += 'Ambos os produtos têm o mesmo preço por unidade.';
    }

    document.getElementById('result').innerText = resultText;
}
