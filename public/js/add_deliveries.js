//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->


// Get the objects we need to modify
let addDeliveryForm = document.getElementById('add-delivery-form-ajax');

// Modify the objects we need
addDeliveryForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-order-id");
    let inputDeliveryDate = document.getElementById("input-delivery-date");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let deliveryDateValue = inputDeliveryDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderID: orderIDValue,
        deliveryDate: deliveryDateValue,
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/deliveries", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToDeliveriesTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputDeliveryDate.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            window.alert("There was an error with your input. Please make sure that any FK ID you're entering exists in the table that it references.")
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Inventory
addRowToDeliveriesTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("deliveries-table");

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let orderIDCell = document.createElement("TD");
    let deliveryDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.deliveryID;
    orderIDCell.innerText = newRow.orderID;
    deliveryDateCell.innerText = newRow.deliveryDate;

    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(orderIDCell);
    row.appendChild(deliveryDateCell);

    row.setAttribute('data-value', newRow.deliveryID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}