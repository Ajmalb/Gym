/* ==========================================================================
   TITAN ATHLETICS - INTERACTIVE CLASS SCHEDULE & TIMETABLE
   Dynamic Day/Category Filtering & Instant Reservation Hook
   ========================================================================== */

const scheduleData = {
  monday: [
    { time: '06:00 AM - 07:00 AM', name: 'Dawn Assault HIIT', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 4, maxSpots: 18, level: 'All Levels' },
    { time: '08:00 AM - 09:15 AM', name: 'Olympic Barbell & Squat Lab', category: 'strength', trainer: 'Elena Rostova', trainerImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&auto=format&fit=crop&q=80', spots: 2, maxSpots: 12, level: 'Advanced' },
    { time: '12:00 PM - 01:00 PM', name: 'Lunch Hour Power Flow', category: 'yoga', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 8, maxSpots: 20, level: 'All Levels' },
    { time: '05:30 PM - 06:45 PM', name: 'Championship Muay Thai / Boxing', category: 'combat', trainer: 'David Sterling', trainerImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=80', spots: 3, maxSpots: 16, level: 'Intermediate' },
    { time: '07:00 PM - 08:00 PM', name: 'Hypertrophy Chest & Back Blitz', category: 'strength', trainer: 'Tariq Al-Mansoor', trainerImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=80', spots: 5, maxSpots: 15, level: 'Intermediate' }
  ],
  tuesday: [
    { time: '06:30 AM - 07:30 AM', name: 'High-Cadence Spin Arena', category: 'spin', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 6, maxSpots: 22, level: 'All Levels' },
    { time: '09:00 AM - 10:15 AM', name: 'Functional Kettlebell & Core', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 5, maxSpots: 16, level: 'All Levels' },
    { time: '05:00 PM - 06:15 PM', name: 'Heavy Deadlift & Pull Dynamics', category: 'strength', trainer: 'Elena Rostova', trainerImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&auto=format&fit=crop&q=80', spots: 1, maxSpots: 12, level: 'Advanced' },
    { time: '06:30 PM - 07:30 PM', name: 'Boxing Technical Sparring', category: 'combat', trainer: 'David Sterling', trainerImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=80', spots: 4, maxSpots: 14, level: 'Intermediate' }
  ],
  wednesday: [
    { time: '06:00 AM - 07:00 AM', name: 'Metabolic Conditioning Circuit', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 3, maxSpots: 18, level: 'Intermediate' },
    { time: '08:30 AM - 09:45 AM', name: 'Shoulder Cannon & Arms Forge', category: 'strength', trainer: 'Tariq Al-Mansoor', trainerImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=80', spots: 7, maxSpots: 15, level: 'All Levels' },
    { time: '12:00 PM - 01:00 PM', name: 'Athletic Mobility & Hip Recovery', category: 'yoga', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 10, maxSpots: 20, level: 'All Levels' },
    { time: '06:00 PM - 07:15 PM', name: 'Tactical Striking & Clinch', category: 'combat', trainer: 'David Sterling', trainerImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=80', spots: 2, maxSpots: 16, level: 'Intermediate' }
  ],
  thursday: [
    { time: '06:30 AM - 07:30 AM', name: 'Endurance RPM Cycle', category: 'spin', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 8, maxSpots: 22, level: 'All Levels' },
    { time: '09:00 AM - 10:15 AM', name: 'Leg Day Annihilation Lab', category: 'strength', trainer: 'Elena Rostova', trainerImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&auto=format&fit=crop&q=80', spots: 2, maxSpots: 12, level: 'Advanced' },
    { time: '05:30 PM - 06:30 PM', name: 'Tabata Sprint Inferno', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 4, maxSpots: 18, level: 'All Levels' },
    { time: '07:00 PM - 08:00 PM', name: 'Power Cleans & Jerk Mastery', category: 'strength', trainer: 'Elena Rostova', trainerImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&auto=format&fit=crop&q=80', spots: 3, maxSpots: 12, level: 'Intermediate' }
  ],
  friday: [
    { time: '06:00 AM - 07:00 AM', name: 'Full-Body Battle HIIT', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 5, maxSpots: 18, level: 'All Levels' },
    { time: '11:00 AM - 12:15 PM', name: 'Vinyasa Flow & Deep Stretch', category: 'yoga', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 9, maxSpots: 20, level: 'All Levels' },
    { time: '05:00 PM - 06:15 PM', name: 'Friday Night Fight Club Boxing', category: 'combat', trainer: 'David Sterling', trainerImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=80', spots: 1, maxSpots: 18, level: 'All Levels' },
    { time: '06:30 PM - 07:30 PM', name: 'Armageddon Pump Session', category: 'strength', trainer: 'Tariq Al-Mansoor', trainerImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=80', spots: 4, maxSpots: 15, level: 'All Levels' }
  ],
  saturday: [
    { time: '08:00 AM - 09:15 AM', name: 'Titan Weekend Throwdown', category: 'hiit', trainer: 'Marcus & Elena', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 2, maxSpots: 24, level: 'All Levels' },
    { time: '10:00 AM - 11:30 AM', name: 'Heavy Barbell Max-Out Workshop', category: 'strength', trainer: 'Elena Rostova', trainerImg: 'https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=100&auto=format&fit=crop&q=80', spots: 3, maxSpots: 14, level: 'Advanced' },
    { time: '01:00 PM - 02:15 PM', name: 'Striking & Kickboxing Boot Camp', category: 'combat', trainer: 'David Sterling', trainerImg: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=100&auto=format&fit=crop&q=80', spots: 6, maxSpots: 16, level: 'All Levels' },
    { time: '04:00 PM - 05:15 PM', name: 'Sound Bath & Restorative Yin', category: 'yoga', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 7, maxSpots: 20, level: 'All Levels' }
  ],
  sunday: [
    { time: '09:00 AM - 10:15 AM', name: 'Sunday Recovery & Mobility Lab', category: 'yoga', trainer: 'Sarah Jenkins', trainerImg: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=100&auto=format&fit=crop&q=80', spots: 8, maxSpots: 20, level: 'All Levels' },
    { time: '11:00 AM - 12:15 PM', name: 'Core & Postural Mechanics', category: 'strength', trainer: 'Tariq Al-Mansoor', trainerImg: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&auto=format&fit=crop&q=80', spots: 5, maxSpots: 15, level: 'All Levels' },
    { time: '02:00 PM - 03:00 PM', name: 'Assault Bike & Rower Stamina', category: 'hiit', trainer: 'Marcus Vance', trainerImg: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=100&auto=format&fit=crop&q=80', spots: 4, maxSpots: 16, level: 'Intermediate' }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  const dayPills = document.querySelectorAll('.day-pill');
  const timetableList = document.getElementById('timetable-list');
  const scheduleCategoryFilter = document.getElementById('schedule-category-filter');

  let activeDay = 'monday';
  let activeCategory = 'all';

  function renderSchedule() {
    if (!timetableList) return;

    const dayClasses = scheduleData[activeDay] || [];
    const filtered = dayClasses.filter(c => {
      if (activeCategory === 'all') return true;
      return c.category === activeCategory;
    });

    if (filtered.length === 0) {
      timetableList.innerHTML = `
        <div style="text-align: center; padding: 40px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-md);">
          <p style="font-size: 1.1rem; margin-bottom: 8px;">No scheduled classes found for this filter.</p>
          <button class="btn btn-outline" style="font-size: 0.8rem; padding: 8px 16px;" onclick="document.getElementById('schedule-category-filter').value='all'; document.getElementById('schedule-category-filter').dispatchEvent(new Event('change'));">Show All Classes</button>
        </div>
      `;
      return;
    }

    timetableList.innerHTML = filtered.map(slot => {
      let badgeClass = 'available';
      let badgeText = `${slot.spots} spots left`;

      if (slot.spots <= 2 && slot.spots > 0) {
        badgeClass = 'few';
        badgeText = `Hurry, ${slot.spots} left!`;
      } else if (slot.spots === 0) {
        badgeClass = 'full';
        badgeText = 'Class Full';
      }

      const categoryLabel = slot.category.toUpperCase();

      return `
        <div class="timetable-card">
          <div class="slot-time">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            ${slot.time}
          </div>

          <div class="slot-info">
            <h4>${slot.name}</h4>
            <div>
              <span class="slot-category-tag">${categoryLabel}</span>
              <span style="font-size: 0.78rem; color: var(--text-muted); margin-left: 8px;">• ${slot.level}</span>
            </div>
          </div>

          <div class="slot-trainer">
            <img src="${slot.trainerImg}" alt="${slot.trainer}" class="trainer-avatar">
            <div class="trainer-info-text">
              <strong>${slot.trainer}</strong>
              <span>Head Coach</span>
            </div>
          </div>

          <div class="slot-status">
            <span class="spots-badge ${badgeClass}">${badgeText}</span>
          </div>

          <div>
            <button class="btn btn-primary" style="width: 100%; padding: 10px 14px; font-size: 0.82rem;" 
              onclick="reserveClassSpot('${slot.name.replace(/'/g, "\\'")}', '${slot.time}', '${slot.trainer.replace(/'/g, "\\'")}')">
              Book Spot
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Day pill click listeners
  dayPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dayPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeDay = pill.dataset.day;
      renderSchedule();
    });
  });

  // Category select listener
  if (scheduleCategoryFilter) {
    scheduleCategoryFilter.addEventListener('change', (e) => {
      activeCategory = e.target.value;
      renderSchedule();
    });
  }

  // Global reserve function attached to window
  window.reserveClassSpot = (className, time, trainer) => {
    if (window.openBookingModal) {
      window.openBookingModal({
        type: `Class: ${className}`,
        notes: `Selected Session: ${className} (${time}) with Coach ${trainer}.`
      });
    }
  };

  renderSchedule();
});
