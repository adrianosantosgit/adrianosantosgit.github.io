function generateForm() {
    const numProducts = parseInt(document.getElementById('numProducts').value);
    const container = document.getElementById('productFormContainer');
    container.innerHTML = ''; // Limpa o conteúdo anterior

    const form = document.createElement('form');
    form.id = 'comparisonForm';

    for (let i = 1; i <= numProducts; i++) {
        const productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <h3>Produto ${i}</h3>
            <div>
                <label for="name${i}">Nome/Marca do Produto ${i} (Opcional):</label>
                <input type="text" id="name${i}" name="name${i}">
            </div>
            <div>
                <label for="price${i}">Preço do Produto ${i}:</label>
                <input type="number" id="price${i}" name="price${i}" required>
            </div>
            <div>
                <label for="quantity${i}">Quantidade do Produto ${i}:</label>
                <input type="number" id="quantity${i}" name="quantity${i}" required>
            </div>
        `;
        form.appendChild(productDiv);
    }

    const compareButton = document.createElement('button');
    compareButton.type = 'button';
    compareButton.textContent = 'Comparar';
    compareButton.onclick = comparePrices;
    form.appendChild(compareButton);

    container.appendChild(form);
}

function comparePrices() {
    const form = document.getElementById('comparisonForm');
    const numProducts = form.querySelectorAll('h3').length;
    let resultText = '';

    for (let i = 1; i <= numProducts; i++) {
        const price = parseFloat(document.getElementById(`price${i}`).value);
        const quantity = parseFloat(document.getElementById(`quantity${i}`).value);
        const unitPrice = price / quantity;
        const name = document.getElementById(`name${i}`).value || `Produto ${i}`;

        resultText += `Preço por unidade do ${name}: R$ ${unitPrice.toFixed(2)}\n`;
    }

    let maxUnitPrice = -Infinity;
    let maxProduct = '';

    for (let i = 1; i <= numProducts; i++) {
        const price = parseFloat(document.getElementById(`price${i}`).value);
        const quantity = parseFloat(document.getElementById(`quantity${i}`).value);
        const unitPrice = price / quantity;
        const name = document.getElementById(`name${i}`).value || `Produto ${i}`;

        if (unitPrice > maxUnitPrice) {
            maxUnitPrice = unitPrice;
            maxProduct = name;
        }
    }

    resultText += `\n${maxProduct} tem o maior preço por unidade.`;

    document.getElementById('result').innerText = resultText;
}
