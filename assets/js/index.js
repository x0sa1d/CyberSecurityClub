// Header
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 80) {
    $(".header").addClass("border-bottom");
  } else {
    $(".header").removeClass("border-bottom");
  }
});

(() => {
  $(".navbar-burger").click(() => {
    $(".navbar-links").toggleClass("navbar-active");
    $(".navbar-burger").toggleClass("navbar-burger-active");

    $(".navbar-links li").each((i, el) => {
      if (el.style.animation) {
        el.style.animation = "";
      } else {
        el.style.animation = `navbar-link-fade 0.5s ease forwards 0.2s`;
      }
    });
  });

  // Mobile dropdown functionality
  $(".dropdown > a").click(function(e) {
    // Only prevent default and toggle on mobile
    if ($(window).width() <= 768) {
      e.preventDefault();
      
      // Close other dropdowns
      $(".dropdown").not($(this).parent()).removeClass("active");
      
      // Toggle current dropdown
      $(this).parent().toggleClass("active");
    }
  });

  // Close dropdowns when clicking outside
  $(document).click(function(e) {
    if ($(window).width() <= 768) {
      if (!$(e.target).closest('.dropdown').length) {
        $(".dropdown").removeClass("active");
      }
    }
  });

  // Handle window resize
  $(window).resize(function() {
    if ($(window).width() > 768) {
      $(".dropdown").removeClass("active");
    }
  });
})();

// Slideshow
$("#slideshow > img:gt(0)").hide();

setInterval(function () {
  $("#slideshow > img:first")
    .fadeOut(1000)
    .next()
    .fadeIn(1000)
    .end()
    .appendTo("#slideshow");
}, 5000);

// News Slideshow Functionality - Professional Animations
(() => {
  let currentSlide = 0;
  let slideInterval;
  let isAnimating = false;
  let isFirstTransition = true; // Track if this is the first transition
  const newsItems = document.querySelectorAll('.news-card-link');
  const dots = document.querySelectorAll('.news-dot');
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(newsItems.length / itemsPerSlide);

  // Initialize slideshow
  function initSlideshow() {
    if (newsItems.length === 0) return;
    
    showSlide(0, false); // Show first slide without animation
    startAutoSlide();
  }

  // Professional slide transition
  function showSlide(slideIndex, animate = true) {
    if (isAnimating && animate) return; // Prevent overlapping animations
    
    const newStartIndex = slideIndex * itemsPerSlide;
    const newEndIndex = Math.min(newStartIndex + itemsPerSlide, newsItems.length);
    
    if (animate) {
      isAnimating = true;
      
      // Step 1: Slide out current items
      newsItems.forEach((item, index) => {
        if (item.style.display !== 'none') {
          item.classList.add('slide-out-left');
        }
      });
      
      // Step 2: After slide-out animation, prepare new items
      setTimeout(() => {
        // Hide all items and reset classes
        newsItems.forEach((item, index) => {
          item.style.display = 'none';
          item.classList.remove('slide-out-left', 'slide-in-right', 'slide-in-active');
        });
        
        // Prepare new items for slide-in (start from right)
        for (let i = newStartIndex; i < newEndIndex; i++) {
          if (newsItems[i]) {
            newsItems[i].style.display = 'block';
            newsItems[i].classList.add('slide-in-right');
          }
        }
        
        // Step 3: Trigger slide-in animation
        setTimeout(() => {
          for (let i = newStartIndex; i < newEndIndex; i++) {
            if (newsItems[i]) {
              newsItems[i].classList.remove('slide-in-right');
              newsItems[i].classList.add('slide-in-active');
            }
          }
          
          // Animation complete
          setTimeout(() => {
            for (let i = newStartIndex; i < newEndIndex; i++) {
              if (newsItems[i]) {
                newsItems[i].classList.remove('slide-in-active');
              }
            }
            isAnimating = false;
          }, 700); // Wait for stagger animation to complete
          
        }, 50); // Small delay to ensure DOM update
        
      }, 600); // Wait for slide-out animation
      
    } else {
      // No animation - direct show (for initial load)
      newsItems.forEach(item => {
        item.style.display = 'none';
        item.classList.remove('slide-out-left', 'slide-in-right', 'slide-in-active');
      });
      
      for (let i = newStartIndex; i < newEndIndex; i++) {
        if (newsItems[i]) {
          newsItems[i].style.display = 'block';
        }
      }
    }

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === slideIndex);
    });

    currentSlide = slideIndex;
  }

  // Next slide
  function nextSlide() {
    if (isAnimating) return;
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next, true);
    
    // After first transition, mark it as completed
    if (isFirstTransition) {
      isFirstTransition = false;
    }
  }

  // Previous slide
  function prevSlide() {
    if (isAnimating) return;
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev, true);
    
    // Mark first transition as completed if user manually navigates
    if (isFirstTransition) {
      isFirstTransition = false;
    }
  }

  // Start auto slide with dynamic timing
  function startAutoSlide() {
    const delay = isFirstTransition ? 10000 : 5000; // 10s first time, then 5s
    slideInterval = setInterval(() => {
      nextSlide();
      // Restart with new timing after first transition
      if (!isFirstTransition && slideInterval) {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000); // 5 seconds for subsequent slides
      }
    }, delay);
  }

  // Stop auto slide
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Restart auto slide
  function restartAutoSlide() {
    stopAutoSlide();
    // Reset first transition flag when manually navigating
    isFirstTransition = false;
    // Always use 5s timing when manually restarting
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      if (isAnimating || index === currentSlide) return;
      showSlide(index, true);
      restartAutoSlide();
    });
  });

  // Pause on hover
  const newsContainer = document.querySelector('.news-container');
  if (newsContainer) {
    newsContainer.addEventListener('mouseenter', stopAutoSlide);
    newsContainer.addEventListener('mouseleave', startAutoSlide);
  }

  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;

  if (newsContainer) {
    newsContainer.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });

    newsContainer.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold && !isAnimating) {
      if (diff > 0) {
        nextSlide(); // Swipe left - next slide
      } else {
        prevSlide(); // Swipe right - previous slide
      }
      restartAutoSlide();
    }
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (isAnimating) return;
    
    if (e.key === 'ArrowLeft') {
      prevSlide();
      restartAutoSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
      restartAutoSlide();
    }
  });

  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideshow);
  } else {
    initSlideshow();
  }

  // Handle visibility change (pause when tab is not active)
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoSlide();
    } else {
      startAutoSlide();
    }
  });
})();
