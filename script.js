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
