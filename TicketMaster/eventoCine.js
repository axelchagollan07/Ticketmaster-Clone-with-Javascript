class EventoCine extends Evento {
    constructor(nombre, fecha, lugar, precio, director, duracion) {
        super(nombre, fecha, lugar, precio);
        this.director = director;
        this.duracion = duracion;
    }

    mostrarEvento() {
        return `
            <div class="evento">
                <h2>${this.nombre} (Cine)</h2>
                <p>Fecha: ${this.fecha}</p>
                <p>Lugar: ${this.lugar}</p>
                <p>Precio: $${this.precio}</p>
                <p>Director: ${this.director}</p>
                <p>Duración: ${this.duracion} minutos</p>
            </div>
        `;
    }
}
