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
      <span>�ƶq�G${item.quantity}</span>
      <button class="delete-item" data-index="${index}">�R��</button>
    `;
    cartItemsContainer.appendChild(itemDiv);

    const priceNumber = parseInt(item.price.replace('NT$', '')) || 0;
    total += priceNumber * item.quantity;
  });

  totalPriceEl.textContent = `�`���B�GNT$${total}`;

  // �R�����s
  document.querySelectorAll('.delete-item').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      renderCart(); // ���s��V
    });
  });
}

// �M���ʪ���
document.getElementById('clear-cart').addEventListener('click', () => {
  localStorage.removeItem('cart');
  renderCart();
});

// ��l��V
renderCart();
