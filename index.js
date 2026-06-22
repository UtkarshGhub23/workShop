document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Mobile Menu Toggle
  // ==========================================
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
    });

    // Close menu when clicking navigation links on mobile
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        navMenu.classList.remove('open');
      });
    });
  }

  // ==========================================
  // 2. Shrinking Header & Active Nav State
  // ==========================================
  const header = document.getElementById('site-header');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    // Shrink header
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlighting
    let currentId = '';
    const scrollPos = window.scrollY + 120; // offset for nav height

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      const navLinks = document.querySelectorAll('.nav-link');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  });

  // ==========================================
  // 3. Scroll Reveal (Intersection Observer)
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target); // Reveal once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ==========================================
  // 4. Interactive Tabs (Schedule)
  // ==========================================
  const tabList = document.querySelector('[role="tablist"]');
  if (tabList) {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    const panels = document.querySelectorAll('[role="tabpanel"]');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        switchTab(tab);
      });

      // Keyboard navigation support
      tab.addEventListener('keydown', (e) => {
        const index = Array.prototype.indexOf.call(tabs, tab);
        let targetIndex = null;

        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          targetIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          targetIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (e.key === 'Home') {
          targetIndex = 0;
        } else if (e.key === 'End') {
          targetIndex = tabs.length - 1;
        }

        if (targetIndex !== null) {
          e.preventDefault();
          tabs[targetIndex].focus();
          switchTab(tabs[targetIndex]);
        }
      });
    });

    function switchTab(newTab) {
      // Deactivate all tabs & panels
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => p.classList.remove('active'));

      // Activate selected tab & corresponding panel
      newTab.setAttribute('aria-selected', 'true');
      newTab.removeAttribute('tabindex');
      const targetPanelId = newTab.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetPanelId);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    }
  }

  // ==========================================
  // 5. Accordion (FAQ)
  // ==========================================
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question-btn');
    
    if (btn) {
      btn.addEventListener('click', () => {
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';
        
        // Close other items (optional, but creates an accordion feel)
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('expanded')) {
            otherItem.classList.remove('expanded');
            otherItem.querySelector('.faq-question-btn').setAttribute('aria-expanded', 'false');
          }
        });

        // Toggle state
        btn.setAttribute('aria-expanded', !isExpanded);
        item.classList.toggle('expanded');
      });
    }
  });

  // ==========================================
  // 6. Toast Notification System
  // ==========================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type} glass`;
    toast.setAttribute('role', 'alert');

    // Create Icon (Success checkmark or Info)
    const iconContainer = document.createElement('div');
    iconContainer.className = 'toast-icon';
    if (type === 'success') {
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      `;
    } else {
      iconContainer.innerHTML = `
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff007f" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      `;
    }

    const messageContainer = document.createElement('div');
    messageContainer.className = 'toast-message';
    messageContainer.textContent = message;

    const closeBtn = document.createElement('button');
    closeBtn.className = 'toast-close';
    closeBtn.setAttribute('aria-label', 'Close notification');
    closeBtn.innerHTML = `
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    `;

    closeBtn.addEventListener('click', () => {
      removeToast(toast);
    });

    toast.appendChild(iconContainer);
    toast.appendChild(messageContainer);
    toast.appendChild(closeBtn);
    toastContainer.appendChild(toast);

    // Auto-remove toast after 4.5 seconds
    const timerId = setTimeout(() => {
      removeToast(toast);
    }, 4500);

    // Stop auto-remove if hovered
    toast.addEventListener('mouseenter', () => clearTimeout(timerId));
  }

  function removeToast(toast) {
    toast.style.animation = 'none';
    toast.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    
    // Remove element after transition completes
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }

  // ==========================================
  // 7. Form Validation & Submission
  // ==========================================
  const form = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-button');

  if (form) {
    const inputs = form.querySelectorAll('.form-input, input[type="checkbox"]');

    // Add live check on blur
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        validateField(input);
      });

      // Clear custom error on typing/checking
      input.addEventListener('input', () => {
        const errorContainer = input.parentElement.querySelector('.input-error-msg');
        if (input.validity.valid) {
          if (errorContainer) {
            errorContainer.style.opacity = '0';
            errorContainer.style.transform = 'translateY(-5px)';
          }
          input.removeAttribute('aria-invalid');
        }
      });
    });

    function validateField(input) {
      const errorContainer = input.parentElement.querySelector('.input-error-msg');
      if (!input.validity.valid) {
        input.setAttribute('aria-invalid', 'true');
        if (errorContainer) {
          errorContainer.style.opacity = '1';
          errorContainer.style.transform = 'translateY(0)';
        }
        return false;
      } else {
        input.removeAttribute('aria-invalid');
        if (errorContainer) {
          errorContainer.style.opacity = '0';
          errorContainer.style.transform = 'translateY(-5px)';
        }
        return true;
      }
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isFormValid = true;

      // Validate all fields on submit
      inputs.forEach(input => {
        const isValid = validateField(input);
        if (!isValid) {
          isFormValid = false;
        }
      });

      if (!isFormValid) {
        showToast('Please correct the validation errors in the form.', 'error');
        return;
      }

      // Simulate submission state
      form.classList.add('submitting');
      submitBtn.disabled = true;

      setTimeout(() => {
        // Successful submission simulation
        form.classList.remove('submitting');
        submitBtn.disabled = false;

        const nameValue = document.getElementById('reg-name').value;
        showToast(`Thank you, ${nameValue}! Your registration for WORKSHOP 2026 was successful.`, 'success');
        
        // Reset form values
        form.reset();
        
        // Clear focus outline styling
        inputs.forEach(input => {
          input.removeAttribute('aria-invalid');
          const errorContainer = input.parentElement.querySelector('.input-error-msg');
          if (errorContainer) {
            errorContainer.style.opacity = '0';
            errorContainer.style.transform = 'translateY(-5px)';
          }
        });
      }, 1500);
    });
  }

  // ==========================================
  // 8. Newsletter Subscription Validation
  // ==========================================
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('.newsletter-input');
      
      if (emailInput.validity.valid) {
        showToast(`Subscribed! Updates will be sent to: ${emailInput.value}`, 'success');
        newsletterForm.reset();
      } else {
        showToast('Please enter a valid email address.', 'error');
      }
    });
  }
});
