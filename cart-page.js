function renderCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartItemsContainer = document.getElementById('cart-items');
  const totalPriceEl = document.getElementById('total-price');
  cartItemsContainer.innerHTML = '';

  let total = 0;
  cart.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'cart-item';
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="80">
      <span>${item.name}</span>
      <span>${item.price}</span>
      <span>數量：${item.quantity}</span>
      <button class="delete-item" data-index="${index}">刪除</button>
    `;
    cartItemsContainer.appendChild(itemDiv);

    const priceNumber = parseInt(item.price.replace('NT$', '')) || 0;
    total += priceNumber * item.quantity;
  });

  totalPriceEl.textContent = `總金額：NT$${total}`;

  // 刪除按鈕
  document.querySelectorAll('.delete-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // 重新渲染
    });
  });
}

// 清空購物車
document.getElementById('clear-cart').addEventListener('click', () => {
  localStorage.removeItem('cart');
  renderCart();
});

// 初始渲染
renderCart();
