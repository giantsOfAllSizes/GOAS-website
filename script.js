// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuBtn?.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Guestbook is now handled by Giscus (GitHub Discussions)
// The old localStorage implementation has been removed in favor of a more social, persistent solution


// Newsletter form
const newsletterForm = document.getElementById('newsletter-form');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = e.target.querySelector('input[type="email"]').value;
    
    // Get existing subscribers
    const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
    
    // Check if already subscribed
    if (subscribers.includes(email)) {
        alert("You're already subscribed! <�");
        return;
    }
    
    // Add new subscriber
    subscribers.push(email);
    localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
    
    // Clear form
    e.target.reset();
    
    // Show success message
    alert("Thanks for subscribing! You'll be the first to know about new music and shows! >");
});

// Load shows from JSON
let showsData = null;
let showsMap = null;
let markers = [];

async function loadShows() {
    const showsContainer = document.getElementById('shows-container');
    if (!showsContainer) return;
    showsContainer.innerHTML = '<div class="text-center text-gray-400"><i class="fas fa-spinner fa-spin text-2xl mb-4"></i><p>Loading shows...</p></div>';
    try {
        const response = await fetch('shows.json');
        if (!response.ok) throw new Error('Could not load shows.json');
        showsData = await response.json();
        if (!Array.isArray(showsData) || showsData.length === 0) {
            showsContainer.innerHTML = '<div class="text-center text-gray-400">No upcoming shows at this time.</div>';
            return;
        }
        // Render shows list
        const showsHTML = showsData.map((show, idx) => {
            const date = new Date(show.date);
            const dateStr = date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            return `<div class="retro-border p-6 bg-black/60">
                <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 class="font-bebas text-2xl text-pink-500 mb-1">${show.venue}</h3>
                        <p class="text-gray-300 mb-1">${show.address || `${show.city}, ${show.state}`}</p>
                        <p class="text-sm text-gray-400">${dateStr}</p>
                    </div>
                    <div class="flex flex-col md:items-end gap-2">
                        ${show.soldOut ? `<span class="inline-block px-4 py-2 bg-gray-600 text-gray-300 font-bold rounded">SOLD OUT</span>` :
                        show.ticketUrl ? `<a href="${show.ticketUrl}" target="_blank" class="inline-block px-4 py-2 bg-pink-500 hover:bg-pink-600 text-black font-bold rounded transition">Get Tickets</a>` :
                        `<span class="inline-block px-4 py-2 bg-gray-700 text-gray-300 rounded">Tickets Coming Soon</span>`}
                        ${show.coordinates ? `<button onclick="selectShowOnMap(${idx})" class="inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded transition mt-1"><i class="fas fa-map-marker-alt mr-1"></i> View on Map</button>` : ''}
                    </div>
                </div>
            </div>`;
        }).join('');
        showsContainer.innerHTML = showsHTML;
        // If map view is visible, initialize map
        if (!document.getElementById('shows-map-view').classList.contains('hidden')) {
            initializeMap();
        }
    } catch (error) {
        showsContainer.innerHTML = `<div class="text-center text-red-500">Error loading shows: ${error.message}</div>`;
    }
}

// Toggle between list and map view
function toggleShowsView(view) {
    // Update button states
    document.querySelectorAll('.shows-view-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-pink-500', 'bg-cyan-500', 'text-black');
        btn.classList.add('bg-gray-700');
    });
    
    // Hide all views
    document.querySelectorAll('.shows-view').forEach(viewEl => {
        viewEl.classList.add('hidden');
    });
    
    if (view === 'list') {
        document.getElementById('list-view-btn').classList.remove('bg-gray-700');
        document.getElementById('list-view-btn').classList.add('active', 'bg-pink-500', 'text-black');
        document.getElementById('shows-list-view').classList.remove('hidden');
    } else if (view === 'map') {
        document.getElementById('map-view-btn').classList.remove('bg-gray-700');
        document.getElementById('map-view-btn').classList.add('active', 'bg-cyan-500', 'text-black');
        document.getElementById('shows-map-view').classList.remove('hidden');
        
        // Initialize map if not already done
        if (!showsMap && showsData) {
            setTimeout(() => {
                initializeMap();
            }, 100);
        }
    }
}

// Initialize map
function initializeMap() {
    if (!showsData || showsMap) return;
    
    // Check if Leaflet is loaded
    if (typeof L === 'undefined') {
        console.error('Leaflet library not loaded');
        return;
    }
    
    // Create map centered on Philadelphia
    showsMap = L.map('shows-map').setView([39.9526, -75.1652], 12);
    
    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap contributors © CARTO',
        subdomains: 'abcd',
        maxZoom: 19
    }).addTo(showsMap);
    
    // Add markers for each show
    showsData.forEach((show, index) => {
        if (show.coordinates) {
            const date = new Date(show.date);
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric'
            });
            
            // Create custom icon
            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div>${index + 1}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            const marker = L.marker([show.coordinates.lat, show.coordinates.lng], { icon: customIcon })
                .addTo(showsMap)
                .bindPopup(`
                    <div class="p-2">
                        <h4 class="font-bold text-pink-500">${show.venue}</h4>
                        <p class="text-sm">${dateStr}</p>
                        <p class="text-xs text-gray-400">${show.city}, ${show.state}</p>
                    </div>
                `);
            
            marker.on('click', () => {
                showMapDetails(show, index);
            });
            
            markers.push(marker);
        }
    });
    
    // Fit map to show all markers
    if (markers.length > 0) {
        const group = new L.featureGroup(markers);
        showsMap.fitBounds(group.getBounds().pad(0.1));
    }
}

// Show details for selected show on map
function showMapDetails(show, index) {
    const detailsPanel = document.getElementById('map-show-details');
    const date = new Date(show.date);
    const dateStr = date.toLocaleDateString('en-US', { 
        weekday: 'long',
        month: 'long', 
        day: 'numeric',
        year: 'numeric'
    });
    
    document.getElementById('map-show-venue').textContent = show.venue;
    document.getElementById('map-show-date').textContent = dateStr;
    document.getElementById('map-show-location').textContent = show.address || `${show.city}, ${show.state}`;
    
    const actionsHTML = `
        ${show.soldOut ? 
            '<span class="inline-block px-4 py-2 bg-gray-600 text-gray-300 font-bold">SOLD OUT</span>' :
            show.ticketUrl ? 
                `<a href="${show.ticketUrl}" target="_blank" class="inline-block px-4 py-2 bg-pink-500 hover:bg-pink-600 text-black font-bold transition mr-2">Get Tickets</a>` :
                '<span class="inline-block px-4 py-2 bg-gray-700 text-gray-300 mr-2">Tickets Coming Soon</span>'
        }
        <button onclick="openInMaps(${show.coordinates.lat}, ${show.coordinates.lng}, '${show.venue}')" 
                class="inline-block px-4 py-2 bg-cyan-500 hover:bg-cyan-600 text-black font-bold transition">
            <i class="fas fa-directions mr-1"></i> Get Directions
        </button>
    `;
    
    document.getElementById('map-show-actions').innerHTML = actionsHTML;
    detailsPanel.classList.remove('hidden');
}

// Select show on map from list view
function selectShowOnMap(index) {
    const show = showsData[index];
    if (!show.coordinates) return;
    
    // Switch to map view
    toggleShowsView('map');
    
    // Wait for map to initialize then focus on the marker
    setTimeout(() => {
        if (showsMap && markers[index]) {
            showsMap.setView([show.coordinates.lat, show.coordinates.lng], 15);
            markers[index].openPopup();
            showMapDetails(show, index);
        }
    }, 300);
}

// Open location in maps app
function openInMaps(lat, lng, venue) {
    const encodedVenue = encodeURIComponent(venue);
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_name=${encodedVenue}`;
    window.open(mapsUrl, '_blank');
}

// Export shows to calendar
function exportShowsCalendar() {
    if (!showsData || showsData.length === 0) {
        alert('No shows to export');
        return;
    }
    
    // Create ICS calendar file content
    let icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Giants of All Sizes//Band Shows//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:Giants of All Sizes Shows
X-WR-TIMEZONE:America/New_York
BEGIN:VTIMEZONE
TZID:America/New_York
BEGIN:DAYLIGHT
TZOFFSETFROM:-0500
TZOFFSETTO:-0400
TZNAME:EDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0400
TZOFFSETTO:-0500
TZNAME:EST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE\n`;
    
    showsData.forEach((show, index) => {
        const date = new Date(show.date);
        const startDate = date.toISOString().replace(/[-:]/g, '').split('T')[0];
        const uid = `show-${index}-${Date.now()}@giantsofallsizes.net`;
        
        icsContent += `BEGIN:VEVENT
UID:${uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}
DTSTART;VALUE=DATE:${startDate}
SUMMARY:Giants of All Sizes @ ${show.venue}
DESCRIPTION:Giants of All Sizes live at ${show.venue}\\n${show.city}, ${show.state}${show.ticketUrl ? '\\n\\nTickets: ' + show.ticketUrl : ''}
LOCATION:${show.address || show.venue + ', ' + show.city + ', ' + show.state}
${show.coordinates ? `GEO:${show.coordinates.lat};${show.coordinates.lng}` : ''}
STATUS:CONFIRMED
END:VEVENT\n`;
    });
    
    icsContent += 'END:VCALENDAR';
    
    // Create and download the file
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'giants-of-all-sizes-shows.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert('Calendar file downloaded! Import it into your favorite calendar app.');
}

// Make functions global
window.toggleShowsView = toggleShowsView;
window.selectShowOnMap = selectShowOnMap;
window.openInMaps = openInMaps;
window.exportShowsCalendar = exportShowsCalendar;

// Load shows on page load
document.addEventListener('DOMContentLoaded', () => {
    loadShows();
    
    // Add scroll effect to header
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('shadow-lg');
        } else {
            header.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
    // Parallax effect for hero section
    const hero = document.getElementById('home');
    const heroContent = hero?.querySelector('.container');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxSpeed = 0.5;
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add fade-in animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .animate-fade-in {
        animation: fadeIn 0.8s ease-out forwards;
    }
`;
document.head.appendChild(style);

// Music Player Functionality
let musicData = null;
let currentTrackIndex = 0;
let isPlaying = false;

// Load music data
async function loadMusicData() {
    try {
        const response = await fetch('music.json');
        musicData = await response.json();
    } catch (error) {
        console.error('Error loading music data:', error);
    }
}

// Music player controls
const musicPlayer = document.getElementById('music-player');
const musicPlayerBtn = document.getElementById('music-player-btn');
const playerToggle = document.getElementById('player-toggle');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevTrackBtn = document.getElementById('prev-track-btn');
const nextTrackBtn = document.getElementById('next-track-btn');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');

// Toggle music player visibility
musicPlayerBtn?.addEventListener('click', () => {
    musicPlayer.classList.toggle('translate-y-full');
    musicPlayerBtn.classList.toggle('hidden');
});

playerToggle?.addEventListener('click', () => {
    musicPlayer.classList.add('translate-y-full');
    musicPlayerBtn.classList.remove('hidden');
});

// Play/Pause functionality
playPauseBtn?.addEventListener('click', () => {
    if (!musicData || musicData.tracks.length === 0) return;
    
    isPlaying = !isPlaying;
    updatePlayPauseButton();
    
    // In a real implementation, you would control actual audio playback here
    if (isPlaying && currentTrackIndex === 0 && trackTitle.textContent === 'No track selected') {
        loadTrack(0);
    }
});

// Previous track
prevTrackBtn?.addEventListener('click', () => {
    if (!musicData || musicData.tracks.length === 0) return;
    
    currentTrackIndex = (currentTrackIndex - 1 + musicData.tracks.length) % musicData.tracks.length;
    loadTrack(currentTrackIndex);
});

// Next track
nextTrackBtn?.addEventListener('click', () => {
    if (!musicData || musicData.tracks.length === 0) return;
    
    currentTrackIndex = (currentTrackIndex + 1) % musicData.tracks.length;
    loadTrack(currentTrackIndex);
});

// Load track information
function loadTrack(index) {
    if (!musicData || !musicData.tracks[index]) return;
    
    const track = musicData.tracks[index];
    trackTitle.textContent = track.title;
    trackArtist.textContent = track.artist;
    durationEl.textContent = track.duration;
    currentTimeEl.textContent = '0:00';
    progressFill.style.width = '0%';
}

// Update play/pause button
function updatePlayPauseButton() {
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// Load music data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadMusicData();
});

// Photo Gallery Functionality
let galleryData = null;
let currentGallery = null;
let currentPhotoIndex = 0;

// Load gallery data
async function loadGalleryData() {
    try {
        const response = await fetch('photos.json');
        galleryData = await response.json();
        displayGalleries();
    } catch (error) {
        console.error('Error loading gallery data:', error);
    }
}

// Display gallery cards
function displayGalleries() {
    const galleriesContainer = document.getElementById('photo-galleries');
    if (!galleriesContainer || !galleryData) return;
    
    const galleriesHTML = galleryData.galleries.map(gallery => `
        <div class="retro-border p-4 bg-gray-900/50 hover:bg-gray-900/80 transition cursor-pointer" 
             onclick="openGallery(${gallery.id})">
            <img src="${gallery.coverPhoto}" alt="${gallery.title}" 
                 class="w-full h-48 object-cover rounded mb-4">
            <h3 class="font-bebas text-xl text-pink-500">${gallery.title}</h3>
            <p class="text-sm text-gray-400">${gallery.date}</p>
            <p class="text-sm mt-2">${gallery.description}</p>
            <p class="text-xs text-gray-500 mt-2">${gallery.photos.length} photos</p>
        </div>
    `).join('');
    
    galleriesContainer.innerHTML = galleriesHTML;
}

// Open specific gallery
function openGallery(galleryId) {
    currentGallery = galleryData.galleries.find(g => g.id === galleryId);
    if (!currentGallery) return;
    
    currentPhotoIndex = 0;
    showPhoto(currentPhotoIndex);
    document.getElementById('lightbox').classList.remove('hidden');
}

// Show specific photo in lightbox
function showPhoto(index) {
    if (!currentGallery || !currentGallery.photos[index]) return;
    
    const photo = currentGallery.photos[index];
    document.getElementById('lightbox-image').src = photo.url;
    document.getElementById('lightbox-caption').textContent = photo.caption || '';
    document.getElementById('lightbox-photographer').textContent = photo.photographer ? `Photo by ${photo.photographer}` : '';
}

// Lightbox controls
document.getElementById('close-lightbox')?.addEventListener('click', () => {
    document.getElementById('lightbox').classList.add('hidden');
});

document.getElementById('prev-photo')?.addEventListener('click', () => {
    if (!currentGallery) return;
    currentPhotoIndex = (currentPhotoIndex - 1 + currentGallery.photos.length) % currentGallery.photos.length;
    showPhoto(currentPhotoIndex);
});

document.getElementById('next-photo')?.addEventListener('click', () => {
    if (!currentGallery) return;
    currentPhotoIndex = (currentPhotoIndex + 1) % currentGallery.photos.length;
    showPhoto(currentPhotoIndex);
});

// Close lightbox on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.getElementById('lightbox')?.classList.add('hidden');
    }
});

// Load gallery data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGalleryData();
});

// Lyrics Functionality
let lyricsData = null;
let filteredSongs = [];

// Load lyrics data
async function loadLyricsData() {
    try {
        const response = await fetch('lyrics.json');
        lyricsData = await response.json();
        filteredSongs = lyricsData.songs;
        displaySongList();
    } catch (error) {
        console.error('Error loading lyrics data:', error);
    }
}

// Display song list
function displaySongList() {
    const songListEl = document.getElementById('song-list');
    if (!songListEl) return;
    
    if (filteredSongs.length === 0) {
        songListEl.innerHTML = '<p class="text-gray-400 text-center">No songs found</p>';
        return;
    }
    
    const songsHTML = filteredSongs.map(song => `
        <div class="retro-border p-4 bg-gray-900/50 hover:bg-gray-900/80 transition cursor-pointer"
             onclick="showLyrics(${song.id})">
            <h3 class="font-bebas text-xl text-pink-500">${song.title}</h3>
            <p class="text-sm text-gray-400">${song.album} (${song.year})</p>
            <p class="text-xs text-gray-500 mt-1">Written by ${song.writtenBy}</p>
        </div>
    `).join('');
    
    songListEl.innerHTML = songsHTML;
}

// Show lyrics for specific song
function showLyrics(songId) {
    const song = lyricsData.songs.find(s => s.id === songId);
    if (!song) return;
    
    // Hide song list, show lyrics display
    document.getElementById('song-list').parentElement.classList.add('hidden');
    document.getElementById('lyrics-display').classList.remove('hidden');
    
    // Update song info
    document.getElementById('song-title').textContent = song.title;
    document.getElementById('song-info').textContent = `${song.album} (${song.year}) • Written by ${song.writtenBy}`;
    
    // Display lyrics
    const lyricsHTML = song.lyrics.map(section => `
        <div>
            <h4 class="font-bold text-pink-500 mb-2">${section.label || ''}</h4>
            <div class="space-y-1">
                ${section.lines.map(line => `<p>${line}</p>`).join('')}
            </div>
        </div>
    `).join('');
    
    document.getElementById('lyrics-content').innerHTML = lyricsHTML;
    
    // Display story if available
    const storyEl = document.getElementById('song-story');
    if (song.story) {
        storyEl.innerHTML = `
            <h4 class="font-bold text-pink-500 mb-2">The Story</h4>
            <p class="text-gray-300">${song.story}</p>
        `;
        storyEl.classList.remove('hidden');
    } else {
        storyEl.classList.add('hidden');
    }
    
    // Scroll to top of lyrics section
    document.getElementById('lyrics').scrollIntoView({ behavior: 'smooth' });
}

// Back to songs button
document.getElementById('back-to-songs')?.addEventListener('click', () => {
    document.getElementById('song-list').parentElement.classList.remove('hidden');
    document.getElementById('lyrics-display').classList.add('hidden');
});

// Search functionality
document.getElementById('lyrics-search')?.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (!searchTerm) {
        filteredSongs = lyricsData.songs;
    } else {
        filteredSongs = lyricsData.songs.filter(song => 
            song.title.toLowerCase().includes(searchTerm) ||
            song.album.toLowerCase().includes(searchTerm) ||
            song.writtenBy.toLowerCase().includes(searchTerm) ||
            song.lyrics.some(section => 
                section.lines.some(line => line.toLowerCase().includes(searchTerm))
            )
        );
    }
    
    displaySongList();
});

// Load lyrics data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadLyricsData();
});

// EPK Functionality
let epkData = null;

// Load EPK data
async function loadEPKData() {
    try {
        const response = await fetch('epk.json');
        epkData = await response.json();
        displayEPKData();
    } catch (error) {
        console.error('Error loading EPK data:', error);
    }
}

// Display EPK data
function displayEPKData() {
    if (!epkData) return;
    
    // Quick info
    document.getElementById('epk-genre').textContent = epkData.band.genre;
    document.getElementById('epk-hometown').textContent = epkData.band.hometown;
    document.getElementById('epk-booking').innerHTML = `<a href="mailto:${epkData.band.booking}" class="hover:text-pink-500 transition">${epkData.band.booking}</a>`;
    
    // Bio
    document.getElementById('epk-bio-short').textContent = epkData.bio.short;
    document.getElementById('epk-bio-long').innerHTML = epkData.bio.long.split('\n\n').map(p => `<p>${p}</p>`).join('');
    
    // Stage requirements
    const requirementsHTML = epkData.technical.stageRequirements.map(req => 
        `<li class="flex items-start"><i class="fas fa-check text-pink-500 mr-2 mt-1"></i> ${req}</li>`
    ).join('');
    document.getElementById('epk-stage-requirements').innerHTML = requirementsHTML;
    
    // Technical info
    const techInfoHTML = `
        <dt class="text-pink-500 font-bold">Setup Time:</dt>
        <dd class="text-gray-300 mb-2">${epkData.technical.setupTime}</dd>
        <dt class="text-pink-500 font-bold">Soundcheck:</dt>
        <dd class="text-gray-300 mb-2">${epkData.technical.soundcheckTime}</dd>
        <dt class="text-pink-500 font-bold">Typical Set:</dt>
        <dd class="text-gray-300">${epkData.technical.typicalSetLength}</dd>
    `;
    document.getElementById('epk-tech-info').innerHTML = techInfoHTML;
    
    // Downloads
    const downloadsHTML = epkData.downloads.map(download => {
        const isAvailable = download.available !== false;
        return `
            <div class="retro-border p-4 bg-black/50 ${isAvailable ? 'hover:bg-black/70' : 'opacity-50'} transition">
                <h4 class="font-bold text-sm mb-2">${download.type}</h4>
                ${isAvailable ? 
                    `<a href="${download.filename}" download class="text-pink-500 hover:text-pink-400 transition">
                        <i class="fas fa-download mr-2"></i>Download
                    </a>` :
                    `<span class="text-gray-500">Coming Soon</span>`
                }
            </div>
        `;
    }).join('');
    document.getElementById('epk-downloads').innerHTML = downloadsHTML;
    
    // Achievements
    const achievementsHTML = epkData.achievements.map(achievement => 
        `<li class="flex items-start">
            <span class="text-pink-500 font-bold mr-2">${achievement.year}:</span>
            ${achievement.achievement}
        </li>`
    ).join('');
    document.getElementById('epk-achievements').innerHTML = achievementsHTML;
}

// Toggle bio functionality
document.getElementById('toggle-bio')?.addEventListener('click', function() {
    const longBio = document.getElementById('epk-bio-long');
    const shortBio = document.getElementById('epk-bio-short');
    const icon = this.querySelector('i');
    
    if (longBio.classList.contains('hidden')) {
        longBio.classList.remove('hidden');
        shortBio.classList.add('hidden');
        icon.classList.remove('fa-chevron-down');
        icon.classList.add('fa-chevron-up');
        this.innerHTML = 'Read less <i class="fas fa-chevron-up ml-1"></i>';
    } else {
        longBio.classList.add('hidden');
        shortBio.classList.remove('hidden');
        icon.classList.remove('fa-chevron-up');
        icon.classList.add('fa-chevron-down');
        this.innerHTML = 'Read more <i class="fas fa-chevron-down ml-1"></i>';
    }
});

// Load EPK data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadEPKData();
});

// Fan Content Functionality
let fanContentData = null;
let currentFilter = 'all';

// Load fan content data
async function loadFanContentData() {
    try {
        const response = await fetch('fan-content.json');
        fanContentData = await response.json();
        displayFanContent();
        displaySubmissionGuidelines();
    } catch (error) {
        console.error('Error loading fan content data:', error);
    }
}

// Display fan content
function displayFanContent() {
    const grid = document.getElementById('fan-content-grid');
    if (!grid || !fanContentData) return;
    
    const filteredContent = currentFilter === 'all' 
        ? fanContentData.submissions.filter(s => s.approved)
        : fanContentData.submissions.filter(s => s.approved && s.type === currentFilter);
    
    if (filteredContent.length === 0) {
        grid.innerHTML = '<p class="col-span-full text-center text-gray-400">No content found</p>';
        return;
    }
    
    const contentHTML = filteredContent.map(content => {
        const typeIcon = {
            'fan-art': 'fa-palette',
            'cover': 'fa-music',
            'photo': 'fa-camera'
        }[content.type] || 'fa-star';
        
        return `
            <div class="retro-border p-4 bg-black/50 hover:bg-black/70 transition">
                ${content.featured ? '<div class="text-xs text-pink-500 mb-2"><i class="fas fa-star"></i> Featured</div>' : ''}
                <img src="${content.image}" alt="${content.title}" 
                     class="w-full h-48 object-cover rounded mb-4 cursor-pointer"
                     onclick="viewFanContent(${content.id})">
                <h3 class="font-bold text-lg mb-1">${content.title}</h3>
                <p class="text-sm text-gray-400 mb-2">
                    <i class="fas ${typeIcon} mr-1"></i> By ${content.artist} • ${content.date}
                </p>
                <p class="text-sm">${content.description}</p>
                ${content.videoUrl ? 
                    `<a href="${content.videoUrl}" target="_blank" class="text-pink-500 hover:text-pink-400 text-sm mt-2 inline-block">
                        <i class="fas fa-play mr-1"></i> Watch Video
                    </a>` : ''
                }
            </div>
        `;
    }).join('');
    
    grid.innerHTML = contentHTML;
}

// Filter fan content
function filterFanContent(filter) {
    currentFilter = filter;
    
    // Update button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-pink-500', 'text-black');
        btn.classList.add('bg-gray-700');
    });
    
    event.target.classList.remove('bg-gray-700');
    event.target.classList.add('active', 'bg-pink-500', 'text-black');
    
    displayFanContent();
}

// View fan content in lightbox
function viewFanContent(contentId) {
    const content = fanContentData.submissions.find(s => s.id === contentId);
    if (!content) return;
    
    // Reuse photo lightbox
    document.getElementById('lightbox-image').src = content.image;
    document.getElementById('lightbox-caption').textContent = `${content.title} by ${content.artist}`;
    document.getElementById('lightbox-photographer').textContent = content.description;
    document.getElementById('lightbox').classList.remove('hidden');
}

// Display submission guidelines
function displaySubmissionGuidelines() {
    if (!fanContentData) return;
    
    const guidelines = fanContentData.submissionGuidelines;
    
    // Fan Art guidelines
    const fanArtHTML = guidelines.fanArt.map(g => `<li>• ${g}</li>`).join('');
    document.getElementById('guidelines-fanArt').innerHTML = fanArtHTML;
    
    // Covers guidelines
    const coversHTML = guidelines.covers.map(g => `<li>• ${g}</li>`).join('');
    document.getElementById('guidelines-covers').innerHTML = coversHTML;
    
    // Photos guidelines
    const photosHTML = guidelines.photos.map(g => `<li>• ${g}</li>`).join('');
    document.getElementById('guidelines-photos').innerHTML = photosHTML;
}

// Submit content button
document.getElementById('submit-fan-content')?.addEventListener('click', (e) => {
    e.preventDefault();
    
    const guidelines = document.getElementById('submission-guidelines');
    if (guidelines.classList.contains('hidden')) {
        guidelines.classList.remove('hidden');
        e.target.innerHTML = '<i class="fas fa-times mr-2"></i> Close Guidelines';
        
        // Set up email link
        const email = fanContentData.submissionEmail;
        const subject = encodeURIComponent(fanContentData.submissionSubject);
        e.target.href = `mailto:${email}?subject=${subject}`;
    } else {
        guidelines.classList.add('hidden');
        e.target.innerHTML = '<i class="fas fa-upload mr-2"></i> Submit Content';
        e.target.href = '#';
    }
});

// Make filterFanContent global
window.filterFanContent = filterFanContent;
window.viewFanContent = viewFanContent;

// Load fan content data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadFanContentData();
});

// Blog Functionality
let blogData = null;
let currentBlogFilter = 'all';

// Load blog data
async function loadBlogData() {
    try {
        const response = await fetch('blog.json');
        blogData = await response.json();
        displayBlogPosts();
    } catch (error) {
        console.error('Error loading blog data:', error);
    }
}

// Display blog posts
function displayBlogPosts() {
    if (!blogData) return;
    
    // Display featured posts
    const featuredPosts = blogData.posts.filter(p => p.featured);
    const featuredHTML = featuredPosts.map(post => {
        const category = blogData.categories.find(c => c.slug === post.category);
        return `
            <div class="retro-border p-6 bg-gradient-to-r from-gray-900/80 to-black/50 mb-6 cursor-pointer hover:from-gray-900 transition"
                 onclick="showBlogPost(${post.id})">
                <div class="flex flex-col md:flex-row gap-6">
                    <img src="${post.image}" alt="${post.title}" class="w-full md:w-48 h-48 object-cover rounded">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-2">
                            <span class="text-xs font-bold text-${category?.color || 'pink'}-500 uppercase">Featured</span>
                            <span class="text-xs text-gray-500">•</span>
                            <span class="text-xs text-gray-500">${post.date}</span>
                        </div>
                        <h3 class="font-bebas text-2xl text-pink-500 mb-2">${post.title}</h3>
                        <p class="text-gray-300 mb-4">${post.excerpt}</p>
                        <span class="text-pink-500 hover:text-pink-400 transition">Read more →</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('featured-posts').innerHTML = featuredHTML;
    
    // Display regular posts
    const filteredPosts = currentBlogFilter === 'all' 
        ? blogData.posts 
        : blogData.posts.filter(p => p.category === currentBlogFilter);
    
    const postsHTML = filteredPosts.map(post => {
        const category = blogData.categories.find(c => c.slug === post.category);
        return `
            <div class="retro-border p-6 bg-gray-900/50 hover:bg-gray-900/80 transition cursor-pointer"
                 onclick="showBlogPost(${post.id})">
                <img src="${post.image}" alt="${post.title}" class="w-full h-48 object-cover rounded mb-4">
                <div class="flex items-center gap-2 mb-2">
                    <span class="text-xs font-bold text-${category?.color || 'gray'}-500 uppercase">${category?.name || post.category}</span>
                    <span class="text-xs text-gray-500">•</span>
                    <span class="text-xs text-gray-500">${post.date}</span>
                </div>
                <h3 class="font-bebas text-xl text-white mb-2 hover:text-pink-500 transition">${post.title}</h3>
                <p class="text-sm text-gray-400 mb-4">${post.excerpt}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">By ${post.author}</span>
                    <span class="text-pink-500 hover:text-pink-400 transition text-sm">Read →</span>
                </div>
            </div>
        `;
    }).join('');
    document.getElementById('blog-posts').innerHTML = postsHTML;
}

// Show single blog post
function showBlogPost(postId) {
    const post = blogData.posts.find(p => p.id === postId);
    if (!post) return;
    
    // Hide posts grid, show single post
    document.getElementById('featured-posts').parentElement.classList.add('hidden');
    document.getElementById('single-post').classList.remove('hidden');
    
    // Populate post data
    document.getElementById('post-image').src = post.image;
    document.getElementById('post-title').textContent = post.title;
    document.getElementById('post-date').innerHTML = `<i class="far fa-calendar"></i> ${post.date}`;
    document.getElementById('post-author').innerHTML = `<i class="far fa-user"></i> ${post.author}`;
    
    const category = blogData.categories.find(c => c.slug === post.category);
    document.getElementById('post-category').innerHTML = 
        `<span class="px-2 py-1 bg-${category?.color || 'gray'}-500/20 text-${category?.color || 'gray'}-500 rounded text-xs">
            ${category?.name || post.category}
        </span>`;
    
    // Format content with paragraphs
    const contentHTML = post.content.split('\n\n').map(paragraph => {
        if (paragraph.startsWith('-')) {
            // Handle bullet points
            const items = paragraph.split('\n').map(item => 
                `<li>${item.replace(/^-\s*/, '')}</li>`
            ).join('');
            return `<ul class="list-disc list-inside space-y-1 my-4">${items}</ul>`;
        }
        return `<p class="mb-4">${paragraph.replace(/\n/g, '<br>')}</p>`;
    }).join('');
    
    document.getElementById('post-content').innerHTML = contentHTML;
    
    // Display tags
    if (post.tags && post.tags.length > 0) {
        const tagsHTML = post.tags.map(tag => 
            `<span class="px-3 py-1 bg-gray-800 text-gray-400 rounded-full text-xs">#${tag}</span>`
        ).join('');
        document.getElementById('post-tags').innerHTML = tagsHTML;
    }
    
    // Scroll to top of blog section
    document.getElementById('blog').scrollIntoView({ behavior: 'smooth' });
}

// Filter blog posts
function filterBlogPosts(filter) {
    currentBlogFilter = filter;
    
    // Update button states
    document.querySelectorAll('.blog-filter-btn').forEach(btn => {
        btn.classList.remove('active', 'bg-pink-500', 'bg-cyan-500', 'bg-orange-500', 'text-black');
        btn.classList.add('bg-gray-700');
    });
    
    // Set active button color based on category
    const activeBtn = event.target;
    activeBtn.classList.remove('bg-gray-700');
    if (filter === 'all') {
        activeBtn.classList.add('active', 'bg-pink-500', 'text-black');
    } else {
        const category = blogData.categories.find(c => c.slug === filter);
        const color = category?.color || 'pink';
        activeBtn.classList.add('active', `bg-${color}-500`, 'text-black');
    }
    
    displayBlogPosts();
}

// Back to posts button
document.getElementById('back-to-posts')?.addEventListener('click', () => {
    document.getElementById('featured-posts').parentElement.classList.remove('hidden');
    document.getElementById('single-post').classList.add('hidden');
});

// Make functions global
window.filterBlogPosts = filterBlogPosts;
window.showBlogPost = showBlogPost;

// Load blog data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadBlogData();
});

// Setlist Archive Functionality
let setlistData = null;

// Load setlist data
async function loadSetlistData() {
    try {
        const response = await fetch('setlists.json');
        setlistData = await response.json();
        displaySetlists();
        displayStatistics();
        displayMostPlayedSongs();
    } catch (error) {
        console.error('Error loading setlist data:', error);
    }
}

// Display setlist statistics
function displayStatistics() {
    if (!setlistData || !setlistData.statistics) return;
    
    const stats = setlistData.statistics;
    document.getElementById('stat-total-shows').textContent = stats.totalShows;
    document.getElementById('stat-songs-played').textContent = stats.totalSongsPlayed;
    document.getElementById('stat-avg-setlist').textContent = stats.averageSetLength;
    
    if (stats.mostPlayedSongs && stats.mostPlayedSongs.length > 0) {
        document.getElementById('stat-most-played').textContent = stats.mostPlayedSongs[0].song;
    }
}

// Display setlist list
function displaySetlists() {
    if (!setlistData || !setlistData.setlists) return;
    
    const setlistHTML = setlistData.setlists.map(setlist => `
        <div class="retro-border p-4 bg-gray-900/50 hover:bg-gray-900/80 transition cursor-pointer"
             onclick="showSetlistDetails(${setlist.id})">
            <div class="flex justify-between items-start mb-2">
                <h4 class="font-bebas text-lg text-pink-500">${setlist.venue}</h4>
                <span class="text-xs text-gray-500">${setlist.date}</span>
            </div>
            <p class="text-sm text-gray-400">${setlist.city}</p>
            <p class="text-xs text-gray-500 mt-1">${setlist.setlist.length} songs${setlist.encore.length > 0 ? ' + encore' : ''}</p>
        </div>
    `).join('');
    
    document.getElementById('setlist-list').innerHTML = setlistHTML;
}

// Show setlist details
function showSetlistDetails(setlistId) {
    const setlist = setlistData.setlists.find(s => s.id === setlistId);
    if (!setlist) return;
    
    let detailsHTML = `
        <h4 class="font-bebas text-xl text-pink-500 mb-1">${setlist.venue}</h4>
        <p class="text-sm text-gray-400 mb-4">${setlist.city} • ${setlist.date}</p>
        
        <h5 class="font-bold text-cyan-500 mb-2">Main Set:</h5>
        <ol class="list-decimal list-inside space-y-1 mb-4">
    `;
    
    setlist.setlist.forEach(song => {
        detailsHTML += `
            <li class="text-sm">
                ${song.song}
                ${song.notes ? `<span class="text-xs text-gray-500 ml-2">(${song.notes})</span>` : ''}
            </li>
        `;
    });
    
    if (setlist.encore && setlist.encore.length > 0) {
        detailsHTML += `
            </ol>
            <h5 class="font-bold text-cyan-500 mb-2 mt-4">Encore:</h5>
            <ol class="list-decimal list-inside space-y-1 mb-4">
        `;
        
        setlist.encore.forEach(song => {
            detailsHTML += `
                <li class="text-sm">
                    ${song.song}
                    ${song.notes ? `<span class="text-xs text-gray-500 ml-2">(${song.notes})</span>` : ''}
                </li>
            `;
        });
    }
    
    detailsHTML += `
        </ol>
        ${setlist.notes ? `
            <div class="mt-4 pt-4 border-t border-gray-700">
                <p class="text-sm text-gray-400"><strong>Notes:</strong> ${setlist.notes}</p>
            </div>
        ` : ''}
        ${setlist.attendance ? `
            <p class="text-xs text-gray-500 mt-2">Attendance: ~${setlist.attendance} people</p>
        ` : ''}
    `;
    
    document.getElementById('setlist-display').innerHTML = detailsHTML;
}

// Display most played songs
function displayMostPlayedSongs() {
    if (!setlistData || !setlistData.statistics || !setlistData.statistics.mostPlayedSongs) return;
    
    const songsHTML = setlistData.statistics.mostPlayedSongs.slice(0, 5).map((song, index) => {
        const colors = ['bg-pink-500', 'bg-cyan-500', 'bg-orange-500', 'bg-purple-500', 'bg-green-500'];
        return `
            <div class="retro-border p-4 bg-black/50 text-center">
                <div class="text-2xl font-bold ${colors[index]} bg-opacity-20 text-white rounded p-2 mb-2">
                    #${index + 1}
                </div>
                <h5 class="font-bold text-sm mb-1">${song.song}</h5>
                <p class="text-xs text-gray-400">Played ${song.timesPlayed}x</p>
            </div>
        `;
    }).join('');
    
    document.getElementById('most-played-songs').innerHTML = songsHTML;
}

// Submit song request
function submitSongRequest() {
    const songInput = document.getElementById('song-request');
    const song = songInput.value.trim();
    
    if (!song) {
        alert('Please enter a song name!');
        return;
    }
    
    // In a real implementation, this would send to a backend
    alert(`Thanks for requesting "${song}"! We'll consider it for our next show!`);
    songInput.value = '';
    
    // Store in localStorage for demo
    const requests = JSON.parse(localStorage.getItem('songRequests') || '[]');
    requests.push({
        song: song,
        date: new Date().toISOString()
    });
    localStorage.setItem('songRequests', JSON.stringify(requests));
}

// Make functions global
window.showSetlistDetails = showSetlistDetails;
window.submitSongRequest = submitSongRequest;

// Load setlist data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadSetlistData();
});

// Social Media Feed Functionality
let currentSocialPlatform = 'instagram';

// Show social platform
function showSocialPlatform(platform) {
    currentSocialPlatform = platform;
    
    // Hide all platforms
    document.querySelectorAll('.social-platform').forEach(feed => {
        feed.classList.add('hidden');
    });
    
    // Show selected platform
    document.getElementById(`${platform}-feed`).classList.remove('hidden');
    
    // Update tab states
    document.querySelectorAll('.social-tab').forEach(tab => {
        tab.classList.remove('active', 'bg-gradient-to-r', 'from-purple-500', 'to-pink-500', 'bg-blue-500', 'bg-red-600', 'bg-black');
        tab.classList.add('bg-gray-700');
    });
    
    // Set active tab styling
    const activeTab = event.target;
    activeTab.classList.remove('bg-gray-700');
    activeTab.classList.add('active');
    
    // Platform-specific styling
    switch(platform) {
        case 'instagram':
            activeTab.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-pink-500');
            break;
        case 'twitter':
            activeTab.classList.add('bg-blue-500');
            break;
        case 'youtube':
            activeTab.classList.add('bg-red-600');
            break;
        case 'tiktok':
            activeTab.classList.add('bg-black');
            break;
    }
}

// Make function global
window.showSocialPlatform = showSocialPlatform;

// Interactive Features - Quiz
let interactiveData = null;
let quizQuestions = [];
let currentQuestionIndex = 0;
let playerScores = { tommy: 0, jakob: 0, dylan: 0, calvin: 0 };

// Load interactive data
async function loadInteractiveData() {
    try {
        const response = await fetch('interactive.json');
        interactiveData = await response.json();
        loadCountdowns();
    } catch (error) {
        console.error('Error loading interactive data:', error);
    }
}

// Start quiz
function startQuiz() {
    if (!interactiveData || !interactiveData.quiz) return;
    
    // Reset quiz state
    currentQuestionIndex = 0;
    playerScores = { tommy: 0, jakob: 0, dylan: 0, calvin: 0 };
    quizQuestions = interactiveData.quiz.questions;
    
    // Hide start screen, show questions
    document.getElementById('quiz-start').classList.add('hidden');
    document.getElementById('quiz-questions').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    
    // Update progress
    document.getElementById('total-questions').textContent = quizQuestions.length;
    
    // Show first question
    showQuizQuestion(0);
}

// Show quiz question
function showQuizQuestion(index) {
    const question = quizQuestions[index];
    if (!question) return;
    
    // Update progress
    document.getElementById('current-question').textContent = index + 1;
    const progressPercent = ((index + 1) / quizQuestions.length) * 100;
    document.getElementById('progress-bar').style.width = `${progressPercent}%`;
    
    // Display question
    const questionHTML = `
        <h4 class="text-lg font-bold mb-4">${question.question}</h4>
        <div class="space-y-3">
            ${question.answers.map((answer, i) => `
                <button onclick="answerQuestion(${i})" 
                        class="w-full text-left p-4 bg-gray-800 hover:bg-gray-700 rounded transition">
                    ${answer.text}
                </button>
            `).join('')}
        </div>
    `;
    
    document.getElementById('question-container').innerHTML = questionHTML;
}

// Answer question
function answerQuestion(answerIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const answer = question.answers[answerIndex];
    
    // Add points
    Object.keys(answer.points).forEach(member => {
        playerScores[member] += answer.points[member];
    });
    
    // Move to next question or show results
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
        showQuizQuestion(currentQuestionIndex);
    } else {
        showQuizResults();
    }
}

// Show quiz results
function showQuizResults() {
    // Find winner
    const winner = Object.keys(playerScores).reduce((a, b) => 
        playerScores[a] > playerScores[b] ? a : b
    );
    
    const result = interactiveData.quiz.results[winner];
    
    // Hide questions, show result
    document.getElementById('quiz-questions').classList.add('hidden');
    document.getElementById('quiz-result').classList.remove('hidden');
    
    // Display result
    document.getElementById('result-image').src = result.image;
    document.getElementById('result-name').textContent = result.name;
    document.getElementById('result-description').textContent = result.description;
}

// Reset quiz
function resetQuiz() {
    document.getElementById('quiz-result').classList.add('hidden');
    document.getElementById('quiz-start').classList.remove('hidden');
}

// Countdown Timer Functionality
function loadCountdowns() {
    if (!interactiveData || !interactiveData.countdown) return;
    
    const container = document.getElementById('countdown-container');
    const events = interactiveData.countdown.events;
    
    const countdownHTML = events.map(event => `
        <div class="retro-border p-4 bg-black/50">
            <h4 class="font-bold text-pink-500">${event.title}</h4>
            <p class="text-sm text-gray-400 mb-2">${event.description}</p>
            <div id="countdown-${event.id}" class="text-2xl font-mono">
                <span class="days">00</span>d 
                <span class="hours">00</span>h 
                <span class="minutes">00</span>m 
                <span class="seconds">00</span>s
            </div>
        </div>
    `).join('');
    
    container.innerHTML = countdownHTML;
    
    // Start countdown updates
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
}

// Update all countdowns
function updateCountdowns() {
    if (!interactiveData || !interactiveData.countdown) return;
    
    interactiveData.countdown.events.forEach(event => {
        const now = new Date();
        const eventDate = new Date(event.date);
        const diff = eventDate - now;
        
        if (diff > 0) {
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            const countdownEl = document.getElementById(`countdown-${event.id}`);
            if (countdownEl) {
                countdownEl.querySelector('.days').textContent = String(days).padStart(2, '0');
                countdownEl.querySelector('.hours').textContent = String(hours).padStart(2, '0');
                countdownEl.querySelector('.minutes').textContent = String(minutes).padStart(2, '0');
                countdownEl.querySelector('.seconds').textContent = String(seconds).padStart(2, '0');
            }
        } else {
            const countdownEl = document.getElementById(`countdown-${event.id}`);
            if (countdownEl) {
                countdownEl.innerHTML = '<span class="text-pink-500">Event has passed!</span>';
            }
        }
    });
}

// Make quiz functions global
window.startQuiz = startQuiz;
window.answerQuestion = answerQuestion;
window.resetQuiz = resetQuiz;

// Load interactive data on page load
document.addEventListener('DOMContentLoaded', () => {
    loadInteractiveData();
});