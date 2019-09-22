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


connection.connect(function(err) {
  if (err) throw err;
 //console.log("connected as id " + connection.threadId);
});


function viewSalesbyDept(){
    connection.query("select products.product_sales, departments.department_name, products.department_name, departments.over_head_cost, departments.department_id from products JOIN departments ON (departments.department_name = products.department_name)", function(err, res) {
        if(err) throw err;
        console.log (res)
        var table = new Table({
            head: ['Department ID', 'Department Name', 'Overhead Sales', 'Product Sales' ]    
        ,colWidths: [20, 20,20, 20]
        });
        for (var i = 0; i < res.length; i++) {
            table.push(
                [res[i].department_id, res[i].department_name, res[i].over_head_sales, res[i].product_sales]
            );
        };
        console.log(table.toString());
    });
}

// select  top_albums.year,
//                 top_albums.album, 
//         top_albums.position,
//         top5000.song,
//         top5000.artist
// from top_albums
// inner join top5000 on (top_albums.artist = top5000.artist and top_albums.year = top5000.year)
// where (top_albums.artist = "The Beatles" and top5000.artist = "The Beatles")


function addDepartment(){ 
  inquirer
  .prompt([
  {
      type: "input",
      message: "What department would you like to add?",
      name: "dept"
  },  
  {
      type: "input",
      message: "What is the overhead cost?",
      name: "overhead"
  },  
   
        
  ]).then(function(addDept) {
    console.log("Updating departments...\n");
    var query = connection.query(
      "INSERT INTO departments SET ? ",
      [
        {
        department_name: addDept.dept,
        over_head_cost: addDept.overhead,
        }
      ],
      function(err, res) {
        if (err) throw err;
        console.log(res.affectedRows + " items updated!\n");
    
      }
    )
  });
};




viewSalesbyDept()


// function newDept
