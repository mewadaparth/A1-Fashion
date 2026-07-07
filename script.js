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

    hamburger.addEventListener('click', function () {
        const isOpen = navLinks.classList.toggle('open');
        hamburger.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(function (link) {
        link.addEventListener('click', function () {
            navLinks.classList.remove('open');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // ============================================================
    // 3. CONTACT FORM - WHATSAPP REDIRECT
    // ============================================================
    const form = document.getElementById('contactForm');

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
        whatsappMessage += ` Name: ${name}\n`;
        whatsappMessage += ` Email: ${email}\n`;
        if (phone) {
            whatsappMessage += ` Phone: ${phone}\n`;
        }
        whatsappMessage += ` Message: ${message}\n\n`;
        whatsappMessage += ' From: A1 Fashion Website';

        // Encode the message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Open WhatsApp in new tab
        window.open(whatsappURL, '_blank');

        // Show success message
        alert('✅ Thank you, ' + name + '! Your message has been sent via WhatsApp.');

        // Reset form
        form.reset();
    });

    // ============================================================
    // 4. SMOOTH SCROLL FOR ANCHOR LINKS (with offset for fixed nav)
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
    // 5. CONSOLE WELCOME (brand signature)
    // ============================================================
    console.log('🛍️ A1 Fashion — Premium Men\'s & Kid\'s Wear');
    console.log('📍 Shop No.7, GF, Abhishek Complex, Ahmedabad');
    console.log('📞 07023134520');

})();