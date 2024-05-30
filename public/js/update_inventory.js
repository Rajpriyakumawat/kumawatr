//this module adapted from the starter code
//osu-cs340 nodejs-starter-app
//date 5/30/24
//URL source: https://github.com/osu-cs340-ecampus/nodejs-starter-app

let updateInventoryForm = document.getElementById('update-inventory-form-ajax');

updateInventoryForm.addEventListener("submit", function (e){
    e.preventDefault();

    let inputID = document.getElementById('update-inventory-name-select');
    let inputProductType = document.getElementById("update-inventory-product-type");
    let inputQuantity = document.getElementById("update-inventory-quantity");
    let inputLocation = document.getElementById("update-inventory-location");

    // Get the values from the form fields
    let idValue = inputID.value;
    let productTypeValue = inputProductType.value;
    let quantityValue = inputQuantity.value;
    let locationValue = inputLocation.value;
    

    // Put our data we want to send in a javascript object
    let data = {
        inventoryID: idValue,
        productType: productTypeValue,
        quantity: quantityValue,
        location: locationValue
    };

    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-inventory-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Update the row in the table
            updateRow(xhttp.response, inputID.value);

        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

})

function updateRow(data, inventoryID){
    let parsedData = JSON.parse(data);    
    let table = document.getElementById("inventory-table");

    for (let i = 0, row; row = table.rows[i]; i++){
        if(table.rows[i].getAttribute("data-value") == inventoryID){
            let updateRowIndex = table.getElementsByTagName("tr")[i];
            let td1 = updateRowIndex.getElementsByTagName("td")[0];
            let td2 = updateRowIndex.getElementsByTagName("td")[1];
            let td3 = updateRowIndex.getElementsByTagName("td")[2];
            td1.innerHTML = parsedData[0].inventoryID;
            td2.innerHTML = parsedData[0].productType;
            td3.innerHTML = parsedData[0].quantity;
        }
    }

    
    let selectMenu = document.getElementById("update-inventory-name-select");
    let option = document.createElement("option");
    option.text = parsedData[0].productType;
    option.value = parsedData[0].inventoryID;

    for (let i = 0; i < selectMenu.length; i++){
        if (Number(selectMenu.options[i].value) === Number(inventoryID)){
          selectMenu[i] = option;
          break;
        }   
      }
}
