async function validarRegistro(event) {
    event.preventDefault();
  
    const nombre      = document.getElementById("nombre").value.trim();
    const correo      = document.getElementById("correo").value.trim();
    const usuario     = document.getElementById("usuario").value.trim();
    const contrasena  = document.getElementById("contrasena").value.trim();
  
    const registroMensaje = document.getElementById("registroMensaje");
    registroMensaje.textContent = "";
    registroMensaje.classList.remove("error","success");
  
    // Validaciones
    if (!nombre || !correo || !usuario || !contrasena) {
      registroMensaje.textContent = "Todos los campos son requeridos.";
      registroMensaje.classList.add("error");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(correo)) {
      registroMensaje.textContent = "El correo no tiene un formato válido.";
      registroMensaje.classList.add("error");
      return;
    }
    const usuarioRegex = /^[A-Z]{4}\d{6}[A-Z]{1}[A-Z]{2}[A-Z0-9]{3}[A-Z]{2}\d{2}$/;
    if (usuario.length !== 20 || !usuarioRegex.test(usuario)) {
      registroMensaje.textContent = "El usuario debe tener 20 caracteres y seguir el formato CURP.";
      registroMensaje.classList.add("error");
      return;
    }
    const contrasenaRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@$!%*?&]{8}$/;
    if (!contrasenaRegex.test(contrasena)) {
      registroMensaje.textContent = "La contraseña debe tener 8 caracteres, incluyendo mayúscula, minúscula, número y carácter especial.";
      registroMensaje.classList.add("error");
      return;
    }
  
    // Envío al servidor
    try {
      console.log("Datos enviados al backend:", { nombre, correo, usuario, contrasena });
      const response = await fetch("http://localhost:3000/auth/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, usuario, contrasena })
      });
      const data = await response.json();
  
      if (response.ok) {
        registroMensaje.textContent = data.mensaje;
        registroMensaje.classList.add("success");
        setTimeout(() => window.location.href = "login.html", 1500);
      } else {
        registroMensaje.textContent = data.mensaje;
        registroMensaje.classList.add("error");
      }
    } catch (err) {
      registroMensaje.textContent = "Error al conectar con el servidor.";
      registroMensaje.classList.add("error");
    }
  }
  