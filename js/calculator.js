/* ==========================================================================
   TITAN ATHLETICS - BMI & NUTRITION CALCULATOR ENGINE
   Mifflin-St Jeor TDEE & Macro Breakdown Algorithms
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const unitBtns = document.querySelectorAll('.unit-btn');
  const genderBoxes = document.querySelectorAll('.gender-box');
  const metricInputs = document.getElementById('metric-inputs');
  const imperialInputs = document.getElementById('imperial-inputs');

  const heightCmInput = document.getElementById('calc-height-cm');
  const weightKgInput = document.getElementById('calc-weight-kg');
  const heightFtInput = document.getElementById('calc-height-ft');
  const heightInInput = document.getElementById('calc-height-in');
  const weightLbsInput = document.getElementById('calc-weight-lbs');
  const ageInput = document.getElementById('calc-age');
  const activitySelect = document.getElementById('calc-activity');
  const goalSelect = document.getElementById('calc-goal');
  const calcBtn = document.getElementById('calculate-btn');
  const claimPlanBtn = document.getElementById('claim-plan-btn');

  // Display elements
  const bmiDisplay = document.getElementById('bmi-value');
  const bmiCategoryBadge = document.getElementById('bmi-category');
  const bmiPointer = document.getElementById('bmi-pointer');
  const tdeeCalories = document.getElementById('tdee-calories');
  const macroProtein = document.getElementById('macro-protein');
  const macroCarbs = document.getElementById('macro-carbs');
  const macroFats = document.getElementById('macro-fats');

  let currentUnit = 'metric';
  let currentGender = 'male';

  // Unit toggle
  unitBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      unitBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentUnit = btn.dataset.unit;

      if (currentUnit === 'metric') {
        metricInputs.style.display = 'grid';
        imperialInputs.style.display = 'none';
      } else {
        metricInputs.style.display = 'none';
        imperialInputs.style.display = 'grid';
      }
      calculateStats();
    });
  });

  // Gender toggle
  genderBoxes.forEach(box => {
    box.addEventListener('click', () => {
      genderBoxes.forEach(b => b.classList.remove('active'));
      box.classList.add('active');
      currentGender = box.dataset.gender;
      calculateStats();
    });
  });

  // Recalculate on inputs
  const allInputs = [heightCmInput, weightKgInput, heightFtInput, heightInInput, weightLbsInput, ageInput, activitySelect, goalSelect];
  allInputs.forEach(input => {
    if (input) {
      input.addEventListener('input', calculateStats);
      input.addEventListener('change', calculateStats);
    }
  });

  if (calcBtn) {
    calcBtn.addEventListener('click', (e) => {
      e.preventDefault();
      calculateStats();
      if (window.showToast) {
        window.showToast('Calculated! Custom nutritional profile updated.', 'success');
      }
    });
  }

  function calculateStats() {
    let heightCm = 178;
    let weightKg = 78;
    const age = parseInt(ageInput ? ageInput.value : 28) || 28;

    if (currentUnit === 'metric') {
      heightCm = parseFloat(heightCmInput.value) || 175;
      weightKg = parseFloat(weightKgInput.value) || 75;
    } else {
      const feet = parseFloat(heightFtInput.value) || 5;
      const inches = parseFloat(heightInInput.value) || 10;
      const totalInches = (feet * 12) + inches;
      heightCm = totalInches * 2.54;

      const lbs = parseFloat(weightLbsInput.value) || 165;
      weightKg = lbs * 0.453592;
    }

    if (heightCm <= 0 || weightKg <= 0) return;

    // 1. BMI Calculation
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
    const roundedBmi = bmi.toFixed(1);

    if (bmiDisplay) bmiDisplay.textContent = roundedBmi;

    // BMI Categories & Gauge
    let category = 'Normal Weight';
    let badgeClass = 'available';
    let pointerPercent = 45;

    if (bmi < 18.5) {
      category = 'Underweight';
      badgeClass = 'few';
      pointerPercent = Math.max(5, (bmi / 18.5) * 20);
    } else if (bmi <= 24.9) {
      category = 'Optimal Athletic Range';
      badgeClass = 'available';
      pointerPercent = 20 + ((bmi - 18.5) / (24.9 - 18.5)) * 30;
    } else if (bmi <= 29.9) {
      category = 'Overweight / Heavy Muscle';
      badgeClass = 'few';
      pointerPercent = 50 + ((bmi - 25) / (29.9 - 25)) * 25;
    } else {
      category = 'High BMI / Consult Coach';
      badgeClass = 'full';
      pointerPercent = Math.min(95, 75 + ((bmi - 30) / 10) * 20);
    }

    if (bmiCategoryBadge) {
      bmiCategoryBadge.textContent = category;
    }
    if (bmiPointer) {
      bmiPointer.style.left = `${pointerPercent}%`;
    }

    // 2. Basal Metabolic Rate (BMR) - Mifflin-St Jeor
    let bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age);
    if (currentGender === 'male') {
      bmr += 5;
    } else {
      bmr -= 161;
    }

    // Activity multiplier
    const activityMult = parseFloat(activitySelect ? activitySelect.value : 1.55) || 1.55;
    let tdee = bmr * activityMult;

    // Goal adjustment
    const goal = goalSelect ? goalSelect.value : 'muscle';
    let targetCalories = tdee;

    if (goal === 'fatloss') {
      targetCalories = tdee - 500; // Caloric deficit
    } else if (goal === 'muscle') {
      targetCalories = tdee + 350; // Lean surplus
    } else if (goal === 'recomp') {
      targetCalories = tdee;
    }

    const finalCalories = Math.round(targetCalories);
    if (tdeeCalories) {
      tdeeCalories.textContent = `${finalCalories.toLocaleString()} kcal/day`;
    }

    // 3. Macronutrient Split
    // High protein for athletes: ~2.0g per kg of bodyweight
    const proteinGrams = Math.round(weightKg * 2.2);
    const fatCalories = finalCalories * 0.25;
    const fatGrams = Math.round(fatCalories / 9);
    const remainingCarbCalories = finalCalories - (proteinGrams * 4) - (fatGrams * 9);
    const carbGrams = Math.max(50, Math.round(remainingCarbCalories / 4));

    if (macroProtein) macroProtein.textContent = `${proteinGrams}g`;
    if (macroCarbs) macroCarbs.textContent = `${carbGrams}g`;
    if (macroFats) macroFats.textContent = `${fatGrams}g`;

    // Store for prefill in booking
    window.lastCalculatedStats = {
      bmi: roundedBmi,
      category,
      calories: finalCalories,
      protein: proteinGrams,
      carbs: carbGrams,
      fats: fatGrams,
      goal: goalSelect ? goalSelect.options[goalSelect.selectedIndex].text : 'Muscle Building'
    };
  }

  // Pre-fill booking modal when user clicks "Claim Free Custom Plan"
  if (claimPlanBtn) {
    claimPlanBtn.addEventListener('click', () => {
      calculateStats();
      if (window.openBookingModal) {
        const stats = window.lastCalculatedStats || {};
        window.openBookingModal({
          type: 'Nutrition & Training Assessment',
          notes: `Calculated Target: ${stats.calories || 2400} kcal/day (${stats.goal || 'Hypertrophy'}). BMI: ${stats.bmi || '23.5'}.`
        });
      }
    });
  }

  // Run initial calculation
  calculateStats();
});
