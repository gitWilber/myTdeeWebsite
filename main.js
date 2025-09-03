// main.js

document.addEventListener("DOMContentLoaded", () => {
    const calculateBtn = document.querySelector("button");
    calculateBtn.addEventListener("click", calculateTDEE);
});

function calculateTDEE() {
    // Grab values from form
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = parseInt(document.getElementById("age").value);
    const weightLbs = parseFloat(document.getElementById("weight").value);
    const heightFeet = parseInt(document.getElementById("feet").value);
    const heightInches = parseInt(document.getElementById("inches").value);
    const activityLevel = document.getElementById("activityLevel").value;

    // Validation check
    if (!gender || !age || !weightLbs || isNaN(heightFeet) || isNaN(heightInches) || !activityLevel) {
        alert("⚠️ Please fill out all fields!");
        return;
    }

    // Convert units
    const weightKg = weightLbs * 0.453592; // lbs → kg
    const heightCm = ((heightFeet * 12) + heightInches) * 2.54; // ft+in → cm

    // Mifflin-St Jeor BMR
    let bmr;
    if (gender.value === "Male") {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Activity multipliers
    const activityMultipliers = {
        sedentary: 1.2,
        lightly: 1.375,
        moderate: 1.55,
        heavy: 1.725,
        extreme: 1.9
    };

    const tdee = Math.round(bmr * activityMultipliers[activityLevel]);

    // Show result
    displayResult(tdee);
}

function displayResult(tdee) {
    let resultDiv = document.getElementById("result");

    if (!resultDiv) {
        resultDiv = document.createElement("div");
        resultDiv.id = "result";
        resultDiv.classList.add("mt-3", "p-3", "bg-light", "border", "rounded");
        document.querySelector(".form").appendChild(resultDiv);
    }

    resultDiv.innerHTML = `<h4>Your TDEE: <strong>${tdee.toLocaleString()} calories/day</strong></h4>`;
}
