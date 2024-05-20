// Clase Jugador: define la estructura de datos para un jugador.
class Jugador {
    constructor(nombre, edad, posicion, estado = 'suplente') {
        this.nombre = nombre; // Nombre del jugador
        this.edad = edad;     // Edad del jugador
        this.posicion = posicion; // Posición del jugador en el campo de juego
        this.estado = estado; // Estado actual del jugador (titular, suplente, lesionado), por defecto es 'suplente'
    }
}

// Función para obtener los jugadores almacenados en localStorage.
const obtenerJugadoresLocalStorage = () => {
    const jugadoresString = localStorage.getItem('jugadores'); // Obtiene la cadena JSON de jugadores de localStorage
    return jugadoresString ? JSON.parse(jugadoresString) : []; // Parsea la cadena JSON a un array de objetos, o retorna un array vacío si no hay datos
};

// Función para guardar los jugadores en localStorage.
const guardarJugadoresLocalStorage = (jugadores) => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores)); // Convierte el array de jugadores a una cadena JSON y la guarda en localStorage
};

// Función asíncrona para agregar un nuevo jugador al equipo.
const agregarJugador = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador:"); // Pide al usuario el nombre del jugador
        const edad = parseInt(prompt("Ingrese la edad del jugador:")); // Pide al usuario la edad del jugador
        const posicion = prompt("Ingrese la posición del jugador:"); // Pide al usuario la posición del jugador

        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista actual de jugadores
        const jugadorExistente = jugadores.find(jugador => jugador.nombre === nombre); // Busca si ya existe un jugador con el mismo nombre
        if (jugadorExistente) {
            throw new Error('El jugador ya está en el equipo.'); // Si el jugador ya existe, lanza un error
        }

        const nuevoJugador = new Jugador(nombre, edad, posicion); // Crea un nuevo objeto jugador
        jugadores.push(nuevoJugador); // Añade el nuevo jugador al array de jugadores
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores en localStorage
        alert('Jugador agregado correctamente.'); // Notifica al usuario que el jugador fue agregado
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función asíncrona para listar todos los jugadores del equipo.
const listarJugadores = async () => {
    try {
        const jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        let tablaHtml = '<table border="1"><tr><th>Nombre</th><th>Edad</th><th>Posición</th><th>Estado</th></tr>'; // Inicia el HTML de la tabla
        jugadores.forEach(jugador => {
            tablaHtml += `<tr><td>${jugador.nombre}</td><td>${jugador.edad}</td><td>${jugador.posicion}</td><td>${jugador.estado}</td></tr>`; // Añade una fila por cada jugador
        });
        tablaHtml += '</table>'; // Cierra la tabla
        document.getElementById('listaJugadores').innerHTML = tablaHtml; // Establece el HTML del elemento con id 'listaJugadores'
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función asíncrona para asignar una nueva posición a un jugador.
const asignarPosicion = async () => {
    try {
        const nombre = prompt("Ingrese el nombre del jugador para cambiar su posición:"); // Pide al usuario el nombre del jugador a cambiar de posición
        const nuevaPosicion = prompt("Ingrese la nueva posición:"); // Pide la nueva posición para el jugador
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const jugadorIndex = jugadores.findIndex(jugador => jugador.nombre === nombre); // Busca el índice del jugador en el array
        if (jugadorIndex === -1) {
            throw new Error('El jugador no existe en el equipo.'); // Si el jugador no existe, lanza un error
        }
        jugadores[jugadorIndex].posicion = nuevaPosicion; // Cambia la posición del jugador
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Posición asignada correctamente.'); // Notifica al usuario que la posición fue asignada
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función asíncrona para realizar un cambio durante un partido.
const realizarCambio = async () => {
    try {
        const jugadorEntrante = prompt("Ingrese el nombre del jugador entrante:"); // Pide el nombre del jugador que entra al juego
        const jugadorSaliente = prompt("Ingrese el nombre del jugador saliente:"); // Pide el nombre del jugador que sale del juego
        let jugadores = obtenerJugadoresLocalStorage(); // Obtiene la lista de jugadores
        const indexEntrante = jugadores.findIndex(jugador => jugador.nombre === jugadorEntrante); // Busca el índice del jugador entrante
        const indexSaliente = jugadores.findIndex(jugador => jugador.nombre === jugadorSaliente); // Busca el índice del jugador saliente
        if (indexEntrante === -1 || indexSaliente === -1) {
            throw new Error('Uno o ambos jugadores no existen.'); // Si alguno de los jugadores no existe, lanza un error
        }
        jugadores[indexEntrante].estado = 'titular'; // Cambia el estado del jugador entrante a titular
        jugadores[indexSaliente].estado = 'suplente'; // Cambia el estado del jugador saliente a suplente
        guardarJugadoresLocalStorage(jugadores); // Guarda el array actualizado de jugadores
        alert('Cambio realizado correctamente.'); // Notifica al usuario que el cambio fue realizado
    } catch (error) {
        console.error('Error:', error.message); // Maneja errores mostrando un mensaje en la consola
    }
};

// Función principal asíncrona que interactúa con el usuario
const main = async () => {
    // Aquí se podría añadir lógica para iniciar acciones específicas si es necesario
};

main(); // Iniciar la aplicación
