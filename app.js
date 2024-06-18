//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server
var app     = express();            // We need to instantiate an express object to interact with the server in our code
var PORT    = 3015;                 // Set a port number at the top so it's easy to change in the future

// app.js
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.

// Database
var db = require('./database/db-connector')

// app.js - SETUP section
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public')); // this is needed to allow for the form to use the ccs style sheet/javscript

app.get('/', function(req, res) {
    res.render('index')
})

// Inventory routes
app.get('/inventory', function(req, res) {
    let query = "SELECT * FROM Inventory;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('inventory', {data: rows});
        }
    });
});

app.post('/inventory', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Inventory (productType, quantity, location) VALUES ('${data['productType']}', ${parseInt(data['quantity'])}, '${data['location']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from Inventory;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })
        }
    });
});

app.put('/inventory', function(req, res) {
    let data = req.body;

    let productType = parseInt(data.productType);
    let quantity = parseInt(data.quantity);
    let location = data.location;

    let query = `UPDATE Inventory SET quantity = ?, location = ? WHERE inventoryID = ?`;
    let selectQuery = `SELECT * FROM Inventory where inventoryID = ?`

    db.pool.query(query, [quantity, location, productType], function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            db.pool.query(selectQuery, [productType], function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

app.delete('/inventory', function(req, res) {
    let data = req.body;
    let query = `DELETE FROM Inventory WHERE inventoryID = '${data.inventoryID}'`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            let selectQuery = `SELECT * FROM Inventory`;
            db.pool.query(selectQuery, function(error, rows, fields) {
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                } else {
                    res.send(rows);
                }
            });
        }
    });
});

// Sales Orders routes
app.get('/sales-orders', function(req, res) {
    let query = "SELECT * FROM SalesOrders;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('sales-orders', {data: rows});
        }
    });
});

app.post('/sales-orders', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO SalesOrders (productType, quantity, customerID, orderDate, status, inventoryID) VALUES ('${data['productType']}', ${parseInt(data['quantity'])}, ${parseInt(data['customerID'])}, '${data['orderDate']}', '${data['status']}', ${parseInt(data['inventoryID'])})`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from SalesOrders;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })
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

app.post('/customers', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Customers (name, contactPerson, location) VALUES ('${data['name']}', '${data['contactPerson']}', '${data['location']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from Customers;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows);
                }
            })
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

app.post('/deliveries', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Deliveries (orderID, deliveryDate) VALUES (${parseInt(data['orderID'])}, '${data['deliveryDate']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from Deliveries;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })
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

app.post('/farmers', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Farmers (name, contactPerson, location, cropType) VALUES ('${data['name']}', '${data['contactPerson']}', '${data['location']}', '${data['cropType']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from Farmers;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })        
        }
    });
});

// Harvests routes
app.get('/harvests', function(req, res) {
    let query = "SELECT * FROM Harvests;";
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.render('harvests', {data: rows});
        }
    });
});

app.post('/harvests', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO Harvests (farmerID, cropType, quantity, harvestDate) VALUES (${parseInt(data['farmerID'])}, '${data['cropType']}', ${parseInt(data['quantity'])}, '${data['harvestDate']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from Harvests;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })
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

app.post('/production-processing', function(req, res) {
    let data = req.body;
    let query = `INSERT INTO ProductionProcessing (harvestID, productType, quantity, productionDate) VALUES (${parseInt(data['harvestID'])}, '${data['productType']}', ${parseInt(data['quantity'])}, '${data['productionDate']}')`;
    db.pool.query(query, function(error, rows, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            select_query = `SELECT * from ProductionProcessing;`;
            db.pool.query(select_query, function(error, rows, fields){
                if (error) {
                    console.log(error);
                    res.sendStatus(400);
                }
                else {
                    res.send(rows)
                }
            })
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function() {       // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
