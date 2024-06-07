# Integration with Shopify Klavio form

## Steps

1. Goto Shopify store admin `ex: https://admin.shopify.com/store/9a0f16-1b`

2. Goto menu `Online Store > Themes` in Sales Channel Category
3. Click the three dotted menu located to `customize` button
4. Select `edit code`
5. in the `layout > theme.liquid` find the `<body>` tag
6. Below the `body` tag paste below tag

```
<script id="lolaleads-nls-tracking" src="https://lolaleads-integrations.vercel.app/shopify-cake-newsletter-integration/index.js" defer="defer" data-domain="[[DOMAIN]]" data-offer-id="[[OFFER_ID]]" data-event-id="[[EVENT_ID]]" data-thank-msg="thanks for signing up"/>
```

7. Replace `[[DOMAIN]]`, `[[OFFER_ID]]` and `[[EVENT_ID]]` with appropriate values in pasted code.
8. `data-thank-msg="thanks for signing up"` change this thank you message with store's news letter subscriptiion thank you message.
