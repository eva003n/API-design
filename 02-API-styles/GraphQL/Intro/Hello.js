const { graphql, buildSchema } = require("graphql");

const schema = buildSchema(`
    type Query {
        hello: String,
        me: User
    }

    type User {
        name: String,
        age: Int
    }
    `);

const rootValue = { 
    hello: () => "Hello World",
    me: () => {name: , age:},
    name: () => "John doe",
    age: () => 20,

};
const source = "{ hello }";

graphql({schema, source, rootValue}).then((response) => console.dir(response))
