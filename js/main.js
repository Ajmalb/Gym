/* ==========================================================================
   TITAN ATHLETICS - MAIN JAVASCRIPT
   Navbar scroll, Mobile menu, Gallery Lightbox, Pricing Toggle, Animations
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header on Scroll
  const siteHeader = document.querySelector('.site-header');
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    if (scrollTopBtn) {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 2. Mobile Hamburger Menu
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Billing Toggle (Monthly vs Annual)
  const billingToggle = document.getElementById('billing-toggle');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const priceVip = document.getElementById('price-vip');
  const billingLabelMonthly = document.getElementById('label-monthly');
  const billingLabelYearly = document.getElementById('label-yearly');

  let isYearly = false;

  if (billingToggle) {
    billingToggle.addEventListener('click', () => {
      isYearly = !isYearly;
      billingToggle.classList.toggle('yearly', isYearly);

      if (billingLabelMonthly && billingLabelYearly) {
        billingLabelMonthly.classList.toggle('active', !isYearly);
        billingLabelYearly.classList.toggle('active', isYearly);
      }

      if (isYearly) {
        // Annual pricing (-25% discount)
        if (priceStarter) priceStarter.textContent = '39';
        if (pricePro) pricePro.textContent = '69';
        if (priceVip) priceVip.textContent = '129';
      } else {
        // Monthly pricing
        if (priceStarter) priceStarter.textContent = '49';
        if (pricePro) pricePro.textContent = '89';
        if (priceVip) priceVip.textContent = '169';
      }
    });
  }

  // 4. Programs Filter Tabs
  const programTabs = document.querySelectorAll('.program-tab');
  const programCards = document.querySelectorAll('.program-card');

  programTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      programTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      programCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 5. Facility Gallery Lightbox
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightbox-modal');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const captionTitle = item.querySelector('h4') ? item.querySelector('h4').textContent : '';
      const captionDesc = item.querySelector('p') ? item.querySelector('p').textContent : '';

      if (lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        if (lightboxCaption) {
          lightboxCaption.innerHTML = `<strong>${captionTitle}</strong> - ${captionDesc}`;
        }
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (lightboxClose && lightboxModal) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Contact & Newsletter Form Handlers
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value;
      contactForm.reset();
      window.showToast(`Thank you ${name}! Our athletic advisor will reach out shortly.`, 'success');
    });
  }

  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = document.getElementById('newsletter-email').value;
      newsletterForm.reset();
      window.showToast(`VIP Pass & Nutrition Guide sent to ${email}!`, 'success');
    });
  }

  // 7. Active Nav on Scroll (Intersection Observer)
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
});
