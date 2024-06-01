/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
PORT        = 3014;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'));         // this is needed to allow for the form to use the ccs style sheet/javscript
    

app.get('/', function(req, res) {
    res.render('index')
})

// Inventory routes

// Home route to display inventory
app.get('/inventory', function(req, res) {  
    let query1 = "SELECT * FROM Inventory;";
    db.pool.query(query1, function(error, rows, fields){     
        res.render('inventory', {data: rows});                     
    });
});

// Insert inventory
app.post('/inventory', function(req, res) {
    let data = req.body;

    // Create the query and run it on the database
    let query = `INSERT INTO Inventory (productType, quantity, location) VALUES ('${data['input-product-type']}', ${parseInt(data['input-quantity'])}, '${data['input-location']}')`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, redirect back to inventory page
            res.redirect('/inventory');
        }
    })
});

app.put('/put-inventory-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;

    // Create the query and run it on the database
    let query = `UPDATE Inventory SET location = '${data.location}' WHERE productType = '${data.productType}'`;
    db.pool.query(query, function(error, rows, fields){

        // Check to see if there was an error
        if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error)
            res.sendStatus(400);
        } else {
            // If there was no error, perform a SELECT to get updated inventory data
            let selectQuery = `SELECT * FROM Inventory`;
            db.pool.query(selectQuery, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    })
});

app.delete('/delete-inventory-ajax', function(req, res) 
{
    // Capture the incoming data and parse it back to a JS object
    let data = req.body;
    let updateInventoryQuery = `UPDATE Inventory SET productType = ?, quantity = ?, location = ? WHERE inventoryID = ?`;
    let selectInventory = `SELECT * FROM Inventory WHERE inventoryID = ?`
    
    db.pool.query(updateInventoryQuery, [data.productType, data.quantity, data.location, data.inventoryID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectInventory, [data.productType], function(error, rows, fields) {
                if (error) {
                    console.log(error)
                    res.sendStatus(400)
                } else {
                    res.send(rows)
                }
            })
        }
    });
});

app.get('/sales-orders', function(req, res) {
    let query = "SELECT * FROM SalesOrders;";
    db.pool.query(query, function(error, rows, fields) {
        res.render('sales-orders', {data: rows})
    })
})

app.post('/add-sales-order-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO SalesOrders (productType, quantity, customerID, orderDate, status, inventoryID) VALUES ('${data['input-product-type']}', ${parseInt(data['input-quantity'])}, ${parseInt(data['input-customer-id'])}, '${data['input-order-date']}', '${data['input-status']}', ${parseInt(data['input-inventory-id'])})`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/sales-orders');
        }
    });
});

// Customers routes
app.get('/customers', function(req, res) {
    let query = "SELECT * FROM Customers;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('customers', {data: rows});
        }
    });
});

app.post('/add-customer-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Customers (name, contactPerson, location) VALUES ('${data['input-name']}', '${data['input-contact-person']}', '${data['input-location']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/customers');
        }
    });
});

// Deliveries routes
app.get('/deliveries', function(req, res) {
    let query = "SELECT * FROM Deliveries;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('deliveries', {data: rows});
        }
    });
});

app.post('/add-delivery-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Deliveries (orderID, deliveryDate) VALUES (${parseInt(data['input-order-id'])}, '${data['input-delivery-date']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/deliveries');
        }
    });
});

// Farmers routes
app.get('/farmers', function(req, res) {
    let query = "SELECT * FROM Farmers;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('farmers', {data: rows});
        }
    });
});

app.post('/add-farmer-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Farmers (name, contactPerson, location, cropType) VALUES ('${data['input-name']}', '${data['input-contact-person']}', '${data['input-location']}', '${data['input-crop-type']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/farmers');
        }
    });
});

// Harvests routes
app.get('/harvests', function(req, res) {
    let query = "SELECT * FROM Harvests;";
    db.pool.query(query, function(error, rows, fields) {
        res.render('harvests', {data: rows});
    });
});

app.post('/add-harvest-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Harvests (farmerID, cropType, quantity, harvestDate) VALUES (${parseInt(data['input-farmer-id'])}, '${data['input-crop-type']}', ${parseInt(data['input-quantity'])}, '${data['input-harvest-date']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/harvests');
        }
    });
});

// Production Processing routes
app.get('/production-processing', function(req, res) {
    let query = "SELECT * FROM ProductionProcessing;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('production-processing', {data: rows});
        }
    });
});

app.post('/add-production-processing-form-ajax', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Production_Processing (harvestID, productType, quantity, productionDate) VALUES (${parseInt(data['input-harvest-id'])}, '${data['input-product-type']}', ${parseInt(data['input-quantity'])}, '${data['input-production-date']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.redirect('/production-processing');
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
