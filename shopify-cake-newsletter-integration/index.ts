var CKMLib: any;
(() => {
  onElementAdded(function () {
    var formEl = document.querySelector(".klaviyo-form");
    if (formEl && !formEl.getAttribute("data-lolatracking")) {
      formEl.setAttribute("data-lolatracking", "1");
      formEl.addEventListener("submit", function (e) {
        console.log("NL tracked");
        trackEvent();
      });
      var submitBtn = formEl.querySelector("button");
      if (submitBtn) {
        submitBtn.addEventListener("click", function (e) {
          console.log("NL tracked");
          trackEvent();
        });
      }
    }
  });

  function onElementAdded(callback: () => void) {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach(() => {
          callback();
        });
      });
    });

    // Observe the document for changes
    observer.observe(document.documentElement, { childList: true, subtree: true });
  }

  function trackEvent() {
    const scriptEl = document.querySelector("#lolaleads-nls-tracking");

    if (scriptEl) {
      const data = {
        domain: scriptEl.getAttribute("data-domain"),
        offer_id: scriptEl.getAttribute("data-offer-id"),
        event_id: scriptEl.getAttribute("data-event-id"),
      };
      console.log("int-data", data);
      return;
    }

    window._ckm = window._ckm || [];
    window._ckm.push(function cfgev() {
      CKMLib.configureEvents({
        domain: "https://savarois.com",
        offer_id: 21024,
        event_id: 1242,
      });
      CKMLib.fireEvent();
    });

    if (typeof CKMLib !== "string") {
      CKMLib = "loading";
      const pix: HTMLScriptElement = document.createElement("script");
      pix.type = "text/javascript";
      pix.async = true;
      pix.src = "//cakecdn.com/jssdk/lib.js";
      const s: HTMLScriptElement = document.getElementsByTagName("script")[0];
      s.parentNode?.insertBefore(pix, s);
    }
  }
})();
