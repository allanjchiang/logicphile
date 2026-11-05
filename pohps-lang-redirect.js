// POHPS — send visitors whose browser is set to Chinese to the Traditional
// Chinese version of this page. Load synchronously in <head> of an English
// page, with the Chinese page in data-zh-hant:
//   <script src="pohps-lang-redirect.js" data-zh-hant="pohps-zh-hant.html"></script>
//
// Opening the English page with ?lang=en (the language switch does this)
// keeps the visitor on English for the rest of the browser session.
// Simplified Chinese browsers are redirected too, as Traditional Chinese is
// the only Chinese version of these pages.
(function () {
  "use strict";

  var script = document.currentScript;
  var target = script && script.getAttribute("data-zh-hant");
  if (!target) return;

  var storageKey = "logicphile-pohps-lang";
  var params = new URLSearchParams(location.search);

  if (params.get("lang") === "en") {
    try {
      sessionStorage.setItem(storageKey, "en");
    } catch (e) {}
    if (history.replaceState) {
      params.delete("lang");
      var query = params.toString();
      history.replaceState(
        null,
        "",
        location.pathname + (query ? "?" + query : "") + location.hash
      );
    }
    return;
  }

  try {
    if (sessionStorage.getItem(storageKey) === "en") return;
  } catch (e) {}

  var lang = (navigator.language || navigator.userLanguage || "").toLowerCase();
  if (lang === "zh" || lang.indexOf("zh-") === 0) {
    location.replace(target + location.search + location.hash);
  }
})();
