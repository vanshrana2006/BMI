window.onload = () => {
    const button = document.querySelector('#calculate');
    button.addEventListener('click', calculateBMI);
    loadHistory();
};

let history = [];

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; 
    const age = parseInt(document.getElementById('age').value);
    const result = document.querySelector('#result');

    if (!weight || isNaN(weight) || weight <= 0 || weight > 500) {
        alert("Please enter a valid weight.");
        return;
    }
    if (!height || isNaN(height) || height <= 0 || height > 300) {
        alert("Please enter a valid height.");
        return;
    }
    if (!age || age <= 0 || age > 120) {
        alert("Please enter a valid age.");
        return;
    }

    const bmi = (weight / (height * height)).toFixed(1);
    const { category, tip, categoryClass } = getBMICategoryByAge(bmi, age);

    result.className = ''; 
    result.classList.add(categoryClass);
    result.style.opacity = 1;
    result.innerHTML = `<b>Your BMI is: ${bmi} (${category})</b><br><br>${tip}`;

    const date = new Date().toLocaleDateString();
    history.push({ date, category, bmi });
    saveHistory();
    displayHistory();
}

function getBMICategoryByAge(bmi, age) {
    let category = '';
    let tip = '';
    let categoryClass = ''; 

    if (age < 18) {
        if (bmi < 18.5) {
            category = "Underweight";
            tip = "A balanced diet and regular physical activity are recommended to reach a healthy weight.";
            categoryClass = "underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal";
            tip = "Keep up the good work with a healthy diet and regular exercise.";
            categoryClass = "normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
            tip = "Encourage a healthy lifestyle with balanced meals and physical activity.";
            categoryClass = "overweight";
        } else {
            category = "Obesity";
            tip = "Consult with a healthcare provider for a weight management plan.";
            categoryClass = "obesity1";
        }
    } else if (age >= 18 && age <= 64) {
        if (bmi < 18.5) {
            category = "Under Weight";
            tip = "Consider speaking to a healthcare professional to develop a weight gain plan.";
            categoryClass = "underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal";
            tip = "Maintain a balanced diet and regular exercise.";
            categoryClass = "normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Over Weight";
            tip = "Incorporate regular physical activity and monitor your diet.";
            categoryClass = "overweight";
        } else if (bmi >= 30 && bmi < 34.9) {
            category = "Obesity - Moderate";
            tip = "Consult with a healthcare provider to create a weight management plan.";
            categoryClass = "obesity1";
        } else if (bmi >= 35 && bmi < 39.9) {
            category = "Obesity - Severe";
            tip = "Professional assistance and a personalized plan for weight loss are recommended.";
            categoryClass = "obesity2";
        } else {
            category = "Extreme Obesity";
            tip = "Seek medical advice immediately for a comprehensive treatment plan.";
            categoryClass = "extreme";
        }
    } else {
        if (bmi < 18.5) {
            category = "Underweight";
            tip = "Ensure proper nutrition and consider speaking with a healthcare provider.";
            categoryClass = "underweight";
        } else if (bmi >= 18.5 && bmi < 24.9) {
            category = "Normal";
            tip = "Stay active and maintain a balanced diet.";
            categoryClass = "normal";
        } else if (bmi >= 25 && bmi < 29.9) {
            category = "Overweight";
            tip = "Avoid excessive weight gain and focus on maintaining mobility and strength.";
            categoryClass = "overweight";
        } else {
            category = "Obesity";
            tip = "Consult your healthcare provider for age-appropriate weight management advice.";
            categoryClass = "obesity2";
        }
    }

    return { category, tip, categoryClass };
}

function saveHistory() {
    localStorage.setItem('bmiHistory', JSON.stringify(history));
}

function displayHistory() {
    const historyList = document.querySelector('#history');
    historyList.innerHTML = '';

    history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `${entry.date} - ${entry.category}: ${entry.bmi}`;
        historyList.appendChild(li);
    });
}


function loadHistory() {
    const savedHistory = JSON.parse(localStorage.getItem('bmiHistory'));
    if (savedHistory) {
        history = savedHistory;
        displayHistory();
}
}