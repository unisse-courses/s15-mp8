const OrderModel = require('../models/order');

exports.getOrderStatus = (req, res) => {
    var stat = req.params.status;
    var status, btn;
    
    if (stat == "received") {
        status = "Received";
        btn = "Prepare"
    } else if (stat == "preparing") {
        status = "Preparing"
        btn = "Serve"
    } else if (stat == "ready") {
        status = "Ready"
        btn = "Done"
    }  
    
    OrderModel.getOrderStatuses(function(orders) {
        res.render('order-status-admin',  { 
            title: `${status} - Update Orders`, 
            status: status,
            loc: 'Update Orders',
            isAdmin: true,
            loggedIn: true,
            layout: 'update-status',
            orders: orders, 
            btn: btn
        });
    })
}
