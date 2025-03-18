// Custom cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;
let lastScrollY = window.scrollY;

// Update cursor position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Add particle effect on mouse move
    createParticle(e.clientX, e.clientY);
});

// Scroll-based particle effect
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scrollDirection = scrollY > lastScrollY ? 'down' : 'up';
    const scrollSpeed = Math.abs(scrollY - lastScrollY);
    
    // Create particles based on scroll speed
    if (scrollSpeed > 5) {
        const particleCount = Math.min(Math.floor(scrollSpeed / 5), 10);
        for (let i = 0; i < particleCount; i++) {
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            createScrollParticle(x, y, scrollDirection);
        }
    }
    
    lastScrollY = scrollY;
});

// Smooth cursor animation
function animateCursor() {
    // Main cursor
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;

    // Follower cursor
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
}

// Start cursor animation
animateCursor();

// Add hover effect to interactive elements
const interactiveElements = document.querySelectorAll('a, button, .service-card, .feature');
interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.classList.add('hover');
        cursorFollower.classList.add('hover');
        createParticleBurst(element);
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.classList.remove('hover');
        cursorFollower.classList.remove('hover');
    });
});

// Particle effects
function createParticle(x, y) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animation = 'none';
    particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
    
    document.querySelector('.particles').appendChild(particle);
    
    // Trigger reflow
    particle.offsetHeight;
    particle.style.animation = 'float 2s ease-out forwards';
    
    // Remove particle after animation
    setTimeout(() => particle.remove(), 2000);
}

function createScrollParticle(x, y, direction) {
    const particle = document.createElement('div');
    particle.className = 'scroll-particle';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animation = 'none';
    particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`;
    
    document.querySelector('.particles').appendChild(particle);
    
    // Trigger reflow
    particle.offsetHeight;
    particle.style.animation = `scrollFloat ${1 + Math.random()}s ease-out forwards`;
    particle.style.setProperty('--direction', direction === 'down' ? '1' : '-1');
    
    // Remove particle after animation
    setTimeout(() => particle.remove(), 2000);
}

function createParticleBurst(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.animation = 'none';
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.2})`;
        
        document.querySelector('.particles').appendChild(particle);
        
        // Trigger reflow
        particle.offsetHeight;
        particle.style.animation = `float 1s ease-out forwards, particleBurst ${1 + Math.random()}s ease-out forwards`;
        particle.style.setProperty('--angle', `${angle}rad`);
        
        // Remove particle after animation
        setTimeout(() => particle.remove(), 2000);
    }
}

// Add styles for all animations
const style = document.createElement('style');
style.textContent = `
    @keyframes particleBurst {
        0% {
            transform: translate(0, 0);
        }
        100% {
            transform: translate(
                calc(cos(var(--angle)) * 100px),
                calc(sin(var(--angle)) * 100px)
            );
        }
    }

    @keyframes scrollFloat {
        0% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translate(
                calc(var(--direction) * 100px),
                calc(var(--direction) * -50px)
            ) scale(0);
            opacity: 0;
        }
    }

    .scroll-particle {
        position: absolute;
        width: 3px;
        height: 3px;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1000;
    }

    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        transform: translateY(100px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }

    .notification.show {
        transform: translateY(0);
        opacity: 1;
    }

    .notification.success {
        background-color: rgba(16, 185, 129, 0.2);
        border: 1px solid rgba(16, 185, 129, 0.3);
    }

    .notification.error {
        background-color: rgba(239, 68, 68, 0.2);
        border: 1px solid rgba(239, 68, 68, 0.3);
    }

    .service-card, .feature, .contact-form {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.5s ease;
    }

    .service-card.animate, .feature.animate, .contact-form.animate {
        opacity: 1;
        transform: translateY(0);
    }

    .contact-form.success {
        animation: successPulse 1s ease;
    }

    @keyframes successPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }

    .service-card {
        transition: all 0.3s ease;
    }

    .service-card:hover {
        transform: translateY(-10px) scale(1.02);
    }

    .feature {
        transition: all 0.3s ease;
    }

    .feature:hover {
        transform: translateY(-5px);
    }

    .social-links a {
        transition: all 0.3s ease;
    }

    .social-links a:hover {
        transform: translateY(-3px) scale(1.1);
    }
`;
document.head.appendChild(style);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect for hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .feature, .contact-form');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight && elementBottom > 0) {
            element.classList.add('animate');
        }
    });
};

// Add typing effect to hero text
const heroText = document.querySelector('.hero h1');
const text = heroText.textContent;
heroText.textContent = '';
let i = 0;

function typeWriter() {
    if (i < text.length) {
        heroText.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    typeWriter();
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// Contact form handling with enhanced validation
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        interest: formData.get('interest'),
        message: formData.get('message')
    };

    // Validate form data
    if (!validateForm(data)) {
        return;
    }

    try {
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;

        // Submit form to FormSubmit
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            // Show success message with animation
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
            
            // Add success animation to form
            contactForm.classList.add('success');
            setTimeout(() => {
                contactForm.classList.remove('success');
            }, 2000);
        } else {
            throw new Error('Form submission failed');
        }
    } catch (error) {
        // Show error message
        showNotification('Failed to send message. Please try again.', 'error');
        console.error('Error:', error);
    } finally {
        // Reset button state
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }
});

// Form validation
function validateForm(data) {
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[\d\s-]{10,}$/;

    // Validate email
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email address', 'error');
        isValid = false;
    }

    // Validate phone
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        isValid = false;
    }

    // Validate name
    if (data.name.length < 2) {
        showNotification('Please enter a valid name', 'error');
        isValid = false;
    }

    // Validate message
    if (data.message.length < 10) {
        showNotification('Message must be at least 10 characters long', 'error');
        isValid = false;
    }

    return isValid;
}

// Enhanced notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Add icon based on type
    const icon = document.createElement('i');
    icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
    notification.insertBefore(icon, notification.firstChild);

    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
} 