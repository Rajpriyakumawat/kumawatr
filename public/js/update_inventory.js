//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->

// Get the objects we need to modify
let updateInventoryForm = document.getElementById('update-inventory-form-ajax');

// Modify the objects we need
updateInventoryForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputProductType = document.getElementById("input-product-type-update");
    let inputQuantity = document.getElementById("input-quantity-update");
    let inputLocation = document.getElementById("input-location-update");

    // Get the values from the form fields
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let locationValue = inputLocation.value;

    // Currently the database table for Inventory does not allow updating values to NULL
    // So we must abort if being passed NULL for location
    if (!locationValue) {
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        productType: productTypeValue,
        quantity: quantityValue,
        location: locationValue,
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateInventoryRow(xhttp.response, productTypeValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateInventoryRow(data, inventoryID) {
    let parsedData = JSON.parse(data);
    let table = document.getElementById("inventory-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        // Rows would be accessed using the "row" variable assigned in the for loop
        if (table.rows[i].getAttribute("data-value") == inventoryID) {
            // Get the location of the row where we found the matching product type
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of quantity and location value
            let tdQuantity = updateRowIndex.getElementsByTagName("td")[2];
            let tdLocation = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign quantity and location to our values we updated to
            tdQuantity.innerHTML = parsedData[0].quantity; 
            tdLocation.innerHTML = parsedData[0].location; 
        }
    }
}
