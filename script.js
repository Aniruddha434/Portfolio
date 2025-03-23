// Mobile menu functionality
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
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

// Add active class to navigation links based on scroll position
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
        }
    });
});

// Add scroll reveal animation
const revealElements = document.querySelectorAll('.skill-item');

const revealOnScroll = () => {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);

// Portfolio filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px) scale(0.9)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Form submission handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        // Here you would typically send the form data to a server
        // For now, we'll just show a success message
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.skill-card, .portfolio-item, .contact-card').forEach(el => {
    observer.observe(el);
});

// Add scroll event listener for navbar
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        navbar.classList.remove('scroll-up');
        return;
    }

    if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
        // Scroll down
        navbar.classList.remove('scroll-up');
        navbar.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
        // Scroll up
        navbar.classList.remove('scroll-down');
        navbar.classList.add('scroll-up');
    }
    lastScroll = currentScroll;
});

// Initialize 3D tilt effect for elements with js-tilt class but exclude profile image
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('.js-tilt:not(.profile-img-container)');
    if (tiltElements.length > 0 && typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(tiltElements, {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });
    }
}

// 3D Scroll Animation
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-card, .profile-img-container, .hero-text');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Cursor follower effect
document.addEventListener('DOMContentLoaded', function() {
    const createCursorFollower = () => {
        if (window.innerWidth > 768) { // Only create on desktop
            const cursorFollower = document.createElement('div');
            cursorFollower.className = 'cursor-follower';
            document.body.appendChild(cursorFollower);
            
            document.addEventListener('mousemove', (e) => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            });
            
            // Add special effects on interactive elements
            const interactiveElements = document.querySelectorAll('a, button, .skill-card, .profile-img');
            
            interactiveElements.forEach(element => {
                element.addEventListener('mouseenter', () => {
                    cursorFollower.classList.add('active');
                });
                
                element.addEventListener('mouseleave', () => {
                    cursorFollower.classList.remove('active');
                });
            });
        }
    };
    
    // Only create cursor follower on devices that support hover
    if (!('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
        createCursorFollower();
    }
});

// Parallax effect on scroll
window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    
    // Parallax for hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.backgroundPositionY = scrollY * 0.5 + 'px';
    }
    
    // Rotate profile image slightly on scroll
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.style.transform = `rotateY(${scrollY * 0.01}deg) rotateX(${scrollY * 0.01}deg)`;
    }
});

// Add some dynamic background shapes
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        // Create floating shapes (for supporting browsers)
        const createFloatingShapes = () => {
            const shapeCount = 5;
            const shapes = ['circle', 'square', 'triangle'];
            
            for (let i = 0; i < shapeCount; i++) {
                const shape = document.createElement('div');
                const shapeType = shapes[Math.floor(Math.random() * shapes.length)];
                
                shape.className = `floating-shape ${shapeType}`;
                shape.style.left = `${Math.random() * 100}%`;
                shape.style.top = `${Math.random() * 100}%`;
                shape.style.animationDelay = `${Math.random() * 5}s`;
                shape.style.animationDuration = `${Math.random() * 10 + 10}s`;
                
                heroSection.appendChild(shape);
            }
        };
        
        createFloatingShapes();
    }
});

// Document ready function
document.addEventListener('DOMContentLoaded', function() {
    // Initialize mobile menu
    initMobileMenu();
    
    // Initialize smooth scrolling
    initSmoothScrolling();
    
    // Initialize the tilt effect
    initTiltEffect();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Initialize cursor follower if not on mobile
    if (window.innerWidth > 768) {
        initCursorFollower();
    }
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Add floating shapes to hero section
    addFloatingShapes();
}); 