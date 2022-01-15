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

query($id: ID) {
  category(id: $id) {
    name
    products {
      name
      price
      quantity
    }
  }
}

---

{
  "id": "5"
}

***

query {
  categories {
    name
    products {
      name
    }
  }
}

***

mutation($name: String) {
  addCategory(name: $name) {
    name
  }
}

---

{
  "name": "test-category"
}

***

mutation($name: String, $description: String, $price: Float, $quantity: Int) {
  addProduct(name: $name, description: $description, price: $price, quantity: $quantity) {
    name
    description
    price
    quantity
  }
}

---

{
  "name": "Test Product",
  "description": "Test Product Description",
  "price": 7.5,
  "quantity": 10
}

***

