let bar = document.getElementById("bar");
let nav = document.getElementById("navbar");
let close = document.getElementById("close");
let mobileView = document.getElementById("mobile");
let bagItems;
onLoad();

// onload
function onLoad() {
  let cartItemsStr = localStorage.getItem("bagItems");
  bagItems = cartItemsStr ? JSON.parse(cartItemsStr) : [];
  getProductItems(items, "item1");
  bagItemCount();
}

// NAVBAR
if (bar) {
  bar.addEventListener("click", () => {
    mobileView.style.display = "none";
    nav.classList.add("active");
  });
}
if (close) {
  close.addEventListener("click", () => {
    mobileView.style.display = "flex";
    nav.classList.remove("active");
  });
}

// CART ITEMS
function addToBag(itemId) {
  bagItems.push(itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  bagItemCount();
}

// DISPLAY BAG ITEM COUNT
function bagItemCount() {
  let itemCount = document.querySelector(".itemCount");
  if (bagItems.length > 0) {
    itemCount.innerText = bagItems.length;
    itemCount.style.background = "#f16565";
    itemCount.style.visibility = "visible";
  } else {
    itemCount.style.visibility = "hidden";
  }
}

// DISPLAY INNER HTML
function getProductItems(items, elem) {
  let itemContainerElement = document.getElementById(elem);
  if (!itemContainerElement) {
    return;
  }
  let innerContent = "";
  items.forEach((item) => {
    innerContent += `<div class="pro">
    <img src="${item.image}" alt="product image" />
    <div class="des">
      <span>${item.company}</span>
      <h5>${item.item_name}</h5>
      <div class="star">${item.rating.stars} ⭐ | ${item.rating.count}K</div>
      <div class="price">
        <span class="original-price">₹ ${item.original_price}</span>
        <span class="discount">(${item.discount_percentage}% OFF)</span>
      </div>
      <span class="current-price"><h4>₹ ${item.current_price}</h4></span>
    </div>
    <button onclick="addToBag(${item.id})"><i class="material-symbols-outlined cart"> shopping_cart </i>
  </button>
    </div>`;
  });
  itemContainerElement.innerHTML = innerContent;
}
