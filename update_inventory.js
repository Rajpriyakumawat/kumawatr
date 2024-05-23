// Get the objects we need to modify
let updateInventoryForm = document.getElementById('update-inventory-form-ajax');

// Modify the objects we need
updateInventoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputInventoryID = document.getElementById("update-inventoryID");
    let inputProductType = document.getElementById("update-productType");
    let inputQuantity = document.getElementById("update-quantity");
    let inputLocation = document.getElementById("update-location");

    // Get the values from the form fields
    let inventoryIDValue = inputInventoryID.value;
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let locationValue = inputLocation.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        inventoryID: inventoryIDValue,
        productType: productTypeValue,
        quantity: quantityValue,
        location: locationValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            updateRow(xhttp.response, inventoryIDValue);
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, inventoryID) {
    let parsedData = JSON.parse(data);
    
    let table = document.getElementById("inventory-table");

    for (let i = 0, row; row = table.rows[i]; i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == inventoryID) {
            // Get the location of the row where we found the matching inventory ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Get td of each value and update accordingly
            let tdProductType = updateRowIndex.getElementsByTagName("td")[1];
            let tdQuantity = updateRowIndex.getElementsByTagName("td")[2];
            let tdLocation = updateRowIndex.getElementsByTagName("td")[3];

            // Reassign values to our updated values
            tdProductType.innerHTML = parsedData[0].productType;
            tdQuantity.innerHTML = parsedData[0].quantity;
            tdLocation.innerHTML = parsedData[0].location;
        }
    }
}
