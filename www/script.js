// CONFIGURACIÓN DE LOS EPISODIOS ASOCIADOS A TUS CARPETAS DE GITHUB
const temporada1Episodios = [
    { title: "Episodio 1", file: "Temporada1/Ep 1 T1.mp4" },
    { title: "Episodio 2", file: "Temporada1/Ep 2 t1.mp4" },
    { title: "Episodio 3", file: "Temporada1/Ep 3 t1.mp4" },
    { title: "Episodio 4", file: "Temporada1/Ep 4 t1.mp4" },
    { title: "Episodio 5", file: "Temporada1/Ep 5 t1.mp4" },
    { title: "Episodio 6", file: "Temporada1/Ep 6 t1.mp4" },
    { title: "Episodio 7", file: "Temporada1/ep 7 t1.mp4" },
    { title: "Episodio 8", file: "Temporada1/Ep 8 t1.mp4" },
    { title: "Episodio 9", file: "Temporada1/Ep 9 t1.mp4" },
    { title: "Episodio 10", file: "Temporada1/ep 10 t1.mp4" }
];

const temporada2Episodios = [
    { title: "Episodio 1", file: "Temporada2/Ep1 t2.mp4" },
    { title: "Episodio 2", file: "Temporada2/Ep 2 t2.mp4" }, // ¡El más pesado creado en enero!
    { title: "Episodio 3", file: "Temporada2/Ep 3 t2.mp4" },
    { title: "Episodio 4", file: "Temporada2/Ep 4 t2.mp4" },
    { title: "Episodio 5", file: "Temporada2/Ep 5 T2.mp4" },
    { title: "Episodio 6", file: "Temporada2/Ep 6 T2.mp4" },
    { title: "Episodio 7", file: "Temporada2/Ep 7 t2.mp4" }
];

// INICIALIZACIÓN AL CARGAR LA PÁGINA
window.addEventListener('DOMContentLoaded', () => {
    renderEpisodes('slider-t1', temporada1Episodios, 'T1');
    renderEpisodes('slider-t2', temporada2Episodios, 'T2');
});

// FUNCIÓN PARA RENDERIZAR LAS MINIATURAS EN LOS CAROUSELES
function renderEpisodes(containerId, data, tag) {
    const container = document.getElementById(containerId);
    if (!container) return;

    data.forEach((ep, index) => {
        const card = document.createElement('div');
        card.className = 'episode-card';
        card.onclick = () => playVideo(ep.file, `${tag} - ${ep.title}`);

        card.innerHTML = `
            <div class="thumbnail-fallback">
                <div class="thumbnail-text">${tag} : E${index + 1}</div>
            </div>
            <div class="card-overlay">
                <div class="episode-number">${tag} • CAPÍTULO ${index + 1}</div>
                <div class="episode-name">${ep.title}</div>
            </div>
        `;
        container.appendChild(card);
    });
}

// CONTROL DE SCROLL POR FLECHAS (ESTILO SLIDER NETFLIX)
function scrollSlider(idSuffix, direction) {
    const slider = document.getElementById(`slider-${idSuffix}`);
    if (slider) {
        const scrollAmount = 300 * 2; // Desplaza el equivalente a dos tarjetas por clic
        slider.scrollLeft += (direction * scrollAmount);
    }
}

// CONMUTADOR DE SECCIONES DE LA BARRA SUPERIOR
function switchSection(sectionId, element) {
    // Desactivar todos los botones de la barra
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    // Activar botón actual
    element.classList.add('active');

    // Ocultar todas las secciones de contenido
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    // Mostrar la sección seleccionada
    document.getElementById(`section-${sectionId}`).classList.add('active');
}

// CONTROLADOR DEL REPRODUCTOR DE VIDEO
function playVideo(videoPath, title) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-video-player');
    const titleElement = document.getElementById('modal-video-title');

    if (modal && player) {
        titleElement.innerText = `Reproduciendo: ${title}`;
        player.src = videoPath;
        modal.style.display = 'block';
        player.play().catch(err => console.log("Auto-play prevenido por política del navegador. Presiona Play manualmente."));
    }
}

function closePlayer() {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('main-video-player');

    if (modal && player) {
        player.pause();
        player.src = ""; // Limpia la memoria del buffer del video
        modal.style.display = 'none';
    }
}
