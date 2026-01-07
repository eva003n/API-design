import express from "express"
import { createHandler } from "graphql-http/lib/use/express"
import { buildSchema } from "graphql"


const app = express();
const users = [];
const posts = [];

const schema = buildSchema(`
    type Query g{
        allPersons(last: Int): [Person!]!
        allPosts(last: Int): [POst!]!


    
    }
    
     type Mutation {
        createPerson(name: String!, age: Int!): Person!
        updatePerson(id: Int!, name: String!, age: Int!): Person!
        createPerson(id: Int!): Person!
        
    
    }
    
    type Subscription {
        newPerson: Person!
    }
    
    type Person {
        id: ID!
        name: String!
        age: Int!
        posts;[Post!]!
    
    }
    
    type Post {
        title: String!
        author: Person!
    }
    
       
    `);

    new graphQlS
const resolvers = {
    allPersons(last) {
        

    }
}
app.all("/graphql", createHandler({
    schema,


}))