// BASE DE DATOS DE EPISODIOS ASOCIANDO CADA MP4 CON SU PNG
const episodiosData = {
    T1: [
        { title: "Episodio 1", file: "Temporada1/Ep 1 T1.mp4", thumb: "Temporada1/Ep 1 T1.png" },
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
        { title: "Episodio 5", file: "Temporada2/Ep 5 T2.mp4", thumb: "Temporada2/Ep 5 T2.png" },
        { title: "Episodio 6", file: "Temporada2/Ep 6 T2.mp4", thumb: "Temporada2/Ep 6 T2.png" },
        { title: "Episodio 7", file: "Temporada2/Ep 7 t2.mp4", thumb: "Temporada2/Ep 7 t2.png" }
    ]
};

// MANEJO PANEL DE SELECCIÓN DE TEMPORADAS (NETFLIX STYLE)
function openSeriesMenu(seriesName) {
    document.getElementById('modal-series-title').innerText = seriesName;
    document.getElementById('series-menu-modal').style.display = 'block';
    document.getElementById('season-select').value = 'T1';
    renderSeasonEpisodes('T1');
}

function closeSeriesMenu() {
    document.getElementById('series-menu-modal').style.display = 'none';
}

function changeSeason(seasonKey) {
    renderSeasonEpisodes(seasonKey);
}

function renderSeasonEpisodes(seasonKey) {
    const container = document.getElementById('episodes-container-row');
    if (!container) return;
    
    container.innerHTML = ''; 
    const list = episodiosData[seasonKey];

    list.forEach((ep, index) => {
        const card = document.createElement('div');
        card.className = 'episode-thumb-card';
        card.onclick = () => playVideo(ep.file, `${seasonKey} - ${ep.title}`);

        card.innerHTML = `
            <img src="${ep.thumb}" alt="${ep.title}" class="thumb-img" onerror="this.src='poster-Maicol-adventure.png'">
            <div class="episode-meta-overlay">
                <span class="ep-tag">${seasonKey} • CAP ${index + 1}</span>
                <p class="ep-title">${ep.title}</p>
            </div>
        `;
        container.appendChild(card);
    });
}

function scrollEpisodes(direction) {
    const row = document.getElementById('episodes-container-row');
    if (row) {
        row.scrollLeft += (direction * 400);
    }
}

// CONTROL DE VENTANAS EMERGEN_TES "PRÓXIMAMENTE"
function showUpcomingModal(title) {
    document.getElementById('upcoming-title').innerText = title;
    document.getElementById('upcoming-modal').style.display = 'block';
}

function closeUpcomingModal() {
    document.getElementById('upcoming-modal').style.display = 'none';
}

// NAVEGACIÓN GENERAL DE SECCIONES
function switchSection(sectionId, element) {
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    element.classList.add('active');

    document.querySelectorAll('.content-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`section-${sectionId}`).classList.add('active');
    
    closeSeriesMenu();
    closeUpcomingModal();
}

// REPRODUCTOR DE VIDEO
function playVideo(videoPath, label) {
    const playerModal = document.getElementById('video-modal');
    const nativePlayer = document.getElementById('main-video-player');
    const labelTitle = document.getElementById('modal-video-title');

    if (playerModal && nativePlayer) {
        labelTitle.innerText = `Reproduciendo: ${label}`;
        nativePlayer.src = videoPath;
        playerModal.style.display = 'block';
        nativePlayer.play().catch(() => {});
    }
}

function closePlayer() {
    const playerModal = document.getElementById('video-modal');
    const nativePlayer = document.getElementById('main-video-player');

    if (playerModal && nativePlayer) {
        nativePlayer.pause();
        nativePlayer.src = ""; 
        playerModal.style.display = 'none';
    }
}
