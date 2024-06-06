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
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToInventoryTable(data);

            // Clear the input fields for another transaction
            inputProductType.value = '';
            inputQuantity.value = '';
            inputLocation.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Inventory
addRowToInventoryTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("inventory-table");

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let productTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let deleteCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = data.inventoryID;
    productTypeCell.innerText = data.productType;
    quantityCell.innerText = data.quantity;
    locationCell.innerText = data.location;

    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(productTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(locationCell);
    row.appendChild(deleteCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
