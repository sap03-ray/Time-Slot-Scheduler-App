document.addEventListener('DOMContentLoaded', function () {
    const timeSlotCalendar = document.getElementById('time-slot-calendar');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementById('close');
    const confirmBtn = document.getElementById('confirm');
    const slotDetails = document.getElementById('slot-details');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const prevWeekBtn = document.getElementById('prev-week');
    const nextWeekBtn = document.getElementById('next-week');
  
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const timeSlots = [
      '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
    ];
  
    let currentWeek = 0;
  
    const unavailableSlots = {
      0: {
        'Monday': ['10:00 AM', '2:00 PM'],
        'Wednesday': ['9:00 AM', '5:00 PM'],
      },
      1: {
        'Thursday': ['11:00 AM', '4:00 PM'],
        'Friday': ['1:00 PM'],
      }
    };
  
    function renderTimeSlots(week) {
      timeSlotCalendar.innerHTML = '';
  
      daysOfWeek.forEach(day => {
        const dayColumn = document.createElement('div');
        dayColumn.classList.add('day-column');
        dayColumn.innerHTML = `<h3>${day} (Week ${week + 1})</h3>`;
  
        timeSlots.forEach(time => {
          const timeSlot = document.createElement('div');
          timeSlot.classList.add('time-slot');
          timeSlot.textContent = time;
  
          if (unavailableSlots[week] && unavailableSlots[week][day]?.includes(time)) {
            timeSlot.classList.add('unavailable');
          } else {
            timeSlot.addEventListener('click', () => {
              modal.style.display = 'block';
              slotDetails.textContent = `Day: ${day}, Time: ${time}, Week: ${week + 1}`;
            });
          }
  
          dayColumn.appendChild(timeSlot);
        });
  
        timeSlotCalendar.appendChild(dayColumn);
      });
    }
  
    closeModal.onclick = () => {
      modal.style.display = 'none';
    };
  
    window.onclick = (event) => {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    };
  
    function validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  
    confirmBtn.onclick = () => {
      const email = emailInput.value;
  
      if (!validateEmail(email)) {
        emailError.style.display = 'block';
        emailError.textContent = 'Please enter a valid email address.';
      } else {
        emailError.style.display = 'none';
        alert('Time slot confirmed: ' + slotDetails.textContent + '\nEmail sent to: ' + email);
        modal.style.display = 'none';
  
        // Simulate sending email by clearing the input
        emailInput.value = '';
      }
    };
  
    prevWeekBtn.onclick = () => {
      if (currentWeek > 0) {
        currentWeek--;
        renderTimeSlots(currentWeek);
      }
    };
  
    nextWeekBtn.onclick = () => {
      currentWeek++;
      renderTimeSlots(currentWeek);
    };
  
    renderTimeSlots(currentWeek);
  });
  