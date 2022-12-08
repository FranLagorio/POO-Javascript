class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

class UI {
  addProduct(product) {
    const productList = document.getElementById("product-list");
    const element = document.createElement("div");
    element.innerHTML = `
    <div class="card" id="${product.name}">
    <div class="card-body text-center">
      <strong class="card-title">Product:</strong> ${product.name}
      <strong class="card-text">Price:</strong> $${product.price}
      <strong class="card-text">Product Year:</strong> ${product.year}
      <br/>
      <a name="delete" class="btn btn-danger">Delete</a>

    </div>
  </div>
    `;
    productList.appendChild(element);
    this.resetForm();

    this.showMessage("Product Added Successfully", "success");
    const productsStorage = JSON.parse(localStorage.getItem("products"));
    localStorage.setItem(
      "products",
      JSON.stringify([...productsStorage, product])
    );
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.remove();
      let products = JSON.parse(localStorage.getItem("products"));

      let a = element.parentElement.parentElement;
      console.log(a.id);

      let filteredProducts = products.filter(
        (product) => product.name !== a.id
      );
      localStorage.setItem("products", JSON.stringify(filteredProducts));
    }

    this.showMessage("Product Deleted Successfully", "warning");
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));

    //Show in DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");
    container.insertBefore(div, app);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 2000);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }
}

document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const ui = new UI();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  if (name === "" || price === "" || year === "") {
    return ui.showMessage("Please enter all inputs", "danger");
  }
  const product = new Product(name, price, year);

  ui.addProduct(product);
});

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
});

class Starter {
  constructor() {
    this.products = [];
  }

  getProducts() {
    let productStorage = localStorage.getItem("products");
    if (!productStorage) {
      localStorage.setItem("products", JSON.stringify(this.products));
    } else {
      this.products = JSON.parse(productStorage);
    }

    const divProducts = document.createElement("div");

    this.products.map((product) => {
      divProducts.innerHTML += `
      <div class="card" id="${product.name}">
        <div class="card-body text-center">
          <strong class="card-title">Product:</strong> ${product.name}
          <strong class="card-text">Price:</strong> $${product.price}
          <strong class="card-text">Product Year:</strong> ${product.year}
          <br/>
          <a name="delete" class="btn btn-danger">Delete</a>
        </div>
      </div>
      `;
    });

    const div = document.getElementById("product-list");

    div.appendChild(divProducts);
  }
}

const StartApp = new Starter();
StartApp.getProducts();
