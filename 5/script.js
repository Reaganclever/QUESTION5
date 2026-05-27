// Function to Display Sales Data

function displaySales(){

    // Fetch XML File
    fetch("sales.xml")

    .then(response => response.text())

    .then(data => {

        // Create XML Parser
        const parser = new DOMParser();

        // Convert XML text into XML document
        const xml =
        parser.parseFromString(data, "application/xml");

        // Get all sale elements
        const sales =
        xml.getElementsByTagName("sale");

        // Select table body
        const tableBody =
        document.querySelector("#salesTable tbody");

        // Clear old rows
        tableBody.innerHTML = "";

        // Loop through each sale
        for(let sale of sales){

            // Get values from XML
            const productID =
            sale.getElementsByTagName("productID")[0].textContent;

            const productName =
            sale.getElementsByTagName("productName")[0].textContent;

            const quantitySold =
            sale.getElementsByTagName("quantitySold")[0].textContent;

            const price =
            sale.getElementsByTagName("price")[0].textContent;


            // Add rows dynamically
            tableBody.innerHTML += `

            <tr>

                <td>${productID}</td>

                <td>${productName}</td>

                <td>${quantitySold}</td>

                <td>${price}</td>

            </tr>

            `;
        }

    });

}


// Add Sale Button Event

document.getElementById("addSaleBtn")
.addEventListener("click", function(){


    // Prompt user for Product ID
    let productID =
    prompt("Enter Product ID");


    // Validation
    if(productID == ""){

        alert("Product ID is required");

        return;
    }


    // Prompt Product Name
    let productName =
    prompt("Enter Product Name");

    if(productName == ""){

        alert("Product Name is required");

        return;
    }


    // Prompt Quantity Sold
    let quantitySold =
    prompt("Enter Quantity Sold");

    // Check if quantity is valid number
    if(quantitySold == "" || isNaN(quantitySold)){

        alert("Enter valid quantity");

        return;
    }


    // Prompt Price
    let price =
    prompt("Enter Product Price");

    // Check if price is valid number
    if(price == "" || isNaN(price)){

        alert("Enter valid price");

        return;
    }


    // Send Data to PHP
    fetch("save.php", {

        method: "POST",

        headers: {

            "Content-Type":
            "application/x-www-form-urlencoded"
        },

        // Data sent to PHP
        body:

        "productID=" + productID +

        "&productName=" + productName +

        "&quantitySold=" + quantitySold +

        "&price=" + price

    })


    // Convert response to text
    .then(response => response.text())

    .then(data => {

        // Display success message
        alert(data);

        // Refresh table
        displaySales();

    });

});


// Initial Display
displaySales();