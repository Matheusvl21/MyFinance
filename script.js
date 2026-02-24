const form = document.getElementById('transactionForm');
const list = document.getElementById('transactionList');
const balanceDisplay = document.getElementById('balanceText');

// Busca do LocalStorage ou inicia vazio
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

function updateUI() {
    list.innerHTML = '';
    let total = 0;

    transactions.forEach((t, index) => {
        const li = document.createElement('li');
        const color = t.amount > 0 ? 'green' : 'red';
        
        li.innerHTML = `
            <span>${t.desc}</span>
            <strong style="color: ${color}">R$ ${t.amount.toFixed(2)}</strong>
            <button class="delete-btn" onclick="removeTransaction(${index})">X</button>
        `;
        list.appendChild(li);
        total += t.amount;
    });

    balanceDisplay.innerText = `R$ ${total.toFixed(2)}`;
    balanceDisplay.style.color = total >= 0 ? '#22c55e' : '#ef4444';
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const desc = document.getElementById('desc').value;
    const amount = parseFloat(document.getElementById('amount').value);

    transactions.push({ desc, amount });
    updateUI();
    form.reset();
});

// Tornando a função global para o botão 'X' do HTML encontrá-la
window.removeTransaction = (index) => {
    transactions.splice(index, 1);
    updateUI();
};

updateUI();