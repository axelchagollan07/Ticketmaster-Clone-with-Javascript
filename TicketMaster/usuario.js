class Usuario {
    constructor(nombre, email, contraseña) {
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña; // En una implementación real se debería hashear la contraseña.
    }

    // Método para validar si el email y la contraseña coinciden
    static validarCredenciales(email, contraseña, usuarios) {
        for (let usuario of usuarios) {
            if (usuario.email === email && usuario.contraseña === contraseña) {
                return usuario;
            }
        }
        return null;
    }

    // Método para registrar un nuevo usuario
    static registrarUsuario(nombre, email, contraseña, usuarios) {
        const nuevoUsuario = new Usuario(nombre, email, contraseña);
        usuarios.push(nuevoUsuario);
    }
}
