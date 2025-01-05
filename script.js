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
document.addEventListener('DOMContentLoaded', function () {
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
    
    const mode = localStorage.getItem('mode') || 'dark'; // Default to dark mode
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (mode === 'dark') {
        document.body.classList.add('dark-mode');
    } else {
        document.body.classList.remove('dark-mode');
    }
    darkModeToggle.textContent = 'Change Lighting Mode'; // Set initial button text
});

  
  // Redirect to Formula Library
  document.getElementById('formulaLibrary').addEventListener('click', function () {
    window.location.href = 'formulas.html';
  });
  
  
  // Form submission functionality
  document.getElementById('imperialTab').addEventListener('click', function () {
    document.getElementById('imperialInputs').classList.remove('hidden');
    document.getElementById('metricInputs').classList.add('hidden');
    this.classList.add('active');
    document.getElementById('metricTab').classList.remove('active');
  });
  
  document.getElementById('metricTab').addEventListener('click', function () {
    document.getElementById('metricInputs').classList.remove('hidden');
    document.getElementById('imperialInputs').classList.add('hidden');
    this.classList.add('active');
    document.getElementById('imperialTab').classList.remove('active');
  });
  
  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    let weight, height;
    if (!document.getElementById('imperialInputs').classList.contains('hidden')) {
      const weightImperial = parseFloat(document.getElementById('weightImperial').value);
      const heightFeet = parseInt(document.getElementById('heightImperialFeet').value);
      const heightInches = parseInt(document.getElementById('heightImperialInches').value);
  
      weight = weightImperial / 2.20462; // Convert lbs to kg
      height = (heightFeet * 30.48) + (heightInches * 2.54); // Convert ft/in to cm
    } else {
      weight = parseFloat(document.getElementById('weightMetric').value);
      height = parseFloat(document.getElementById('heightMetric').value);
    }
  
    const age = parseInt(document.getElementById('age').value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
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


