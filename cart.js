let bagItemsObj;

onLoad();

function onLoad() {
  loadBagItemsObject();
}

function loadBagItemsObject() {
  bagItemsObj = bagItems.map((itemId) => {
    for (let i = 0; i < items.length; i++) {
      if (itemId == items[i].id) {
        return items[i];
      }
    }
  });
  displayBagItems();
}

function displayBagSummary() {
  let bagSummaryElem = document.getElementById("subtotal");
  let totalMRP = 0;
  let totalDiscount = 0;

  bagItemsObj.forEach((bagItems) => {
    totalMRP += bagItems.current_price;
    totalDiscount += bagItems.original_price - bagItems.current_price;
  });

  let finalPayment = totalMRP - totalDiscount;
  bagSummaryElem.innerHTML = `<div id="subtotal-container">
  <h3>Cart Subtotal</h3>
  <table>
    <tr>
      <td>Cart Subtotal</td>
      <td class="text-end">₹${totalMRP}</td>
    </tr>
    <tr>
      <td>Discount on MRP</td>
      <td class="text-end text-green">-₹${totalDiscount}</td>
    </tr>
    <tr>
      <td><strong>Total</strong></td>
      <td class="text-end"><strong>₹${finalPayment}</strong></td>
    </tr>
  </table>
  <button class="normal">Proceed to checkout</button>
</div>`;
}

function displayBagItems() {
  let containerElem = document.getElementById("product-display");
  let inner_html = "";
  bagItemsObj.forEach((item) => {
    inner_html += generateItemHTML(item);
  });
  containerElem.innerHTML = inner_html;
  displayBagSummary();
}

function removeFromBag(itemId) {
  bagItems = bagItems.filter((bagItemId) => bagItemId != itemId);
  localStorage.setItem("bagItems", JSON.stringify(bagItems));
  loadBagItemsObject();
  displayBagItems();
  bagItemCount();
}

function generateItemHTML(item) {
  return `<div class="product-item">
  <img src="${item.image}" alt="product-image" />
  <div id="product-details">
    <h3>${item.company}</h3>
    <p>${item.item_name}</p>
    <div id="discount-price">
      <p><strong>10 days</strong> return available</p>
      <span class="line">₹ ${item.original_price}</span>
      <span class="mrp-dis">(${item.discount_percentage}% OFF)</span>
    </div>
    <h3>₹ ${item.current_price}</h3>
  </div>
  <button onclick="removeFromBag(${item.id})"><i class="fa fa-trash" aria-hidden="true"></i></button>
</div>`;
}
