# Integration

<script>
    (()=>{
      function onElementAdded(callback) {
          const observer = new MutationObserver(mutations => {
              mutations.forEach(mutation => {
                  mutation.addedNodes.forEach(node => {
                    callback(node);
                  });
              });
          });
      
          // Observe the document for changes
          observer.observe(document.documentElement, { childList: true, subtree: true });
      }

      onElementAdded(function(element) {
          var formEl = document.querySelector('.klaviyo-form');
          if(formEl && !formEl.getAttribute('data-lolatracking')){
            formEl.setAttribute('data-lolatracking','1');
            formEl.addEventListener('submit', function(e) { 
                console.log('NL tracked');
                trackEvent();
            });
            var submitBtn = formEl.querySelector('button');
            submitBtn.addEventListener('click', function(e) {
                console.log('NL tracked');
                trackEvent();
            });
          }
      });

      function trackEvent(){
        (_ckm = window._ckm || []).push(function cfgev() {
            CKMLib.configureEvents({
                domain: 'https://savarois.com',
                offer_id: 21024,
                event_id: 1242,
            });
            CKMLib.fireEvent();
        });
        if (typeof CKMLib != 'string') {
            CKMLib = 'loading';
            var pix = document.createElement('script');
            pix.type = 'text/javascript';
            pix.async = true;
            pix.src = '//cakecdn.com/jssdk/lib.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(pix, s);
        }
      }
    })();
  </script>
