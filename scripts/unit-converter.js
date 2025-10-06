const unitData = {
  weight: {
    units: ['mg', 'g', 'kg', 'lb'],
    rates: {
      mg: 0.001,
      g: 1,
      kg: 1000,
      lb: 453.592
    }
  },
  length: {
    units: ['cm', 'm', 'inch', 'ft'],
    rates: {
      cm: 0.01,
      m: 1,
      inch: 0.0254,
      ft: 0.3048
    }
  },
  volume: {
    units: ['mL', 'L', 'tsp', 'tbsp', 'cup', 'gallon'],
    rates: {
      mL: 0.001,
      L: 1,
      tsp: 0.00492892,
      tbsp: 0.0147868,
      cup: 0.236588,
      gallon: 3.78541
    }
  },
  temperature: {
    units: [
      { label: 'Celsius (°C)', value: 'C' },
      { label: 'Fahrenheit (°F)', value: 'F' },
      { label: 'Kelvin (K)', value: 'K' }
    ]
    // no rates because temperature uses formulas
  }
};

const measurementType = document.getElementById('measurementType');
const fromUnit = document.getElementById('fromUnit');
const toUnit = document.getElementById('toUnit');
const inputValue = document.getElementById('inputValue');
const resultDiv = document.getElementById('result');

// Populate dropdowns based on measurement type
measurementType.addEventListener('change', () => {
  const type = measurementType.value;

  if (!type || !unitData[type]) {
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    fromUnit.disabled = true;
    toUnit.disabled = true;
    inputValue.disabled = true;
    resultDiv.textContent = 'Result: ';
    return;
  }

  const units = unitData[type].units;

  fromUnit.innerHTML = units.map(unit => {
    if (typeof unit === 'object') {
      return `<option value="${unit.value}">${unit.label}</option>`;
    }
    return `<option value="${unit}">${unit}</option>`;
  }).join('');

  toUnit.innerHTML = fromUnit.innerHTML;

  fromUnit.disabled = false;
  toUnit.disabled = false;
  inputValue.disabled = false;
  resultDiv.textContent = 'Result: ';
  inputValue.value = '';
});

// Temperature conversion logic
function convertTemperature(value, from, to) {
  if (from === to) return value;

  let celsius;
  switch(from) {
    case 'C': celsius = value; break;
    case 'F': celsius = (value - 32) * 5 / 9; break;
    case 'K': celsius = value - 273.15; break;
  }

  switch(to) {
    case 'C': return celsius;
    case 'F': return celsius * 9 / 5 + 32;
    case 'K': return celsius + 273.15;
  }
}

// General convert function
function convert() {
  const type = measurementType.value;
  if (!type || !unitData[type]) {
    resultDiv.textContent = 'Result: ';
    return;
  }

  const val = parseFloat(inputValue.value);
  if (isNaN(val)) {
    resultDiv.textContent = 'Result: Please enter a valid number.';
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  if (type === 'temperature') {
    const converted = convertTemperature(val, from, to);
    resultDiv.textContent = `Result: ${converted.toFixed(2)} °${to}`;
    return;
  }

  const rates = unitData[type].rates;

  if (!rates[from] || !rates[to]) {
    resultDiv.textContent = 'Result: Invalid units selected.';
    return;
  }

  const baseValue = val * rates[from];
  const converted = baseValue / rates[to];

  resultDiv.textContent = `Result: ${converted.toFixed(4)} ${to}`;
}

// Event listeners for dropdowns and input
fromUnit.addEventListener('change', convert);
toUnit.addEventListener('change', convert);
inputValue.addEventListener('input', convert);
