// Get the objects we need to modify
let addInventoryForm = document.getElementById('add-inventory-form-ajax');

// Modify the objects we need
addInventoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductType = document.getElementById("input-product-type");
    let inputQuantity = document.getElementById("input-quantity");
    let inputLocation = document.getElementById("input-location");

    // Get the values from the form fields
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let locationValue = inputLocation.value;

    // Put our data we want to send in a javascript object
    let data = {
        productType: productTypeValue,
        quantity: quantityValue,
        location: locationValue
    }

    console.log('data:')
    console.log(data)
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToInventoryTable(xhttp.response);

            // Clear the input fields for another transaction
            inputProductType.value = '';
            inputQuantity.value = '';
            inputLocation.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

// Creates a single row from an Object representing a single record from Inventory
addRowToInventoryTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("inventory-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    // Create a row and 3 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let locationCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.inventoryID;
    productTypeCell.innerText = newRow.productType;
    quantityCell.innerText = newRow.quantity;
    locationCell.innerText = newRow.location;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(productTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(locationCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
