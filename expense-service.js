let _ = require('lodash');
let mongoose = require('mongoose');
let redis = require('redis');

const incomeChannel = 'income';
const expenseChannel = 'expense';
let redisClient;

const expenseService = {};

// Az item model leírása
const Item = mongoose.model('Item', new mongoose.Schema({
    titel: String,
    income: Number,
    expense: Number,
    date: String,
}));

// Redis kliens létrehozása
redisClient = redis.createClient({
    host: "127.0.0.1", port: 6379, retry_strategy: function () {
    }
});

// Csatlakozás az adatbázisokhoz
expenseService.connect = async function () {
    let db = await mongoose.connect('mongodb://127.0.0.1:27017/cubix?authSource=admin', { useNewUrlParser: true, useUnifiedTopology: true })
    await redisClient.connect()
};

// Új income létrehozása
expenseService.createIncome = async function (item, incomeInput) {

    let newitem = new Item({
        titel: item,
        income: incomeInput,
        date: new Date().toLocaleDateString("en-GB"),
    })
    // Mentés mongoDB-be
    await newitem.save();
    // Mentés Redisbe
    await redisClient.LPUSH(incomeChannel, incomeInput);
    // Táblázathoz új sor hozzáadása
    expenseService.mongodbList(expenseController.renderTable)
    // Total rész frissítése
    expenseService.redisLists(expenseController.total)
};

// Új expense létrehozása mongodb-ben
expenseService.createExpense = async function (item, expenseInput) {

    let newitem = new Item({
        titel: item,
        expense: expenseInput,
        date: new Date().toLocaleDateString("en-GB"),
    })
    // Mentés mongoDB-be
    await newitem.save();
    // Mentés Redisbe
    await redisClient.LPUSH(expenseChannel, expenseInput);
    // Táblázathoz új sor hozzáadása
    expenseService.mongodbList(expenseController.renderTable);
    // Total rész frissítése
    expenseService.redisLists(expenseController.total)

};

// MongoDB-ben az items collection lehívása
expenseService.mongodbList = function(cb){

    Item.find({}).then(function(item){
        cb(item);
    });
};

// Redisben az expense és income listák lehívása
expenseService.redisLists = function(cb) {
    Promise.all([
        redisClient.LRANGE(incomeChannel, 0, -1),
        redisClient.LRANGE(expenseChannel, 0, -1)
    ]).then(function([incomes, expenses]) {
        cb(incomes, expenses);
    });
};

// Lecsatlakozik a szerverről
expenseService.disconnect = function () {
};

module.exports = expenseService;