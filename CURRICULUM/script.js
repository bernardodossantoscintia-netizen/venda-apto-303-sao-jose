/* Currículo — interações do modelo */

(function () {
  "use strict";

  if (typeof lucide !== "undefined" && typeof lucide.createIcons === "function") {
    lucide.createIcons();
  }

  const photo = document.getElementById("profile-photo");
  const monogram = document.getElementById("monogram");

  function showPhoto() {
    if (!photo) return;
    photo.hidden = false;
    photo.classList.add("is-loaded");
    if (monogram) monogram.classList.add("is-hidden");
  }

  function keepMonogram() {
    if (!photo) return;
    photo.hidden = true;
    photo.classList.remove("is-loaded");
    if (monogram) monogram.classList.remove("is-hidden");
  }

  if (photo) {
    photo.addEventListener("load", showPhoto);
    photo.addEventListener("error", keepMonogram);
    if (photo.complete) {
      if (photo.naturalWidth > 0) showPhoto();
      else keepMonogram();
    }
  }

  const skillItems = document.querySelectorAll(".skill-item");

  if ("IntersectionObserver" in window) {
    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          skillObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.35 }
    );
    skillItems.forEach((el) => skillObserver.observe(el));
  } else {
    skillItems.forEach((el) => el.classList.add("is-visible"));
  }
})();
