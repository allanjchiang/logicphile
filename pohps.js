// POHPS page — reveal-on-scroll animation, store QR code, language switch.
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

// Language switch: slide the pill to the chosen language and fade the page
// out before navigating. Plain links still work if this script never runs.
(function () {
  "use strict";

  // On a Chinese page, drop any earlier "stay on English" choice so later
  // visits to the English pages redirect to Chinese again.
  if (document.documentElement.lang.indexOf("zh") === 0) {
    try {
      sessionStorage.removeItem("logicphile-pohps-lang");
    } catch (e) {}
  }

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.querySelectorAll(".ph-lang-switch").forEach(function (nav) {
    var links = Array.prototype.slice.call(nav.querySelectorAll("a"));

    nav.addEventListener("click", function (event) {
      var link = event.target.closest("a");
      if (!link || link.getAttribute("aria-current") === "page") {
        if (link) event.preventDefault();
        return;
      }
      // Respect new-tab / modifier clicks.
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
        return;
      }
      if (reduceMotion) return;

      event.preventDefault();
      nav.style.setProperty("--ph-lang-pos", String(links.indexOf(link)));
      link.classList.add("ph-lang-target");
      nav.classList.add("ph-switching");
      window.setTimeout(function () {
        document.body.classList.add("ph-leaving");
      }, 240);
      window.setTimeout(function () {
        window.location.href = link.href;
      }, 480);
    });
  });

  // Undo the slide and fade if the page is restored from the back/forward cache.
  window.addEventListener("pageshow", function (event) {
    if (!event.persisted) return;
    document.body.classList.remove("ph-leaving");
    document.querySelectorAll(".ph-lang-switch.ph-switching").forEach(function (nav) {
      var links = Array.prototype.slice.call(nav.querySelectorAll("a"));
      var current = nav.querySelector('a[aria-current="page"]');
      nav.style.setProperty("--ph-lang-pos", String(links.indexOf(current)));
      nav.classList.remove("ph-switching");
      links.forEach(function (a) { a.classList.remove("ph-lang-target"); });
    });
  });
})();
