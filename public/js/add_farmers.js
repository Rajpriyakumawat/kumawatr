// Get the objects we need to modify
let addFarmersForm = document.getElementById('add-farmers-form-ajax');

// Modify the objects we need
addFarmersForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputName = document.getElementById("input-name");
    let inputContactPerson = document.getElementById("input-contact-person");
    let inputLocation = document.getElementById("input-location");
    let inputCropType = document.getElementById("input-crop-type");

    // Get the values from the form fields
    let nameValue = inputName.value;
    let contactPersonValue = inputContactPerson.value;
    let locationValue = inputLocation.value;
    let cropTypeValue = inputCropType.value;

    // Put our data we want to send in a javascript object
    let data = {
        name: nameValue,
        contactPerson: contactPersonValue,
        location: locationValue,
        cropType: cropTypeValue
    }
    
    // Setup our AJAX request
    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/farmers", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Add the new data to the table
            addRowToFarmersTable(data);

            // Clear the input fields for another transaction
            inputName.value = '';
            inputContactPerson.value = '';
            inputLocation.value = '';
            inputCropType.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

// Creates a single row from an Object representing a single record from Farmers
addRowToFarmersTable = (data) => {
    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("farmers-table");

    // Create a row and 5 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let nameCell = document.createElement("TD");
    let contactPersonCell = document.createElement("TD");
    let locationCell = document.createElement("TD");
    let cropTypeCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = data.farmerID;
    nameCell.innerText = data.name;
    contactPersonCell.innerText = data.contactPerson;
    locationCell.innerText = data.location;
    cropTypeCell.innerText = data.cropType;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(nameCell);
    row.appendChild(contactPersonCell);
    row.appendChild(locationCell);
    row.appendChild(cropTypeCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}
