document.addEventListener("DOMContentLoaded", () => {
  const boton = document.getElementById("confirmar");

  if (boton) {
    boton.addEventListener("click", confirmarCompra);
  }
});

function confirmarCompra(event) {
  event.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const metodoPago = document.getElementById("metodoPago").value;

  const tipoEvento = (localStorage.getItem("tipoEvento") || "desconocido").toLowerCase();
  const fecha = localStorage.getItem("fechaEvento") || "2025-12-31";
  const hora = localStorage.getItem("horaEvento") || "20:00";
  const ubicacion = localStorage.getItem("ubicacionEvento") || "Por definir";
  const cantidad = parseInt(localStorage.getItem("cantidadBoletos") || "1");
  const precio = parseFloat(localStorage.getItem("precioTotal") || "0.00");

  const datos = {
    nombre_usuario: nombre,
    tipo_evento: tipoEvento,
    fecha: fecha,
    hora: hora,
    ubicacion: ubicacion,
    cantidad: cantidad,
    metodo_pago: metodoPago,
    precio: precio,
    telefono: telefono
  };

  // Guardar algunos datos en localStorage para usarlos después
  localStorage.setItem("nombreComprador", nombre);
  localStorage.setItem("metodoPago", metodoPago);

  // Enviar por POST con fetch a guardarCompra.php
  fetch("guardarCompra.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(datos)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        alert("Compra registrada exitosamente.");

        if (metodoPago === "Tarjeta") {
          window.location.href = "tarjeta.html";
        } else if (metodoPago === "PayPal") {
          window.location.href = "paypal.html";
        } else {
          alert("Pago en efectivo seleccionado. Gracias por tu compra.");

          switch (tipoEvento) {
            case "cine":
              window.location.href = "boletoCine.html";
              break;
            case "teatro":
              window.location.href = "boletoTeatro.html";
              break;
            case "museo":
              window.location.href = "boletoMuseo.html";
              break;
            default:
              alert("Tipo de evento no reconocido.");
              break;
          }
        }
      } else {
        alert("Error al registrar compra.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Error en la conexión con el servidor.");
    });
}

document.getElementById("generarPdf").addEventListener("click", () => {
  const idCompra = "1234"; // Suponiendo que el ID lo recibiste del backend
  const urlCompra = `https://tusitio.com/verCompra.html?id=${idCompra}`;

  // Generar el código QR
  const qr = new QRious({
    element: document.getElementById("qrCanvas"),
    value: urlCompra,
    size: 200
  });

  const qrDataUrl = qr.toDataURL();

  // Crear PDF
  const doc = new jsPDF();
  doc.setFontSize(14);
  doc.text("Recibo de Compra", 20, 20);
  doc.text("Nombre: Juan Pérez", 20, 30);
  doc.text("Evento: Teatro", 20, 40);
  doc.text("Fecha: 2025-12-31", 20, 50);
  doc.text("Hora: 20:00", 20, 60);
  doc.text("Ubicación: Auditorio", 20, 70);
  doc.text("Boletos: 2", 20, 80);
  doc.text("Total: $400.00", 20, 90);
  doc.text("Código de compra: #1234", 20, 100);

  // Agregar QR al PDF
  doc.addImage(qrDataUrl, "PNG", 20, 110, 50, 50);

  doc.save("boleto.pdf");
});
