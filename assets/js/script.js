'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
const formInputs = contactForm.querySelectorAll('.form-input');
const submitBtn = contactForm.querySelector('.form-btn');
const formStatus = contactForm.querySelector('.form-status');

// Enable/disable submit button based on form validity
formInputs.forEach(input => {
  input.addEventListener('input', () => {
    const isFormValid = Array.from(formInputs).every(input => input.value.trim() !== '');
    submitBtn.disabled = !isFormValid;
  });
});

// Handle form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Show loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  
  try {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create and show modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close-modal">&times;</span>
        <h3 class="modal-title">Thank You for Reaching Out!</h3>
        <p class="modal-description">
          I appreciate you taking the time to contact me. While the contact form is currently under maintenance, 
          I'd be happy to connect with you through alternative methods.
        </p>
        <div class="contact-alternatives">
          <h4>Alternative Contact Methods</h4>
          <p>Email: <a href="mailto:jayson16yaszed@gmail.com">jayson16yaszed@gmail.com</a></p>
          <p>Phone: <a href="tel:+639630270807">+63 9630270807</a></p>
          <p>Or connect with me on social media:</p>
          <p>
            <a href="https://www.facebook.com/Pascual.Jasyon.2004" target="_blank">Facebook</a> | 
            <a href="https://www.instagram.com/jasyon_p" target="_blank">Instagram</a>
          </p>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add close functionality
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
      modal.remove();
    };
    
    // Close on outside click
    window.onclick = function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.remove();
      }
    };
    
    // Close on Escape key
    window.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        modal.remove();
      }
    });
    
    // Reset form
    contactForm.reset();
    submitBtn.disabled = true;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Remove loading state
    submitBtn.classList.remove('loading');
  }
});



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all modal triggers
  const modalTriggers = document.querySelectorAll('[data-modal-trigger]');
  const modals = document.querySelectorAll('.modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Function to open modal
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
      
      // Add touch event listeners for mobile
      modal.addEventListener('touchstart', handleTouchStart, false);
      modal.addEventListener('touchmove', handleTouchMove, false);
      
      // Center modal on mobile
      if (window.innerWidth <= 768) {
        modal.style.top = '50%';
        modal.style.transform = 'translateY(-50%)';
      }
    }
  }

  // Function to close modal
  function closeModal(modal) {
    if (modal) {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
      
      // Remove touch event listeners
      modal.removeEventListener('touchstart', handleTouchStart);
      modal.removeEventListener('touchmove', handleTouchMove);
    }
  }

  // Touch event variables
  let xDown = null;
  let yDown = null;

  function handleTouchStart(evt) {
    const firstTouch = evt.touches[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  }

  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.touches[0].clientX;
    const yUp = evt.touches[0].clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    // If swipe is more horizontal than vertical
    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        // Swipe left - close modal
        closeModal(evt.currentTarget);
      }
    }

    // Reset values
    xDown = null;
    yDown = null;
  }

  // Add click event listeners to all modal triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal-trigger');
      
      // Get the content from the clicked item
      const modal = document.getElementById(modalId);
      const image = this.querySelector('img');
      const title = this.querySelector('.project-title, .blog-item-title');
      const description = this.querySelector('.project-category, .blog-text');

      // Update modal content
      if (modal) {
        const modalImage = modal.querySelector('.modal-image');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDescription = modal.querySelector('.modal-description');

        if (modalImage && image) modalImage.src = image.src;
        if (modalTitle && title) modalTitle.textContent = title.textContent;
        if (modalDescription && description) modalDescription.textContent = description.textContent;

        openModal(modalId);
      }
    });
  });

  // Add click event listeners to close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      const modal = this.closest('.modal');
      closeModal(modal);
    });
  });

  // Close modal when clicking outside
  window.addEventListener('click', function(e) {
    modals.forEach(modal => {
      if (e.target === modal) {
        closeModal(modal);
      }
    });
  });

  // Close modal on escape key
  window.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      modals.forEach(modal => {
        if (modal.style.display === 'block') {
          closeModal(modal);
        }
      });
    }
  });
});
