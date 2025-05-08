document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = {
                wineryName: document.getElementById('name').value,
                contactPerson: document.getElementById('contact-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                message: document.getElementById('message').value
            };
            
            // For demonstration, just show an alert
            alert('Thanks for your interest! In a real implementation, this would submit your information. We\'ll be in touch soon!');
            
            // Clear the form
            contactForm.reset();
            
            // In a real implementation, you would send this data to your server
            console.log('Form Data:', formData);
        });
    }
    
    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.add('active');
            } else {
                document.querySelector(`nav a[href="#${sectionId}"]`)?.classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavOnScroll);
    
    // Add an active class style in CSS
    const style = document.createElement('style');
    style.textContent = `
        nav ul li a.active {
            color: var(--primary-color);
            font-weight: 700;
        }
    `;
    document.head.appendChild(style);
    
    // Basic animation on scroll
    const fadeInElements = document.querySelectorAll('.feature-item, .service-item, .pricing-card, .distribution-content, .distribution-feature');
    
    function checkFadeIn() {
        fadeInElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Add initial styles for fade-in animation
    fadeInElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', checkFadeIn);
    checkFadeIn(); // Check on initial load
}); 