var CKMLib: any;
(() => {
  onElementAdded(function () {
    var formEl = document.querySelector(".klaviyo-form");
    const text = formEl?.textContent;

    if (text?.toLowerCase().includes("thank")) {
      console.log("NL tracked");
      trackEvent();
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

    if (!scriptEl) {
      console.error("lolaleads - missing config");
      return;
    }

    const data = {
      domain: scriptEl.getAttribute("data-domain"),
      offer_id: scriptEl.getAttribute("data-offer-id"),
      event_id: scriptEl.getAttribute("data-event-id"),
    };

    if (!data.domain || !data.offer_id || !data.event_id) {
      console.error("lolaleads - missing config");
      return;
    }

    window._ckm = window._ckm || [];
    window._ckm.push(function cfgev() {
      CKMLib.configureEvents({
        domain: data.domain,
        offer_id: parseInt(data.offer_id || "", 10),
        event_id: parseInt(data.event_id || "", 10),
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
