const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const colors = require("colors");
require("dotenv").config();
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema"); // Adjust the path as necessary
const connectDB = require("./config/db"); // Adjust the path as necessary

const app = express();

// Connect to the database
connectDB();

app.use(cors());

// Setup GraphQL endpoint
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development",
  }),
);

// Export the serverless handler
module.exports = app;
module.exports.handler = serverless(app);
