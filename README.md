# Bamazon.com

## Introduction

> Bamazon is an Amazon-like storefront using MySQL and JavaScript to allow customers to order products, managers to view reports on product sales and replinish products as needed, and supervisors to view overall department sales add new departments.

## GitHub repo 
https://github.com/lamanaml/Bamazon

### NPM's used
mysql

inquirer

cli-table


### Bamazon Customer
>The customer view first shows the customer all of the products in inventory then promps them to purchase a product.  
![bamazonCustomer1](assets/images/customerShowAll.png)

>Products are out of stock
![bamazonCustomer2](assets/images/custshowall_query_outofstock.png)

>Products successfully ordered
![bamazonCustomer3](assets/images/custshowall_query_produpdate.png)

### Bamazon Manager
>View Low Products
![BamazonManager1](assets/images/managerLowInv.png)

>Replinish low inventory
![BamazonSupervisor2](assets/images/managerReplinish.png)

>>one small issue, it set the new inventory value to the number that you add (instead of adding to it) See comments in code
![BamazonSupervisor2](assets/images/managerReplinish2.png)

>Add new products 

>>This should add brand new products...  It worked before I added the department info which was required for the supervisor view.  Now it gives an error that departments is not defined.
![BamazonSupervisor3](assets/images/managerAddNew.png)
      
### Bamazon Supervisor
>View sales by dept

>>This view should total the sales for the categories, but it only shows saless for one product in the category.  See comments in code.
![BamazonSupervisor](assets/images/supervisorSalesbyDept.png)

>Add new department

>>I was able to successfully add a new department, but was not able to join it with the products table. 
![BamazonSupervisor](assets/images/supervisorAddDept.png)

> Outcome

Overall, this project was very challenging but interesting.  I think my biggest issues was trying to read and update in the same function.  For example, reading the department_id from departments and adding it to a new product. 
     
