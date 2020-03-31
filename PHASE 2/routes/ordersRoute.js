const router = require('express').Router();

router.get('/ready', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Ready - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Done'
        },
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Done'
        },
        {
            customerNickname: "Ainsley",
            orderNum: '000001',
            numOfOrders: '2',
            buttonLbl: 'Done'
        }]
    });
});

router.get('/preparing', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Preparing - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Serve'
            }],
            
    });
});

router.get('/received', (req, res) => {
    res.render('order-status-admin',  { 
        title: 'Received - Update Orders', 
        loc: 'Update Orders',
        isAdmin: true,
        loggedIn: true,
        layout: 'update-status',
        orders: [
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
            {
                customerNickname: "Ainsley",
                orderNum: '000001',
                numOfOrders: '2',
                buttonLbl: 'Prepare'
            },
        ]           
    });
});


module.exports = router;