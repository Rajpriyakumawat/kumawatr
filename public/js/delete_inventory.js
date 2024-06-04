function deleteInventory(productType) {
  let link = '/inventory';
  let data = {
      productType: productType
  };

  $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
          deleteRow(productType);
      },
      error: function(xhr, status, error) {
          console.log("There was an error with the delete request.");
      }
  });
}

function deleteRow(productType) {
  let table = document.getElementById("inventory-table");
  for (let i = 0, row; row = table.rows[i]; i++) {
      if (table.rows[i].getAttribute("data-value") == productType) {
          table.deleteRow(i);
          break;
      }
  }
}
