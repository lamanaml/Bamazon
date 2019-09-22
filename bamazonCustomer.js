var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');
var currencyFormatter = require('currency-formatter');


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "1234",
  database: "bamazon_db"
});
console.log("\n--------------------------------------------------------------------------------------\n");
  console.log("                              Welcome to Bamazon.com              ")
console.log("\n-------------------------------------------------------------------------------------\n");

connection.connect(function(err) {
  if (err) throw err;
 //console.log("connected as id " + connection.threadId);
});
var table = new Table({
   head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity', 'Product Sales' ]    
   ,colWidths: [10,20,20,20,15, 17]
});

function showAll() {// display all items for sale
  connection.query("select * from products", function(err, res) {
    if(err) throw err;
    table = new Table({
    head: ['Item ID', 'Product Name', 'Department Name', 'Price', 'Quantity', 'Product Sales' ]    
    ,colWidths: [10,20,20,20,15, 17]
    });
    for (var i = 0; i < res.length; i++) {
            table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity, res[i].product_sales]
        );
      }
      console.log(table.toString());
  
      buy()
    });
}

function buy() { // prompt to ask customer what they would like to purchase
  inquirer.prompt([
    {
    name: "id",
    type: "input",
    message: "Which item number would like to purchase?"
  }, 
  {
    name: "qty",
    type: "input",
    message: "How many would like to purchase?"
  }
  ])
  .then(function(custInput) { 
    var itemNum = custInput.id;
    var quantity = custInput.qty;
    custOrder(itemNum, quantity);
    })
};

function custOrder (id, qty) {//checks product availablity, notifies customer accodingly, updates database
  var test = connection.query("SELECT item_id, product_name, product_sales, price, stock_quantity from products WHERE item_id = "  + id, function(err, res) { 
    if(err) throw err;
    if (qty <= res[0].stock_quantity){
      var totalCost = parseFloat(res[0].price) * parseFloat(qty);
      console.log("Your total cost for " + qty + " "  + res[0].product_name + " is $" + totalCost );
      newQty = res[0].stock_quantity - qty

    var prodSales = parseFloat(res[0].product_sales) + totalCost
    console.log("Your order is on the way, Thank you!")
    newQty = res[0].stock_quantity - qty
    
      var newAmt = connection.query("UPDATE products SET stock_quantity = " + newQty  + " , product_sales = " + prodSales + " WHERE item_id = " + id, function(err, resUpdate) {
        if(err) throw err;
      console.log(resUpdate.affectedRows + " products updated!\n");
      })

    }
      else {
        console.log("Sorry we do not have enough " + res[0].product_name + " to complete your order. Please revise your order");
        showAll()
      };
      connection.end();
    });
  };

showAll()

