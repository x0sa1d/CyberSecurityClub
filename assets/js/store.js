// Store functionality
let cartCount = 0;

function addToCart(productName, price) {
  // Get existing cart items from localStorage
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  
  // Check if item already exists in cart
  const existingItem = cartItems.find(item => item.name === productName);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      name: productName,
      price: price,
      quantity: 1
    });
  }
  
  // Save updated cart to localStorage
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  
  cartCount++;
  updateCartDisplay();
  
  // Create notification
  const notification = document.createElement('div');
  notification.className = 'cart-notification';
  notification.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${productName} added to cart!
  `;
  
  document.body.appendChild(notification);
  
  // Animate and remove
  setTimeout(() => {
    notification.classList.add('show');
  }, 100);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  // Search functionality
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    filterProducts(searchTerm, getActiveFilter());
  });

  // Filter functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.filter;
      const searchTerm = searchInput.value.toLowerCase();
      filterProducts(searchTerm, category);
    });
  });

  function getActiveFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.dataset.filter : 'all';
  }

  function filterProducts(searchTerm, category) {
    productCards.forEach(card => {
      const title = card.querySelector('.product-title').textContent.toLowerCase();
      const description = card.querySelector('.product-description').textContent.toLowerCase();
      const cardCategory = card.dataset.category || 'merchandise';
      
      const matchesSearch = title.includes(searchTerm) || description.includes(searchTerm);
      const matchesCategory = category === 'all' || cardCategory === category;
      
      if (matchesSearch && matchesCategory) {
        card.style.display = 'block';
        setTimeout(() => card.classList.add('visible'), 50);
      } else {
        card.style.display = 'none';
        card.classList.remove('visible');
      }
    });
  }
}

// Update cart display
function updateCartDisplay() {
  document.getElementById('cartCount').textContent = cartCount;
}

// Fade in animation
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
  });
}

// Initialize everything
document.addEventListener('DOMContentLoaded', function() {
  initSearch();
  initScrollAnimations();
  
  // Mobile menu
  $(".navbar-burger").click(() => {
    $(".navbar-links").toggleClass("navbar-active");
    $(".navbar-burger").toggleClass("navbar-burger-active");
  });
  
  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// Cart Page Functionality
function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems')) || [];
}

function saveCartItems(items) {
  localStorage.setItem('cartItems', JSON.stringify(items));
}

function displayCartItems() {
  const cartItems = getCartItems();
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartContent = document.querySelector('.cart-content');

  if (cartItems.length === 0) {
    if (emptyCart) emptyCart.style.display = 'block';
    if (cartContent) cartContent.style.display = 'none';
    updateCartSummary(0);
    return;
  }

  if (emptyCart) emptyCart.style.display = 'none';
  if (cartContent) cartContent.style.display = 'block';

  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = cartItems.map((item, index) => `
      <div class="cart-item">
        <div class="item-image">
          ${item.name.includes('Sticker') ? 'STICKER' : 
            item.name.includes('T-Shirt') ? 'SHIRT' : 
            item.name.includes('Hoodie') ? 'HOODIE' : 'ITEM'}
        </div>
        <div class="item-details">
          <div class="item-name">${item.name}</div>
          <div class="item-price">৳${item.price}</div>
        </div>
        <div class="quantity-controls">
          <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">
            <i class="fas fa-minus"></i>
          </button>
          <span class="quantity-display">${item.quantity}</span>
          <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">
            <i class="fas fa-plus"></i>
          </button>
        </div>
        <button class="remove-item" onclick="removeItem(${index})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    `).join('');
  }

  updateCartSummary(cartItems.reduce((total, item) => total + (item.price * item.quantity), 0));
}

function updateQuantity(index, change) {
  const cartItems = getCartItems();
  if (cartItems[index]) {
    cartItems[index].quantity += change;
    if (cartItems[index].quantity <= 0) {
      cartItems.splice(index, 1);
    }
    saveCartItems(cartItems);
    displayCartItems();
  }
}

function removeItem(index) {
  const cartItems = getCartItems();
  cartItems.splice(index, 1);
  saveCartItems(cartItems);
  displayCartItems();
}

function clearCart() {
  if (confirm('Are you sure you want to clear your cart?')) {
    localStorage.removeItem('cartItems');
    displayCartItems();
  }
}

function updateCartSummary(subtotal) {
  const subtotalElement = document.getElementById('cartSubtotal');
  const totalElement = document.getElementById('cartTotal');
  
  if (subtotalElement) subtotalElement.textContent = `৳${subtotal}`;
  if (totalElement) totalElement.textContent = `৳${subtotal}`;
}

function proceedToCheckout() {
  const cartItems = getCartItems();
  if (cartItems.length === 0) {
    alert('Your cart is empty!');
    return;
  }
  
  // Here you would integrate with a payment processor
  alert('Checkout functionality will be implemented soon!');
}

// Initialize cart page
document.addEventListener('DOMContentLoaded', function() {
  // Initialize scroll animations
  initScrollAnimations();
  
  // Only run cart functions if we're on the cart page
  if (document.getElementById('cartItems')) {
    console.log('Cart page detected, initializing cart...');
    displayCartItems();
  }
  
  // For debugging - log if localStorage has cart items
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
  console.log('Cart items in localStorage:', cartItems);
});
