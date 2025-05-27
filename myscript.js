// Scroll animation effect for elements with 'fade-in' class
// This creates a smooth fade-in effect as elements come into view
$(document).on("scroll", function() {
  // Get the current scroll position from the top of the page
  var pageTop = $(document).scrollTop();
  // Calculate the bottom of the viewport by adding window height to scroll position
  var pageBottom = pageTop + $(window).height();
  // Select all elements with the 'fade-in' class
  var tags = $(".fade-in");

  // Loop through each fade-in element
  for (var i = 0; i < tags.length; i++) {
    var tag = tags[i];

    // If the element's top position is above the bottom of the viewport
    if ($(tag).position().top < pageBottom) {
      // Add the 'visible' class to make it fade in
      $(tag).addClass("visible");
    } else {
      // Remove the 'visible' class if it's not in view
      $(tag).removeClass("visible");
    }
  }
});

// Wait for the DOM to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function() {
    // ===== DARK MODE TOGGLE FUNCTIONALITY =====
    
    // Get references to important DOM elements
    const themeToggle = document.getElementById('theme-toggle'); // The toggle switch
    const body = document.body; // The body element
    const navbar = document.querySelector('.navbar'); // The navigation bar
    const footer = document.querySelector('footer'); // The footer

    // Function to apply the selected theme (dark or light)
    function applyTheme(theme) {
        if (theme === 'dark') {
            // Add dark theme classes to all relevant elements
            body.classList.add('dark');
            navbar.classList.add('dark');
            footer.classList.add('dark');
            // Set the toggle switch to checked state
            if (themeToggle) themeToggle.checked = true;
        } else {
            // Remove dark theme classes from all relevant elements
            body.classList.remove('dark');
            navbar.classList.remove('dark');
            footer.classList.remove('dark');
            // Set the toggle switch to unchecked state
            if (themeToggle) themeToggle.checked = false;
        }
    }

    // Add event listener to the theme toggle switch
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                // If switch is turned on, apply dark theme
                applyTheme('dark');
                // Save the preference to localStorage
                localStorage.setItem('theme', 'dark');
            } else {
                // If switch is turned off, apply light theme
                applyTheme('light');
                // Save the preference to localStorage
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // Check for saved theme preference when page loads
    // If no preference is found, default to light theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // ===== CONTACT FORM HANDLING =====
    
    // Get references to the contact form and status message element
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    // Add submit event listener to the contact form
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            // Prevent the default form submission
            e.preventDefault();
            // Show "Sending..." message if status element exists
            if (formStatus) formStatus.textContent = 'Sending...';

            // Get form input values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                // Create a callable function for sending email
                const sendContactEmail = firebase.functions().httpsCallable('sendContactEmail');
                // Call the function with form data
                const result = await sendContactEmail({ name, email, message });
                
                // Log success message
                console.log(result.data.message);
                // Show success message to user
                if (formStatus) {
                    formStatus.textContent = 'Message sent successfully! Thank you.';
                    formStatus.style.color = 'green';
                }
                // Clear the form
                contactForm.reset();
            } catch (error) {
                // Log error message
                console.error('Error sending email:', error);
                // Show error message to user
                if (formStatus) {
                    formStatus.textContent = 'Error sending email. Please try again later or contact me directly.';
                    formStatus.style.color = 'red';
                }
            }
        });
    }

    // ===== SCROLL ANIMATION (Duplicate of the one at the top) =====
    // This is the same scroll animation code as above
    // It's included here to ensure it works even if the first one doesn't
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