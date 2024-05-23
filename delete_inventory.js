function deleteInventory(inventoryID) {
    let link = '/inventory';
    let data = {
      id: inventoryID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(inventoryID);
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
  