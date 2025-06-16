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

// Guestbook functionality
const guestbookForm = document.getElementById('guestbook-form');
const guestbookEntries = document.getElementById('guestbook-entries');

// Load existing guestbook entries from localStorage
function loadGuestbookEntries() {
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    const defaultEntry = {
        name: "Tommy's Mom",
        message: "Love you guys! Can't wait for the next show! <�",
        date: "2024-06-16"
    };
    
    // Add default entry if no entries exist
    if (entries.length === 0) {
        entries.push(defaultEntry);
    }
    
    displayGuestbookEntries(entries);
}

// Display guestbook entries
function displayGuestbookEntries(entries) {
    guestbookEntries.innerHTML = entries.map(entry => `
        <div class="retro-border p-4 bg-black/50">
            <p class="text-sm text-gray-400">${entry.name} - ${entry.date}</p>
            <p class="mt-2">${entry.message}</p>
        </div>
    `).join('');
}

// Handle guestbook form submission
guestbookForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('gb-name').value;
    const message = document.getElementById('gb-message').value;
    const date = new Date().toISOString().split('T')[0];
    
    // Get existing entries
    const entries = JSON.parse(localStorage.getItem('guestbookEntries') || '[]');
    
    // Add new entry at the beginning
    entries.unshift({ name, message, date });
    
    // Save to localStorage
    localStorage.setItem('guestbookEntries', JSON.stringify(entries));
    
    // Display updated entries
    displayGuestbookEntries(entries);
    
    // Clear form
    guestbookForm.reset();
    
    // Show success message
    alert('Thanks for signing our guestbook! <�');
});

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

// Load guestbook entries on page load
document.addEventListener('DOMContentLoaded', () => {
    loadGuestbookEntries();
    
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