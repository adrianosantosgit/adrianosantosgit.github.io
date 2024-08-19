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
            <label for="price${i}">Preço do Produto ${i}:</label>
            <input type="text" id="price${i}" name="price${i}" placeholder="R$ 0,00" required>
            </div>
            <div>
            <label for="quantity${i}">Quantidade do Produto ${i}:</label>
                <input type="text" id="quantity${i}" name="quantity${i}" placeholder="Quantidade" required>
            </div>
            <div>
                <label for="name${i}">Nome/Marca do Produto ${i} (Opcional):</label>
                <input type="text" id="name${i}" name="name${i}" placeholder="Nome ou Marca">
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

    let maxUnitPrice = -Infinity;
    let minUnitPrice = Infinity;
    let maxProduct = '';
    let minProduct = '';

    for (let i = 1; i <= numProducts; i++) {
        const price = parseFloat(document.getElementById(`price${i}`).value.replace(',', '.'));
        const quantity = parseFloat(document.getElementById(`quantity${i}`).value.replace(',', '.'));
        const unitPrice = price / quantity;
        const name = document.getElementById(`name${i}`).value || `Produto ${i}`;

        resultText += `\nPreço por quantidade do ${name}: R$ ${unitPrice.toFixed(2)} ou R$ ${unitPrice.toFixed(5)}\n`

        if (unitPrice > maxUnitPrice) {
            maxUnitPrice = unitPrice;
            maxProduct = name;
        }

        if (unitPrice < minUnitPrice) {
            minUnitPrice = unitPrice;
            minProduct = name;
        }
                
    }

    if (minUnitPrice == maxUnitPrice) {
        
    } else {
        resultText += `\n${maxProduct} é mais caro.`;
        resultText += `\n`;
        resultText += `\n${minProduct} é mais barato.`;
    }


    document.getElementById('result').innerText = resultText;
}
