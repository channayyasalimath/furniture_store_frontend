let xmlhttprequest = new XMLHttpRequest();

xmlhttprequest.onreadystatechange = function (evt) {
  if (this.readyState == 4 && this.status == 200) {
    let data = JSON.parse(this.response);
    if (data.status == 200) {
      renderHtml(data.response);
    } else {
      alert("There is something went wrong");
      console.log(data.error);
    }
  }
};

xmlhttprequest.open("POST", "http://localhost:5000/category/getall", true);
xmlhttprequest.send();

function renderHtml(records) {
  optionElements = '<option value="">Select Category</option>';

  for (let i = 0; i < records.length; i++) {
    optionElements += `<option value="${records[i].id}">${records[i].name}</option>`;
  }
  document.getElementById("drpdn").innerHTML = optionElements;
}

document.getElementById("drpdn").addEventListener("change", function (evt) {
  let categoryId = evt.target.value;
  loadProductsByCId(categoryId);
});

function loadProductsByCId(cId) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function (evt) {
    if (this.readyState == 4 && this.status == 200) {
      let data = JSON.parse(this.response);
      renderProducts(data.response);
    }
  };
  xhr.open("POST", "http://localhost:5000/products/getbycid", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.send(`categoryId=${cId}`);
}

function renderProducts(products) {
  console.log(products);
  productElements = "";
  for (let i = 0; i < products.length; i++) {
    productElements += `<div class="box">
        <h2>${products[i].product_name}</h2>
        <p>${products[i].product_description}</p>
        <p>Price: ${products[i].product_price}</p>
    </div>`;
  }
  document.getElementById("cardContainer").innerHTML = productElements;
}
