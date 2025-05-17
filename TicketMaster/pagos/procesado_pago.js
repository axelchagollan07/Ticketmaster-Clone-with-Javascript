document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formularioCompra");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const evento = document.getElementById("evento").value;
    const fecha = document.getElementById("fecha").value;
    const lugar = document.getElementById("ubicacion").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const metodoPago = document.getElementById("metodoPago").value;
    const precioTexto = document.getElementById("precio").value.replace('$', '');
    const total = parseFloat(precioTexto);
    const telefono = document.getElementById("telefono").value;

    const capacidadDisponible = 100; // Capacidad disponible (conectar a la base de datos aquí)

    // Función para verificar si es un día no laboral
    function esDiaNoLaboral(fecha) {
      const fechasNoLaborales = [
        "2025-01-01", // Año Nuevo
        "2025-02-05", // Día de la Constitución
        "2025-03-21", // Natalicio de Benito Juárez
        "2025-05-01", // Día del Trabajo
        "2025-09-16", // Independencia de México
        "2025-11-20", // Día de la Revolución Mexicana
        "2025-12-25"  // Navidad
      ];

      const dia = new Date(fecha);
      // Verificar si es fin de semana o un día festivo
      return dia.getDay() === 0 || dia.getDay() === 6 || fechasNoLaborales.includes(fecha);
    }

    // Verificar si es fin de semana o un día festivo
    if (esDiaNoLaboral(fecha)) {
      alert("Solo se pueden comprar boletos en días laborales (Lunes a Viernes).");
      return; // Detener el flujo si es un día no laboral
    }

    // Validación del teléfono
    if (!/^\d{10}$/.test(telefono)) {
      alert("Ingrese un número de teléfono válido (10 dígitos).");
      return;
    }

    // Verificar disponibilidad de boletos
    if (cantidad > capacidadDisponible) {
      alert("No hay suficientes boletos disponibles.");
      return;
    }

    // Generación de códigos de boletos
    const codigos = [];
    for (let i = 0; i < cantidad; i++) {
      codigos.push(`BOL-${new Date().getTime()}-${i + 1}`);  // Asegura que cada código sea único
    }

    const datosCompra = {
      nombre,
      evento,
      fecha,
      lugar,
      cantidad,
      metodoPago,
      total,
      codigos
    };

    fetch("http://localhost:3000/api/guardar-compra", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosCompra),
    })
    .then(response => response.json())
    .then(data => {
      console.log("Compra guardada:", data);
      // generarPDF(datosCompra);
      // enviarWhatsApp(datosCompra, telefono);
      // alert("Compra realizada con éxito.");
    })
    .catch(error => {
      console.error("Error al guardar la compra:", error);
      alert("Hubo un error al guardar la compra. Inténtalo de nuevo.");
    });

    // procesado_pago.js

    function confirmarCompra(event) {
      event.preventDefault(); // Evita que se recargue la página

      const nombre = document.getElementById("nombre").value;
      const evento = document.getElementById("evento").value;
      const fecha = document.getElementById("fecha").value;
      const hora = document.getElementById("hora").value;
      const ubicacion = document.getElementById("ubicacion").value;
      const cantidad = document.getElementById("cantidad").value;
      const metodoPago = document.getElementById("metodoPago").value;
      const precio = document.getElementById("precio").value;
      const telefono = document.getElementById("telefono").value;

      // Guardar en localStorage (opcional, si quieres recuperarlo después)
      const datosCompra = {
        nombre,
        evento,
        fecha,
        hora,
        ubicacion,
        cantidad,
        metodoPago,
        precio,
        telefono
      };

      localStorage.setItem("datosCompra", JSON.stringify(datosCompra));

      alert("¡Compra confirmada!\nTu información ha sido guardada.");
      
      // Redirigir, generar PDF o QR, etc., según lo que necesites hacer después
    }


    // Solo generar PDF y WhatsApp si la fecha es válida
    generarPDF(datosCompra);
    enviarWhatsApp(datosCompra, telefono);
    alert("Compra realizada con éxito.");
  });
});

function generarPDF(datos) {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFont("helvetica", "normal");
  doc.setFontSize(16);
  doc.text("Confirmación de compra", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.line(10, 25, 200, 25);

  let y = 35;
  doc.text(`Nombre: ${datos.nombre}`, 10, y);
  y += 10;
  doc.text(`Evento: ${datos.evento}`, 10, y);
  y += 10;
  doc.text(`Fecha: ${datos.fecha}`, 10, y);
  y += 10;
  doc.text(`Ubicación: ${datos.lugar}`, 10, y);
  y += 10;
  doc.text(`Cantidad de boletos: ${datos.cantidad}`, 10, y);
  y += 10;
  doc.text(`Método de pago: ${datos.metodoPago}`, 10, y);
  y += 10;

  const total = parseFloat(datos.total);
  if (!isNaN(total)) {
    doc.text(`Total: $${total.toFixed(2)}`, 10, y);
  } else {
    doc.text(`Total: Error en el cálculo`, 10, y);
  }

  y += 15;
  doc.setFontSize(13);
  doc.text("Códigos de boletos:", 10, y);
  doc.setFontSize(12);
  y += 10;

  datos.codigos.forEach((codigo, index) => {
    doc.text(`• ${codigo}`, 15, y + (index * 8));
  });

  // === Agregado: Generación del código QR ===
  const qrTexto = "http://127.0.0.1:5500/pagos/verCompra.html"; // Cambia a la URL real si es distinta
  const img = new Image();
  img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(qrTexto)}&size=100x100`;

  img.onload = () => {
    doc.addImage(img, 'PNG', 150, 30, 40, 40); // Puedes ajustar posición y tamaño si quieres
    const nombreArchivo = `Boleto_${datos.nombre.replace(/\s+/g, '_')}_${new Date().getTime()}.pdf`;
    doc.save(nombreArchivo);
  };
}

function enviarWhatsApp(datos, telefono) {
  const mensaje = `Confirmación de compra\n\nNombre: ${datos.nombre}\nEvento: ${datos.evento}\nFecha: ${datos.fecha}\nUbicación: ${datos.lugar}\nCantidad de boletos: ${datos.cantidad}\nMétodo de pago: ${datos.metodoPago}\nTotal: $${datos.total}\nCódigos: ${datos.codigos.join(', ')}`;
  const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}
