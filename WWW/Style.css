// Mapeo exacto de los nombres de tus archivos .mp4 reales
const seriesData = {
    1: [
        { name: "Episodio 1", file: "../Temporada1/Ep 1 T1.mp4" },
        { name: "Episodio 2", file: "../Temporada1/Ep 2 t1.mp4" },
        { name: "Episodio 3", file: "../Temporada1/Ep 3 t1.mp4" },
        { name: "Episodio 4", file: "../Temporada1/Ep 4 t1.mp4" },
        { name: "Episodio 5", file: "../Temporada1/Ep 5 t1.mp4" },
        { name: "Episodio 6", file: "../Temporada1/Ep 6 t1.mp4" },
        { name: "Episodio 7", file: "../Temporada1/ep 7 t1.mp4" },
        { name: "Episodio 8", file: "../Temporada1/Ep 8 t1.mp4" },
        { name: "Episodio 9", file: "../Temporada1/Ep 9 t1.mp4" },
        { name: "Episodio 10", file: "../Temporada1/ep 10 t1.mp4" }
    ],
    2: [
        { name: "Episodio 1", file: "../Temporada2/Ep1 t2.mp4" },
        { name: "Episodio 2", file: "../Temporada2/Ep 2 t2.mp4" },
        { name: "Episodio 3", file: "../Temporada2/Ep 3 t2.mp4" },
        { name: "Episodio 4", file: "../Temporada2/Ep 4 t2.mp4" },
        { name: "Episodio 5", file: "../Temporada2/Ep 5 T2.mp4" },
        { name: "Episodio 6", file: "../Temporada2/Ep 6 T2.mp4" },
        { name: "Episodio 7", file: "../Temporada2/Ep 7 t2.mp4" }
    ]
};

const episodiosGrid = document.getElementById('episodios-grid');
const episodiosTitulo = document.getElementById('episodios-titulo');
const videoContainer = document.getElementById('video-player-container');
const videoPlayer = document.getElementById('video-player');
const closeVideoBtn = document.getElementById('btn-close-video');

// Cargar la temporada 1 por defecto al abrir la app
document.addEventListener("DOMContentLoaded", () => {
    cargarEpisodios(1);
});

// Detectar clics en los botones de temporada
document.querySelectorAll('[data-temp]').forEach(button => {
    button.addEventListener('click', () => {
        const tempId = button.getAttribute('data-temp');
        cargarEpisodios(tempId);
    });
});

// Función para inyectar los episodios en la cuadrícula
function cargarEpisodios(temporada) {
    episodiosTitulo.innerText = `Episodios - Temporada ${temporada}`;
    episodiosGrid.innerHTML = '';

    seriesData[temporada].forEach(ep => {
        const epBtn = document.createElement('button');
        epBtn.className = 'card';
        epBtn.innerHTML = `
            <img src="../Temporadas.png" alt="${ep.name}">
            <span>${ep.name}</span>
        `;
        
        epBtn.addEventListener('click', () => {
            reproducirVideo(ep.file);
        });

        episodiosGrid.appendChild(epBtn);
    });
}

// Funciones del Reproductor de Video
function reproducirVideo(url) {
    videoPlayer.src = url;
    videoContainer.classList.remove('hidden');
    videoPlayer.play();
}

function cerrarVideo() {
    videoPlayer.pause();
    videoPlayer.src = "";
    videoContainer.classList.add('hidden');
}

// Cerrar con el botón "X" flotante
closeVideoBtn.addEventListener('click', () => {
    cerrarVideo();
});

// Soporte por si presionan el botón "Atrás" del celular
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' || event.key === 'Backspace') {
        if (!videoContainer.classList.contains('hidden')) {
            event.preventDefault();
            cerrarVideo();
        }
    }
});
