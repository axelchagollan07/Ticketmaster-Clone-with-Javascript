let intentosFallidos = 0; // 🔄 Persistente entre envíos

document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;
    const loginMensaje = document.getElementById("loginMensaje");

    try {
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, contrasena: contraseña })
        });

        const data = await response.json();

        if (response.ok) {
            loginMensaje.textContent = data.mensaje;
            loginMensaje.className = "alert success";
            intentosFallidos = 0; // Reinicia si inicia sesión correctamente

            // ✅ Guarda el nombre
            localStorage.setItem("nombreUsuario", data.nombre);

            setTimeout(() => {
                window.location.href = "/principal.html";
            }, 1000);
        } else {
            intentosFallidos++;

            loginMensaje.className = "alert error";
            loginMensaje.textContent = data.mensaje;

            if (intentosFallidos >= 3) {
                loginMensaje.innerHTML += `<br><a href="recuperar.html" style="color: #ffcc00;">¿Olvidaste tu contraseña? Haz clic aquí</a>`;
            }
        }
    } catch (error) {
        loginMensaje.textContent = "Error al conectar con el servidor.";
        loginMensaje.className = "alert error";
    }
});
