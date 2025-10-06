const input = document.getElementById('value');
const select = document.getElementById('conversion');
const resultDiv = document.getElementById('result');

function convert() {
  const val = parseFloat(input.value);
  const type = select.value;

  if (isNaN(val)) {
    resultDiv.textContent = "Result: Please enter a number";
    return;
  }

  let result;

  switch (type) {
    case "mgToMl":
      result = val / 1; // Example: 1 mg = 1 mL (change based on concentration if needed)
      break;
    case "mlToMg":
      result = val * 1;
      break;
    case "gToMg":
      result = val * 1000;
      break;
    case "mgToG":
      result = val / 1000;
      break;
    default:
      result = "Invalid conversion";
  }

  resultDiv.textContent = `Result: ${result}`;
}

input.addEventListener('input', convert);
select.addEventListener('change', convert);
