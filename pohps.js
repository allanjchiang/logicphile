// POHPS page — reveal-on-scroll animation + store QR code.
// The QR code is rendered entirely client-side (qrcodejs draws it locally,
// no data is sent to a third-party API); it encodes the same public store
// URL as the link wrapped around it.
(function () {
  "use strict";

  if (typeof QRCode === "undefined") return;

  document.querySelectorAll(".ph-qrcode").forEach(function (qrTarget) {
    var link = qrTarget.closest("a");
    if (!link) return;
    var size = qrTarget.clientWidth || 140;
    new QRCode(qrTarget, {
      text: link.href,
      width: size,
      height: size,
      colorDark: "#2f3a22",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  });
})();

(function () {
  "use strict";

  var targets = document.querySelectorAll(".ph-reveal");

  if (!("IntersectionObserver" in window)) {
    targets.forEach(function (el) {
      el.classList.add("ph-is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("ph-is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
