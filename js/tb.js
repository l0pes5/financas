function salvarDados() {
            const salario = parseFloat(localStorage.getItem('salario')) || 0;
            const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
            localStorage.setItem('salario', salario);
            localStorage.setItem('despesas', JSON.stringify(despesas));
        }


        function carregarDados() {
            const salario = parseFloat(localStorage.getItem('salario')) || 0;
            const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
            document.getElementById('salario').value = salario;
            atualizarLista(despesas);
            atualizarResumo(salario, despesas);
        }

       
        function atualizarLista(despesas) {
            const lista = document.getElementById('lista-despesas');
            lista.innerHTML = '';
            despesas.forEach((despesa, index) => {
                const li = document.createElement('li');
                li.innerHTML = `
                    <strong>Data:</strong> ${despesa.data} | 
                    <strong>Nome:</strong> ${despesa.nome} | 
                    <strong>Valor:</strong> R$ ${despesa.valor.toFixed(2)}
                    <button onclick="removerDespesa(${index})" style="margin-left: 10px; background: red; color: white; border: none; padding: 5px; cursor: pointer;">Remover</button>
                `;
                lista.appendChild(li);
            });
        }

        
        function atualizarResumo(salario, despesas) {
            const totalDespesas = despesas.reduce((total, despesa) => total + despesa.valor, 0);
            const saldo = salario - totalDespesas;
            document.getElementById('resumo-salario').textContent = salario.toFixed(2);
            document.getElementById('resumo-despesas').textContent = totalDespesas.toFixed(2);
            const saldoElement = document.getElementById('resumo-saldo');
            saldoElement.textContent = saldo.toFixed(2);
            saldoElement.className = saldo >= 0 ? 'saldo-positivo' : 'saldo-negativo';
        }

      
        function removerDespesa(index) {
            const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
            despesas.splice(index, 1);
            localStorage.setItem('despesas', JSON.stringify(despesas));
            carregarDados();
        }

     
        document.getElementById('form-salario').addEventListener('submit', function(e) {
            e.preventDefault();
            const salario = parseFloat(document.getElementById('salario').value);
            localStorage.setItem('salario', salario);
            carregarDados();
        });

        
        document.getElementById('form-despesa').addEventListener('submit', function(e) {
            e.preventDefault();
            const data = document.getElementById('data').value;
            const nome = document.getElementById('nome').value;
            const valor = parseFloat(document.getElementById('valor').value);
            const despesas = JSON.parse(localStorage.getItem('despesas')) || [];
            despesas.push({ data, nome, valor });
            localStorage.setItem('despesas', JSON.stringify(despesas));
            document.getElementById('form-despesa').reset();
            carregarDados();
        });

        
        window.addEventListener('load', carregarDados);