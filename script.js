// Obtener elementos del DOM
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');
const calcBtn = document.getElementById('calc-btn');
const resetBtn = document.getElementById('reset-btn');
const resultContainer = document.getElementById('result-container');

const imcValueEl = document.getElementById('imc-value');
const imcCategoryEl = document.getElementById('imc-category');
const trafficLight = document.getElementById('traffic-light');
const barMarker = document.getElementById('bar-marker');

// Función para calcular
function calculateBMI() {
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);

  // Validación simple
  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    alert("Por favor, ingresa valores válidos para peso y altura.");
    return;
  }

  // Fórmula IMC
  const bmi = weight / (height * height);
  const bmiFixed = bmi.toFixed(2);

  // Determinar categoría y estilos
  let category = '';
  let color = '';

  if (bmi < 18.5) {
    category = 'Bajo peso';
    color = 'var(--color-underweight)';
  } else if (bmi >= 18.5 && bmi < 24.9) {
    category = 'Normal';
    color = 'var(--color-normal)';
  } else if (bmi >= 25 && bmi < 29.9) {
    category = 'Sobrepeso';
    color = 'var(--color-overweight)';
  } else {
    category = 'Obesidad';
    color = 'var(--color-obesity)';
  }

  // Actualizar UI
  updateInterface(bmi, bmiFixed, category, color);
}

// Función para actualizar la interfaz
function updateInterface(bmi, bmiText, category, color) {
  // Mostrar contenedor de resultados
  resultContainer.classList.remove('hidden');

  // Actualizar textos
  imcValueEl.textContent = bmiText;
  imcCategoryEl.textContent = category;
  imcCategoryEl.style.color = color;

  // Actualizar semáforo (color y sombra)
  trafficLight.style.backgroundColor = color;
  trafficLight.style.boxShadow = `0 0 15px ${color}`;

  // Actualizar posición de la barra
  // La escala va de 0 a 40. Si es mayor a 40, se topa en 100%.
  let percentage = (bmi / 40) * 100;
  
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;

  barMarker.style.left = `${percentage}%`;
}

// Función de Reset
function resetCalculator() {
  weightInput.value = '';
  heightInput.value = '';
  resultContainer.classList.add('hidden');
  
  // Limpiar estilos inline
  trafficLight.style.backgroundColor = '#ddd';
  trafficLight.style.boxShadow = 'none';
  barMarker.style.left = '0%';
}

// Event Listeners
calcBtn.addEventListener('click', calculateBMI);
resetBtn.addEventListener('click', resetCalculator);

// Permitir calcular con la tecla Enter
document.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    calculateBMI();
  }
});