// Big Workout Tracker page — reveal-on-scroll animation + Play Store QR code.
// The QR code is rendered entirely client-side (qrcodejs draws it locally,
// no data is sent to a third-party API); it just encodes the same public
// Play Store URL as the badge link next to it.
(function () {
  "use strict";

  var qrTarget = document.getElementById("bwt-qrcode");
  if (qrTarget && typeof QRCode !== "undefined") {
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
  }
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
