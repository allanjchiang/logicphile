// Big Workout Tracker page — reveal-on-scroll animation + store QR codes.
// The QR codes are rendered entirely client-side (qrcodejs draws them locally,
// no data is sent to a third-party API); each one encodes the same public
// store URL as the link wrapped around it (App Store or Google Play).
(function () {
  "use strict";

  if (typeof QRCode === "undefined") return;

  document.querySelectorAll(".bwt-qrcode").forEach(function (qrTarget) {
    var storeUrl = qrTarget.closest("a") ? qrTarget.closest("a").href : "";
    if (storeUrl) {
      new QRCode(qrTarget, {
        text: storeUrl,
        width: 128,
        height: 128,
        colorDark: "#063970",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    }
  });
})();

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
