# ⚡ TITAN FORGE ATHLETIC CLUB & PERFORMANCE LAB

A modern, high-octane fitness and gym website engineered with contemporary dark-aesthetic design, neon energy accents, and interactive modules.

---

## 🌟 Key Features

1. **High-Impact Hero & Athletic Branding**:
   - Modern typography (`Bebas Neue` & `Syne`), dark glassmorphism, dynamic glow effects, and live counter ticker (45,000+ sq ft, 500+ machines, 65+ weekly classes, 4.9★ rating).
   - Floating interactive stat cards and 3-Day Free VIP Pass trigger.

2. **Interactive Scientific BMI & Nutrition Calculator**:
   - Mifflin-St Jeor TDEE formula with Metric (cm/kg) and Imperial (ft/lbs) modes.
   - Calculates real-time Body Mass Index (BMI) with color-coded gauge slider.
   - Computes daily calorie target based on goal (Hypertrophy Surplus, Fat Loss Deficit, Recomposition).
   - Real-time macronutrient breakdown (Protein, Carbs, Healthy Fats in grams).
   - One-click **"Get Custom Training Plan"** button that automatically transfers biometric stats into the reservation pass generator.

3. **Live Weekly Class Timetable & Schedule**:
   - Filterable day pills (Monday through Sunday).
   - Category filtering (HIIT, Strength, Combat/Boxing, Yoga & Mobility, High-Cadence Spin).
   - Real-time remaining spots indicator (`Only 2 spots left!`, `Available`).
   - One-click **"Book Spot"** button that pre-fills the reservation modal with the selected session and coach name.

4. **Transparent Membership Pricing Plans**:
   - Interactive **Monthly / Annual Billing Toggle** with a 25% discount calculator.
   - 3 Curated Tiers: `Basic Iron`, `Pro Athlete (Most Popular - with glowing border)`, and `Elite Black Card`.
   - Feature checklists with instant pass reservation flow.

5. **Universal VIP Pass & Reservation Engine**:
   - Unified modal for Free 3-Day Passes, class spots, trainer consultations, and membership inquiries.
   - Generates an instant digital **VIP Check-in Pass** with unique barcode and pass reference code (e.g. `#TF-84920`).
   - Web Audio API sound effect chime upon confirmation (zero external MP3 files needed).
   - Print/Save pass functionality.

6. **Gear & Supplement Shop with Mini-Cart Drawer**:
   - Interactive slide-out cart drawer with quantity counters and subtotal calculations.
   - Persists items in `localStorage`.
   - Dynamic cart badge counter on the navigation bar.

7. **Facility Gallery with Lightbox**:
   - Showcase of Free Weights Zone, Sprint Turf, Combat Boxing Ring, Finnish Saunas, Cold Plunges, and Smoothie Bar.
   - Fullscreen lightbox viewer on click.

8. **Location, 24/7 Hours & Direct Connect**:
   - 24/7 member access schedule, staffed desk hours, contact inquiry form, floating WhatsApp quick-chat button, and back-to-top button.

---

## 🚀 How to Launch the Website

You have three easy ways to view and run the website:

### Option 1: Double-Click `start.bat` (Recommended for Windows)
Simply double-click [`start.bat`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/start.bat) in this folder. It will start the local server and automatically open the website in your default browser.

### Option 2: Run with Python
Open your terminal in this directory and execute:
```bash
python server.py
```
Then visit: `http://localhost:3000`

### Option 3: Direct Browser Launch
Double-click [`index.html`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/index.html) to open it directly in any browser (Chrome, Edge, Firefox, Brave, Safari).

---

## 📂 File Structure

```
project ajmal pc/
├── index.html               # Main comprehensive gym website structure
├── css/
│   ├── style.css            # Color variables, design tokens, hero, layout, footer
│   ├── components.css       # Timetable, BMI calculator, pricing cards, modals, cart
│   └── responsive.css       # Mobile & tablet breakpoints
├── js/
│   ├── main.js              # Navbar scroll, mobile drawer, pricing toggle, lightbox
│   ├── calculator.js        # Real-time BMI, TDEE & macro calculation algorithms
│   ├── schedule.js          # Interactive weekly class schedule & booking hooks
│   ├── booking.js           # Universal modal, pass generator & sound synthesizer
│   └── cart.js              # Slide-out gear cart & localStorage system
├── assets/
│   └── images/              # Media and asset directory
├── server.py                # Fast Python 3 development server
├── start.bat                # 1-click Windows launcher
├── package.json             # Optional Node package config
└── README.md                # Documentation & customization guide
```

---

## 🎨 Easy Customization Guide

### 1. Changing the Gym Name & Logo
Open [`index.html`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/index.html):
- Search for `TITAN<span>FORGE</span>` and replace it with your gym name.
- Change the brand icon emoji in `<div class="brand-logo-icon">⚡</div>` (e.g., 🏋️, 🏆, 🥊).

### 2. Changing Theme Accent Colors
Open [`css/style.css`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/css/style.css) and edit lines 17-23:
```css
--primary: #ff4600;           /* Main neon athletic orange */
--primary-hover: #ff5f1f;
--secondary: #ffaa00;         /* Gold accent */
--accent-lime: #00ff88;       /* High-visibility green */
```

### 3. Updating Phone, WhatsApp & Address
Open [`index.html`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/index.html):
- Update the phone number: `href="tel:+919633334100"`
- Update the WhatsApp chat link: `href="https://wa.me/919633334100..."`
- Update the address in the **"Visit The Iron Vault"** section.

### 4. Updating Class Schedule
Open [`js/schedule.js`](file:///C:/Users/Administrator/Videos/project%20ajmal%20pc/js/schedule.js) and modify the `scheduleData` object to change class names, times, coach names, and spots available.
