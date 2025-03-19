document.addEventListener('DOMContentLoaded', function() {
    // Navigation toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
                authButtons.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '80px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.backgroundColor = '#fff';
                navLinks.style.padding = '20px';
                navLinks.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
                
                authButtons.style.display = 'flex';
                authButtons.style.flexDirection = 'column';
                authButtons.style.position = 'absolute';
                authButtons.style.top = `${navLinks.scrollHeight + 80}px`;
                authButtons.style.left = '0';
                authButtons.style.width = '100%';
                authButtons.style.backgroundColor = '#fff';
                authButtons.style.padding = '0 20px 20px';
                authButtons.style.boxShadow = '0 10px 15px rgba(0, 0, 0, 0.1)';
            }
        });
    }
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    
    function showSlide(n) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[n].classList.add('active');
        dots[n].classList.add('active');
        currentSlide = n;
    }
    
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => showSlide(index));
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            let newSlide = currentSlide - 1;
            if (newSlide < 0) newSlide = testimonials.length - 1;
            showSlide(newSlide);
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            let newSlide = currentSlide + 1;
            if (newSlide >= testimonials.length) newSlide = 0;
            showSlide(newSlide);
        });
    }
    
    // Auto slide testimonials
    setInterval(function() {
        let newSlide = currentSlide + 1;
        if (newSlide >= testimonials.length) newSlide = 0;
        showSlide(newSlide);
    }, 5000);
    
    // Modal Functionality
    const loginBtn = document.querySelector('.login-btn');
    const signupBtn = document.querySelector('.signup-btn');
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const closeModals = document.querySelectorAll('.close-modal');
    const showSignup = document.getElementById('showSignup');
    const showLogin = document.getElementById('showLogin');
    
    function openModal(modal) {
        if (modal) {
            modal.style.display = 'flex';
        }
    }
    
    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
        }
    }
    
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
    }
    
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            openModal(loginModal);
        });
    }
    
    if (signupBtn) {
        signupBtn.addEventListener('click', function() {
            openModal(signupModal);
        });
    }
    
    if (closeModals.length > 0) {
        closeModals.forEach(closeBtn => {
            closeBtn.addEventListener('click', function() {
                closeAllModals();
            });
        });
    }
    
    if (showSignup) {
        showSignup.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            openModal(signupModal);
        });
    }
    
    if (showLogin) {
        showLogin.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(signupModal);
            openModal(loginModal);
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeAllModals();
        }
    });
    
    // Form Validation
    const contactForm = document.getElementById('contactForm');
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would usually send the form data to a server
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would usually validate credentials against a server
            alert('Login successful! Redirecting to dashboard...');
            closeAllModals();
        });
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('signupPassword').value;
            const confirm = document.getElementById('signupConfirm').value;
            
            if (password !== confirm) {
                alert('Passwords do not match. Please try again.');
                return;
            }
            
            // Here you would usually send the signup data to a server
            alert('Account created successfully! Please check your email to verify your account.');
            closeAllModals();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Close mobile menu if open
                    if (window.innerWidth < 992 && navLinks.style.display === 'flex') {
                        hamburger.click();
                    }
                    
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Animated stats on scroll
    const statBoxes = document.querySelectorAll('.stat-box');
    
    function animateStats() {
        statBoxes.forEach(box => {
            const boxTop = box.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (boxTop < windowHeight - 100) {
                box.style.transform = 'translateY(0)';
                box.style.opacity = '1';
            }
        });
    }
    
    // Service cards hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (serviceCards.length > 0) {
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.borderBottomColor = '#3a6ea5';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.borderBottomColor = 'transparent';
            });
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }
    
    // Initial calls
    if (testimonials.length > 0) {
        showSlide(0);
    }
    
    if (statBoxes.length > 0) {
        // Initial animation of stats if they're in view
        animateStats();
        
        // Animate stats on scroll
        window.addEventListener('scroll', animateStats);
    }
});