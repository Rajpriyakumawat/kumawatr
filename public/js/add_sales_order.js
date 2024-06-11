//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->

// Get the objects we need to modify
let addSalesOrderForm = document.getElementById('add-sales-order-form-ajax');

// Modify the objects we need
addSalesOrderForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductType = document.getElementById("input-product-type");
    let inputQuantity = document.getElementById("input-quantity");
    let inputCustomerID = document.getElementById("input-customer-id");
    let inputOrderDate = document.getElementById("input-order-date");
    let inputStatus = document.getElementById("input-status");
    let inputInventoryID = document.getElementById("input-inventory-id");

    // Get the values from the form fields
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let customerIDValue = inputCustomerID.value;
    let orderDateValue = inputOrderDate.value;
    let statusValue = inputStatus.value;
    let inventoryIDValue = inputInventoryID.value;

    // Put our data we want to send in a javascript object
    let data = {
        productType: productTypeValue,
        quantity: quantityValue,
        customerID: customerIDValue,
        orderDate: orderDateValue,
        status: statusValue,
        inventoryID: inventoryIDValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/sales-orders", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToSalesOrdersTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductType.value = '';
            inputQuantity.value = '';
            inputCustomerID.value = '';
            inputOrderDate.value = '';
            inputStatus.value = '';
            inputInventoryID.value = '';

        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            window.alert("There was an error with your input. Please make sure that any FK ID you're entering exists in the table that it references.")
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Inventory
addRowToSalesOrdersTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("sales-orders-table");

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let statusCell = document.createElement("TD");
    let inventoryIDCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.inventoryID;
    productTypeCell.innerText = newRow.productType;
    quantityCell.innerText = newRow.quantity;
    customerIDCell.innerText = newRow.customerID;
    orderDateCell.innerText = newRow.orderDate;
    statusCell.innerText = newRow.status;
    inventoryIDCell.innerText = newRow.inventoryID;

    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(productTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(customerIDCell);
    row.appendChild(orderDateCell);
    row.appendChild(statusCell);
    row.appendChild(inventoryIDCell);

    row.setAttribute('data-value', newRow.orderID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}