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