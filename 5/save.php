<?php

// Check if POST method is used
if($_SERVER["REQUEST_METHOD"] == "POST"){

    // Receive data from JavaScript
    $productID = $_POST["productID"];

    $productName = $_POST["productName"];

    $quantitySold = $_POST["quantitySold"];

    $price = $_POST["price"];


    // Load XML file
    $xml = simplexml_load_file("sales.xml");


    // Create new sale node
    $sale = $xml->addChild("sale");


    // Add child elements
    $sale->addChild("productID", $productID);

    $sale->addChild("productName", $productName);

    $sale->addChild("quantitySold", $quantitySold);

    $sale->addChild("price", $price);


    // Save updated XML
    $xml->asXML("sales.xml");


    // Success Message
    echo "Sale Added Successfully";
}

?>