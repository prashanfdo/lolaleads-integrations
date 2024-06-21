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
    thank_msg: scriptEl.getAttribute("data-thank-msg")?.split("|") || undefined,
  };

  if (!data.domain || !data.offer_id || !data.event_id || !data.thank_msg) {
    console.error("lolaleads - missing config");
    return;
  }

  onElementAdded(checkForNewsLetterThankyouMessage);
  setTimeout(() => {
    checkForNewsLetterThankyouMessage();
  }, 4000);

  function checkForNewsLetterThankyouMessage() {
    if (scriptEl?.getAttribute("data-lolaleads-tracked") === "1") {
      return;
    }
    [".newsletter-form", ".klaviyo-form"].forEach((nodeSelector) => {
      var formEl = document.querySelector(nodeSelector);

      const text = formEl?.textContent;

      if (
        data.thank_msg
          ?.filter((m) => !!m)
          .some((msg) => text?.toLowerCase().includes(msg.toLowerCase()))
      ) {
        scriptEl?.setAttribute("data-lolaleads-tracked", "1");
        console.log("lolaleads-nls - pre");
        trackView();
        console.log("lolaleads-nls -");
        trackEvent();
        console.log("lolaleads-nls 1");
      }
    });
  }

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

  function trackView() {
    const cookieDomain = "privacyprotectsend.com";
    var c = {
      name: "cp",
      args: {
        sess_timeout: "",
        gclid_param: "gclid",
        gclid_chk_ref: 0,
        bingkw_param: "ckm_kw",
        sc_param: "ckmsc",
        bingkw_chk_ref: 0,
        attr_param: "ckmscn",
        attr_chk_ref: 0,
        sess_param: "",
        sess_chk_ref: 0,
        crtv_id: null,
        crtv_param: "ckmc",
        crtv_chk_ref: 0,
        tpcrid_param: "ckmcrn",
        cookie_dom: cookieDomain,
        ref_type: 1,
        ckm_sess_param: null,
        sl_param: "s1",
        s2_param: "s2",
        s3_param: "s3",
        s4_param: "s4",
        s5_param: "s5",
        sub_chk_ref: 0,
      },
    };

    var params = new URLSearchParams(window.location.search);

    var thirdPartyID = params.get("ckmscn");
    var creativeID = params.get("ckmc");
    var activeTracking = params.get("ckmat");
    if (thirdPartyID || creativeID || activeTracking)
      if (typeof CKMLib == "object") CKMLib.run(c);
      else {
        window._ckm = window._ckm || [];
        window._ckm.push(c);
      }
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
