import { buildSchema } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import express from "express";
import {ruruHTML} from "ruru/server"

// construct graphql schema
const schema = buildSchema(`
    type Query {
        hello: String
        rollDice(numDice: Int, numSides: Int):[Int]
    }
    `);

// root provides a resolver function for each API endpoint
const root = {
  hello() {
    return "Hello world";
  },

  roolDice() {

  }
};

const app = express();

app.all(
  "/graphql",
  createHandler({
    schema,
    rootValue: root,
  })
);

// serve graphql IDE

app.get("/", (req, res) => {
    res.type("html")
    res.end(ruruHTML({endpoint: "/graphql"}))
})

const port = 8000;
app.listen(port);
console.log(`Running graphql server at http://localhost:${port}`);
