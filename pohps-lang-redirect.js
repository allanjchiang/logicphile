// POHPS — send visitors whose browser is set to Chinese to the Chinese
// version of this page. Load synchronously in <head> of an English page:
//   <script src="pohps-lang-redirect.js"
//           data-zh-hant="pohps-zh-hant.html"
//           data-zh-hans="pohps-zh-hans.html"></script>
//
// Simplified Chinese browsers (zh-CN, zh-SG, zh-MY, zh-Hans, plain zh) go to
// data-zh-hans; all other Chinese browsers go to data-zh-hant. A page with
// no data-zh-hans sends every Chinese browser to data-zh-hant.
//
// Opening the English page with ?lang=en (the language switch does this)
// keeps the visitor on English for the rest of the browser session.
(function () {
  "use strict";

  var script = document.currentScript;
  if (!script) return;
  var hant = script.getAttribute("data-zh-hant");
  var hans = script.getAttribute("data-zh-hans");

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
  if (lang !== "zh" && lang.indexOf("zh-") !== 0) return;

  var isHans =
    lang === "zh" ||
    /^zh-(hans|cn|sg|my)(-|$)/.test(lang);
  var target = isHans && hans ? hans : hant;

  if (target) {
    location.replace(target + location.search + location.hash);
  }
})();
