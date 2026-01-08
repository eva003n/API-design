# GraphQl
#### 🚀 Read resources
1. [Learn GraphQL from How to graphql](https://www.howtographql.com/)

2. [Learn GraphQL from graphql.js org](https://www.graphql-js.org/docs/graphql-clients/)

3. [Learn GraphQL from official](https://graphql.org/learn/)
## Introduction
GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data
Allows clients to query exactly what they want within a single request reducing over fetching and underfetching problems
### Describe your API with a type system
A GraphQL service is created by defining types and their fields, and then writing a function for each field to provide the required data

Along with functions for each field on each type

The service first checks a query to ensure it only refers to the types and fields defined for the API and then runs the provided functions to produce a result.

The client can make queries to the API that mirror the structure of the data that they need and then receive just that data in the expected shape with a single request—and without having to worry about which underlying data sources provided it.

### Evolve your API without versioning
Client tooling will encourage developers to use the new fields and remove usage of the deprecated name field. The field can be removed once it is determined it is no longer used; in the meantime GraphQL will continue to provide its data as expected.
```bash
type User {
  fullName: String
  nickname: String
  name: String @deprecated(reason: "Use `fullName`.")
}
```
### Benefits of graphql Over REST

- Enable rapid product iterations
- No more over and underfetching
- Schema and type system enable frontend and backend teams to work independently
### Problems GraphQL Solves
GraphQL solves major API problems including over-fetching (getting unnecessary data), under-fetching (multiple requests needed), inefficient versioning, and lack of flexibility. It enables precise data requests, single queries for multiple resources, seamless versioning through schema evolution, and microservice communication through federation.

### Thinking in graphql
"Thinking in Graphs" is a GraphQL mindset where data is organized as a graph with nodes (objects) and edges (relationships). This approach allows flexible and intuitive querying by following relationships between connected data points, making complex data retrieval more natural and efficient.
### Core concepts
#### Schema Definition Language (SDL)
This is the syntax for writing schemas
###### Define a simple type (Person)
This type has two fields, they’re called name and age and are respectively of type String and Int. The ! following the type means that this field is required.
```js

type Person {
    name: String!
    age: Int!
}
```

It’s also possible to express relationships between types. In the example of a blogging application, a Person could be associated with a Post:
```js
type Post {
    title: String!
    author: Person
}
```
Conversely, the other end of the relationship needs to be placed on the Person type:
```js
type Person {
    name: String!
    age: Int!
    posts: [Post!]

}
```
Note that we just created a one-to-many-relationship between Person and Post since the posts field on Person is actually an array of posts.
#### Fetching Data with Queries
When working with REST APIs, data is loaded from specific endpoints. Each endpoint has a clearly defined structure of the information that it returns. This means that the data requirements of a client are effectively encoded in the URL that it connects to.

The approach that’s taken in GraphQL is radically different. Instead of having multiple endpoints that return fixed data structures, GraphQL APIs typically only expose a single endpoint. This works because the structure of the data that’s returned is not fixed. Instead, it’s completely flexible and lets the client decide what data is actually needed.

That means that the client needs to send more information to the server to express its data needs - this information is called a query.
##### Basic queries
The allPersons field in this query is called the root field of the query. Everything that follows the root field, is called the payload of the query. The only field that’s specified in this query’s payload is name.
```js
{
  allPersons {
    name
  }
}
```
###### Output
Notice that each person only has the name in the response, but the age is not returned by the server. That’s exactly because name was the only field that was specified in the query.
```js
{
  "allPersons": [
    { "name": "Johnny" },
    { "name": "Sarah" },
    { "name": "Alice" }
  ]
}
```
If the client also needed the persons’ age, all it has to do is slightly adjust the query and include the new field in the query’s payload:
```js
{
  allPersons {
    name
    age
  }
}
```
One of the major advantages of GraphQL is that it allows for naturally querying nested information. For example, if you wanted to load all the posts that a Person has written, you could simply follow the structure of your types to request this information:
```js
{
  allPersons {
    name
    age
    posts {
      title
    }
  }
}
```
###### Queries with Arguments
In GraphQL, each field can have zero or more arguments if that’s specified in the schema. For example, the allPersons field could have a last parameter to only return up to a specific number of persons. Here’s what a corresponding query would look like:
```js
{
  allPersons(last: 2) {
    name
  }
}
```
#### Writing Data with Mutations
This is similar to performing CRUD operations is rest but in grapghql they are called mutations
##### Kinds of mutations
- creating new data
- updating existing data
- deleting existing data
###### Syntax
```js
mutation {
  createPerson(name: "Bob", age: 36) {
    name
    age
  }
}
```
###### Response from the mutation
```js
"createPerson": {
  "name": "Bob",
  "age": 36,
}
```
#### Realtime Updates with Subscriptions
When a client subscribes to an event, it will initiate and hold a steady connection to the server. Whenever that particular event then actually happens, the server pushes the corresponding data to the client. Unlike queries and mutations that follow a typical “request-response-cycle”, subscriptions represent a stream of data sent over to the client.

Subscriptions are written using the same syntax as queries and mutations. Here’s an example where we subscribe on events happening on the Person type:
```js
subscription {
  newPerson {
    name
    age
  }
}
```
After a client sent this subscription to a server, a connection is opened between them. Then, whenever a new mutation is performed that creates a new Person, the server sends the information about this person over to the client:
```js
{
  "newPerson": {
    "name": "Jane",
    "age": 23
  }
}
```
#### Defining a schema
This schema describes the data provided by the api to clients and how they can query the data
Its serves as a contract between a client and server

Generally, a schema is simply a collection of GraphQL types. However, when writing the schema for an API, there are some special root types:

```bash
ype Query { ... }
type Mutation { ... }
type Subscription { ... }
```
The Query, Mutation, and Subscription types are the entry points for the requests sent by the client

### Graphql on the frontend
GraphQL on the frontend enables efficient data fetching with clients like Apollo, URQL, or Relay. It provides declarative data requirements, intelligent caching, real-time subscriptions, and type safety, allowing frontend applications to request exactly the data they need in a single query.

Graphql abstracts away the low level networking clients have to implement to fetch an update data

In terms of updating the UI graphql works well with functional reactive programming layer of your choice eg react

When it comes to catching graphql clients normalize the data before hand before its stored and is referenced with a globally unique ID
### Graphql on the Backend
On the server side the developer focuses on describing the data that is available rather than implementing and optimizing endpoints

## Schema and types
Graphql provides a type system that describeswhat data can be queried from the API, clienst use the schema to send queries that return predictable results

Graphql query language is basically about selecting fields in on objects
###### Example query
```js                                         
{                                 
  hero {
    name
    appearsIn
  }
}                 
```
###### Response
```js
{
  "data": {
    "hero": {
      "name": "R2-D2",
      "appearsIn": [
        "NEWHOPE",
        "EMPIRE",
        "JEDI"
      ]
    }
  }
}
```
- We start with a special root object
- Then we select the hero field in that object
- Then we select the name and apperas field in the returned hero object
### Object types and fields
```js
type Character {
  name: String!
  appearsIn: [Episode!]!
}
```
#### Explanation
- Character is a GraphQL Object type, meaning it’s a type with some fields. Most of the types in your schema will be Object types.

- name and appearsIn are fields on the Character type. That means that name and appearsIn are the only fields that can appear in any part of a GraphQL query that operates on the Character type.

- String is one of the built-in Scalar types. These are types that resolve to a single scalar value and can’t have sub-selections in the query. We’ll go over Scalar types more later.

- String! means that the field is a Non-Null type, meaning the GraphQL service promises to give you a value whenever you query this field. In SDL, we represent those with an exclamation mark.

- [Episode!]! represents a List type of Episode objects. When a List is Non-Null, you can always expect an array (with zero or more items) when you query the appearsIn field. In this case, since Episode! is also Non-Null within the list, you can always expect every item in the array to be an Episode object.

#### Arguments
Every field can have zero or more arguments
```js
type Starship {
  id: ID!
  name: String!
  length(unit: LengthUnit = METER): Float
}
```
Here the length field has an optional argument called unit if ts not provided its default value will be METER
#### The Query, Mutation, and Subscription types
##### Query
Every graphql schema must have query operations
###### Example query
```js
{
  droid(id: "2000") {
    name
  }
}
```
###### Response
```js
{
  "data": {
    "droid": {
      "name": "C-3PO"
    }

  }
}
```
This means that the graphql service must have a query operation type in the schema that looks like
```js
type Query {
  droid(id: ID!): Droid
}
```
Other root operations type like mutation and subscriptions can also be included

Graphql needs to be indormed when u change the names of the root operation types to custom names like this
```js
schema {
  query: MyQueryType
  mutation: MyMutationType
  subscription: MySubscriptionType
}
```
#### Scalar types 
Represent the leaf values of a query

- Int: A signed 32‐bit integer.
- Float: A signed double-precision floating-point value.
- String: A UTF‐8 character sequence.
- Boolean: true or false.
- ID: A unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable

In most GraphQL service implementations, there is also a way to specify custom Scalar types. For example, we could define a Date type:
```js
scalar Date
```
Then it’s up to our implementation to define how that type should be serialized, deserialized, and validated
#### Type modifiers
Include non-null and list

## Queries
Used to fetch data from a graphql server