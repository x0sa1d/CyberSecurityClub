// Enhanced News Portal JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all news portal functionality
    initializeFilters();
    initializeLoadMore();
    initializeAnimations();
    initializeCounters();
    initializeSearchFunctionality();
    initializeLazyLoading();
    initializeScrollToTop();
});

// Enhanced filter functionality with smooth animations
function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const newsCards = document.querySelectorAll('.news-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active filter button with animation
            filterBtns.forEach(b => {
                b.classList.remove('active');
                b.style.transform = 'scale(1)';
            });
            this.classList.add('active');
            this.style.transform = 'scale(1.05)';
            
            // Filter news cards with stagger animation
            let delay = 0;
            newsCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                // Hide all cards first
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                }, delay);
                
                if (filter === 'all' || category === filter) {
                    delay += 100; // Stagger effect
                }
            });

            // Update filter count
            updateFilterCount(filter, newsCards);
        });
    });
}

// Update filter count display
function updateFilterCount(filter, newsCards) {
    let count = 0;
    newsCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
            count++;
        }
    });
    
    // You can display this count if needed
    console.log(`Showing ${count} articles for filter: ${filter}`);
}

// Enhanced load more functionality
function initializeLoadMore() {
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const loadingIndicator = document.querySelector('.loading-indicator');
    let currentPage = 1;
    const itemsPerPage = 6;

    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Show loading state
            loadMoreBtn.style.display = 'none';
            loadingIndicator.classList.add('show');
            
            // Simulate API call delay
            setTimeout(() => {
                // Hide loading state
                loadingIndicator.classList.remove('show');
                loadMoreBtn.style.display = 'inline-flex';
                
                // Reset button text
                loadMoreBtn.querySelector('.btn-text').textContent = 'Load More News';
                
                // Simulate adding new content (in a real app, this would be actual data)
                createDummyNewsCards(3);
                
                currentPage++;
                
                // Hide button after loading more content (simulate end of content)
                if (currentPage > 3) {
                    loadMoreBtn.style.display = 'none';
                    showEndMessage();
                }
            }, 1500);
        });
    }
}

// Create dummy news cards for load more simulation
function createDummyNewsCards(count) {
    const newsGrid = document.querySelector('.news-grid');
    if (!newsGrid) return;
    
    for (let i = 0; i < count; i++) {
        const newsCard = document.createElement('article');
        newsCard.className = 'news-card';
        newsCard.setAttribute('data-category', 'event');
        newsCard.style.opacity = '0';
        newsCard.style.transform = 'translateY(30px)';
        
        newsCard.innerHTML = `
            <div class="news-card-image">
                <img src="../assets/images/csc_blue.png" alt="Upcoming Event">
                <div class="news-category">Event</div>
            </div>
            <div class="news-card-content">
                <div class="news-meta">
                    <span class="news-date"><i class="fas fa-calendar"></i> Coming Soon</span>
                </div>
                <h3 class="news-card-title">Upcoming Cybersecurity Event</h3>
                <p class="news-card-excerpt">
                    Stay tuned for more exciting cybersecurity events and workshops. We're constantly planning new educational opportunities for our community members.
                </p>
                <a href="#" class="read-more-btn">Read More <i class="fas fa-arrow-right"></i></a>
            </div>
        `;
        
        newsGrid.appendChild(newsCard);
        
        // Animate in
        setTimeout(() => {
            newsCard.style.transition = 'all 0.5s ease';
            newsCard.style.opacity = '1';
            newsCard.style.transform = 'translateY(0)';
        }, i * 100);
    }
}

// Show end of content message
function showEndMessage() {
    const loadMoreSection = document.querySelector('.load-more-section');
    if (loadMoreSection) {
        const endMessage = document.createElement('div');
        endMessage.className = 'end-message';
        endMessage.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--light-text-color);">
                <i class="fas fa-check-circle" style="font-size: 2rem; margin-bottom: 10px; color: #667eea;"></i>
                <p>You've reached the end of our news archive!</p>
            </div>
        `;
        loadMoreSection.appendChild(endMessage);
    }
}

// Enhanced animations with intersection observer
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    const animatedElements = document.querySelectorAll(
        '.news-card, .featured-news-card, .section-header'
    );
    
    animatedElements.forEach(el => observer.observe(el));
}

// Counter animation for hero statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    };
    
    // Trigger counter animation when hero section is in view
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    countUp(counter, target);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    });
    
    const heroSection = document.querySelector('.news-hero');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
}

// Enhanced search functionality (for future implementation)
function initializeSearchFunctionality() {
    const searchInput = document.querySelector('.news-search-input');
    const searchClear = document.querySelector('.search-clear');
    const newsCards = document.querySelectorAll('.news-card');
    const newsGrid = document.querySelector('.news-grid');
    
    if (!searchInput) return;
    
    let searchTimeout;
    
    // Search input handler
    searchInput.addEventListener('input', debounce(function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        // Show/hide clear button
        if (searchTerm) {
            searchClear.classList.remove('hidden');
        } else {
            searchClear.classList.add('hidden');
        }
        
        // Filter news cards
        filterNewsBySearch(searchTerm, newsCards, newsGrid);
    }, 300));
    
    // Clear search handler
    searchClear.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.focus();
        this.classList.add('hidden');
        filterNewsBySearch('', newsCards, newsGrid);
        removeSearchResultsInfo();
    });
    
    // Enter key handler
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            this.blur();
        }
    });
}

// Filter news by search term
function filterNewsBySearch(searchTerm, newsCards, newsGrid) {
    let visibleCount = 0;
    
    // Remove existing search results info
    removeSearchResultsInfo();
    
    newsCards.forEach((card, index) => {
        const title = card.querySelector('.news-card-title').textContent.toLowerCase();
        const excerpt = card.querySelector('.news-card-excerpt').textContent.toLowerCase();
        const category = card.querySelector('.news-category').textContent.toLowerCase();
        
        const matches = !searchTerm || 
                       title.includes(searchTerm) || 
                       excerpt.includes(searchTerm) || 
                       category.includes(searchTerm);
        
        if (matches) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 50);
            
            visibleCount++;
        } else {
            card.style.display = 'none';
        }
    });
    
    // Show search results info or no results message
    if (searchTerm) {
        showSearchResultsInfo(searchTerm, visibleCount, newsGrid);
    }
    
    // Reset active filter when searching
    if (searchTerm) {
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => btn.classList.remove('active'));
        filterBtns[0].classList.add('active'); // Set "All" as active
    }
}

// Show search results information
function showSearchResultsInfo(searchTerm, count, newsGrid) {
    const searchInfo = document.createElement('div');
    searchInfo.className = 'search-results-info';
    searchInfo.innerHTML = `
        <i class="fas fa-search"></i>
        Found ${count} article${count !== 1 ? 's' : ''} for "${searchTerm}"
    `;
    
    newsGrid.parentNode.insertBefore(searchInfo, newsGrid);
    
    // Show no results message if no articles found
    if (count === 0) {
        showNoResultsMessage(searchTerm, newsGrid);
    }
}

// Show no results message
function showNoResultsMessage(searchTerm, newsGrid) {
    const noResults = document.createElement('div');
    noResults.className = 'no-results';
    noResults.innerHTML = `
        <i class="fas fa-search"></i>
        <h3>No articles found</h3>
        <p>We couldn't find any articles matching "${searchTerm}". Try different keywords or browse all articles.</p>
    `;
    
    newsGrid.appendChild(noResults);
}

// Remove search results info
function removeSearchResultsInfo() {
    const existingInfo = document.querySelector('.search-results-info');
    const existingNoResults = document.querySelector('.no-results');
    
    if (existingInfo) {
        existingInfo.remove();
    }
    
    if (existingNoResults) {
        existingNoResults.remove();
    }
}

// Lazy loading for images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize scroll to top button
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', debounce(() => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    }, 100));
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', () => {
        scrollToTop();
    });
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll to top function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Export functions for potential external use
window.NewsPortal = {
    scrollToTop,
    debounce
};
            
            // Simulate API call delay
            setTimeout(() => {
                // In a real application, you would fetch more news from your backend
                // For now, we'll just show a message
                const message = document.createElement('div');
                message.className = 'load-more-message';
                message.innerHTML = '<p>All news articles have been loaded!</p>';
                message.style.textAlign = 'center';
// Export functions for potential external use
window.NewsPortal = {
    scrollToTop,
    debounce
};
