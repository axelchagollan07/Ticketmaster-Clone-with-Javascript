const fechasNoLaborales = [
  "2025-01-01", // Año Nuevo
  "2025-02-05", // Día de la Constitución
  "2025-03-21", // Natalicio de Benito Juárez
  "2025-05-01", // Día del Trabajo
  "2025-09-16", // Independencia de México
  "2025-11-20", // Día de la Revolución Mexicana
  "2025-12-25"  // Navidad
];

// Función para verificar si es un día no laboral
function esDiaNoLaboral(fecha) {
  const dia = new Date(fecha);
  // Verificar si es fin de semana o un día festivo
  return dia.getDay() === 0 || dia.getDay() === 6 || fechasNoLaborales.includes(fecha);
}

// Función para manejar un día no laboral
function manejarDiaNoLaboral() {
  alert("No se puede realizar la compra en días no laborales. Por favor elige otra fecha.");
  document.getElementById("fecha").value = "";
  document.getElementById("fecha").focus();
}

// Validación para el campo de fecha (limitar selección de días no laborales)
document.getElementById("fecha").addEventListener("change", (e) => {
  const fechaSeleccionada = e.target.value;

  if (esDiaNoLaboral(fechaSeleccionada)) {
    manejarDiaNoLaboral();
  }
});

// Restante código de script.js...
