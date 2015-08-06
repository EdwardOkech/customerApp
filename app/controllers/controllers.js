/*#######################################################################
  
  Edward Okech
  

  #######################################################################*/


//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is ultimately bound to the customers view
app.controller('CustomersController', function ($scope, customersService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.customers = customersService.getCustomers();
        
    }

    $scope.insertCustomer = function () {
        var firstName = $scope.newCustomer.firstName;
        var lastName = $scope.newCustomer.lastName;
        var address = $scope.newCustomer.address;
        var city = $scope.newCustomer.city;
        customersService.insertCustomer(firstName, lastName, address, city);
        $scope.newCustomer.firstName = '';
        $scope.newCustomer.lastName = '';
        $scope.newCustomer.address = '';
        $scope.newCustomer.city = '';
    };


   

   /*$scope.insertOrder = function() {
        var orders.product = $scope.newOrder.orders.product;
        var orders.price = $scope.newOrder.orders.price;
        var orders.quantity = $scope.newOrder.orders.quantity;
        var orders.orderTotal = $scope.newOrder.orders.orderTotal;
        customersService.insertOrder(orders.product, orders.price, orders.quantity, orders.orderTotal);
        $scope.newOrder.orders.product = '';
        $scope.newOrder.orders.price = '';
        $scope.newOrder.orders.quantity = '';
        $scope.newOrder.orders.orderTotal = '';
     }; */
        

    $scope.deleteCustomer = function (id) {
        customersService.deleteCustomer(id);
    };
});

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the order view
app.controller('CustomerOrdersController', function ($scope, $routeParams, customersService) {
    $scope.customer = {};
    $scope.ordersTotal = 0.00;
    $scope.insertOrder = function(){
          var product = $scope.newOrder.product;
          var price = $scope.newOrder.price;
          var quantity = $scope.newOrder.quantity;
          customersService.insertOrder(product, price, quantity, orderTotal);
          $scope.newOrder.product = '';
          $scope.newOrder.price = null;
          $scope.newOrder.quantity = null;
          $scope.newOrder.orderTotal = $scope.newOrder.price * $scope.newOrder.quantity;
       };

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        //$scope.orders = customersService.getOrders();
        //Grab customerID off of the route        
        var customerID = ($routeParams.customerID) ? parseInt($routeParams.customerID) : 0;
        if (customerID > 0) {
            $scope.customer = customersService.getCustomer(customerID);
        }
    }

});

//This controller retrieves data from the customersService and associates it with the $scope
//The $scope is bound to the orders view
app.controller('OrdersController', function ($scope, customersService) {
    $scope.customers = [];

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
        $scope.customers = customersService.getCustomers();
    }
});

app.controller('NavbarController', function ($scope, $location) {
    $scope.getClass = function (path) {
        if ($location.path().substr(0, path.length) == path) {
            return true
        } else {
            return false;
        }
    }
});

//This controller is a child controller that will inherit functionality from a parent
//It's used to track the orderby parameter and ordersTotal for a customer. Put it here rather than duplicating 
//setOrder and orderby across multiple controllers.
app.controller('OrderChildController', function ($scope) {
    $scope.orderby = 'product';
    $scope.reverse = false;
    $scope.ordersTotal = 0.00;

    init();

    function init() {
        //Calculate grand total
        //Handled at this level so we don't duplicate it across parent controllers
        if ($scope.customer && $scope.customer.orders) {
            var total = 0.00;
            for (var i = 0; i < $scope.customer.orders.length; i++) {
                var order = $scope.customer.orders[i];
                total += order.orderTotal;
            }
            $scope.ordersTotal = total;
        }
    }

    $scope.setOrder = function (orderby) {
        if (orderby === $scope.orderby)
        {
            $scope.reverse = !$scope.reverse;
        }
        $scope.orderby = orderby;
    };

});
