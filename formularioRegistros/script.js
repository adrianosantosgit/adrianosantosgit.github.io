document.getElementById('novoRegistro').addEventListener('click', function() {
    const formContainer = document.getElementById('formContainer');
    const form = document.createElement('form');
    
    const now = new Date();
    const day = now.getDate();
    const month = now.getMonth() + 1; // Janeiro é 0!
    const year = now.getFullYear();
    
    form.innerHTML = `
        <label for="dia">Dia:</label>
        <input type="text" id="dia" name="dia" value="${day}">
        
        <label for="mes">Mês:</label>
        <input type="text" id="mes" name="mes" value="${month}">
        
        <label for="ano">Ano:</label>
        <input type="text" id="ano" name="ano" value="${year}">
        
        <label for="horas">Quantidade de Horas:</label>
        <select id="horas" name="horas">
            <option value="">Selecione</option>
            ${Array.from({ length: 25 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}
        </select>
        <p id="avisoHoras">É obrigatório informar a quantidade de horas</p>
        
        <label for="valor">Valor da venda:</label>
        <input type="number" id="valor" name="valor" placeholder="R$" inputmode="numeric">
        
        <label for="descricao">Nome do Cliente, ou cabine ou observação (obrigatório):</label>
        <input type="text" id="descricao" name="descricao">
        <p id="avisoDescricao">É obrigatório informar alguma descrição</p>
        
        <input type="submit" value="Salvar Registro" disabled>
    `;
    
    form.horas.addEventListener('change', function() {
        const avisoHoras = document.getElementById('avisoHoras');
        if (form.horas.value) {
            avisoHoras.style.display = 'none';
        } else {
            avisoHoras.style.display = 'block';
        }
        verificarCampos(form);
    });
    
    form.descricao.addEventListener('input', function() {
        const avisoDescricao = document.getElementById('avisoDescricao');
        if (form.descricao.value.trim()) {
            avisoDescricao.style.display = 'none';
        } else {
            avisoDescricao.style.display = 'block';
        }
        verificarCampos(form);
    });
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const registro = {
            dia: form.dia.value,
            mes: form.mes.value,
            ano: form.ano.value,
            horas: form.horas.value,
            descricao: form.descricao.value,
            valor: form.valor.value
        };
        
        salvarRegistro(registro);
        formContainer.innerHTML = ''; // Limpa o formulário após salvar
    });
    
    formContainer.appendChild(form);
});

function verificarCampos(form) {
    const submitButton = form.querySelector('input[type="submit"]');
    if (form.horas.value && form.descricao.value.trim()) {
        submitButton.disabled = false;
    } else {
        submitButton.disabled = true;
    }
}

function salvarRegistro(registro) {
    let registros = JSON.parse(localStorage.getItem('registros')) || [];
    registros.push(registro);
    localStorage.setItem('registros', JSON.stringify(registros));
}

document.getElementById('relatorioDia').addEventListener('click', function() {
    gerarRelatorio('dia');
});

document.getElementById('relatorioMes').addEventListener('click', function() {
    gerarRelatorio('mes');
});

document.getElementById('relatorioAno').addEventListener('click', function() {
    gerarRelatorio('ano');
});

document.getElementById('relatorioDiaAnterior').addEventListener('click', function() {
    gerarRelatorio('diaAnterior');
});

document.getElementById('relatorioMesAnterior').addEventListener('click', function() {
    gerarRelatorio('mesAnterior');
});

document.getElementById('relatorioAnoAnterior').addEventListener('click', function() {
    gerarRelatorio('anoAnterior');
});

function gerarRelatorio(tipo) {
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    const now = new Date();
    let filtro;
    let periodo;
    
    switch(tipo) {
        case 'dia':
            filtro = registro => registro.dia == now.getDate() && registro.mes == (now.getMonth() + 1) && registro.ano == now.getFullYear();
            periodo = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
            break;
        case 'mes':
            filtro = registro => registro.mes == (now.getMonth() + 1) && registro.ano == now.getFullYear();
            periodo = `${now.getMonth() + 1}-${now.getFullYear()}`;
            break;
        case 'ano':
            filtro = registro => registro.ano == now.getFullYear();
            periodo = `${now.getFullYear()}`;
            break;
        case 'diaAnterior':
            const ontem = new Date(now);
            ontem.setDate(now.getDate() - 1);
            filtro = registro => registro.dia == ontem.getDate() && registro.mes == (ontem.getMonth() + 1) && registro.ano == ontem.getFullYear();
            periodo = `${ontem.getDate()}-${ontem.getMonth() + 1}-${ontem.getFullYear()}`;
            break;
        case 'mesAnterior':
            const mesPassado = new Date(now);
            mesPassado.setMonth(now.getMonth() - 1);
            filtro = registro => registro.mes == (mesPassado.getMonth() + 1) && registro.ano == mesPassado.getFullYear();
            periodo = `${mesPassado.getMonth() + 1}-${mesPassado.getFullYear()}`;
            break;
        case 'anoAnterior':
            filtro = registro => registro.ano == (now.getFullYear() - 1);
            periodo = `${now.getFullYear() - 1}`;
            break;
    }
    
    const registrosFiltrados = registros.filter(filtro);
    const somaValores = registrosFiltrados.reduce((total, registro) => total + parseFloat(registro.valor || 0), 0).toFixed(2);
    const conteudo = `Soma dos Valores: R$${somaValores}\n\n` + registrosFiltrados.map(registro => `${registro.dia}/${registro.mes}/${registro.ano}, ${registro.horas} hora/s, R$${registro.valor}, ${registro.descricao}`).join('\n\n');
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `relatorio_${tipo}_${periodo}.txt`;
    a.click();
    URL.revokeObjectURL(url);
}


document.getElementById('apagarRegistros').addEventListener('click', function() {
    const deleteContainer = document.getElementById('deleteContainer');
    const registros = JSON.parse(localStorage.getItem('registros')) || [];
    
    if (registros.length === 0) {
        alert('Não há registros para apagar.');
        return;
    }
    
    const form = document.createElement('form');
    form.innerHTML = registros.map((registro, index) => `
        <label>
            <input type="checkbox" name="registro" value="${index}">
            ${registro.dia}/${registro.mes}/${registro.ano}, ${registro.horas} hora/s, R$${registro.valor}, ${registro.descricao}
        </label>
    `).join('<br>');
    
    const apagarSelecionados = document.createElement('button');
    apagarSelecionados.textContent = 'Apagar Selecionados';
    apagarSelecionados.type = 'button';
    apagarSelecionados.addEventListener('click', function() {
        const selecionados = Array.from(form.registro).filter(checkbox => checkbox.checked).map(checkbox => parseInt(checkbox.value));
        const novosRegistros = registros.filter((_, index) => !selecionados.includes(index));
        localStorage.setItem('registros', JSON.stringify(novosRegistros));
        deleteContainer.innerHTML = '';
        alert('Registros selecionados apagados.');
    });
    
    const apagarTodos = document.createElement('button');
    apagarTodos.textContent = 'Apagar Todos';
    apagarTodos.type = 'button';
    apagarTodos.addEventListener('click', function() {
        if (confirm('Tem certeza que deseja apagar todos os registros?')) {
            localStorage.removeItem('registros');
            deleteContainer.innerHTML = '';
            alert('Todos os registros foram apagados.');
        }
    });
    
    form.appendChild(apagarSelecionados);
    form.appendChild(apagarTodos);
    deleteContainer.innerHTML = '';
    deleteContainer.appendChild(form);
});
