/*
    SETUP
*/

// Express
var express = require('express');
var app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
PORT = 3025;

// Database
var db = require('./database/db-connector');

// Handlebars
const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     
app.engine('.hbs', engine({extname: ".hbs"}));  
app.set('view engine', '.hbs');                 

/*
    ROUTES
*/

// Home route to display inventory
app.get('/', function(req, res) {  
    let query1 = "SELECT * FROM Inventory;";
    db.pool.query(query1, function(error, rows, fields){     
        res.render('index', {data: rows});                     
    });
});

// Insert inventory
app.post('/inventory', function(req, res) {
    let data = req.body;

    // Create the query and run it on the database
    let insertInventory = `INSERT INTO Inventory (productType, quantity, location) VALUES('${data.productType}', '${data.quantity}', '${data.location}')`;
    db.pool.query(insertInventory, function(error, rows, fields){

        if (error) {
            console.log(error)
            res.sendStatus(400);
        } else {
            let getAllInventory = `SELECT * FROM Inventory;`;
            db.pool.query(getAllInventory, function(error, rows, fields){
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

// Update inventory
app.put('/inventory', function(req, res) {
    let data = req.body;
    let updateInventoryQuery = `UPDATE Inventory SET productType = ?, quantity = ?, location = ? WHERE inventoryID = ?`;
    
    db.pool.query(updateInventoryQuery, [data.productType, data.quantity, data.location, data.inventoryID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(200);
        }
    });
});

// Delete inventory
app.delete('/inventory', function(req, res) {
    let data = req.body;
    let inventoryID = parseInt(data.id);
    let deleteInventoryQuery = `DELETE FROM Inventory WHERE inventoryID = ?`; 
  
    db.pool.query(deleteInventoryQuery, [inventoryID], function(error, rows, fields){
        if (error) {
            console.log(error);
            res.sendStatus(400);
        } else {
            res.sendStatus(204);
        }
    });
});

/*
    LISTENER
*/
app.listen(PORT, function(){
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
});
