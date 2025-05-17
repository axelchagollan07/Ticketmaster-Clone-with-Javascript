class Evento {
    constructor(nombre, fecha, lugar, precio) {
        this.nombre = nombre;
        this.fecha = fecha;
        this.lugar = lugar;
        this.precio = precio;
    }

    mostrarEvento() {
        return `
            <div class="evento">
                <h2>${this.nombre}</h2>
                <p>Fecha: ${this.fecha}</p>
                <p>Lugar: ${this.lugar}</p>
                <p>Precio: $${this.precio}</p>
            </div>
        `;
    }
}
