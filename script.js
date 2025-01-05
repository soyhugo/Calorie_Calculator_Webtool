document.addEventListener('DOMContentLoaded', function () {
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

    // Check the current mode and update the button text
    this.textContent = 'Change Lighting Mode';

    // Save mode in localStorage
    const mode = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('mode', mode);
  });

  // Apply mode and button text on page load
  const mode = localStorage.getItem('mode') || 'dark'; // Default to dark mode
  const darkModeToggle = document.getElementById('darkModeToggle');

  if (mode === 'dark') {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  darkModeToggle.textContent = 'Change Lighting Mode'; // Set initial button text

  // Redirect to Formula Library
  document.getElementById('formulaLibrary').addEventListener('click', function () {
    window.location.href = 'formulas.html';
  });

  // Initialize form inputs
  function initializeForm() {
    document.getElementById('imperialInputs').classList.remove('hidden');
    document.getElementById('metricInputs').classList.add('hidden');
    document.getElementById('weightImperial').required = true;
    document.getElementById('heightImperialFeet').required = true;
    document.getElementById('heightImperialInches').required = true;
    document.getElementById('weightMetric').required = false;
    document.getElementById('heightMetric').required = false;
  }

  initializeForm();

  // Form submission functionality
  document.getElementById('imperialTab').addEventListener('click', function () {
    const weightMetric = parseFloat(document.getElementById('weightMetric').value);
    const heightMetric = parseFloat(document.getElementById('heightMetric').value);

    if (!isNaN(weightMetric)) {
      document.getElementById('weightImperial').value = Math.round(weightMetric * 2.20462);
    }
    if (!isNaN(heightMetric)) {
      const totalInches = Math.round(heightMetric / 2.54);
      const feet = Math.floor(totalInches / 12);
      const inches = totalInches % 12;
      document.getElementById('heightImperialFeet').value = feet;
      document.getElementById('heightImperialInches').value = inches;
    }

    document.getElementById('imperialInputs').classList.remove('hidden');
    document.getElementById('metricInputs').classList.add('hidden');
    document.getElementById('weightImperial').required = true;
    document.getElementById('heightImperialFeet').required = true;
    document.getElementById('heightImperialInches').required = true;
    document.getElementById('weightMetric').required = false;
    document.getElementById('heightMetric').required = false;
    this.classList.add('active');
    document.getElementById('metricTab').classList.remove('active');
  });

  document.getElementById('metricTab').addEventListener('click', function () {
    const weightImperial = parseFloat(document.getElementById('weightImperial').value);
    const heightFeet = parseInt(document.getElementById('heightImperialFeet').value);
    const heightInches = parseInt(document.getElementById('heightImperialInches').value);

    if (!isNaN(weightImperial)) {
      document.getElementById('weightMetric').value = Math.round(weightImperial / 2.20462);
    }
    if (!isNaN(heightFeet) && !isNaN(heightInches)) {
      const totalCm = Math.round((heightFeet * 12 + heightInches) * 2.54);
      document.getElementById('heightMetric').value = totalCm;
    }

    document.getElementById('metricInputs').classList.remove('hidden');
    document.getElementById('imperialInputs').classList.add('hidden');
    document.getElementById('weightImperial').required = false;
    document.getElementById('heightImperialFeet').required = false;
    document.getElementById('heightImperialInches').required = false;
    document.getElementById('weightMetric').required = true;
    document.getElementById('heightMetric').required = true;
    this.classList.add('active');
    document.getElementById('imperialTab').classList.remove('active');
  });

  function calculateImperial() {
    const weightImperial = parseFloat(document.getElementById('weightImperial').value);
    const heightFeet = parseInt(document.getElementById('heightImperialFeet').value);
    const heightInches = parseInt(document.getElementById('heightImperialInches').value);

    const weight = weightImperial; // Use lbs directly
    const height = (heightFeet * 12) + heightInches; // Convert ft/in to inches

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (age <= 0 || weight <= 0 || height <= 0) {
      alert('Please enter valid positive values.');
      return;
    }

    const bmr = gender === 'male'
      ? 66 + (6.23 * weight) + (12.7 * height) - (6.8 * age)
      : 655 + (4.35 * weight) + (4.7 * height) - (4.7 * age);

    const maintenanceCalories = bmr * activity;

    document.getElementById('results').innerHTML = `
      <h2>Your Results</h2>
      <p>Maintenance Calories: <strong>${maintenanceCalories.toFixed(2)}</strong> kcal</p>
    `;
  }

  function calculateMetric() {
    const weight = parseFloat(document.getElementById('weightMetric').value);
    const height = parseFloat(document.getElementById('heightMetric').value);

    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const activity = parseFloat(document.getElementById('activity').value);

    if (age <= 0 || weight <= 0 || height <= 0) {
      alert('Please enter valid positive values.');
      return;
    }

    const bmr = gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;

    const maintenanceCalories = bmr * activity;

    document.getElementById('results').innerHTML = `
      <h2>Your Results</h2>
      <p>Maintenance Calories: <strong>${maintenanceCalories.toFixed(2)}</strong> kcal</p>
    `;
  }

  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault();

    if (!document.getElementById('imperialInputs').classList.contains('hidden')) {
      calculateImperial();
    } else {
      calculateMetric();
    }
  });

  // Gender Button Toggle
  document.getElementById('maleButton').addEventListener('click', function () {
    document.getElementById('maleButton').classList.add('active');
    document.getElementById('femaleButton').classList.remove('active');
    document.getElementById('gender').value = 'male';
  });

  document.getElementById('femaleButton').addEventListener('click', function () {
    document.getElementById('femaleButton').classList.add('active');
    document.getElementById('maleButton').classList.remove('active');
    document.getElementById('gender').value = 'female';
  });

  const weightInput = document.getElementById('weight');
  const weightUnit = document.getElementById('weightUnit');
  const heightInput = document.getElementById('height');
  const heightUnit = document.getElementById('heightUnit');

  weightUnit.addEventListener('change', function () {
    if (weightUnit.value === 'lb') {
      weightInput.value = (weightInput.value * 2.20462).toFixed(2);
    } else {
      weightInput.value = (weightInput.value / 2.20462).toFixed(2);
    }
  });

  heightUnit.addEventListener('change', function () {
    if (heightUnit.value === 'ft') {
      heightInput.value = (heightInput.value / 30.48).toFixed(2);
    } else {
      heightInput.value = (heightInput.value * 30.48).toFixed(2);
    }
  });
});


