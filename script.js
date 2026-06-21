// script.js - Toteel Interactions

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const spans = menuToggle ? menuToggle.querySelectorAll('span') : [];

    function closeMenu() {
        if(navLinks) navLinks.classList.remove('active');
        if(spans.length) {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate Hamburger
            if(navLinks.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                closeMenu();
            }
        });
        
        // Fix: Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // 2. Navbar Scroll Effect & ScrollSpy
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    if (navbar) {
        window.addEventListener('scroll', () => {
            // Navbar Shadow
            if (window.scrollY > 50) {
                navbar.style.padding = '0.5rem 5%';
                navbar.style.boxShadow = 'var(--shadow-md)';
            } else {
                navbar.style.padding = '1rem 5%';
                navbar.style.boxShadow = 'var(--shadow-sm)';
            }

            // ScrollSpy System
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (window.scrollY >= sectionTop - 100) {
                    current = section.getAttribute('id');
                }
            });
            
            navItems.forEach(a => {
                a.classList.remove('active');
                if (a.getAttribute('href') && a.getAttribute('href').includes(current) && current !== '') {
                    a.classList.add('active');
                }
            });
        });
    }

    // 3. WhatsApp Direct Click Function (For Product Cards)
    const whatsappNumber = "249128702595"; // الرقم الذي وافق عليه العميل

    const waButtons = document.querySelectorAll('.req-whatsapp');
    waButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const productTitle = button.getAttribute('data-product');
            const message = encodeURIComponent(`مرحباً، أود الاستفسار عن تفاصيل وسعر المنتج: ${productTitle} من معرض توتيل.`);
            const waLink = `https://wa.me/${whatsappNumber}?text=${message}`;
            window.open(waLink, '_blank');
        });
    });

    // 4. Floating WhatsApp Global Button
    const floatingWa = document.querySelector('.floating-whatsapp');
    if (floatingWa) {
        const globalMsg = encodeURIComponent("مرحباً بك في معرض توتيل. أود الاستفسار عن بعض منتجاتكم المعروضة.");
        floatingWa.href = `https://wa.me/${whatsappNumber}?text=${globalMsg}`;
    }

    // 5. Very basic Product Filtering (if on products page)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    if (filterBtns.length > 0 && productCards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (filterValue === 'all' || category === filterValue) {
                        card.style.display = 'flex';
                        // Re-trigger animation
                        card.classList.remove('show-up');
                        setTimeout(() => card.classList.add('show-up'), 50);
                    } else {
                        card.style.display = 'none';
                        card.classList.remove('show-up');
                    }
                });
            });
        });
    }

    // 6. luxurious Animations (Intersection Observer)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-up, .feature-card, .category-card, .product-card, .section-title, .section-subtitle');
    animatedElements.forEach(el => {
        el.classList.add('hide-up'); // Ensure they start hidden
        observer.observe(el);
    });

    // 7. Dark Mode Logic
    const themeToggle = document.querySelector('.theme-toggle');
    const userTheme = localStorage.getItem('toteel_theme');
    
    if (userTheme === 'dark' || (!userTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        if(themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('toteel_theme', newTheme);
            
            themeToggle.innerHTML = newTheme === 'dark' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }
});
