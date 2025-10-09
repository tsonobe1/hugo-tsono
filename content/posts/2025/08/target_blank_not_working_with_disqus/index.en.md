---
title: "Links with target='_blank' not opening"
author: ["tsonobe"]
description: "On this blog, I use `target=\"_blank\"` for external links to open them in a new tab by default. However, when I published an article to the production environment and viewed it, I encountered a phenomenon where external links would not open correctly."
date: 2025-08-24T00:00:00+09:00
lastmod: 2025-09-15T20:22:49+09:00
tags: ["Disqus", "target_blank", "noopener", "noreferrer", "Affiliate Link", "External Link", "Chrome", "Safari", "Hugo"]
categories: ["Troubleshooting"]
draft: false
mermaid: false
---

## Conclusion {#conclusion}

-   Uncheck ****Affiliate link**** in Disqus.
-   It is not necessary to add **noreferrer** or **noopener** attributes to `<a>` tags to open external links in a new tab.


## Background: Links with target="_blank" not opening {#background-links-with-target-blank-not-opening}

On this blog, I use `target="_blank"` for external links to open them in a new tab by default.

However, when I published an article to the production environment and viewed it, I encountered a phenomenon where external links would not open correctly. Specifically, in Google Chrome, the address bar displays `about:blank`, and a blank page opens in a new tab. In Safari, the URL of the original page is displayed in the address bar, and a blank page opens in a new tab.

What's even stranger is that this behavior is not consistent. For example, sometimes the link opens correctly the first time, but subsequent attempts result in a blank tab. Other times, a blank tab opens from the very first click.

Furthermore, if I right-click and select "Open in new tab" or Command + click, it opens normally.

In summary 👇️

-   Clicking a `target="_blank"` link opens a blank page.
-   The value in the new tab's address bar differs between browsers.
-   The timing of when the blank tab opens is inconsistent.
-   `Open in new tab` works fine.

What is this... I want to know the cause...


## Cause {#cause}

While investigating the JavaScript that captures click events, I found that a script from Disqus was involved. Disqus is a service that allows you to add comments to websites and blogs. It seems to have gained popularity from its launch around 2007 to around 2013. Since then, articles about "installing Disqus" are still seen, and I also installed it on this blog, which is built with Hugo. That was in early August 2024.

Disqus has an ****Affiliate Links**** feature that automatically replaces external links with affiliate links. It seems they generate revenue from this.

{{< linkcard "https://tuhrig.de/the-disqus-affiliated-links-program/?utm_source=chatgpt.com" >}}
This is enabled by default when you create a new site on Disqus.

When this is enabled, it captures clicks on links within the article with a script and redirects to the affiliate link destination. By disabling this feature, the script is no longer loaded, and external links can now be opened in a new tab normally.

I suspect that the process of redirecting to a link fetched asynchronously after opening a new tab was failing for some reason.

I also considered the story that changing the new tab's location to the affiliate link with `opener` was failing because of the `noopener` attribute, but that would be a fatal bug that would prevent all `target="_blank"` links from opening, and I don't think `location` is the way to change the URL of a new tab from the original tab anyway...

Hmm, I don't really get it.


## Solution {#solution}

-   For now, disable the affiliate link setting in Disqus.

    1.  Go to `https://<your_disqus_site>.disqus.com/admin/settings/advanced/`
    2.  Uncheck `affiliate links`

    {{< figure src="/結論/2025-09-14_20-06-36_スクリーンショット 2025-09-14 20.06.30.png" title="Disable Disqus Affiliate Links" width="720" >}}


### Addendum 2025-09-14 {#addendum-2025-09-14}

Checking the behavior now,

-   With the affiliate link feature enabled
-   And a `target="_blank"` link

I was able to navigate without any problems.

Test page:

{{< linkcard "https://tsonobe1.github.io/gisqus_link_test/" >}}
At the time of writing, the behavior was definitely as described at the beginning of the article...


## What attributes should `<a>` tags have to open in a new tab? {#what-attributes-should-a-tags-have-to-open-in-a-new-tab}

I took this as a good opportunity to look into it again.

-   `noreferrer`
    -   Omits the `HTTP Referer` header when navigating from page A to page B.
-   `noopener`
    -   Sets `window.opener` to `null` when navigating from page A to page B.
    -   The `HTTP Referer` header is still sent.
-   Setting `noreferrer` automatically adds the `noopener` setting.
-   You can change the tab of page A to any page C by rewriting it like `window.opener.location = "<URL>"`.
    -   An attack using this specification is called [Tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing?utm_source=chatgpt.com).
-   Modern browsers implicitly add `noopener`-equivalent behavior to `target="_blank"` tags.
    -   {{< linkcard "https://www.stefanjudis.com/today-i-learned/target-blank-implies-rel-noopener/?utm_source=chatgpt.com" >}}
    -   This means `window.opener` will be null.
-   `noreferrer` completely prevents the referrer from being passed, which can interfere with access analysis.
    -   {{< linkcard "https://cinci.jp/blog/20240723-review-target-blank-noopener-noreferrer-practices" >}}
-   The amount of Referer information to include is set with `Referrer-Policy`.
    -   The default is `strict-origin-when-cross-origin`.


### Therefore {#therefore}

-   For a simple technical blog, for external links:
    -   The `noreferrer` attribute is not necessary.
    -   The `noopener` attribute does not need to be explicitly stated.

I found out.


## Summary {#summary}

-   It seems better to keep the affiliate link feature disabled.
-   It is not necessary to add `noreferrer` and `noopener` attributes to `<a>` tags that you want to open in a new tab.

The detailed mechanism of the script embedded by Disqus and the reason why the link opens correctly the first time but results in a blank tab on subsequent attempts are still unclear, but I'm glad to know that `noreferrer` is no longer necessary.

Actually, ads have started appearing in the Disqus comment section, so I'm thinking of removing it...
