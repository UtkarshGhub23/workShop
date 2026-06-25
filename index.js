document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. Scroll Reveal (subtle entrance)
  // ==========================================
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.agenda-card, .perk-item, .stat-pill').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transitionDelay = `${i * 50}ms`;
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    // Trigger immediately for elements already in view
    requestAnimationFrame(() => observer.observe(el));
  });

  // ==========================================
  // 2. Day card expand on click (mobile-friendly)
  // ==========================================
  // Already visible by default; day cards are always open.

  // ==========================================
  // 3. Toast System
  // ==========================================
  const toastContainer = document.getElementById('toast-container');

  function showToast(message, type = 'success', duration = 5000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.setAttribute('role', 'alert');

    const icon = type === 'success'
      ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
      : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`;

    toast.innerHTML = `
      <div class="toast-icon">${icon}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>`;

    toastContainer.appendChild(toast);

    const dismiss = () => {
      toast.style.transition = 'opacity 0.3s, transform 0.3s';
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(110%)';
      toast.addEventListener('transitionend', () => toast.remove(), { once: true });
    };

    toast.querySelector('.toast-close').addEventListener('click', dismiss);
    const timer = setTimeout(dismiss, duration);
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
  }

  // ==========================================
  // 4. Send to Telegram
  // ==========================================
  async function sendToTelegram(data) {
    const cfg    = window.WORKSHOP_CONFIG || {};
    const token  = cfg.TELEGRAM_BOT_TOKEN || '';
    const chatId = cfg.TELEGRAM_CHAT_ID   || '';

    if (!token || token.startsWith('YOUR_') || !chatId || chatId.startsWith('YOUR_')) {
      console.warn('⚠️ Telegram not configured. Fill in config.js to enable notifications.');
      return { skipped: true };
    }

    const trackMap = {
      aesthetics: '🎨 Interfaces That Impress — Visual Design & CSS',
      frontend:   '⚙️ Components That Convert — Advanced Frontend',
      agents:     '🤖 AI That Ships — Agentic Systems',
    };

    const msg = [
      '🎟 *New WORKSHOP 2026 Registration*',
      '',
      `👤 *Name:*    ${esc(data.name)}`,
      `📧 *Email:*   ${esc(data.email)}`,
      `📞 *Phone:*   ${esc(data.phone)}`,
      `🏠 *Address:* ${esc(data.address)}`,
      `🎯 *Track:*   ${trackMap[data.track] || esc(data.track)}`,
      `🕐 *Time:*    ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`,
    ].join('\n');

    const res = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ chat_id: chatId, text: msg, parse_mode: 'Markdown' }),
      }
    );

    const json = await res.json();
    if (!json.ok) throw new Error(`Telegram error: ${json.description}`);
    return { ok: true };
  }

  function esc(str) {
    return String(str).replace(/([_*[\]()~`>#+=|{}.!-])/g, '\\$1');
  }

  // ==========================================
  // 5. Registration Form — Validate & Submit
  // ==========================================
  const form      = document.getElementById('registration-form');
  const submitBtn = document.getElementById('submit-button');
  const successEl = document.getElementById('success-state');
  const resetBtn  = document.getElementById('reset-btn');
  const successMsg = document.getElementById('success-message');

  if (!form) return;

  // ── Field validation helpers ──
  function getError(input) {
    return input.closest('.field-group')?.querySelector('.field-error');
  }

  function showError(input) {
    input.setAttribute('aria-invalid', 'true');
    getError(input)?.classList.add('visible');
  }

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    getError(input)?.classList.remove('visible');
  }

  function validateField(input) {
    if (input.type === 'checkbox') {
      return input.checked;
    }
    if (!input.validity.valid) {
      showError(input);
      return false;
    }
    clearError(input);
    return true;
  }

  // Live validation
  form.querySelectorAll('.field-input').forEach(input => {
    input.addEventListener('blur',  () => validateField(input));
    input.addEventListener('input', () => {
      if (input.validity.valid) clearError(input);
    });
  });

  // ── Submit ──
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs  = [...form.querySelectorAll('.field-input')];
    const terms   = document.getElementById('reg-terms');
    const allValid = inputs.every(inp => validateField(inp)) && terms.checked;

    if (!allValid) {
      if (!terms.checked) showToast('Please accept the Code of Conduct to continue.', 'error');
      else showToast('Please fill in all highlighted fields.', 'error');
      // Scroll to first error
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    const nameVal    = document.getElementById('reg-name').value.trim();
    const emailVal   = document.getElementById('reg-email').value.trim();
    const phoneVal   = document.getElementById('reg-phone').value.trim();
    const addressVal = document.getElementById('reg-address').value.trim();
    const focusVal   = document.getElementById('reg-focus').value;

    // Loading state
    submitBtn.disabled = true;
    form.classList.add('submitting');

    try {
      await sendToTelegram({ name: nameVal, email: emailVal, phone: phoneVal, address: addressVal, track: focusVal });

      // Show success
      form.style.display = 'none';
      successEl.hidden = false;
      if (successMsg) successMsg.textContent = `Thank you, ${nameVal}! Confirmation sent to ${emailVal}.`;

      showToast(`✅ Registered successfully! Welcome, ${nameVal}.`, 'success', 7000);

    } catch (err) {
      console.error(err);
      showToast('Could not send notification. Check your Bot Token & Chat ID in config.js', 'error', 8000);

    } finally {
      submitBtn.disabled = false;
      form.classList.remove('submitting');
    }
  });

  // ── Reset ──
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      form.reset();
      form.querySelectorAll('.field-input').forEach(inp => clearError(inp));
      form.style.display = '';
      successEl.hidden = true;
    });
  }

});
