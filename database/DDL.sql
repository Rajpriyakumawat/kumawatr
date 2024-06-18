-- Group: 110
-- Team Members:
-- Sirus Salari
-- Rajpriya Kumawat

CREATE TABLE `Farmers` (
  `farmerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(145) NOT NULL,
  `contactPerson` varchar(145) DEFAULT NULL,
  `location` varchar(145) NOT NULL,
  `cropType` varchar(145) DEFAULT NULL,
  PRIMARY KEY (`farmerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Farmers` (`name`, `contactPerson`, `location`, `cropType`) VALUES
('Farm A', 'Arya Myra', 'Location Bothell', 'Peas'),
('Farm B', 'Micheal Mishra', 'Location Seattle', 'Corn'),
('Farm C', 'Mike Albert', 'Location Bellevue', 'Carrot');

CREATE TABLE `Harvests` (
  `harvestID` int(11) NOT NULL AUTO_INCREMENT,
  `farmerID` int(11) NOT NULL,
  `cropType` varchar(145) NOT NULL,
  `quantity` int(11) NOT NULL,
  `harvestDate` date NOT NULL,
  PRIMARY KEY (`harvestID`),
  KEY `farmerID` (`farmerID`),
  CONSTRAINT `Harvests_ibfk_1` FOREIGN KEY (`farmerID`) REFERENCES `Farmers` (`farmerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Harvests` (`farmerID`, `cropType`, `quantity`, `harvestDate`) VALUES
((select farmerID from Farmers where cropType="Peas"), 'Peas', 1000, '2022-12-01'),
((select farmerID from Farmers where cropType="Corn"), 'Corn', 800, '2022-12-02'),
((select farmerID from Farmers where cropType="Carrot"), 'Carrot', 1200, '2022-12-03');


CREATE TABLE `ProductionProcessing` (
  `productionID` int(11) NOT NULL AUTO_INCREMENT,
  `harvestID` int(11) NOT NULL,
  `productType` varchar(145) NOT NULL,
  `quantity` int(11) NOT NULL,
  `productionDate` date NOT NULL,
  PRIMARY KEY (`productionID`),
  KEY `harvestID` (`harvestID`),
  CONSTRAINT `Production_Processing_ibfk_1` FOREIGN KEY (`harvestID`) REFERENCES `Harvests` (`harvestID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `ProductionProcessing` (`harvestID`, `productType`, `quantity`, `productionDate`) VALUES
((select harvestID from Harvests where cropType="Peas"), 'Flour', 500, '2022-12-05'),
((select harvestID from Harvests where cropType="Corn"), 'Cornmeal', 400, '2022-12-06'),
((select harvestID from Harvests where cropType="Carrot"), 'Carrot Juice', 600, '2022-12-07');

CREATE TABLE `Inventory` (
  `inventoryID` int(11) NOT NULL AUTO_INCREMENT,
  `productType` varchar(145) NOT NULL,
  `quantity` int(11) NOT NULL,
  `location` varchar(145) NOT NULL,
  PRIMARY KEY (`inventoryID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Inventory` (`productType`, `quantity`, `location`) VALUES
('Flour', 500, 'Location Bothell'),
('Cornmeal', 400, 'Location Seattle'),
('Carrot Juice', 600, 'Location Bellevue');

CREATE TABLE `Customers` (
  `customerID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(145) NOT NULL,
  `contactPerson` varchar(145) DEFAULT NULL,
  `location` varchar(145) NOT NULL,
  PRIMARY KEY (`customerID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Customers` (`name`, `contactPerson`, `location`) VALUES
('Customer Kellogs', 'Arya Myra', 'Location Bothell'),
('Customer Frito-Lay', 'Micheal Mishra', 'Location Seattle'),
('Customer Nestle', 'Mike Albert', 'Location Bellevue');

CREATE TABLE `SalesOrders` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `productType` varchar(145) NOT NULL,
  `quantity` int(11) NOT NULL,
  `customerID` int(11) NOT NULL,
  `orderDate` date NOT NULL,
  `status` varchar(145) NOT NULL,
  `inventoryID` int(11) DEFAULT NULL,
  PRIMARY KEY (`orderID`),
  KEY `customerID` (`customerID`),
  KEY `inventoryID` (`inventoryID`),
  CONSTRAINT `SalesOrders_ibfk_1` FOREIGN KEY (`customerID`) REFERENCES `Customers` (`customerID`),
  CONSTRAINT `SalesOrders_ibfk_2` FOREIGN KEY (`inventoryID`) REFERENCES `Inventory` (`inventoryID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- Insert data into SalesOrders table
INSERT INTO `SalesOrders` (`productType`, `quantity`, `customerID`, `orderDate`, `status`, `inventoryID`) VALUES
('Flour', 100, (select customerID from Customers where name="Customer Kellogs"), '2022-12-10', 'Shipped', (select inventoryID from Inventory where productType="Flour")),
('Cornmeal', 80, (select customerID from Customers where name="Customer Frito-Lay"), '2022-12-11', 'Delivered', (select inventoryID from Inventory where productType="Cornmeal")),
('Carrot Juice', 120, (select customerID from Customers where name="Customer Nestle"), '2022-12-12', 'Pending', (select inventoryID from Inventory where productType="Carrot Juice"));

CREATE TABLE `Deliveries` (
  `deliveryID` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL,
  `deliveryDate` date NOT NULL,
  PRIMARY KEY (`deliveryID`),
  KEY `orderID` (`orderID`),
  CONSTRAINT `Deliveries_ibfk_1` FOREIGN KEY (`orderID`) REFERENCES `SalesOrders` (`orderID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

INSERT INTO `Deliveries` (`orderID`, `deliveryDate`) VALUES
((select orderID from SalesOrders where productType="Flour"), '2022-12-12'),
((select orderID from SalesOrders where productType="Cornmeal"), '2022-12-13'),
((select orderID from SalesOrders where productType="Carrot Juice"), '2022-12-14');
