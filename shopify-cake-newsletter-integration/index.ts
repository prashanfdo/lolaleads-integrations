var CKMLib: any;
(() => {
  const scriptEl = document.querySelector("#lolaleads-nls-tracking");

  if (!scriptEl) {
    console.error("lolaleads - missing config");
    return;
  }

  const data = {
    domain: scriptEl.getAttribute("data-domain"),
    offer_id: scriptEl.getAttribute("data-offer-id"),
    event_id: scriptEl.getAttribute("data-event-id"),
    thank_msg: scriptEl.getAttribute("data-thank-msg") || "",
  };

  if (!data.domain || !data.offer_id || !data.event_id || !data.thank_msg) {
    console.error("lolaleads - missing config");
    return;
  }

  onElementAdded(function () {
    var formEl = document.querySelector(".klaviyo-form");
    if (formEl?.getAttribute("data-lolaleads-tracked") === "1") {
      return;
    }

    const text = formEl?.textContent;

    if (text?.toLowerCase().includes(data.thank_msg.toLowerCase())) {
      formEl?.setAttribute("data-lolaleads-tracked", "1");
      console.log("lolaleads-nls -");
      trackEvent();
      console.log("lolaleads-nls 1");
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
