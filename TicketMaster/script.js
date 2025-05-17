// Función de login
function login(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validación de credenciales
    if (username === "usuario" && password === "1234") {
        alert("Login exitoso");
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('events-container').style.display = 'block';
    } else {
        alert("Credenciales incorrectas");
    }
}

// Función para mostrar detalles del evento seleccionado
function mostrarDetallesEvento() {
    const event = document.getElementById('event-select').value;
    const eventDetails = document.getElementById('event-details');
    const boletosInput = document.getElementById('boletos');

    // Verificar si se ha seleccionado un evento
    if (!event) {
        alert("Por favor, selecciona un evento.");
        return;
    }

    if (event === 'teatro') {
        eventDetails.innerHTML = `
            <p>Teatro - Horarios: 18:00, 20:00 | Precio: $500 por boleto</p>
            <p>Días festivos: No disponible el 24 y 31 de diciembre</p>
            <p>Restricciones: Máximo 4 boletos por usuario.</p>`;
    } else if (event === 'cine') {
        eventDetails.innerHTML = `
            <p>Cine - Horarios: 15:00, 18:00 | Precio: $300 por boleto</p>
            <p>Días festivos: No disponible el 1 de enero</p>
            <p>Restricciones: Máximo 5 boletos por usuario.</p>`;
    } else if (event === 'museo') {
        eventDetails.innerHTML = `
            <p>Museo - Horarios: 10:00, 12:00 | Precio: $150 por boleto</p>
            <p>Días festivos: No disponible el 5 de febrero</p>
            <p>Restricciones: Máximo 6 boletos por usuario.</p>`;
    } else {
        eventDetails.innerHTML = "";
    }

    // Actualizar monto según los boletos seleccionados
    actualizarMonto();
}

// Función para actualizar monto
function actualizarMonto() {
    const event = document.getElementById('event-select').value;
    const boletos = parseInt(document.getElementById('boletos').value);
    let precioPorBoleto = 0;
    let maxBoletos = 5;

    if (event === 'teatro') {
        precioPorBoleto = 500;
        maxBoletos = 4;
    } else if (event === 'cine') {
        precioPorBoleto = 300;
        maxBoletos = 5;
    } else if (event === 'museo') {
        precioPorBoleto = 150;
        maxBoletos = 6;
    }

    // Comprobar la capacidad máxima de boletos
    if (boletos > maxBoletos) {
        document.getElementById('boletos').value = maxBoletos;
        alert(`La cantidad máxima de boletos es ${maxBoletos}.`);
    }

    const total = boletos * precioPorBoleto;
    document.getElementById('pago-monto').innerText = "Monto a pagar: $" + total;
}

// Función para confirmar pago
function confirmarPago() {
    const event = document.getElementById('event-select').value;
    const boletos = parseInt(document.getElementById('boletos').value);
    const paymentType = document.getElementById('payment-type').value;

    // Verificar si se ha seleccionado un evento
    if (!event) {
        alert("Por favor, selecciona un evento.");
        return;
    }

    // Verificar tipo de pago
    if (paymentType !== 'efectivo' && paymentType !== 'tarjeta') {
        alert("Por favor, selecciona un tipo de pago válido.");
        return;
    }

    alert("Pago confirmado\nTipo de pago: " + paymentType + "\nMonto a pagar: $" + (boletos * (event === 'teatro' ? 500 : event === 'cine' ? 300 : 150)));
}

// Evento de login
document.getElementById('login-form').addEventListener('submit', login);

// Evento para selección de evento
document.getElementById('event-select').addEventListener('change', mostrarDetallesEvento);

// Evento para cantidad de boletos
document.getElementById('boletos').addEventListener('input', actualizarMonto);

// Evento para confirmar pago
document.getElementById('confirmar-pago').addEventListener('click', confirmarPago);
