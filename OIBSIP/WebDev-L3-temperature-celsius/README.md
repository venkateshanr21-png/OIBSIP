# Temperature Converter

Small web tool that converts between Celsius, Fahrenheit and Kelvin.

## Run it
Open `index.html` in any browser. No install or server needed.

## Structure
```
WebDev-L3-temperature-celsius/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Features
- Numeric input with live validation (rejects letters/symbols with an error message)
- Unit dropdown: Celsius / Fahrenheit / Kelvin
- Convert button (Enter key works too)
- Shows all three units at once
- Absolute zero check (-273.15 °C / -459.67 °F / 0 K)
- Centred, responsive layout

## Formulas
- °F = °C × 9/5 + 32
- °C = (°F − 32) × 5/9
- K = °C + 273.15
