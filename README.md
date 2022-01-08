# Sample FullStack Solution: JS, React, MaterialUI, Apollo, NodeJs, Express, GraphQL, mLab

## Demo Queries

{
  product(id: "7") {
    name
    price
    quantity
  }
}

***

query($id: ID){
  product(id: $id) {
    name
    price
    quantity
    category {
      name
    }
  }
}

---

{
  "id": "3"
}

***