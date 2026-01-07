fetch("http://localhost:8000/graphql", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        accept: "application/json"
    },
    body: JSON.stringify({query: '{ hello }'})
}).then((res) => res.json())
.then((data) => console.log(data))
.catch((err) => {
    console.error(`Error: ${err.message}`)
    console.error(err)
})