(function () {
    'use strict';

    // ============================================================
    // 1. NAVBAR SCROLL EFFECT (glass nav gets darker on scroll)
    // ============================================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================================
    // 2. MOBILE HAMBURGER MENU (toggle open/close)
    // ============================================================
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    function toggleMenu() {
        // Toggle hamburger active state (turns to X)
        hamburger.classList.toggle('active');
        
        // Toggle navigation links visibility (slide in/out)
        navLinks.classList.toggle('active');
        
        // Prevent scrolling when menu is open
        if (navLinks.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
            hamburger.setAttribute('aria-expanded', 'true');
        } else {
            document.body.style.overflow = '';
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }

    // Click hamburger to toggle menu
    if (hamburger) {
        hamburger.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });
    }

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside (on the page)
    document.addEventListener('click', function(event) {
        if (navLinks && navLinks.classList.contains('active')) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnHamburger = hamburger && hamburger.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnHamburger) {
                toggleMenu();
            }
        }
    });

    // Close menu on window resize (if switching to desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // ============================================================
    // 3. ACTIVE NAV LINK - SCROLL SPY (paused during programmatic scroll)
    //    FIX: previously the scroll-spy and the click handler both
    //    fought over the `.active` class while a smooth-scroll from
    //    a nav click was still animating, causing multiple nav items
    //    to appear highlighted/stuck at once (e.g. clicking Contact
    //    would leave About/Products still looking active).
    //    Now the scroll-spy pauses itself the moment a nav link is
    //    clicked, and only resumes once scrolling has fully settled.
    // ============================================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    // Store currently active link
    let currentActiveLink = null;

    // True while a click-triggered smooth scroll is in progress
    let isProgrammaticScroll = false;
    let scrollEndTimer = null;

    // Function to update active link based on scroll position
    function updateActiveLink() {
        // Don't let scroll-spy override the link the user just clicked
        // while the smooth-scroll animation is still playing
        if (isProgrammaticScroll) return;

        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 150;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                current = section.getAttribute('id');
            }
        });

        // INSTANTLY remove active class from all links (no delay)
        navLinksAll.forEach(function(link) {
            link.classList.remove('active');
        });

        // INSTANTLY add active class to matching link
        if (current) {
            navLinksAll.forEach(function(link) {
                const href = link.getAttribute('href');
                if (href === '#' + current) {
                    link.classList.add('active');
                    currentActiveLink = link;
                }
            });
        } else {
            currentActiveLink = null;
        }
    }

    // Update on scroll with requestAnimationFrame for performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }

        // Detect when scrolling has actually stopped (covers both
        // manual scrolling and the smooth programmatic scroll
        // triggered by a nav click), then let scroll-spy resume.
        clearTimeout(scrollEndTimer);
        scrollEndTimer = setTimeout(function() {
            isProgrammaticScroll = false;
            updateActiveLink();
        }, 150);
    });

    // Update on load
    window.addEventListener('load', function() {
        updateActiveLink();
    });

    // ============================================================
    // 4. CLICK HANDLER FOR NAV LINKS - INSTANT ACTIVE STATE
    // ============================================================
    navLinksAll.forEach(function(link) {
        link.addEventListener('click', function(e) {
            // Tell the scroll-spy to stand down until scrolling settles
            isProgrammaticScroll = true;

            // INSTANTLY remove active class from ALL links
            navLinksAll.forEach(function(l) {
                l.classList.remove('active');
            });
            
            // INSTANTLY add active class to clicked link
            this.classList.add('active');
            currentActiveLink = this;
        });
    });

    // ============================================================
    // 5. SMOOTH SCROLL FOR ANCHOR LINKS (with offset for fixed nav)
    // ============================================================
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            // Skip empty or "#" only links
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                e.preventDefault();

                // Offset accounts for the fixed navigation height
                const offset = 100;
                const top = targetEl.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // 6. CONTACT FORM - WHATSAPP REDIRECT
    // ============================================================
    const form = document.getElementById('contactForm');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            // Basic validation
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, Message).');
                return;
            }

            if (!email.includes('@') || !email.includes('.')) {
                alert('Please enter a valid email address.');
                return;
            }

            // WhatsApp number (without +)
            const whatsappNumber = '9081667291';

            // Build the message
            let whatsappMessage = 'Hello A1 Fashion! \n\n';
            whatsappMessage += ' New Inquiry from Website:\n\n';
            whatsappMessage += ' Name: ' + name + '\n';
            whatsappMessage += ' Email: ' + email + '\n';
            if (phone) {
                whatsappMessage += ' Phone: ' + phone + '\n';
            }
            whatsappMessage += ' Message: ' + message + '\n\n';
            whatsappMessage += ' From: A1 Fashion Website';

            // Encode the message for URL
            const encodedMessage = encodeURIComponent(whatsappMessage);

            // Create WhatsApp URL
            const whatsappURL = 'https://wa.me/' + whatsappNumber + '?text=' + encodedMessage;

            // Open WhatsApp in new tab
            window.open(whatsappURL, '_blank');

            // Show success message
            alert('Thank you, ' + name + '! Your message has been sent via WhatsApp.');

            // Reset form
            form.reset();
        });
    }

    // ============================================================
    // 7. HERO BUTTON SCROLL
    // ============================================================
    const heroBtn = document.querySelector('.hero-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#products');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ============================================================
    // 8. VIEW ALL BUTTON
    // ============================================================
    const viewBtn = document.querySelector('.view-btn');
    if (viewBtn) {
        viewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector('#products');
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ============================================================
    // 9. CONSOLE WELCOME (brand signature)
    // ============================================================
    console.log('🛍️ A1 Fashion — Premium Men\'s & Kid\'s Wear');
    console.log('📍 Shop No.7, GF, Abhishek Complex, Ahmedabad');
    console.log('📞 07023134520');
    console.log('✅ All JavaScript loaded successfully!');

})();
