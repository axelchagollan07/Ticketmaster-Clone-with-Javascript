class EventoTeatro extends Evento {
    constructor(nombre, fecha, lugar, precio, director) {
        super(nombre, fecha, lugar, precio);
        this.director = director;
    }

    mostrarEvento() {
        return `
            <div class="evento">
                <h2>${this.nombre} (Teatro)</h2>
                <p>Fecha: ${this.fecha}</p>
                <p>Lugar: ${this.lugar}</p>
                <p>Precio: $${this.precio}</p>
                <p>Director: ${this.director}</p>
            </div>
        `;
    }
}
