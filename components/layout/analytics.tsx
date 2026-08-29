"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { env } from "@/lib/env";
import { getConsent, persistUtm, track } from "@/lib/analytics";

/**
 * Muat skrip pihak ketiga — PRD §10.4, §14, §15.
 * - Strategi `afterInteractive` (PRD §12).
 * - Hanya setelah consent "granted" (PRD §15).
 * - Tidak me-render apa pun bila tidak ada ID (dev/lokal).
 */
export function Analytics() {
  const pathname = usePathname();
  const [granted, setGranted] = React.useState(false);

  React.useEffect(() => {
    setGranted(getConsent() === "granted");
    const onChange = (e: Event) => setGranted((e as CustomEvent).detail === "granted");
    window.addEventListener("luhas-consent-change", onChange);
    return () => window.removeEventListener("luhas-consent-change", onChange);
  }, []);

  // PRD §14: UTM disimpan dari kunjungan pertama, dibawa ke pesan WA.
  React.useEffect(() => {
    persistUtm(window.location.search);
  }, [pathname]);

  // PRD §14: scroll_depth 25/50/75/100
  React.useEffect(() => {
    const seen = new Set<number>();
    const onScroll = () => {
      const el = document.documentElement;
      const pct = ((el.scrollTop + window.innerHeight) / el.scrollHeight) * 100;
      for (const step of [25, 50, 75, 100] as const) {
        if (pct >= step && !seen.has(step)) {
          seen.add(step);
          track({ name: "scroll_depth", params: { page: pathname, percent: step } });
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  if (!granted) return null;

  return (
    <>
      {env.gtmId && (
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});
          var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
          j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${env.gtmId}');
        `}</Script>
      )}

      {env.ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${env.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = gtag;
            gtag('js', new Date());
            gtag('config', '${env.ga4Id}');
          `}</Script>
        </>
      )}

      {env.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
          document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${env.metaPixelId}'); fbq('track', 'PageView');
        `}</Script>
      )}

      {env.tiktokPixelId && (
        <Script id="tiktok-pixel" strategy="afterInteractive">{`
          !function (w, d, t) { w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
          ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];
          ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
          for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
          ttq.load=function(e){var n="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=n;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=ttq._o[e]||{};var o=d.createElement("script");o.type="text/javascript";o.async=!0;o.src=n+"?sdkid="+e+"&lib="+t;var a=d.getElementsByTagName("script")[0];a.parentNode.insertBefore(o,a)};
          ttq.load('${env.tiktokPixelId}'); ttq.page();
          }(window, document, 'ttq');
        `}</Script>
      )}
    </>
  );
}
