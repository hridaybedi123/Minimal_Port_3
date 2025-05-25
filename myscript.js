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


        // Initialize Firebase with your project config
        // Make sure you've already set up Firebase on your website
        const firebaseConfig = {
          apiKey: "AIzaSyBWMTwJ-88mYsr2c0CIqGW4rZmH3q9i6es",
          authDomain: "professional-f34e5.firebaseapp.com",
          projectId: "professional-f34e5",
          storageBucket: "professional-f34e5.appspot.com",
          messagingSenderId: "1025609352334",
          appId: "1:1025609352334:web:c10a2d05f6143f8614b5df",
          measurementId: "G-S3XRXP4R6E"
        };
      firebase.initializeApp(firebaseConfig);

      // Your form submission code with the Cloud Function integration
      const sendContactEmail = firebase.functions().httpsCallable('sendContactEmail');

      const contactForm = document.getElementById('contact-form');

      contactForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;

          try {
              const result = await sendContactEmail({ name, email, message });
              console.log(result.data.message);
              // You can show a success message to the user here
              contactForm.reset();
          } catch (error) {
              console.error('Error sending email:)', error);
              // Handle and display the error to the user
          }
      });

      document.addEventListener('DOMContentLoaded', function() { // <<--- WRAPPER

        // Dark Mode Toggle Functionality
        const themeToggle = document.getElementById('theme-toggle');
        console.log('Theme Toggle Element:', themeToggle);
        const body = document.body;
    
        // Function to apply the theme
        function applyTheme(theme) {
            console.log('Applying theme:', theme);
            if (theme === 'dark') {
                body.classList.add('dark');
                if (themeToggle) themeToggle.checked = true;
            } else {
                body.classList.remove('dark');
                if (themeToggle) themeToggle.checked = false;
            }
            console.log('Body classes:', body.className);
        }
    
        // Event listener for the toggle switch
        if (themeToggle) {
            themeToggle.addEventListener('change', function() {
                console.log('Toggle changed! Checked:', this.checked);
                if (this.checked) {
                    applyTheme('dark');
                    localStorage.setItem('theme', 'dark');
                } else {
                    applyTheme('light');
                    localStorage.setItem('theme', 'light');
                }
            });
        } else {
            console.error("Theme toggle element not found, event listener not added.");
        }
    
        // On page load, check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
        applyTheme(savedTheme);
    
    
        // Initialize Firebase with your project config
        // Make sure you've already set up Firebase on your website
        const firebaseConfig = {
          apiKey: "AIzaSyBWMTwJ-88mYsr2c0CIqGW4rZmH3q9i6es", // THIS IS A PUBLIC KEY
          authDomain: "professional-f34e5.firebaseapp.com",
          projectId: "professional-f34e5",
          storageBucket: "professional-f34e5.appspot.com",
          messagingSenderId: "1025609352334",
          appId: "1:1025609352334:web:c10a2d05f6143f8614b5df",
          measurementId: "G-S3XRXP4R6E"
        };
    
        // This is line 29 (or around there) that was causing the error
        try {
            firebase.initializeApp(firebaseConfig); // Now this is inside DOMContentLoaded
            console.log("Firebase initialized successfully.");
    
            // Your form submission code with the Cloud Function integration
            const sendContactEmail = firebase.functions().httpsCallable('sendContactEmail');
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
            } else {
              console.warn("Contact form with ID 'contact-form' not found.");
            }
    
        } catch (e) {
            console.error("Error initializing Firebase or setting up form:", e);
        }
    
    
        // jQuery dependent code (like the scroll listener)
        // This also needs jQuery to be loaded, which it should be if script order is correct
        // and DOMContentLoaded has fired.
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
    
    
    }); // <<--- END OF DOMContentLoaded WRAPPER
    // --- END OF FILE myscript.js ---