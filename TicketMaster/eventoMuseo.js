class EventoMuseo extends Evento {
    constructor(nombre, fecha, lugar, precio, exposicion) {
        super(nombre, fecha, lugar, precio);
        this.exposicion = exposicion;
    }

    mostrarEvento() {
        return `
            <div class="evento">
                <h2>${this.nombre} (Museo)</h2>
                <p>Fecha: ${this.fecha}</p>
                <p>Lugar: ${this.lugar}</p>
                <p>Precio: $${this.precio}</p>
                <p>Exposición: ${this.exposicion}</p>
            </div>
        `;
    }
}
