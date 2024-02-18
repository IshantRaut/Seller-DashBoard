// Get the form element
const form = document.getElementById("item-form");

// Add event listener to the form submit event
form.addEventListener("submit", (event) => {
  // Prevent the form from submitting normally
  event.preventDefault();

  // Get the form data
  const formData = new FormData(event.target);

  // Get the form values
  const name = formData.get("item-name");
  const desc = formData.get("item-desc");
  const price = formData.get("item-price");
  const quantity = formData.get("item-quantity");

  const obj = {
    name: name,
    desc: desc,
    price: price,
    quantity: quantity,
  };
  axios
    .post("http://localhost:3000/admin/add-items", obj)
    .then((res) => {
      console.log(res);
      showNewUserOnScreen(res.data.newItems);
    })
    .catch((err) => {
      console.error("Error adding user:", err);
      // Assuming that there is some sort of error message displayed on the screen
      showErrorOnScreen("Failed to add user. Please try again later.");
    });
});

function showNewUserOnScreen(user) {
  const parentNode = document.getElementById("listOfUsers");
  const userId = user.id;
  const childHTML = `<li id="item-${userId}" class="list-group-item">
  <div class="row align-items-center">
    <div class="col-md-6">
      <h4 class="mb-0">${user.name}</h4>
      <p class="text-muted mb-0">${user.desc}</p>
    </div>
    <div class="col-md-3 text-md-center">
      <h4 class="mb-0">${user.price} ₹ </h4>
    </div>
    <div class="col-md-3 text-md-right">
      <p class="mb-0">Quantity: <span id="${userId}">${user.quantity}</span></p>
      <div class="btn-group">
        <button type="button" class="btn btn-primary" onclick="buyOne('${userId}')">Buy 1</button>
        <button type="button" class="btn btn-primary" onclick="buyTwo('${userId}')">Buy 2</button>
        <button type="button" class="btn btn-primary" onclick="buyThree('${userId}')">Buy 3</button>
        <button class="btn btn-danger btn-sm"  onclick=deleteUser('${userId}')> Delete User </button>
      </div>
    </div>
  </div>
</li>
`; //esa likha aayga

  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}
window.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/admin/get-items")
    .then((res) => {
      console.log(res);
      for (i = 0; i < res.data.allItems.length; i++) {
        showNewUserOnScreen(res.data.allItems[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

function buyOne(itemId) {
  
  const quantityElement = document.getElementById(`${itemId}`);
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 0) {
    const id=itemId;
    const newQuantity=quantity-1;
    quantityElement.innerText = newQuantity;
    axios
  .put(`http://localhost:3000/admin/edit-items/${id}`,{quantity:newQuantity})
  .then(res => console.log(res.data))
  .catch(err=> console.log(err))
     console.log(id);

  } else {
    alert("Sorry, this item is out of stock.");
  }
}
function buyTwo(itemId) {
  const quantityElement = document.getElementById(`${itemId}`);
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 0) {
    const id=itemId;
    const newQuantity=quantity-2;
    quantityElement.innerText = newQuantity;
    axios
    .put(`http://localhost:3000/admin/edit-items/${id}`,{quantity:newQuantity})
    .then(res => console.log(res.data))
    .catch(err=> console.log(err))
       console.log(id);
  } else {
    alert("Sorry, this item is out of stock.");
  }
}
function buyThree(itemId) {
  const quantityElement = document.getElementById(`${itemId}`);
  let quantity = parseInt(quantityElement.innerText);
  if (quantity > 0) {
    const id=itemId;
    const newQuantity=quantity-3;
    quantityElement.innerText = newQuantity;
    axios
    .put(`http://localhost:3000/admin/edit-items/${id}`,{quantity:newQuantity})
    .then(res => console.log(res.data))
    .catch(err=> console.log(err))
       console.log(id);
  } else {
    alert("Sorry, this item is out of stock.");
  }
}


function deleteUser(itemId) {


  axios.delete(`http://localhost:3000/admin/delete-item/${itemId}`)
      .then(() => {
          removeUserFromScreen(itemId);
      })
      .catch((err) => {
          console.log(err)
      })



}

function removeUserFromScreen(itemId) {
  const parentNode = document.getElementById('listOfUsers');
  const childNodeToBeDeleted = document.getElementById(`item-${itemId}`);

  parentNode.removeChild(childNodeToBeDeleted)
}
