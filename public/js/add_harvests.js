//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->



// Get the objects we need to modify
let addHarvestsForm = document.getElementById('add-harvest-form-ajax');

// Modify the objects we need
addHarvestsForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputFarmerID = document.getElementById("input-farmer-id");
    let inputCropType = document.getElementById("input-crop-type");
    let inputQuantity = document.getElementById("input-quantity");
    let inputHarvestDate = document.getElementById("input-harvest-date");

    // Get the values from the form fields
    let farmerIDValue = inputFarmerID.value;
    let cropTypeValue = inputCropType.value;
    let quantityValue = inputQuantity.value;
    let harvestDateValue = inputHarvestDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        farmerID: farmerIDValue,
        cropType: cropTypeValue,
        quantity: quantityValue,
        harvestDate: harvestDateValue
    }

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/harvests", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToHarvestsTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFarmerID.value = '';
            inputCropType.value = '';
            inputQuantity.value = '';
            inputHarvestDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            window.alert("There was an error with your input. Please make sure that any FK ID you're entering exists in the table that it references.")
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Creates a single row from an Object representing a single record from Harvests
addRowToHarvestsTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("harvests-table");

    let parsedData = JSON.parse(data)
    let newRow = parsedData[parsedData.length - 1];

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let farmerIDCell = document.createElement("TD");
    let cropTypeCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let harvestDateCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.harvestID;
    farmerIDCell.innerText = newRow.farmerID;
    cropTypeCell.innerText = newRow.cropType;
    quantityCell.innerText = newRow.quantity;
    harvestDateCell.innerText = newRow.harvestDate;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(farmerIDCell);
    row.appendChild(cropTypeCell);
    row.appendChild(quantityCell);
    row.appendChild(harvestDateCell);

    row.setAttribute('data-value', newRow.inventoryID);

    // Add the row to the table
    currentTable.appendChild(row);
}
