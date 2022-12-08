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
    <div class="card">
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
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      element.parentElement.parentElement.parentElement.remove();
    }
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-4`;
    div.appendChild(document.createTextNode(message));

    //Show in DOM
    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    container.insertBefore(div, app);
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }
}

document.getElementById("product-form").addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const price = document.getElementById("price").value;
  const year = document.getElementById("year").value;

  const product = new Product(name, price, year);

  const ui = new UI();

  ui.addProduct(product);
});

document.getElementById("product-list").addEventListener("click", (e) => {
  const ui = new UI();
  ui.deleteProduct(e.target);
});
