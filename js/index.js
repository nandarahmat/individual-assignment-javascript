function getDataUser() {
  //1.get data localstorage
  //2.Convert data ke object
  //3. display ke dom

  const dataUser = localStorage.getItem("user");

  if (dataUser) {
    const conData = JSON.parse(dataUser);

    const imgElm = document.getElementById("img_user");
    imgElm.src = conData.imgUrl;

    const usernameElm = document.getElementById("username");
    usernameElm.innerHTML = conData.username;
  } else {
    window.location.href = "login.html";
  }
}

function onLogout() {
  localStorage.removeItem("user");
  window.location.href = "login.html";
}

let inputName = document.getElementById("inputName");
let inputPrice = document.getElementById("inputPrice");
let inputCategory = document.getElementById("inputCategory");
let inputCondition = document.getElementById("inputCondition");
let inputSearch = document.getElementById("inputSearch");
let alertName = document.getElementById("alertName");
let alertPrice = document.getElementById("alertPrice");
let btnAdd = document.getElementById("btnAdd");
let btnClear = document.getElementById("btnClear");
let tableBody = document.getElementById("tableBody");
let currentIndex = 0;
let products = [];
if (JSON.parse(localStorage.getItem("Products")) !== null) {
  products = JSON.parse(localStorage.getItem("Products"));
  displayProduct();
}
btnAdd.addEventListener("click", (_) => {
  if (validName() && validPrice() && validCategory() && validCondition()) {
    if (btnAdd.innerHTML === "Add Product") {
      let product = {
        name: inputName.value,
        price: inputPrice.value,
        category: inputCategory.value,
        condition: inputCondition.value,
      };
      products.push(product);
      localStorage.setItem("Products", JSON.stringify(products));
      displayProduct();
      clearForm();
      inputName.classList.remove("border-red-400");
      inputName.classList.remove("border-green-400");
      inputPrice.classList.remove("border-red-400");
      inputPrice.classList.remove("border-green-400");
      inputCategory.classList.remove("border-red-400");
      inputCondition.classList.remove("border-red-400");
    } else if (btnAdd.innerHTML === "Update Product") {
      updateProduct();
      clearForm();
      inputName.classList.remove("border-red-400");
      inputName.classList.remove("border-green-400");
      inputPrice.classList.remove("border-red-400");
      inputPrice.classList.remove("border-green-400");
      inputCategory.classList.remove("border-red-400");
      inputCondition.classList.remove("border-red-400");
    }
  }
});
function displayProduct() {
  let temp = "";
  let conditionRow = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].condition === "Excellent") {
      conditionRow = `<td class="p-2 bg-green-700 text-white text-center">${products[i].condition}</td>`;
    } else if (products[i].condition === "Good") {
      conditionRow = `<td class="p-2 bg-yellow-500 text-white text-center">${products[i].condition}</td>`;
    } else if (products[i].condition === "Bad") {
      conditionRow = `<td class="p-2 bg-red-500 text-white text-center">${products[i].condition}</td>`;
    }
    temp += `
        <tr class="odd:bg-white even:bg-slate-50">
            <td class="p-2 text-center">${i + 1}</td>
            <td class="p-2 text-center">${products[i].name}</td>
            <td class="p-2 text-center">${products[i].price}</td>
            <td class="p-2 text-center">${products[i].category}</td>
            ${conditionRow}
            <td class="p-2 flex justify-center gap-5">
                <i onclick="getProductInformation(${i})" title="Update" class="fa-regular fa-pen-to-square"></i>
                <i onclick="deleteProduct(${i})" title="Delete" class="fa-solid fa-trash" style="color: #ff0000"></i>
            </td>
        </tr>`;
  }
  tableBody.innerHTML = temp;
}
btnClear.addEventListener("click", clearForm);
function clearForm() {
  inputName.value = "";
  inputPrice.value = "";
  inputCategory.value = "";
  inputCondition.value = "";
  inputName.classList.remove("border-green-400");
  inputName.classList.remove("border-red-400");
  alertName.classList.replace("block", "hidden");
  inputPrice.classList.remove("border-green-400");
  inputPrice.classList.remove("border-red-400");
  alertPrice.classList.replace("block", "hidden");
  inputCategory.classList.remove("border-red-400");
  inputCondition.classList.remove("border-red-400");
}

function getProductInformation(index) {
  currentIndex = index;
  inputName.value = products[currentIndex].name;
  inputPrice.value = products[currentIndex].price;
  inputCategory.value = products[currentIndex].category;
  inputCondition.value = products[currentIndex].condition;
  btnAdd.classList.replace("bg-blue-700", "bg-yellow-500");
  btnAdd.innerHTML = "Update Product";
  inputName.classList.remove("border-red-400");
  alertName.classList.replace("block", "hidden");
  inputPrice.classList.remove("border-red-400");
  alertPrice.classList.replace("block", "hidden");
  inputCategory.classList.remove("border-red-400");
  inputCondition.classList.remove("border-red-400");
}
function updateProduct() {
  let product = {
    name: inputName.value,
    price: inputPrice.value,
    category: inputCategory.value,
    condition: inputCondition.value,
  };
  products[currentIndex] = product;
  displayProduct();
  localStorage.setItem("Products", JSON.stringify(products));
  btnAdd.classList.replace("bg-yellow-500", "bg-blue-700");
  btnAdd.innerHTML = "Add Product";
}

function deleteProduct(index) {
  if (confirm("Are you sure want to delete this product?")) {
    products.splice(index, 1);
    displayProduct();
    localStorage.setItem("Products", JSON.stringify(products));
  } else {
    return;
  }
}

inputSearch.addEventListener("keyup", (_) => {
  let temp = "";
  let conditionRow = "";
  for (let i = 0; i < products.length; i++) {
    if (products[i].name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
      if (products[i].condition === "Excellent") {
        conditionRow = `<td class="p-2 bg-green-700 text-white text-center">${products[i].condition}</td>`;
      } else if (products[i].condition === "Good") {
        conditionRow = `<td class="p-2 bg-yellow-500 text-white text-center">${products[i].condition}</td>`;
      } else if (products[i].condition === "Bad") {
        conditionRow = `<td class="p-2 bg-red-500 text-white text-center">${products[i].condition}</td>`;
      }
      temp += `
          <tr class="odd:bg-white even:bg-slate-50">
              <td class="p-2 text-center">${i + 1}</td>
              <td class="p-2 text-center">${products[i].name}</td>
              <td class="p-2 text-center">${products[i].price}</td>
              <td class="p-2 text-center">${products[i].category}</td>
              ${conditionRow}
              <td class="p-2 flex justify-center gap-5">
                  <i onclick="getProductInformation(${i})" title="Update" class="fa-regular fa-pen-to-square"></i>
                  <i onclick="deleteProduct(${i})" title="Delete" class="fa-solid fa-trash" style="color: #ff0000"></i>
              </td>
          </tr>`;
    }
  }
  tableBody.innerHTML = temp;
});

inputName.addEventListener("keyup", validName);
inputPrice.addEventListener("keyup", validPrice);
function validName() {
  let regex = /^[A-Z][a-zA-Z0-9 ]+$/;
  if (regex.test(inputName.value)) {
    inputName.classList.add("border-green-400");
    inputName.classList.remove("border-gray-300");
    alertName.classList.replace("block", "hidden");
    return true;
  } else {
    inputName.classList.add("border-red-400");
    inputName.classList.remove("border-green-400");
    alertName.classList.replace("hidden", "block");
    return false;
  }
}
function validPrice() {
  let regex = /^[1-9][0-9]{2,}$/;
  if (regex.test(inputPrice.value)) {
    inputPrice.classList.add("border-green-400");
    inputPrice.classList.remove("border-gray-300");
    alertPrice.classList.replace("block", "hidden");
    return true;
  } else {
    inputPrice.classList.add("border-red-400");
    inputPrice.classList.remove("border-green-400");
    alertPrice.classList.replace("hidden", "block");
    return false;
  }
}
function validCategory() {
  if (inputCategory.value === "") {
    inputCategory.classList.add("border-gray-300");
    return false;
  } else {
    inputCategory.classList.add("border-red-400");
    inputCategory.classList.remove("border-gray-300");
    return true;
  }
}
function validCondition() {
  if (inputCondition.value === "") {
    inputCondition.classList.add("border-gray-300");
    return false;
  } else {
    inputCondition.classList.add("border-red-400");
    inputCondition.classList.remove("border-gray-300");
    return true;
  }
}

getDataUser();
