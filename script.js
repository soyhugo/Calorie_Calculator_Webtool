document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get user inputs
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;
  
    // Calculate BMR
    let bmr;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
  
    // Calculate maintenance calories
    const maintenanceCalories = bmr * activity;
  
    // Adjust for goal
    let totalCalories;
    if (goal === 'deficit') {
      totalCalories = maintenanceCalories * 0.8; // 20% deficit
    } else {
      totalCalories = maintenanceCalories * 1.2; // 20% surplus
    }
  
    // Macronutrient calculations
    const protein = weight * 1.6;
    const fat = weight * 1;
    const carbs = (totalCalories - (protein * 4 + fat * 9)) / 4;
  
    // Display results
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `
      <h2>Results</h2>
      <p>Maintenance Calories: ${maintenanceCalories.toFixed(2)} kcal</p>
      <p>Total Calories (${goal}): ${totalCalories.toFixed(2)} kcal</p>
      <p>Protein: ${protein.toFixed(2)} g</p>
      <p>Fat: ${fat.toFixed(2)} g</p>
      <p>Carbs: ${carbs.toFixed(2)} g</p>
    `;
  });
  