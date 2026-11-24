// Temperature Converter
// Converts between Celsius, Fahrenheit and Kelvin.

const ABSOLUTE_ZERO = {
  C: -273.15,
  F: -459.67,
  K: 0
};

const input = document.getElementById("temp-input");
const unitSelect = document.getElementById("unit-select");
const convertBtn = document.getElementById("convert-btn");
const errorEl = document.getElementById("error");
const resultsEl = document.getElementById("results");
const outC = document.getElementById("out-c");
const outF = document.getElementById("out-f");
const outK = document.getElementById("out-k");

// optional minus sign, digits, optional decimal part (".5" and "5." are fine)
const NUMBER_PATTERN = /^-?(\d+\.?\d*|\.\d+)$/;

// ---- conversion helpers ----

function toCelsius(value, unit) {
  if (unit === "F") return (value - 32) * 5 / 9;
  if (unit === "K") return value - 273.15;
  return value;
}

function fromCelsius(celsius) {
  return {
    C: celsius,
    F: celsius * 9 / 5 + 32,
    K: celsius + 273.15
  };
}

function format(n) {
  // round to 2 decimals, avoid "-0.00"
  const rounded = Math.round(n * 100) / 100;
  return (Object.is(rounded, -0) ? 0 : rounded).toFixed(2);
}

// ---- validation ----

function validate(text, unit) {
  const trimmed = text.trim();

  if (trimmed === "") {
    return { ok: false, message: "Please enter a temperature." };
  }
  if (!NUMBER_PATTERN.test(trimmed)) {
    return { ok: false, message: "Numbers only - letters and symbols are not allowed." };
  }

  const value = parseFloat(trimmed);
  if (value < ABSOLUTE_ZERO[unit]) {
    return {
      ok: false,
      message: "Below absolute zero (" + ABSOLUTE_ZERO[unit] + " " + symbol(unit) + ")."
    };
  }

  return { ok: true, value: value };
}

function symbol(unit) {
  return unit === "K" ? "K" : "°" + unit;
}

function showError(message) {
  errorEl.textContent = message;
  input.classList.add("invalid");
  resultsEl.classList.add("hidden");
}

function clearError() {
  errorEl.textContent = "";
  input.classList.remove("invalid");
}

// ---- main actions ----

function convert() {
  const unit = unitSelect.value;
  const check = validate(input.value, unit);

  if (!check.ok) {
    showError(check.message);
    return;
  }

  clearError();
  const all = fromCelsius(toCelsius(check.value, unit));

  outC.textContent = format(all.C) + " °C";
  outF.textContent = format(all.F) + " °F";
  outK.textContent = format(all.K) + " K";
  resultsEl.classList.remove("hidden");
}

// live validation while typing (stay quiet when the box is empty)
input.addEventListener("input", function () {
  if (input.value.trim() === "") {
    clearError();
    return;
  }
  const check = validate(input.value, unitSelect.value);
  if (check.ok) {
    clearError();
  } else {
    showError(check.message);
  }
});

unitSelect.addEventListener("change", function () {
  if (input.value.trim() !== "") convert();
});

convertBtn.addEventListener("click", convert);

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") convert();
});
