-- Group: 110
-- Team Members:
-- Sirus Salari
-- Rajpriya Kumawat


-----------------------------
----- FARMERS HTML PAGE -----
-----------------------------

-- SELECT FARMERS
SELECT * FROM Farmers;

-- INSERT FARMER
INSERT INTO Farmers (name, contactPerson, location, cropType)
VALUES (:nameInput, :contactPersonInput, :locationInput, :cropTypeInput);

-----------------------------
----- HARVESTS HTML PAGE -----
-----------------------------

-- SELECT HARVESTS
SELECT * FROM Harvests;

-- INSERT HARVEST
INSERT INTO Harvests (farmerID, cropType, quantity, harvestDate)
VALUES (:farmerIDInput, :cropTypeInput, :quantityInput, :harvestDateInput);

------------------------------------------
----- PRODUCTIONPROCESSING HTML PAGE -----
------------------------------------------

-- SELECT PRODUCTION PROCESSING
SELECT * FROM ProductionProcessing;

-- INSERT PRODUCTION PROCESSING
INSERT INTO ProductionProcessing (harvestID, productType, quantity, productionDate)
VALUES (:harvestIDInput, :productTypeInput, :quantityInput, :productionDateInput);
-----------------------------
----- INVENTORY HTML PAGE -----
-----------------------------
-- INSERT INVENTORY
INSERT INTO Inventory (productType, quantity, location)
VALUES (:productTypeInput, :quantityInput, :locationInput);

-- SELECT INVENTORY
SELECT * FROM Inventory;

-- UPDATE INVENTORY
UPDATE Inventory
SET productType = :productTypeInput, quantity = :quantityInput, location = :locationInput
WHERE inventoryID = :inventoryID_from_the_update_form;

-- DELETE INVENTORY
DELETE FROM Inventory
WHERE inventoryID = :inventoryID_selected_from_browse_inventory_page;

-----------------------------
----- SALESORDERS HTML PAGE -----
-----------------------------

-- SELECT SALES ORDERS
SELECT * FROM SalesOrders;

-- INSERT SALES ORDER
INSERT INTO SalesOrders (productType, quantity, customerID, orderDate, status, inventoryID)
VALUES (:productTypeInput, :quantityInput, :customerIDInput, :orderDateInput, :statusInput, :inventoryIDInput);

-----------------------------
----- CUSTOMERS HTML PAGE -----
-----------------------------

-- SELECT CUSTOMERS
SELECT * FROM Customers;

-- INSERT CUSTOMER
INSERT INTO Customers (name, contactPerson, location)
VALUES (:nameInput, :contactPersonInput, :locationInput);

-----------------------------
----- DELIVERIES HTML PAGE -----
-----------------------------


-- SELECT DELIVERIES
SELECT * FROM Deliveries;

-- INSERT DELIVERY
INSERT INTO Deliveries (orderID, deliveryDate)
VALUES (:orderIDInput, :deliveryDateInput);
