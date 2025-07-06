
function showBookingForm() {
  document.getElementById("bookingForm").style.display = "block";
  document.getElementById("bookingForm").scrollIntoView({ behavior: "smooth" });
}


// pricing and estimation

  function convertTo24(hour, minute, ampm) {
    hour = parseInt(hour);
    minute = parseInt(minute);

    if (ampm === "PM" && hour < 12) {
      hour += 12;
    }
    if (ampm === "AM" && hour === 12) {
      hour = 0;
    }

    return hour * 60 + minute; // Total minutes
  }

  function calculateCost() {
    const crop = document.getElementById('crop').value;
    const startHour = document.getElementById('startHour').value;
    const startMinute = document.getElementById('startMinute').value;
    const startAMPM = document.getElementById('startAMPM').value;

    const endHour = document.getElementById('endHour').value;
    const endMinute = document.getElementById('endMinute').value;
    const endAMPM = document.getElementById('endAMPM').value;

    const result = document.getElementById('result');

    if (!crop || !startHour || !startMinute || !endHour || !endMinute) {
      alert("Please fill all time fields correctly.");
      return;
    }

    const startTotal = convertTo24(startHour, startMinute, startAMPM);
    const endTotal = convertTo24(endHour, endMinute, endAMPM);

    let minutesWorked = endTotal - startTotal;
    if (minutesWorked <= 0) {
      result.classList.remove("d-none", "alert-info");
      result.classList.add("alert-danger");
      result.innerText = "⚠️ End time must be after start time.";
      return;
    }

    const hours = minutesWorked / 60;

    let rate = crop === "maize" ? 2500 : 1500;
    const cost = Math.round(hours * rate);

    result.classList.remove("d-none", "alert-danger");
    result.classList.add("alert-info");
    result.innerHTML = `
      ⏱️ Total Time: <strong>${hours.toFixed(2)} hrs</strong><br>
      💰 Rate: ₹${rate}/hr<br>
      ✅ <strong>Total Cost: ₹${cost}</strong>
    `;
  }

