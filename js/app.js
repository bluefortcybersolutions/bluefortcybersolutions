/**
 * BlueFort Cyber Solutions - Main Application & Form Controller
 * - Multi-page navigation & sticky header
 * - Strict input validation & anti-payload/XSS sanitization
 * - WhatsApp direct lead transmission
 * - Clean confirmation popup (no form data echoed back)
 */

(function () {
  'use strict';

  // =========================================================================
  // CONFIGURATION — Update with your confirmed WhatsApp number
  // Format: International country code + number, digits only (no +, spaces, dashes)
  // Example: '919812345678' for India +91 98123 45678
  // =========================================================================
  const WHATSAPP_NUMBER = '919998383663'; // BlueFort Cyber Solutions — India +91 9998383663

  // Allowed service values — strict whitelist to prevent payload injection via select
  const ALLOWED_SERVICES = [
    'VAPT',
    'SOC & Security Monitoring',
    'Cyber Forensics & Incident Response',
    'Security Audit & Risk Assessment',
    'Security Awareness & Consulting',
    'Other'
  ];

  /* =========================================================================
     1. ANTI-XSS & SANITIZATION UTILITIES
     ========================================================================= */

  /**
   * Strips dangerous characters and patterns from raw user input.
   * Defends against: XSS payloads, null bytes, control chars, pseudo-protocols,
   * inline event handlers, double-encoded entities, and script injections.
   */
  function sanitizeInput(raw) {
    if (typeof raw !== 'string') return '';
    return raw
      .replace(/[<>]/g, '')                          // Strip HTML angle brackets
      .replace(/javascript:/gi, '')                  // Strip JS pseudo-protocol
      .replace(/vbscript:/gi, '')                    // Strip VBScript pseudo-protocol
      .replace(/data:/gi, '')                        // Strip data URI scheme
      .replace(/on\w+\s*=/gi, '')                    // Strip inline event handlers (onclick=, onload=, etc.)
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')  // Strip control & null characters
      .replace(/&#[0-9]+;/gi, '')                    // Strip decimal HTML entities
      .replace(/&#x[0-9a-fA-F]+;/gi, '')             // Strip hex HTML entities
      .replace(/expression\s*\(/gi, '')              // Strip CSS expression()
      .replace(/url\s*\(\s*['"]/gi, '')              // Strip url('...') in input
      .trim();
  }

  /**
   * HTML-encodes a string for safe insertion into the DOM.
   * Used for any user-supplied value displayed in dynamic content.
   */
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\//g, '&#047;');
  }

  /**
   * Validates that a service value is in the allowed whitelist.
   * Prevents injection via manipulated select option values.
   */
  function isAllowedService(value) {
    return ALLOWED_SERVICES.indexOf(value) !== -1;
  }

  /* =========================================================================
     2. NAVIGATION & MOBILE DRAWER
     ========================================================================= */
  document.addEventListener('DOMContentLoaded', function () {
    const header = document.getElementById('siteHeader');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');

    // Sticky Header on scroll
    function handleScroll() {
      if (!header) return;
      if (window.scrollY > 30) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Mobile Hamburger Toggle
    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        const isOpen = navMenu.classList.contains('open');
        if (isOpen) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        } else {
          navMenu.classList.add('open');
          mobileToggle.setAttribute('aria-expanded', 'true');
        }
      });

      document.addEventListener('click', function (e) {
        if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
          navMenu.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }

    /* =========================================================================
       3. URL QUERY PARAMETER PRE-FILLER (Sanitized — For Multi-Page Links)
       ========================================================================= */
    const urlParams = new URLSearchParams(window.location.search);
    // Only read the 'service' parameter — ignore all other URL params
    const rawServiceParam = urlParams.get('service');
    const serviceSelect = document.getElementById('serviceRequired');

    if (serviceSelect && rawServiceParam) {
      // Sanitize and whitelist-validate before using
      const sanitizedService = sanitizeInput(rawServiceParam);
      if (isAllowedService(sanitizedService)) {
        for (let i = 0; i < serviceSelect.options.length; i++) {
          if (serviceSelect.options[i].value === sanitizedService) {
            serviceSelect.selectedIndex = i;
            break;
          }
        }
      }
      // Invalid/injected params are silently ignored — no error, no DOM update
    }

    /* =========================================================================
       4. STRICT REAL-TIME INPUT RESTRICTIONS (Character-Level Filtering)
       ========================================================================= */
    const fullNameInput    = document.getElementById('fullName');
    const companyNameInput = document.getElementById('companyName');
    const businessEmailInput = document.getElementById('businessEmail');
    const phoneInput       = document.getElementById('phoneNumber');
    const messageInput     = document.getElementById('message');

    // Full Name: Only alphabetical characters, spaces, hyphens, and apostrophes
    if (fullNameInput) {
      fullNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^a-zA-Z\s'\-]/g, '');
      });
      fullNameInput.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = pasted.replace(/[^a-zA-Z\s'\-]/g, '').substring(0, 50);
        this.value = (this.value + cleaned).substring(0, 50);
      });
    }

    // Phone Number: Only digits, spaces, hyphens, parentheses, and leading plus
    if (phoneInput) {
      phoneInput.addEventListener('input', function () {
        this.value = this.value.replace(/[^0-9+\s\-()]/g, '');
      });
      phoneInput.addEventListener('paste', function (e) {
        e.preventDefault();
        const pasted = (e.clipboardData || window.clipboardData).getData('text');
        const cleaned = pasted.replace(/[^0-9+\s\-()]/g, '').substring(0, 20);
        this.value = (this.value + cleaned).substring(0, 20);
      });
    }

    // Company Name: Alphanumeric, spaces, basic punctuation — no HTML/scripts
    if (companyNameInput) {
      companyNameInput.addEventListener('input', function () {
        this.value = this.value.replace(/[<>`={}$\\|^~]/g, '');
      });
    }

    // Message: Strip script-injectable characters and patterns in real-time
    if (messageInput) {
      messageInput.addEventListener('input', function () {
        this.value = this.value.replace(/[<>`]/g, '');
        // Strip javascript: and on*= patterns if someone pastes them
        this.value = this.value.replace(/javascript:/gi, '');
        this.value = this.value.replace(/on\w+\s*=/gi, '');
      });
    }

    /* =========================================================================
       5. CONTACT FORM VALIDATION & DIRECT WHATSAPP LEAD SUBMISSION
       ========================================================================= */
    const contactForm = document.getElementById('securityContactForm');

    if (contactForm) {
      contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        // Clear all previous error states
        document.querySelectorAll('.is-invalid').forEach(function (el) {
          el.classList.remove('is-invalid');
        });
        document.querySelectorAll('.field-error-msg').forEach(function (el) {
          el.remove();
        });

        let isValid = true;

        // --- 1. Full Name: Letters, spaces, hyphens, apostrophes | 2–50 chars ---
        const nameVal = sanitizeInput(fullNameInput ? fullNameInput.value : '');
        const nameRegex = /^[a-zA-Z\s'\-]{2,50}$/;
        if (!nameRegex.test(nameVal)) {
          showFieldError(fullNameInput, 'Please enter a valid full name (letters only, 2–50 characters).');
          isValid = false;
        }

        // --- 2. Company Name: Alphanumeric + safe punctuation | 2–80 chars ---
        const companyVal = sanitizeInput(companyNameInput ? companyNameInput.value : '');
        const companyRegex = /^[a-zA-Z0-9\s.,&'\-()]{2,80}$/;
        if (!companyRegex.test(companyVal)) {
          showFieldError(companyNameInput, 'Please enter a valid company name (2–80 characters).');
          isValid = false;
        }

        // --- 3. Business Email: Strict RFC-compliant format ---
        const emailVal = sanitizeInput(businessEmailInput ? businessEmailInput.value : '');
        const emailRegex = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(emailVal)) {
          showFieldError(businessEmailInput, 'Please enter a valid email address (e.g. name@company.com).');
          isValid = false;
        }

        // --- 4. Phone Number: Digits + formatting chars | min 7 digits, no letters ---
        const phoneVal = sanitizeInput(phoneInput ? phoneInput.value : '');
        const digitsOnly = phoneVal.replace(/\D/g, '');
        const phoneRegex = /^\+?[0-9\s\-()]{7,20}$/;
        if (phoneVal && (!phoneRegex.test(phoneVal) || digitsOnly.length < 7 || /[a-zA-Z]/.test(phoneVal))) {
          showFieldError(phoneInput, 'Please enter a valid phone number (digits only, minimum 7 digits).');
          isValid = false;
        }

        // --- 5. Service Required: Strict whitelist validation ---
        const serviceVal = serviceSelect ? serviceSelect.value : '';
        if (!serviceVal || !isAllowedService(serviceVal)) {
          showFieldError(serviceSelect, 'Please select a valid cybersecurity service from the list.');
          isValid = false;
        }

        // --- 6. Message: Minimum 10 chars, sanitized ---
        const messageVal = sanitizeInput(messageInput ? messageInput.value : '');
        if (messageVal.length < 10) {
          showFieldError(messageInput, 'Please provide at least a brief description of your requirements (minimum 10 characters).');
          isValid = false;
        }

        // --- 7. Authorization Checkbox ---
        const authCheckbox = document.getElementById('authCheckbox');
        if (authCheckbox && !authCheckbox.checked) {
          showFieldError(authCheckbox, 'You must acknowledge that all security testing requires proper authorization.');
          isValid = false;
        }

        if (!isValid) return;

        // Build the WhatsApp lead message — all values are sanitized before this point
        const waLeadText =
`🔒 *NEW SECURITY ASSESSMENT INQUIRY*
━━━━━━━━━━━━━━━━━━━━
🏢 *BlueFort Cyber Solutions Lead*

👤 *Client Name:* ${nameVal}
🏢 *Company:* ${companyVal}
📧 *Business Email:* ${emailVal}
📱 *Phone:* ${phoneVal || 'Not Provided'}
🛡️ *Service Required:* ${serviceVal}

📝 *Scope & Requirements:*
"${messageVal}"

✅ *Authorization Status:* Acknowledged by client
━━━━━━━━━━━━━━━━━━━━
_Submitted via BlueFort Web Portal_`;

        const waUrl = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(waLeadText);

        // Show the clean success popup, then reset the form
        showLeadSuccessModal(waUrl);
        contactForm.reset();
      });
    }

    /* =========================================================================
       HELPER: Display a field-level validation error message
       ========================================================================= */
    function showFieldError(inputEl, message) {
      if (!inputEl) return;
      inputEl.classList.add('is-invalid');
      const err = document.createElement('span');
      err.className = 'field-error-msg';
      // textContent is used intentionally — never innerHTML — to prevent XSS
      err.textContent = message;
      inputEl.parentNode.appendChild(err);
      // Scroll to and focus the first invalid field
      if (document.querySelectorAll('.is-invalid').length === 1) {
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        inputEl.focus();
      }
    }

    /* =========================================================================
       6. SUCCESS POPUP MODAL — Clean, simple, no form data echoed back
       ========================================================================= */
    function showLeadSuccessModal(waUrl) {
      let modalOverlay = document.getElementById('leadSuccessModal');

      if (!modalOverlay) {
        modalOverlay = document.createElement('div');
        modalOverlay.id = 'leadSuccessModal';
        modalOverlay.className = 'lead-modal-overlay';
        modalOverlay.setAttribute('role', 'dialog');
        modalOverlay.setAttribute('aria-modal', 'true');
        modalOverlay.setAttribute('aria-labelledby', 'leadModalHeading');
        document.body.appendChild(modalOverlay);
      }

      // Build modal content — no user-supplied data displayed in the message
      // The WhatsApp URL is only used in the href attribute (safely encoded)
      modalOverlay.innerHTML = '';

      const card = document.createElement('div');
      card.className = 'lead-modal-card';

      // Icon
      const iconDiv = document.createElement('div');
      iconDiv.className = 'lead-modal-icon';
      iconDiv.innerHTML = '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';

      // Title — static text only, no user data
      const titleEl = document.createElement('h3');
      titleEl.id = 'leadModalHeading';
      titleEl.className = 'lead-modal-title';
      titleEl.textContent = 'Blue Fort Cyber Solutions will get back to you soon.';

      // Actions row
      const actionsDiv = document.createElement('div');
      actionsDiv.className = 'lead-modal-actions';

      // WhatsApp button — href is the only place waUrl appears, safely encoded
      const waBtn = document.createElement('a');
      waBtn.href = waUrl;
      waBtn.target = '_blank';
      waBtn.rel = 'noopener noreferrer';
      waBtn.className = 'btn btn-primary';
      waBtn.id = 'continueToWaBtn';
      waBtn.style.cssText = 'background:#25D366; border-color:#25D366; color:#ffffff;';
      waBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg><span>Connect on WhatsApp</span>';

      const closeBtn = document.createElement('button');
      closeBtn.type = 'button';
      closeBtn.className = 'btn btn-secondary';
      closeBtn.id = 'closeLeadModalBtn';
      closeBtn.innerHTML = '<span>Close</span>';

      actionsDiv.appendChild(waBtn);
      actionsDiv.appendChild(closeBtn);

      card.appendChild(iconDiv);
      card.appendChild(titleEl);
      card.appendChild(actionsDiv);
      modalOverlay.appendChild(card);

      // Activate the modal
      modalOverlay.classList.add('active');
      document.body.classList.add('modal-open');

      // Focus the close button for accessibility
      closeBtn.focus();

      // Close on button click
      closeBtn.addEventListener('click', function () {
        modalOverlay.classList.remove('active');
        document.body.classList.remove('modal-open');
      });

      // Close on overlay backdrop click
      modalOverlay.addEventListener('click', function (e) {
        if (e.target === modalOverlay) {
          modalOverlay.classList.remove('active');
          document.body.classList.remove('modal-open');
        }
      });

      // Close on Escape key
      function handleEscape(e) {
        if (e.key === 'Escape') {
          modalOverlay.classList.remove('active');
          document.body.classList.remove('modal-open');
          document.removeEventListener('keydown', handleEscape);
        }
      }
      document.addEventListener('keydown', handleEscape);
    }

  }); // end DOMContentLoaded
})();
