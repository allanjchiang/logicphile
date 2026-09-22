// Big Workout Tracker page — reveal-on-scroll animation.
// Adds "bwt-is-visible" to each ".bwt-reveal" element the first time it
// scrolls into view; bigworkouttracker.css handles the actual transition.
(function () {
  "use strict";

  var targets = document.querySelectorAll(".bwt-reveal");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("bwt-is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("bwt-is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
