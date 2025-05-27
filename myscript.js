$(document).on("scroll", function() {
  var pageTop = $(document).scrollTop();
  var pageBottom = pageTop + $(window).height();
  var tags = $(".fade-in");

  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    if ($(tag).position().top < pageBottom) {
      $(tag).addClass("visible");
    } else {
      $(tag).removeClass("visible");
    }
  }
});

document.addEventListener('DOMContentLoaded', function() {
    // Dark Mode Toggle Functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const navbar = document.querySelector('.navbar');
    const footer = document.querySelector('footer');

    // Function to apply the theme
    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark');
            navbar.classList.add('dark');
            footer.classList.add('dark');
            if (themeToggle) themeToggle.checked = true;
        } else {
            body.classList.remove('dark');
            navbar.classList.remove('dark');
            footer.classList.remove('dark');
            if (themeToggle) themeToggle.checked = false;
        }
    }

    // Event listener for the toggle switch
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // On page load, check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (formStatus) formStatus.textContent = 'Sending...';

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                const sendContactEmail = firebase.functions().httpsCallable('sendContactEmail');
                const result = await sendContactEmail({ name, email, message });
                
                console.log(result.data.message);
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully! Thank you.';
                    formStatus.style.color = 'green';
                }
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                if (formStatus) {
                    formStatus.textContent = 'Error sending email. Please try again later or contact me directly.';
                    formStatus.style.color = 'red';
                }
            }
        });
    }

    // Scroll animation
    $(document).on("scroll", function() {
        var pageTop = $(document).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var tags = $(".fade-in");

        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            if ($(tag).position().top < pageBottom) {
                $(tag).addClass("visible");
            } else {
                $(tag).removeClass("visible");
            }
        }
    });
});