import{r as n}from"./index-CiR1mdvT.js";const i=()=>(n.useEffect(()=>{{const t=document.createElement("script");t.async=!0,t.src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID",document.head.appendChild(t);const e=document.createElement("script");e.innerHTML=`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        
        gtag('config', 'GA_MEASUREMENT_ID', {
          page_title: document.title,
          page_location: window.location.href,
          anonymize_ip: true,
          cookie_flags: 'secure;samesite=strict'
        });

        // Enhanced e-commerce tracking for subscription events
        gtag('config', 'GA_MEASUREMENT_ID', {
          custom_map: {
            custom_parameter_1: 'subscription_plan',
            custom_parameter_2: 'transaction_type'
          }
        });
      `,document.head.appendChild(e),window.gtag=(...a)=>{window.dataLayer=window.dataLayer||[],window.dataLayer.push(a)},window.gtag("event","page_view",{page_title:document.title,page_location:window.location.href,send_to:"GA_MEASUREMENT_ID"})}},[]),null),c=(t,e)=>{window.gtag&&window.gtag("event","purchase",{transaction_id:`sub_${Date.now()}`,value:e,currency:"USD",items:[{item_id:t.toLowerCase(),item_name:`${t} Subscription`,item_category:"subscription",price:e,quantity:1}]})},r=(t,e,a)=>{window.gtag&&window.gtag("event","crypto_transaction",{custom_parameter_1:t,custom_parameter_2:"flash_transaction",value:e,currency:t,method:a})};export{i as default,c as trackSubscription,r as trackTransaction};
