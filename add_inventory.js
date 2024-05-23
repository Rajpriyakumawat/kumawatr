// Get the objects we need to modify
let addInventoryForm = document.getElementById('add-inventory');

// Modify the objects we need
addInventoryForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    let inputs = ["input-productType", "input-quantity", "input-location"];
    let data = {};
    for (let x of inputs) {
        // Get form fields we need to get data from
        let val = document.getElementById(x).value;
        // Get the values from the form fields
        let key = x.split("-").pop(); // takes the string after the '-' character
        data[key] = val; 
    };

    // Ensure the dictionary is built properly
    console.log('data', data);

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToTable(xhttp.response);
            console.log('xhttp.response', xhttp.response);

            for (let i of inputs) {
                // Clear the input fields for another transaction
                document.getElementById(i).value = '';
            };
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from 
// inventory
addRowToTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("inventory-table");

    // Get the location where we should insert the new row (end of table)
    let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    console.log('parsed data', parsedData);
    let newRow = parsedData[parsedData.length - 1];
    console.log('newRow', newRow);

    // Create a row
    let row = document.createElement("TR");

    // iteratively add all the other data cells to the row
    for (let key in newRow) {
        let nextCell = document.createElement("TD");
        nextCell.innerText = newRow[key];
        row.appendChild(nextCell);
    }

    // Add the delete button to the row
    let deleteCell = document.createElement("TD");
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function() {
        deleteInventory(newRow.inventoryID);
    };
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    // Add a row attribute so the deleteRow function can find a newly added row
    row.setAttribute('data-value', newRow.inventoryID);
    
    // Add the row to the table
    currentTable.appendChild(row);
}

// Function to delete an inventory item
deleteInventory = (id) => {
    let data = { id: id };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", "/inventory", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 204) {
            deleteRow(id);
        } else if (xhttp.readyState == 4 && xhttp.status != 204) {
            console.log("There was an error with the deletion.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
}

// Deletes a row from the table
deleteRow = (inventoryID) => {
    let table = document.getElementById("inventory-table");
    for (let i = 0, row; row = table.rows[i]; i++) {
        if (table.rows[i].getAttribute("data-value") == inventoryID) {
            table.deleteRow(i);
            break;
        }
    }
}
