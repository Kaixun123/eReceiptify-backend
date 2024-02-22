const qrcode = require('qrcode');
const fs = require('fs');

const generateTestQRCode = async () => {
    try {
        const testData = 
        {
          "emailAddress": "Sathwik@hotmail.com",
          "receiptTransaction":{
            "userId": "1",
            "total": 100.00,
            "emailAddress": "Sathwik@hotmail.com",
            "card": {
              "cardType": "Credit",
              "cardNo": "1111 1111 1111 4444",
              "expiryDate": "10/26",
              "cardNetwork": "Mastercard"
            },
            "items": [
              {
                "itemType": "Normal",
                "itemName": "Item 1",
                "itemPrice": 50.00,
                "itemQuantity": 1
              },
              {
                "itemType": "Normal",
                "itemName": "Item 2",
                "itemPrice": 50.00,
                "itemQuantity": 1
              }
            ]
          }
        };

        let qrCodeStream = fs.createWriteStream('test-qr-code.png');

        // Generate the QR code
        await qrcode.toFileStream(qrCodeStream, JSON.stringify(testData));

        console.log("Test QR Code Image URL: ", qrCodeStream.path);
        return;
    } catch (err) {
        console.log(err);
    }
};

// Call the function to generate the test QR code
generateTestQRCode();