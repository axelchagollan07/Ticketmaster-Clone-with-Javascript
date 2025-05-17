const eventos = [
    new Evento("Concierto de Rock", "2025-03-20", "Arena Ciudad de México", 500),
    new EventoTeatro("Obra de Teatro", "2025-03-22", "Teatro Nacional", 300, "Pedro Ruiz"),
    new EventoCine("Pelicula de Ciencia Ficción", "2025-04-05", "Cinemex", 150, "John Smith", 120),
];

const contenedorEventos = document.getElementById("eventos");

eventos.forEach(evento => {
    contenedorEventos.innerHTML += evento.mostrarEvento();
});

