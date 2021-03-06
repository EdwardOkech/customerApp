﻿//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('customersService', function () {
    this.getCustomers = function () {
        return customers;
    };
    
    this.insertCustomer = function (firstName, lastName, address, city) {
        var topID = customers.length + 1;
        customers.push({
            id: topID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city
        });
    };

   //inserting new order for a customer


   this.getOrders = function(){
        return orders;
    };

   this.insertOrder = function (product, price, quantity, orderTotal){
        
        orders.push({
            product : product,
            price : price,
            quantity : quantity,
            orderTotal: orderTotal,
          });
    }; 

    this.deleteCustomer = function (id) {
        for (var i = customers.length - 1; i >= 0; i--) {
            if (customers[i].id === id) {
                customers.splice(i, 1);
                break;
            }
        }
    };

    this.getCustomer = function (id) {
        for (var i = 0; i < customers.length; i++) {
            if (customers[i].id === id) {
                return customers[i];
            }
        }
        return null;
    };
  // this.getOrders = customers.orders;

    var customers = [
        {
            id: 1, firstName: 'Edward', lastName: 'Okech', address: '1234 Hapa Kule St.', city: 'Nairobi',
            orders: [
                { product: 'Book: program or be programmed', price: 29.99, quantity: 1, orderTotal: 29.99 },
                { product: 'Fifa 16', price: 9.99, quantity: 1, orderTotal: 39.96 },
                { product: 'Rolex watch', price: 1245.99, quantity: 1, orderTotal: 1245.99 }
            ]
        },
        
    ];

});
