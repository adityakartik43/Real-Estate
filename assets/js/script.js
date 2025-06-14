document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const contactOverlay = document.getElementById("contactOverlay");
  const closeBtn = document.getElementById("closeBtn");
  const contactForm = document.getElementById("contactForm");
  const contactUsBtn = document.getElementById("contactUsBtn");
  const enquiryForm = document.getElementById("enquiryForm");
  const lightboxOverlay = document.getElementById("lightbox-overlay");
  const lightboxImage = document.querySelector(".lightbox-image");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxLinks = document.querySelectorAll(".lightbox");
  const interestedButtons = document.querySelectorAll(".interested-btn");

  // Show popup
  function showPopup() {
    contactOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  // Hide popup
  function hidePopup() {
    contactOverlay.classList.remove("show");
    document.body.style.overflow = "auto";
  }

  // Event Listeners
  if (contactUsBtn) {
    contactUsBtn.addEventListener("click", function (e) {
      e.preventDefault();
      showPopup();
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", hidePopup);
  }

  if (contactOverlay) {
    contactOverlay.addEventListener("click", function (e) {
      if (e.target === contactOverlay) {
        hidePopup();
      }
    });
  }

  // Interested buttons trigger popup
  interestedButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      showPopup();
    });
  });

  // Form submission function
  function handleFormSubmission(form, getFieldName) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(form);
      const timestamp = "'" + new Date().toLocaleString();

      const name = formData.get(getFieldName("Name"))?.trim();
      const email = formData.get(getFieldName("Email"))?.trim();
      const phone = formData.get(getFieldName("Phone number"))?.trim();
      const message = formData.get(getFieldName("Message"))?.trim();

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const phonePattern = /^[6-9]\d{9}$/;

      if (!name || !email || !phone || !message) {
        alert("Please fill all the fields.");
        return;
      }

      if (!emailPattern.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (!phonePattern.test(phone)) {
        alert("Please enter a valid 10-digit phone number.");
        return;
      }

      const data = {
        data: {
          Name: name,
          "Phone number": phone,
          Email: email,
          Message: message,
          Timestamp: timestamp,
        },
      };

      fetch("https://sheetdb.io/api/v1/g2b68ikbx5ybs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Thank you! Your response has been submitted.");
            form.reset();
            if (form === contactForm) hidePopup();
          } else {
            alert("Something went wrong. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error submitting form:", error);
          alert("Error submitting form. Please try again later.");
        });
    });
  }

  if (contactForm) {
    handleFormSubmission(contactForm, (name) => `data[${name}]`);
  }

  if (enquiryForm) {
    handleFormSubmission(enquiryForm, (name) => name);
  }

  // Lightbox functionality
  lightboxLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      lightboxImage.src = this.getAttribute("href");
      lightboxOverlay.style.display = "flex";
    });
  });

  lightboxClose?.addEventListener("click", function () {
    lightboxOverlay.style.display = "none";
  });

  lightboxOverlay?.addEventListener("click", function (e) {
    if (e.target === lightboxOverlay) {
      lightboxOverlay.style.display = "none";
    }
  });
});
