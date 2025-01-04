// Menu functionality
document.getElementById('menuIcon').addEventListener('click', function () {
    const dropdown = document.getElementById('menuDropdown');
    dropdown.classList.toggle('open');
  });
  
  // Prevent menu from closing when interacting with dropdown
  document.getElementById('menuDropdown').addEventListener('mouseenter', function () {
    this.classList.add('open');
  });
  
  document.getElementById('menuDropdown').addEventListener('mouseleave', function () {
    this.classList.remove('open');
  });
  
  // Dark Mode Toggle
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    
    // Save mode in localStorage
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
  });
  
  // Apply mode on page load
  document.addEventListener('DOMContentLoaded', function () {
    const mode = localStorage.getItem('mode');
    if (mode === 'dark') {
      document.body.classList.add('dark-mode');
    }
  });
  
  // Redirect to Formula Library
  document.getElementById('formulaLibrary').addEventListener('click', function () {
    window.location.href = 'formulas.html';
  });
  
  
  // Form submission functionality
  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
  
    // Validation
    if (age <= 0 || weight <= 0 || height <= 0) {
      alert('Please enter valid positive values for all inputs.');
      return;
    }
  
    // Calculate BMR
    const bmr =
      gender === 'male'
        ? 10 * weight + 6.25 * height - 5 * age + 5
        : 10 * weight + 6.25 * height - 5 * age - 161;
  
    // Maintenance Calories
    const maintenanceCalories = bmr * activity;
  
    // Display Results
    document.getElementById('results').innerHTML = `
      <h2>Your Results</h2>
      <p>Maintenance Calories: <strong>${maintenanceCalories.toFixed(2)}</strong> kcal</p>
    `;
  });
  