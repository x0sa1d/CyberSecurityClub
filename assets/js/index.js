// Header
$(window).scroll(function () {
  var scroll = $(window).scrollTop();

  if (scroll >= 80) {
    $(".header").addClass("border-bottom");
  } else {
    $(".header").removeClass("border-bottom");
  }
});

// Ensure page loads from top
$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});

// Additional scroll to top on page load
window.addEventListener('load', function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 0);
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

  // Navigation link opacity effect
  $(".navbar-links a, .nav-link").click(function(e) {
    // Remove active class from all nav links
    $(".navbar-links a, .nav-link").removeClass("active-nav-link").css("opacity", "0.4");
    
    // Add active class to clicked link and set full opacity
    $(this).addClass("active-nav-link").css("opacity", "1");
  });

  // Set active link on page load based on current page
  $(document).ready(function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    $(".navbar-links a, .nav-link").each(function() {
      const linkHref = $(this).attr('href');
      if (linkHref === currentPage || 
          (currentPage === '' && linkHref === 'index.html') ||
          (currentPage === 'index.html' && linkHref === '/')) {
        $(this).addClass("active-nav-link").css("opacity", "1");
      } else {
        $(this).css("opacity", "0.4");
      }
    });
  });
})();

// Enhanced Slideshow with Navigation and Controls
let currentSlide = 0;
let slideInterval;
let isPlaying = true;
let slideCount = 0;
const slideDuration = 5000; // 5 seconds

$(document).ready(function() {
  // Ensure page starts from top on reload
  $(window).scrollTop(0);
  
  initializeSlideshow();
});

function initializeSlideshow() {
  const $slideshow = $("#slideshow");
  const $slides = $slideshow.find("img");
  slideCount = $slides.length;
  
  if (slideCount === 0) return;
  
  // Hide all slides except the first one
  $slides.hide().first().show();
  
  // Add navigation elements
  addSlideshowControls();
  
  // Start automatic slideshow
  startSlideshow();
  
  // Pause on hover
  $slideshow.parent().hover(
    function() {
      pauseSlideshow();
    },
    function() {
      resumeSlideshow();
    }
  );
}

function addSlideshowControls() {
  // No controls needed - clean slideshow
}

function nextSlide() {
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(800);
  currentSlide = (currentSlide + 1) % slideCount;
  $slides.eq(currentSlide).fadeIn(800);
}

function prevSlide() {
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(800);
  currentSlide = (currentSlide - 1 + slideCount) % slideCount;
  $slides.eq(currentSlide).fadeIn(800);
}

function goToSlide(index) {
  if (index === currentSlide) return;
  
  const $slides = $("#slideshow img");
  
  $slides.eq(currentSlide).fadeOut(600);
  currentSlide = index;
  $slides.eq(currentSlide).fadeIn(600);
}

function startSlideshow() {
  slideInterval = setInterval(nextSlide, slideDuration);
  isPlaying = true;
}

function pauseSlideshow() {
  clearInterval(slideInterval);
  isPlaying = false;
}

function resumeSlideshow() {
  if (!isPlaying) {
    startSlideshow();
  }
}

// Keyboard navigation
$(document).keydown(function(e) {
  if ($(".slideshow:hover").length > 0) {
    switch(e.which) {
      case 37: // left arrow
        prevSlide();
        break;
      case 39: // right arrow
        nextSlide();
        break;
      case 32: // spacebar
        e.preventDefault();
        if (isPlaying) {
          pauseSlideshow();
        } else {
          resumeSlideshow();
        }
        break;
    }
  }
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

$(".slideshow").on("touchstart", function(e) {
  touchStartX = e.changedTouches[0].screenX;
});

$(".slideshow").on("touchend", function(e) {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}

//Dark Light Toggle - REMOVED

// window.addEventListener('scroll', function() {
//   document.body.style.backgroundPositionY = -window.pageYOffset/8 + "px";
// });

// Sticky Secondary Navbar
$(document).ready(function() {
  const secondaryHeader = $('.secondary-header');
  let isSticky = false;
  
  $(window).scroll(function() {
    const scroll = $(window).scrollTop();
    const headerHeight = $('.header').outerHeight() || 0;
    
    if (scroll >= headerHeight && !isSticky) {
      secondaryHeader.addClass('sticky-active');
      isSticky = true;
    } else if (scroll < headerHeight && isSticky) {
      secondaryHeader.removeClass('sticky-active');
      isSticky = false;
    }
  });
});
