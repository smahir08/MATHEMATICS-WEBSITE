
// DOM Elements
const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.querySelector('.mobile-nav');
const scrollToTopBtn = document.getElementById('scrollToTop');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const heroAnimateItems = document.querySelectorAll('.hero .animate-item');
const currentYearEl = document.getElementById('current-year');
const contactForm = document.getElementById('contactForm');

// Set current year in footer
if (currentYearEl) {
    currentYearEl.textContent = new Date().getFullYear();
}

// Navbar scroll effect with smoother transitions
function handleScroll() {
    const scrollPosition = window.scrollY;
    
    // Add scrolled class to navbar
    if (scrollPosition > 20) {
        navbar.classList.add('scrolled');
        if (scrollToTopBtn) scrollToTopBtn.classList.add('visible');
    } else {
        navbar.classList.remove('scrolled');
        if (scrollToTopBtn) scrollToTopBtn.classList.remove('visible');
    }
    
    // Update active section in navbar with smooth highlighting
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Smoothly update desktop nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
            
            // Smoothly update mobile nav
            mobileNavLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Enhanced mobile menu toggle with animation
function toggleMobileMenu() {
    mobileNav.classList.toggle('open');
    
    const menuIcon = mobileMenuBtn.querySelector('i');
    if (mobileNav.classList.contains('open')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-times');
        
        // Animate each mobile nav link sequentially
        mobileNavLinks.forEach((link, index) => {
            setTimeout(() => {
                link.style.opacity = '0';
                link.style.transform = 'translateX(-20px)';
                link.style.transition = 'none';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.3s ease';
                    link.style.opacity = '1';
                    link.style.transform = 'translateX(0)';
                }, 50);
            }, index * 50);
        });
    } else {
        menuIcon.classList.remove('fa-times');
        menuIcon.classList.add('fa-bars');
    }
}

// Handle mobile nav link clicks - close menu after click with smooth transition
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Small delay before closing menu for better UX
        setTimeout(() => {
            mobileNav.classList.remove('open');
            const menuIcon = mobileMenuBtn.querySelector('i');
            menuIcon.classList.remove('fa-times');
            menuIcon.classList.add('fa-bars');
        }, 300);
    });
});

// Enhanced scroll to top function with smooth easing
function scrollToTop() {
    const startPosition = window.pageYOffset;
    const duration = 800; // ms
    const startTime = performance.now();
    
    function ease(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1; // Cubic easing
    }
    
    function animate(currentTime) {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        const eased = ease(progress);
        
        window.scrollTo(0, (1 - eased) * startPosition);
        
        if (progress < 1) {
            window.requestAnimationFrame(animate);
        }
    }
    
    window.requestAnimationFrame(animate);
}

// Enhanced animate on scroll with better timing and smoother transitions
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    
    elements.forEach((element, index) => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.85) {
            // Add delay based on element position in DOM for cascading effect
            setTimeout(() => {
                element.classList.add('visible');
            }, 100 * (index % 3));  // Stagger elements in groups of 3
        }
    });
}

// Enhanced hero section animations with better timing
function animateHero() {
    heroAnimateItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateY(20px)';
            item.style.opacity = '0';
            
            setTimeout(() => {
                item.style.transition = 'all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1)';
                item.style.transform = 'translateY(0)';
                item.style.opacity = '1';
                item.classList.add('visible');
            }, 50);
        }, 300 * index);
    });
}

// Contact form submission with animation
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Add animation to form submission
        contactForm.classList.add('submitting');
        
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
            contactForm.classList.remove('submitting');
        }, 800);
    });
}

// Event listeners
window.addEventListener('scroll', handleScroll);
window.addEventListener('scroll', animateOnScroll);

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', scrollToTop);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Force navbar to be visible by applying inline styles
    if (navbar) {
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
        navbar.style.display = 'block';
        navbar.style.zIndex = '9999';
    }
    
    // Add preload class to body (for animations)
    document.body.classList.add('preload');
    
    // Remove preload after a short delay to allow transitions
    setTimeout(() => {
        document.body.classList.remove('preload');
    }, 300);
    
    // Run initial scroll check
    handleScroll();
    
    // Run initial animations check
    animateOnScroll();
    
    // Animate hero section
    animateHero();
    
    // Add page load animation to navbar
    if (navbar) {
        navbar.style.transform = 'translateY(-100%)';
        setTimeout(() => {
            navbar.style.transition = 'transform 0.6s cubic-bezier(0.215, 0.61, 0.355, 1)';
            navbar.style.transform = 'translateY(0)';
        }, 200);
    }
    
    // Add smooth hover effect to nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)';
        });
    });
});
