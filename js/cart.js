/* ==========================================================================
   TITAN ATHLETICS - GEAR & SUPPLEMENT SHOP MINI-CART
   Interactive Slide-Out Cart, Local Storage & Instant Checkout Simulation
   ========================================================================== */

const storeProducts = [
  { id: 'prod-1', name: '100% Hydro Whey Isolate (2.2kg)', price: 64.99, image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=200&auto=format&fit=crop&q=80', category: 'Supplements' },
  { id: 'prod-2', name: 'Ignite Pre-Workout High-Stim', price: 39.99, image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?w=200&auto=format&fit=crop&q=80', category: 'Pre-Workout' },
  { id: 'prod-3', name: 'Titan 10mm Leather Powerlifting Belt', price: 79.99, image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=200&auto=format&fit=crop&q=80', category: 'Gear' },
  { id: 'prod-4', name: 'Stainless Steel Insulated 32oz Shaker', price: 24.99, image: 'https://images.unsplash.com/photo-1570829460005-c840387bb1ca?w=200&auto=format&fit=crop&q=80', category: 'Accessories' }
];

class CartManager {
  constructor() {
    this.cart = this.loadCart();
    this.cartDrawer = document.getElementById('cart-drawer');
    this.cartOverlay = document.getElementById('cart-overlay');
    this.cartItemsList = document.getElementById('cart-items-list');
    this.cartSubtotal = document.getElementById('cart-subtotal');
    this.cartBadge = document.getElementById('cart-badge');
    this.cartToggleBtns = document.querySelectorAll('.cart-toggle');
    this.cartCloseBtn = document.getElementById('cart-close-btn');
    this.checkoutBtn = document.getElementById('cart-checkout-btn');

    this.init();
  }

  loadCart() {
    try {
      const stored = localStorage.getItem('titan_cart');
      return stored ? JSON.parse(stored) : [];
    } catch(e) {
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem('titan_cart', JSON.stringify(this.cart));
    } catch(e) {}
    this.updateUI();
  }

  init() {
    // Open/Close listeners
    this.cartToggleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openCart();
      });
    });

    if (this.cartCloseBtn) {
      this.cartCloseBtn.addEventListener('click', () => this.closeCart());
    }

    if (this.cartOverlay) {
      this.cartOverlay.addEventListener('click', () => this.closeCart());
    }

    // Add to cart listeners on product buttons
    document.querySelectorAll('[data-product-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-product-id');
        this.addItem(prodId);
      });
    });

    if (this.checkoutBtn) {
      this.checkoutBtn.addEventListener('click', () => {
        if (this.cart.length === 0) {
          window.showToast('Your gear bag is empty!', 'error');
          return;
        }
        this.cart = [];
        this.saveCart();
        this.closeCart();
        window.showToast('Gear order placed! Ready for pickup at the front desk.', 'success');
      });
    }

    this.updateUI();
  }

  openCart() {
    if (this.cartDrawer) this.cartDrawer.classList.add('open');
    if (this.cartOverlay) this.cartOverlay.classList.add('active');
  }

  closeCart() {
    if (this.cartDrawer) this.cartDrawer.classList.remove('open');
    if (this.cartOverlay) this.cartOverlay.classList.remove('active');
  }

  addItem(productId) {
    const product = storeProducts.find(p => p.id === productId);
    if (!product) return;

    const existing = this.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cart.push({ ...product, quantity: 1 });
    }

    this.saveCart();
    window.showToast(`Added "${product.name}" to cart!`, 'success');
    this.openCart();
  }

  removeItem(productId) {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  changeQty(productId, delta) {
    const item = this.cart.find(item => item.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeItem(productId);
    } else {
      this.saveCart();
    }
  }

  updateUI() {
    const totalCount = this.cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (this.cartBadge) {
      this.cartBadge.textContent = totalCount;
      this.cartBadge.style.display = totalCount > 0 ? 'flex' : 'none';
    }

    if (this.cartSubtotal) {
      this.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    }

    if (!this.cartItemsList) return;

    if (this.cart.length === 0) {
      this.cartItemsList.innerHTML = `
        <div style="text-align: center; padding: 40px 0; color: var(--text-muted);">
          <p style="font-size: 1.1rem; margin-bottom: 8px;">Your cart is currently empty.</p>
          <span style="font-size: 0.85rem;">Browse supplements and lifting gear below.</span>
        </div>
      `;
      return;
    }

    this.cartItemsList.innerHTML = this.cart.map(item => `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <button style="color: #fff; background: rgba(255,255,255,0.1); width: 24px; height: 24px; border-radius: 4px;" onclick="window.cartManager.changeQty('${item.id}', -1)">-</button>
          <span style="font-weight: 700; font-size: 0.9rem; color: #fff;">${item.quantity}</span>
          <button style="color: #fff; background: rgba(255,255,255,0.1); width: 24px; height: 24px; border-radius: 4px;" onclick="window.cartManager.changeQty('${item.id}', 1)">+</button>
          <span class="cart-item-remove" onclick="window.cartManager.removeItem('${item.id}')" title="Remove">&times;</span>
        </div>
      </div>
    `).join('');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.cartManager = new CartManager();
});
