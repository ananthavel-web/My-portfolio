// ---- INTRO + TYPING ANIMATION ----
window.addEventListener('DOMContentLoaded', function () {

    // Add reveal class to elements
    document.querySelectorAll(
        '.card h2, .card h3, .card > p, .card ul, .card .project, .card .info-box, .card .contact-box, .card form, .card .bar, .card .btn'
    ).forEach(function (el) {
        el.classList.add('reveal');
    });

    // Skills bar start at 0
    document.querySelectorAll('.fill').forEach(function (bar) {
        bar.style.width = '0';
    });

    var overlay = document.getElementById('introOverlay');

    // After boot lines finish, fade out overlay then start typing
    setTimeout(function () {
        overlay.classList.add('hide');
        setTimeout(function () {
            overlay.style.display = 'none';
            typeText('typingName', 'ANANTHAVEL B', 80, function () {
                typeText('typingRole', 'Front-End Developer', 60, function () {
                    document.getElementById('typingRole').classList.add('done');
                    revealOnScroll();
                    checkSkillBars();
                });
            });
        }, 800);
    }, 2600);

    // Contact form
    var form = document.getElementById('contactForm');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            }).then(function (response) {
                if (response.ok) {
                    form.reset();
                    document.getElementById('successMsg').style.display = 'block';
                }
            });
        });
    }

    window.addEventListener('scroll', function () {
        revealOnScroll();
        checkSkillBars();
    });
});

function typeText(id, text, speed, callback) {
    var el = document.getElementById(id);
    var i = 0;
    el.textContent = '';
    var timer = setInterval(function () {
        el.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
            el.classList.add('done');
            if (callback) callback();
        }
    }, speed);
}

// ---- PAGE NAVIGATION ----
function showPage(page, el) {
    document.querySelectorAll('.section').forEach(function (sec) {
        sec.classList.remove('active');
    });
    document.getElementById(page).classList.add('active');

    document.querySelectorAll('nav a').forEach(function (a) {
        a.classList.remove('active');
    });
    el.classList.add('active');

    window.scrollTo(0, 0);

    setTimeout(function () {
        revealOnScroll();
        if (page === 'home') {
            document.querySelectorAll('.fill').forEach(function (bar) {
                bar.style.width = '0';
            });
            setTimeout(checkSkillBars, 300);
        }
    }, 100);
}

// ---- SCROLL REVEAL ----
function revealOnScroll() {
    document.querySelectorAll('.section.active .reveal').forEach(function (el) {
        var rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            el.classList.add('visible');
        }
    });
}

// ---- SKILL BARS ----
function checkSkillBars() {
    document.querySelectorAll('.fill').forEach(function (bar) {
        var rect = bar.getBoundingClientRect();
        if (rect.top < window.innerHeight - 30) {
            bar.style.width = bar.getAttribute('data-width');
        }
    });
}
