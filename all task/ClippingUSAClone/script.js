const swiper = new Swiper(".swiper", {
    // Optional parameters
    direction: "horizontal",
    loop: true,
  
    // Autoplay
    autoplay: {
      delay: 3000, // Change delay as needed (in milliseconds)
      disableOnInteraction: true, // Prevent autoplay from stopping on user interaction
    },
  
    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
    },
  
    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  
    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });

  

function initializeBeforeAfterSlider(sliderId, beforeId, resizerId) {
  const slider = document.getElementById(sliderId);
  const before = document.getElementById(beforeId);
  const beforeImage = before.getElementsByTagName('img')[0];
  const resizer = document.getElementById(resizerId);

  let active = false;

  // Sort overflow out for Overlay Image
  document.addEventListener("DOMContentLoaded", function() {
    let width = slider.offsetWidth;
    beforeImage.style.width = width + 'px';
  });

  // Adjust width of image on resize 
  window.addEventListener('resize', function() {
    let width = slider.offsetWidth;
    beforeImage.style.width = width + 'px';
  })

  resizer.addEventListener('mousedown',function(){
    active = true;
    resizer.classList.add('resize');
  });

  document.body.addEventListener('mouseup',function(){
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('mouseleave', function() {
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('mousemove',function(e){
    if (!active) return;
    let x = e.pageX;
    x -= slider.getBoundingClientRect().left;
    slideIt(x);
    pauseEvent(e);
  });

  resizer.addEventListener('touchstart',function(){
    active = true;
    resizer.classList.add('resize');
  });

  document.body.addEventListener('touchend',function(){
    active = false;
    resizer.classList.remove('resize');
  });

  document.body.addEventListener('touchcancel',function(){
    active = false;
    resizer.classList.remove('resize');
  });

  //calculation for dragging on touch devices
  document.body.addEventListener('touchmove',function(e){
    if (!active) return;
    let x;
    
    let i;
    for (i=0; i < e.changedTouches.length; i++) {
      x = e.changedTouches[i].pageX; 
    }
    
    x -= slider.getBoundingClientRect().left;
    slideIt(x);
    pauseEvent(e);
  });

  function slideIt(x){
    let transform = Math.max(0,(Math.min(x,slider.offsetWidth)));
    before.style.width = transform+"px";
    resizer.style.left = transform-0+"px";
  }

  //stop divs being selected.
  function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
  }
}

// Initialize multiple before-after sliders
initializeBeforeAfterSlider('before-after-slider', 'before-image', 'resizer');
initializeBeforeAfterSlider('before-after-slider-2', 'before-image-2', 'resizer-2');
// Add more slider initializations as needed

document.addEventListener('DOMContentLoaded', function() {
  beforeAfterSlider('beforeAfterSlider');
});

initializeBeforeAfterSlider('beforeAfterSlider-2', 'before-image-2', 'resizer-2');

document.addEventListener("DOMContentLoaded", function() {
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  accordionHeaders.forEach(header => {
    header.addEventListener("click", function() {
      const accordionItem = this.parentNode;
      const isActive = accordionItem.classList.contains("active");
      closeAllAccordionItems();
      if (!isActive) {
        accordionItem.classList.add("active");
        const content = this.nextElementSibling;
        content.style.maxHeight = content.scrollHeight + "px";
        this.querySelector(".accordion-icon").textContent = "-";
      }
    });
  });

  function closeAllAccordionItems() {
    const accordionItems = document.querySelectorAll(".accordion-item");
    accordionItems.forEach(item => {
      item.classList.remove("active");
      const content = item.querySelector(".accordion-content");
      content.style.maxHeight = null;
      const header = item.querySelector(".accordion-header");
      header.querySelector(".accordion-icon").textContent = "+";
    });
  }

  // Open the first accordion item by default
  const firstAccordionItem = document.querySelector(".accordion-item:first-child");
  if (firstAccordionItem) {
    firstAccordionItem.classList.add("active");
    const firstContent = firstAccordionItem.querySelector(".accordion-content");
    firstContent.style.maxHeight = firstContent.scrollHeight + "px";
    const firstHeader = firstAccordionItem.querySelector(".accordion-header");
    firstHeader.querySelector(".accordion-icon").textContent = "-";
  }
});

