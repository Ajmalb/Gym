/* ==========================================================================
   TITAN ATHLETICS - UNIFIED BOOKING ENGINE & PASS GENERATOR
   Interactive Modals, Form Validation, Digital Pass Creation & Audio FX
   ========================================================================== */

// Web Audio API Synthesizer for modern UI sound feedback (Zero audio file assets needed)
class SoundFX {
  constructor() {
    this.ctx = null;
  }
  init() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }
  playSuccess() {
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, this.ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, this.ctx.currentTime + 0.15); // G5
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.3);
    } catch(e) {}
  }
}

const sfx = new SoundFX();

document.addEventListener('DOMContentLoaded', () => {
  const modalBackdrop = document.getElementById('booking-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const bookingForm = document.getElementById('booking-form');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const formContent = document.getElementById('booking-form-content');
  const successContent = document.getElementById('booking-success-content');
  const bookProgramSelect = document.getElementById('book-program');
  const bookNotes = document.getElementById('book-notes');

  // Trigger buttons with [data-booking-trigger]
  document.querySelectorAll('[data-booking]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const plan = btn.getAttribute('data-booking') || 'Free VIP 3-Day Pass';
      window.openBookingModal({
        type: plan,
        notes: `Selected request: ${plan}`
      });
    });
  });

  // Open modal handler
  window.openBookingModal = (options = {}) => {
    if (!modalBackdrop) return;

    // Reset view
    formContent.style.display = 'block';
    successContent.style.display = 'none';

    const type = options.type || 'Free 3-Day VIP Pass';
    modalTitle.textContent = options.title || 'RESERVE YOUR ACCESS';
    modalDesc.textContent = `Get your pass for "${type}". Experience Titan Athletics today.`;

    if (bookProgramSelect) {
      // Find matching option or set value
      let found = false;
      for (let i = 0; i < bookProgramSelect.options.length; i++) {
        if (bookProgramSelect.options[i].text.toLowerCase().includes(type.toLowerCase())) {
          bookProgramSelect.selectedIndex = i;
          found = true;
          break;
        }
      }
      if (!found && bookProgramSelect.options.length > 0) {
        bookProgramSelect.value = 'trial';
      }
    }

    if (bookNotes && options.notes) {
      bookNotes.value = options.notes;
    }

    modalBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  // Close modal
  function closeModal() {
    if (modalBackdrop) {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Handle Form Submission
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('book-name').value.trim();
      const email = document.getElementById('book-email').value.trim();
      const phone = document.getElementById('book-phone').value.trim();
      const date = document.getElementById('book-date').value || new Date().toISOString().split('T')[0];
      const program = bookProgramSelect ? bookProgramSelect.options[bookProgramSelect.selectedIndex].text : 'General Access';

      if (!name || !email || !phone) {
        window.showToast('Please fill in your name, email, and phone number.', 'error');
        return;
      }

      // Generate Ticket Code
      const passId = 'TF-' + Math.floor(100000 + Math.random() * 900000);

      // Play chime
      sfx.playSuccess();

      // Render digital VIP Pass
      const ticketContainer = document.getElementById('ticket-pass-data');
      if (ticketContainer) {
        ticketContainer.innerHTML = `
          <div style="border: 2px dashed rgba(255, 70, 0, 0.4); background: rgba(13, 15, 18, 0.9); border-radius: var(--radius-md); padding: 22px; position: relative;">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 12px; margin-bottom: 14px;">
              <span style="font-family: var(--font-display); font-size: 1.4rem; color: #fff;">TITAN ATHLETICS PASS</span>
              <span style="background: var(--primary); color: #fff; font-size: 0.75rem; font-weight: 800; padding: 2px 10px; border-radius: 4px;">VERIFIED</span>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; font-size: 0.88rem; margin-bottom: 16px;">
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block;">Guest Name</span>
                <strong style="color: #fff; font-size: 1rem;">${name}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block;">Access Pass Code</span>
                <strong style="color: var(--accent-lime); font-family: monospace; font-size: 1.05rem;">${passId}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block;">Session / Program</span>
                <strong style="color: #fff;">${program}</strong>
              </div>
              <div>
                <span style="color: var(--text-muted); font-size: 0.75rem; text-transform: uppercase; display: block;">Valid Starting</span>
                <strong style="color: #fff;">${date}</strong>
              </div>
            </div>

            <div style="background: #fff; color: #000; padding: 8px 12px; border-radius: 4px; text-align: center; font-family: monospace; letter-spacing: 5px; font-weight: 900; font-size: 1.1rem;">
              ||| | |||| | ||| || |||| |||
            </div>
            <p style="font-size: 0.72rem; color: var(--text-muted); text-align: center; margin-top: 6px;">Show this barcode at the front desk for instant check-in</p>
          </div>
        `;
      }

      formContent.style.display = 'none';
      successContent.style.display = 'block';

      window.showToast(`Pass confirmed for ${name}!`, 'success');
    });
  }

  // Print pass action
  const printPassBtn = document.getElementById('print-pass-btn');
  if (printPassBtn) {
    printPassBtn.addEventListener('click', () => {
      window.print();
    });
  }
});

// Toast notification helper
window.showToast = (message, type = 'info') => {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'success' ? 'toast-success' : ''}`;
  toast.innerHTML = `
    <span style="color: ${type === 'success' ? 'var(--accent-lime)' : 'var(--primary)'}; font-size: 1.2rem;">
      ${type === 'success' ? '✓' : '⚡'}
    </span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.4s, transform 0.4s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-30px)';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
};
