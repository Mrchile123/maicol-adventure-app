// BASE DE DATOS DE REPRODUCCIÓN (RUTAS LOCALES)
const contenidosData = {
    T1: [
        { title: "Episodio 1", file: "Temporada1/Ep 1 T1.mp4", thumb: "Temporada1/Ep 1 t1.png" },
        { title: "Episodio 2", file: "Temporada1/Ep 2 t1.mp4", thumb: "Temporada1/Ep 2 t1.png" },
        { title: "Episodio 3", file: "Temporada1/Ep 3 t1.mp4", thumb: "Temporada1/Ep 3 t1.png" },
        { title: "Episodio 4", file: "Temporada1/Ep 4 t1.mp4", thumb: "Temporada1/Ep 4 t1.png" },
        { title: "Episodio 5", file: "Temporada1/Ep 5 t1.mp4", thumb: "Temporada1/Ep 5 t1.png" },
        { title: "Episodio 6", file: "Temporada1/Ep 6 t1.mp4", thumb: "Temporada1/Ep 6 t1.png" },
        { title: "Episodio 7", file: "Temporada1/ep 7 t1.mp4", thumb: "Temporada1/ep 7 t1.png" },
        { title: "Episodio 8", file: "Temporada1/Ep 8 t1.mp4", thumb: "Temporada1/Ep 8 t1.png" },
        { title: "Episodio 9", file: "Temporada1/Ep 9 t1.mp4", thumb: "Temporada1/Ep 9 t1.png" },
        { title: "Episodio 10", file: "Temporada1/ep 10 t1.mp4", thumb: "Temporada1/ep 10 t1.png" }
    ],
    T2: [
        { title: "Episodio 1", file: "Temporada2/Ep1 t2.mp4", thumb: "Temporada2/Ep1 t2.png" },
        { title: "Episodio 2", file: "Temporada2/Ep 2 t2.mp4", thumb: "Temporada2/Ep 2 t2.png" },
        { title: "Episodio 3", file: "Temporada2/Ep 3 t2.mp4", thumb: "Temporada2/Ep 3 t2.png" },
        { title: "Episodio 4", file: "Temporada2/Ep 4 t2.mp4", thumb: "Temporada2/Ep 4 t2.png" },
        { title: "Episodio 5", file: "Temporada2/Ep 5 T2.mp4", thumb: "Temporada2/Ep 5 t2.png" },
        { title: "Episodio 6", file: "Temporada2/Ep 6 T2.mp4", thumb: "Temporada2/Ep 6 t2.png" },
        { title: "Episodio 7", file: "Temporada2/Ep 7 t2.mp4", thumb: "Temporada2/Ep 7 t2.png" }
    ]
};

let currentSeasonKey = "T1";
let currentEpisodeIndex = 0;

function openSeriesMenu(seriesName) {
    document.getElementById('modal-series-title').innerText = seriesName;
    document.getElementById('series-menu-modal').style.display = 'block';
    document.getElementById('season-select').value = 'T1';
    renderSeasonEpisodes('T1');
}

function closeSeriesMenu() { document.getElementById('series-menu-modal').style.display = 'none'; }
function changeSeason(seasonKey) { renderSeasonEpisodes(seasonKey); }

function renderSeasonEpisodes(seasonKey) {
    const container = document.getElementById('episodes-container-row');
    if (!container) return;
    container.innerHTML = ''; 
    currentSeasonKey = seasonKey;

    contenidosData[seasonKey].forEach((ep, index) => {
        const card = document.createElement('div');
        card.className = 'episode-thumb-card';
        card.onclick = () => launchPlayer(index);
        card.innerHTML = `
            <img src="${ep.thumb}" alt="${ep.title}" class="thumb-img" onerror="this.src='poster-Maicol-adventure.png'">
            <div class="episode-meta-overlay">
                <p class="ep-title">${ep.title}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function showUpcomingModal(title) {
    document.getElementById('upcoming-title').innerText = title;
    document.getElementById('upcoming-modal').style.display = 'block';
}
function closeUpcomingModal() { document.getElementById('upcoming-modal').style.display = 'none'; }

function switchSection(sectionId, element) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');
    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`section-${sectionId}`).classList.add('active');
    closeSeriesMenu(); closeUpcomingModal();
}

// LANZAMIENTO DEL REPRODUCOR CON LOGICA REPARADA
function launchPlayer(index) {
    currentEpisodeIndex = index;
    const ep = contenidosData[currentSeasonKey][currentEpisodeIndex];
    
    const playerModal = document.getElementById('video-modal');
    const nativePlayer = document.getElementById('main-video-player');
    const labelTitle = document.getElementById('modal-video-title');
    const nextBtn = document.getElementById('next-episode-btn');

    if (playerModal && nativePlayer) {
        labelTitle.innerText = `Reproduciendo: ${currentSeasonKey} - ${ep.title}`;
        
        // ¡REPARADO DE RAÍZ!: Ahora lee directamente el archivo del objeto
        nativePlayer.src = ep.file; 
        playerModal.style.display = 'block';
        
        if (currentEpisodeIndex < contenidosData[currentSeasonKey].length - 1) {
            nextBtn.style.display = "block";
        } else {
            nextBtn.style.display = "none";
        }
        nativePlayer.play().catch(() => {});
    }
}

function playNextEpisode() {
    if (currentEpisodeIndex < contenidosData[currentSeasonKey].length - 1) {
        launchPlayer(currentEpisodeIndex + 1);
    }
}

function closePlayer() {
    const playerModal = document.getElementById('video-modal');
    const nativePlayer = document.getElementById('main-video-player');
    if (playerModal && nativePlayer) {
        if (document.pictureInPictureElement) { document.exitPictureInPicture().catch(() => {}); }
        nativePlayer.pause(); nativePlayer.src = ""; playerModal.style.display = 'none';
    }
}

// SECCIÓN INTEGRADA PARA PREVENIR BLOQUEOS WEB
function openSecureWindow(url) {
    const modal = document.getElementById('secure-web-modal');
    const iframe = document.getElementById('secure-iframe');
    const title = document.getElementById('web-overlay-title');
    
    if (modal && iframe) {
        title.innerText = url.includes('github') ? "Abriendo Repositorio GitHub Releases..." : "Abriendo Portal Google Sites...";
        iframe.src = url;
        modal.style.display = 'flex';
    }
}

function closeSecureWindow() {
    const modal = document.getElementById('secure-web-modal');
    const iframe = document.getElementById('secure-iframe');
    if (modal && iframe) {
        iframe.src = "";
        modal.style.display = 'none';
    }
}
