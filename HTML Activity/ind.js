 // Loader
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
            }, 1500);
        });

        // Navigation
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');

        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Navbar scroll effect
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links with proper offset
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Back to top button
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Form submission
        function handleSubmit(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Simple animation feedback
            const button = e.target.querySelector('.submit-btn');
            const originalText = button.textContent;
            
            button.textContent = 'Sending...';
            button.style.opacity = '0.7';
            
            setTimeout(() => {
                // Reset form
                e.target.reset();
                
                // Show success message
                button.textContent = '✓ Message Sent!';
                button.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = '';
                    button.style.opacity = '1';
                }, 2000);
            }, 1000);
            
            console.log('Form submitted:', { name, email, message });
        }

        // Menu card hover effect
        document.querySelectorAll('.menu-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) rotateZ(1deg)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = '';
            });
        });

        // Special cards auto-scroll
        const specialsCarousel = document.querySelector('.specials-carousel');
        let scrollInterval;
        let scrollDirection = 1;

        function autoScroll() {
            if (specialsCarousel) {
                const maxScroll = specialsCarousel.scrollWidth - specialsCarousel.clientWidth;
                
                if (specialsCarousel.scrollLeft >= maxScroll) {
                    scrollDirection = -1;
                } else if (specialsCarousel.scrollLeft <= 0) {
                    scrollDirection = 1;
                }
                
                specialsCarousel.scrollLeft += scrollDirection * 2;
            }
        }

        // Start auto-scroll
        scrollInterval = setInterval(autoScroll, 50);

        // Pause on hover
        if (specialsCarousel) {
            specialsCarousel.addEventListener('mouseenter', () => {
                clearInterval(scrollInterval);
            });
            
            specialsCarousel.addEventListener('mouseleave', () => {
                scrollInterval = setInterval(autoScroll, 50);
            });
        }

        // Gallery items animation
        document.querySelectorAll('.gallery-item').forEach((item, index) => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.05) rotate(2deg)';
                this.style.zIndex = '10';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = '';
                this.style.zIndex = '';
            });
            
            // Add click effect
            item.addEventListener('click', function() {
                this.style.animation = 'pulse 0.5s';
                setTimeout(() => {
                    this.style.animation = '';
                }, 500);
            });
        });

        // Add pulse animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);

        // FIXED: Removed problematic parallax effect that was causing overlap
        // The original parallax effect was interfering with scroll positioning

        // Add typing effect to hero subtitle
        const subtitle = document.querySelector('.hero-subtitle');
        if (subtitle) {
            const text = subtitle.textContent;
            subtitle.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    subtitle.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 100);
                }
            }
            
            setTimeout(typeWriter, 1500);
        }

        // Dynamic copyright year
        const currentYear = new Date().getFullYear();
        const copyright = document.querySelector('footer p:last-child');
        if (copyright) {
            copyright.innerHTML = `© ${currentYear} Virasat Café. All rights reserved. `;
        }

        // Add visual feedback for nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Remove active class from all links
                navLinks.forEach(l => l.classList.remove('active'));
                // Add active class to clicked link
                this.classList.add('active');
            });
        });

        // Detect active section while scrolling with proper offset
        const sections = document.querySelectorAll('section');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100; // Account for navbar
                const sectionHeight = section.clientHeight;
                if (scrollY >= sectionTop) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        });
        function toggleMenu(button) {
    const hiddenItems = button.previousElementSibling.querySelectorAll('.hidden-item');
    hiddenItems.forEach(item => item.classList.toggle('show-item'));
    button.textContent = button.textContent === "View More" ? "View Less" : "View More";
}