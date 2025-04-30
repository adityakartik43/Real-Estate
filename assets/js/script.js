// Get DOM elements
const contactOverlay = document.getElementById('contactOverlay');
const closeBtn = document.getElementById('closeBtn');
const contactForm = document.getElementById('contactForm');
const contactUsBtn = document.getElementById('contactUsBtn');
const enquiryForm = document.getElementById('enquiryForm');

// Show the popup
function showPopup() {
    contactOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// Hide the popup
function hidePopup() {
    contactOverlay.classList.remove('show');
    document.body.style.overflow = 'auto';
}

// Show popup on button click
if (contactUsBtn) {
    contactUsBtn.addEventListener('click', function (e) {
        e.preventDefault();
        showPopup();
    });
}

// Hide popup on close button
if (closeBtn) {
    closeBtn.addEventListener('click', hidePopup);
}

// Hide popup when clicking outside the modal
if (contactOverlay) {
    contactOverlay.addEventListener('click', function (e) {
        if (e.target === contactOverlay) {
            hidePopup();
        }
    });
}


  // Wait until the DOM is fully loaded
  document.addEventListener("DOMContentLoaded", function() {
    // Select all buttons with class 'interested-btn'
    const buttons = document.querySelectorAll(".interested-btn");
    
    // Loop through each button and add click event
    buttons.forEach(button => {
      button.addEventListener("click", function(e) {
        e.preventDefault();
        showPopup();
      });
    });
  });


// Form submission using fetch and SheetDB API
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(contactForm);

        const now = new Date();
        const timestamp = now.toLocaleString(); // e.g., "4/30/2025, 2:15:30 PM"

        const data = {
            data: {
                "Name": formData.get('data[Name]'),
                "Phone number": formData.get('data[Phone number]'),
                "Email": formData.get('data[Email]'),
                "Message": formData.get('data[Message]'),
                "Timestamp": timestamp
            }
        };

        fetch('https://sheetdb.io/api/v1/g2b68ikbx5ybs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Your response has been submitted.');
                contactForm.reset();
                hidePopup();
            } else {
                alert('Something went wrong. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error submitting form:', error);
            alert('Error submitting form. Please try again later.');
        });
    });
}


  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(enquiryForm);
      const timestamp = new Date().toLocaleString(); // Add timestamp

      const data = {
        data: {
          "Name": formData.get('Name'),
          "Email": formData.get('Email'),
          "Phone number": formData.get('Phone number'),
          "Message": formData.get('Message'),
          "Timestamp": timestamp
        }
      };

      fetch('https://sheetdb.io/api/v1/g2b68ikbx5ybs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(response => {
        if (response.ok) {
          alert("Thank you! Your enquiry has been submitted.");
          enquiryForm.reset();
        } else {
          alert("Something went wrong. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Network error. Please try again later.");
      });
    });
}


