// // import { CosmosClient } from "../dist";
// // import { endpoint, key, database as databaseId } from "./Shared/config";
// // import assert from "assert";

// // logSampleHeader("Database Management");

// // Get environment variables from .env
// // import * as dotenv from './node_modules/dotenv';
// // dotenv.config();

// // Get Cosmos Client
// // import { Container, CosmosClient } from "@azure/cosmos";

// // Provide required connection from environment variables
// // const key = process.env.COSMOS_KEY;
// // Endpoint format: https://YOUR-RESOURCE-NAME.documents.azure.com:443/
// // const endpoint = process.env.COSMOS_ENDPOINT;

// // Establish a new instance of the CosmosClient to be used throughout this demo
// // const client = new CosmosClient({ endpoint, key });

// // whole cosmosdb name/id
// // cosmosdb-nosql-account-hydrogen-poc-eastus


// const CosmosClient = require("@azure/cosmos").CosmosClient;
// const client = new CosmosClient({endpoint: "https://cosmosdb-nosql-account-hydrogen-poc-eastus.documents.azure.com:443/", auth: {masterKey: "M2XwGPyCO4G3kdyq9Aa5Lp70VBte1Srca0uScsPpUtIjaeiAfJdcmf1aOHObqp4K0oYMM0L8R5qVACDbBZ41SQ=="}});


// // our databaseid
// // cosmosdb-database-hydrogen-poc-eastus-001
// const databaseId = "cosmosdb-database-hydrogen-poc-eastus-001";

// // last containerid
// const containerId = "TenantAClient2";

// // our tenant
// const pathReq = 'TenantA'

// async function run() {

//     //   console.log("Read all databases");
//     //   const { resources: dbDefList } = await client.databases.readAll().fetchAll();
//     //   console.log(dbDefList);

//     //   console.log("\nReadDatabase with id '" + databaseId + "'");
//     //   const { resource: dbDef } = await client.database(databaseId).read();
//     //   console.log(dbDef);

//     //   console.log("\nRead all containers in database");
//     //   const iterator = await client.database(databaseId).containers.readAll();
//     //   const { resources: containersList } = await iterator.fetchAll();
//     //   console.log(" --- Priting via iterator.fetchAll()");
//     //   console.log(containersList);

//     //   const { resources: containersList } = await client.database(databaseId).containers.readAll().fetchAll();
//     //   console.log(containersList);


//     const database = await client.database(databaseId);

//     // const { container } = await database.containers.createIfNotExists({ id: containerId })

//     // const container = await database.container(containerId);

//     // const { resources: itemsList } = await container.items.readAll().fetchAll();

//     // console.log(itemsList); 

//     const { resources: containersList } = await database.containers.readAll().fetchAll();

//     containersList.forEach((container) => {
//         let partitionKeyPaths = container.partitionKey.paths[0];
        
//         if (partitionKeyPaths.includes(pathReq)) {
//             console.log(container);
//         }
//     })


// }

// run()



//  <createDatabaseAndContainer>
// const config = require("../config");
// const CosmosClient = require("@azure/cosmos").CosmosClient;
// const client = new CosmosClient({endpoint: "https://cosmosdb-nosql-account-hydrogen-poc-eastus.documents.azure.com:443/", auth: {masterKey: "M2XwGPyCO4G3kdyq9Aa5Lp70VBte1Srca0uScsPpUtIjaeiAfJdcmf1aOHObqp4K0oYMM0L8R5qVACDbBZ41SQ=="}});
// const tenantDetails = document.querySelector('tenantDetails');
// const client = new CosmosClient({ endpoint, key });

const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://cosmosdb-nosql-account-hydrogen-poc-eastus.documents.azure.com:443/"; // Add your endpoint
const key = "[M2XwGPyCO4G3kdyq9Aa5Lp70VBte1Srca0uScsPpUtIjaeiAfJdcmf1aOHObqp4K0oYMM0L8R5qVACDbBZ41SQ==]"; // Add the masterkey of the endpoint
const client = new CosmosClient({ endpoint, key });

const tenantDetailsArray = [];
const databaseId = "cosmosdb-database-hydrogen-poc-eastus-001";
const pathReq = 'TenantA'

async function getTenant() {
    const database = await client.database(databaseId);

    // const { container } = await database.containers.createIfNotExists({ id: containerId })

    // const container = await database.container(containerId);

    // const { resources: itemsList } = await container.items.readAll().fetchAll();

    // console.log(itemsList); 

    const { resources: containersList } = await database.containers.readAll().fetchAll();

    containersList.forEach((container) => {
        let partitionKeyPaths = container.partitionKey.paths[0];
        
        if (partitionKeyPaths.includes(pathReq)) {
            tenantDetailsArray.push(container);
        }
    })

    console.log(tenantDetailsArray);
    tenantDetails.innerHTML = tenantDetailsArray;
}

getTenant();

