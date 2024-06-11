//<!-- 
//Citation for general JavaScript files
//Date: 06/10/2024
//Adapted from JavaScript pages for the BSG Planets People Entity in the Developing in Node.JS Exploration Module.

//Source URLs: 
//- https://github.com/osu-cs340-ecampus/nodejs-starter-app
//-->


function deleteInventory(inventoryID) {
  let link = '/inventory';
  let data = {
      inventoryID: inventoryID
  };

  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
          deleteRow(inventoryID);
      },
      error: function(xhr, status, error) {
          console.log("There was an error with the delete request.");
      }
  });
}

function deleteRow(inventoryID) {
  let table = document.getElementById("inventory-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == inventoryID) {
          table.deleteRow(i);
          break;
      }
  }
}
