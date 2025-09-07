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

// News Slideshow Functionality - Simple Show/Hide
(() => {
  let currentSlide = 0;
  let slideInterval;
  const newsItems = document.querySelectorAll('.news-card-link');
  const dots = document.querySelectorAll('.news-dot');
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(newsItems.length / itemsPerSlide);

  // Initialize slideshow
  function initSlideshow() {
    if (newsItems.length === 0) return;
    
    showSlide(0);
    startAutoSlide();
  }

  // Show specific slide (3 items at a time)
  function showSlide(slideIndex) {
    // Hide all items
    newsItems.forEach(item => {
      item.style.display = 'none';
    });

    // Show items for current slide
    const startIndex = slideIndex * itemsPerSlide;
    const endIndex = Math.min(startIndex + itemsPerSlide, newsItems.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      if (newsItems[i]) {
        newsItems[i].style.display = 'block';
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
    const next = (currentSlide + 1) % totalSlides;
    showSlide(next);
  }

  // Previous slide
  function prevSlide() {
    const prev = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(prev);
  }

  // Start auto slide
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 3000); // 3 seconds
  }

  // Stop auto slide
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Restart auto slide
  function restartAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      restartAutoSlide(); // Restart timer when manually navigating
    });
  });

  // Pause on hover
  const newsContainer = document.querySelector('.news-container');
  if (newsContainer) {
    newsContainer.addEventListener('mouseenter', stopAutoSlide);
    newsContainer.addEventListener('mouseleave', startAutoSlide);
  }

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
