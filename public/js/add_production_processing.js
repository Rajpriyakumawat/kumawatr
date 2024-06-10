// Get the objects we need to modify
let addProductionProcessingForm = document.getElementById('add-production-processing-form-ajax');

// Modify the objects we need
addProductionProcessingForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputHarvestID = document.getElementById("input-harvest-id");
    let inputProductType = document.getElementById("input-product-type");
    let inputQuantity = document.getElementById("input-quantity");
    let inputProductionDate = document.getElementById("input-production-date");

    // Get the values from the form fields
    let harvestIDValue = inputHarvestID.value;
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let productionDateValue = inputProductionDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        harvestID: harvestIDValue,
        productType: productTypeValue,
        quantity: quantityValue,
        productionDate: productionDateValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/production-processing", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToProductionProcessingTable(xhttp.response);

            // Clear the input fields for another transaction
            inputHarvestID.value = '';
            inputProductType.value = '';
            inputQuantity.value = '';
            inputProductionDate.value = '';
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
    let currentTable = document.getElementById("production-processing-table");

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let harvestIDCell = document.createElement("TD");
    let productTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let productionDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.productionID;
    harvestIDCell.innerText = newRow.harvestID;
    productTypeCell.innerText = newRow.productType;
    quantityCell.innerText = newRow.quantity;
    productionDateCell.innerText = newRow.productionDate;
    
    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(harvestIDCell);
    row.appendChild(productTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(productionDateCell);

    row.setAttribute('data-value', newRow.productionID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}