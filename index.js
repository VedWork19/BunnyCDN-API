//Listing all the dependencies
// import express from "express"
// import fetch from "node-fetch"
// import bodyParser from "body-parser"
// import swaggerJsDoc from "swagger-jsdoc"
// import swaggerUi from "swagger-ui-express"

const express = require("express");
const ejs = require("ejs");
const fetch = require('node-fetch');
const bodyParser = require('body-parser');
const { json } = require("express");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

//Creating instance of express
const app=express();

app.use('/web', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const swaggerOptions={
    swaggerDefinition:{
        info:{
            title: 'BunnyCDN API',
            description: 'BunnyCDN API Documentation',
            contact: {
                name: "Priyanka Asrani",
            },
            servers: ["http://localhost:4000"]
        }
    },
    apis: ["index.js"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
//Fetching the list of storage zones
/**
 * @swagger
 * /liststoragezones:
 *  get:
 *      description: Fetching the list of storage zones
 *      responses:
 *         '200':
 *              description: A list of storage zones
 */
app.get("/liststoragezones",(req,res)=>{
    var list={}
    const url = 'https://api.bunny.net/storagezone';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            AccessKey: '<your-access-key>' //Replace it with your access key which will be in the account section of BunnyCDN
        }
    };
    fetch(url, options)
    .then(res => res.json())
    .then(json => 
        res.send(json)
    )
    .catch(err => console.error('error:' + err));

    
})

//Creating new storage zone
/**
 * @swagger
 * /createstoragezone:
 *  post:
 *      description: Creating a storage zone
 *      responses:
 *         '200':
 *              description: Storage zone details
 */
app.post("/createstoragezone",(req,res)=>{
    const url = 'https://api.bunny.net/storagezone';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: '<your-access-key>' //Replace it with your access key which will be in the account section of BunnyCDN
        },
        body: JSON.stringify({
            ReplicationRegions: ['NY'],
            OriginUrl: 'https://murmuring-ravine-21909.herokuapp.com/',
            Name: 'SampleStorageZone2',
            Region: 'DE'
        })
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})

//Fetching the list of pull zones
/**
 * @swagger
 * /listpullzones:
 *  get:
 *      description: Fetching the list of pull zones
 *      responses:
 *         '200':
 *              description: A list of pull zones
 */
app.get("/listpullzones",(req,res)=>{
    const url = 'https://api.bunny.net/pullzone';
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            AccessKey: '<your-access-key>' //Replace it with your access key which will be in the account section of BunnyCDN
        }
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})

//Creating new pull zone and linking it with the storage zone with the help of storage zone
/**
 * @swagger
 * /linking:
 *  post:
 *      description: Creating new pull zone and linking it with the storage zone
 *      responses:
 *         '200':
 *              description: Pull zone details
 */
app.post("/linking",(req,res)=>{
    const url = 'https://api.bunny.net/pullzone';
    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            AccessKey: '<your-access-key>' //Replace it with your access key which will be in the account section of BunnyCDN
        },
        body: JSON.stringify({StorageZoneId: 60209, Name: 'SamplePullZone2'})
    };

    fetch(url, options)
    .then(res => res.json())
    .then(json => res.send(json))
    .catch(err => console.error('error:' + err));
})

app.listen(4000,()=>{
    console.log("Server started at port 4000")
})