const expenseService = require('./expense-service.js');
const _ = require('lodash');

const expenseController = {};


// Income létrehozása a '+' gombra kattintva
expenseController.createIncome = function () {
    let item = document.getElementById('itemInput').value;
    let incomeInput = document.getElementById('amountInput').value;

    expenseService.connect()
    expenseService.createIncome(item, incomeInput);

    document.getElementById('itemInput').value = '';
    document.getElementById('amountInput').value = '';
};

// Expense létrehozása a '-' gombra kattintva
expenseController.createExpense = function () {
    let item = document.getElementById('itemInput').value;
    let expenseInput = document.getElementById('amountInput').value;

    expenseService.connect()
    expenseService.createExpense(item, expenseInput);

    document.getElementById('itemInput').value = '';
    document.getElementById('amountInput').value = '';
};

// Táblázat létrehozása
expenseController.renderTable = function(items){

    let tablazatdiv = document.getElementById("tablazat");

    // Törlünk minden elemet a tablazatdivből
    tablazatdiv.innerHTML = ''; 

    // Új táblázat létrehozása
    let table = document.createElement('table'); //table tag
    table.style.border = "1px solid";

    // Header sor létrehozása
    let tr = document.createElement('tr');
    let th1 = document.createElement('th'); 
    let th2 = document.createElement('th'); 
    let th3 = document.createElement('th');
    let th4 = document.createElement('th'); 

    th1.innerHTML = "Date";
    th2.innerHTML = "Title";
    th3.innerHTML = "Income";
    th4.innerHTML = "Expense";

    tr.appendChild(th1);
    tr.appendChild(th2);
    tr.appendChild(th3);
    tr.appendChild(th4);
    table.appendChild(tr);  //tablehoz hozzáadjuk sort


    _.forEach(items, function(item){
        let tr = document.createElement('tr')
        let td1 = document.createElement('td'); 
        let td2 = document.createElement('td');
        let td3 = document.createElement('td');
        let td4 = document.createElement('td');

        td1.innerHTML = item.date;
        td2.innerHTML = item.titel;
        td3.innerHTML = item.income !== undefined ? item.income : "-";
        td4.innerHTML = item.expense !== undefined ? item.expense : "-";

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        table.appendChild(tr);

        });

    // Hozzáadjuk a táblázatot a tablazatdivhez
    tablazatdiv.appendChild(table);
};

// Total rész kiszámolása Redisben
expenseController.total = function(incomes, expenses){
    let totalamount = 0
    let tetel = document.getElementById("tetel");

    _.forEach(incomes, function(income){
        totalamount += parseFloat(income);
    });

    _.forEach(expenses, function(expense){
        totalamount -= parseFloat(expense);
    });
    
    tetel.innerHTML = `<b>Total:</b> ${totalamount}`;
};

module.exports = expenseController;