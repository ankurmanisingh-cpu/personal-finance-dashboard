let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

const list = document.getElementById("list");
const incomeEl = document.getElementById("income");
const expenseEl = document.getElementById("expense");
const balanceEl = document.getElementById("balance");

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (text === "" || amount === "") {
    alert("Please fill all fields");
    return;
  }

  const transaction = {
    id: Date.now(),
    text,
    amount: +amount,
    type
  };

  transactions.push(transaction);
  updateLocalStorage();
  renderTransactions();
}

function renderTransactions() {
  list.innerHTML = "";

  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${t.text} (₹${t.amount})
      <button onclick="deleteTransaction(${t.id})">X</button>
    `;

    list.appendChild(li);

    if (t.type === "income") {
      income += t.amount;
    } else {
      expense += t.amount;
    }
  });

  incomeEl.innerText = income;
  expenseEl.innerText = expense;
  balanceEl.innerText = income - expense;
}

function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  updateLocalStorage();
  renderTransactions();
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

renderTransactions();