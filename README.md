# Bulletproof-test

## Install

Download or clone the project and run 

$ `npm install`

## Running the app

This app requires the local instance of mongoDB running.

Run following command to start app: 
`npm start`

This will run the server listening on localhost:3000

Open the Front End from a browser with URL: 
http://localhost:3000  or http://localhost:3000/products

Currently the Front End allows to populate only few fields while creating or updating a product. However, populating all fields in the product schema can be achieved by send 
http requests via postman.

## Running tests

Run `npm test` to execute tests.

## Swagger API document 

`api-doc\swagger.yaml`

To view API docsument, open the above swagger.yml file in the online swagger editor: 
https://editor.swagger.io/ 

OR
`http://localhost:3000/api-docs`

## mongoDB collection name

Products

`Sample document` 
{
    "_id" : ObjectId("5aea97211af6f52638544d8a"),
    "productId" : 7865,
    "description" : "High Heels",
    "productCategory" : "Cat1",
    "unitPrice" : 15.5,
    "stores" : [ 
        {
            "storeId" : "abc5",
            "storeName" : "Store 1",
            "lat" : 34.779897,
            "long" : 45.88978,
            "currentStock" : 50,
            "reorderLavel" : 40,
            "_id" : ObjectId("5aea97211af6f52638544d89")
        }, 
        {
            "storeId" : "efgh7",
            "storeName" : "Store 2",
            "lat" : 35.779897,
            "long" : 55.88978,
            "currentStock" : 50,
            "reorderLavel" : 40,
            "_id" : ObjectId("5aea97211af6f52638544d88")
        }
    ],
    "updated_date" : ISODate("2018-05-03T04:59:13.644Z"),
    "__v" : 0
}

