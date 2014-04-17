---
layout: post
active: "blog"
title:  "Using a Custom Domain with GitHub Pages"
date:   2014-04-17 09:41:00
categories: [GitHub Pages]
tags: [GitHub Pages, A, CNAME, DNS, Domain, Domain Name, Forwarding, Hover]
description: "How to use a custom domain name with a GitHub Pages site."
image: "using-a-custom-domain-with-github-pages.png"
---

As you may have noticed, as of last week this site uses a custom domain, but the content is being stored by [GitHub](https://github.com). I seem to be playing around with my domains and where they point to a lot and I also always forget how to configure my domain when I actually need to change it. This post is for both you and my future self.

####Resources You've Probably Already Found####
- [Setting up a custom domain with Pages | GitHub Help](https://help.github.com/articles/setting-up-a-custom-domain-with-pages)
- [My custom domain isn't working | GitHub Help](https://help.github.com/articles/my-custom-domain-isn-t-working)

This post is going to demonstrate how I got [michaeljdeeb.com](http://michaeljdeeb.com) and [www.michaeljdeeb.com](http://www.michaeljdeeb.com) to point to my *personal* GitHub Pages site and also the required settings to forward [michaeldeeb.com](http://michaeldeeb.com) to my new site as well.

###On the GitHub Pages Side###
You're going to want to create a file named `CNAME` at the root of the project and inside that file you're going to put your bare domain. In my case it was `michaeljdeeb.com` **not** `http://michaeljdeeb.com`

###On the Domain Side###
*As a personal sidenote, I use [Hover (referral link)](https://hover.com/rhek74MF) for my domains.*

**Relevant for Hover users:** [How to: Edit DNS records - A, CNAME, MX, TXT, and SRV : Hover Help Center](https://help.hover.com/entries/21204757-How-to-Edit-DNS-records-A-CNAME-MX-TXT-and-SRV)
####michaeljdeeb.com (@)####
First, delete any A, AAAA, or CNAME records that use `@` for the hostname. Then, create two A records. The hostname for both of them is `@` which refers to your top-level (apex) domain. The values at the time of writing are `192.30.252.153` and `192.30.252.154`, but I'd check the "[My custom domain isn't working | GitHub Help](https://help.github.com/articles/my-custom-domain-isn-t-working)" page to verify that the IP addresses haven't changed.

####www.michaeljdeeb.com (www)####
Next, I created a CNAME record with the hostname `www` and `michaeljdeeb.github.io` for the value.

####&#42;.michaeljdeeb.com (&#42;)####
Another issue I ran into is that subdomains (which I no longer utilize) were directing users to a page served up by Hover. To solve this issue I deleted out any previous records with the hostname `*` and created a new CNAME record with the hostname `*` and `michaeljdeeb.github.io` as the value.

This brings users to a [GitHub Pages 404.html](https://pages.github.com/404.html), not my [404.html](../../404.html) page. I believe without being able to utilize a .htaccess file there's nothing I can do about this, but if you know otherwise, [please let me know](../../contact.html).

####michaeldeeb.com (Forwarding)####
This might be a little Hover specific, but after navigating to the management of [michaeldeeb.com](http://michaeldeeb.com), I clicked "Edit" in the "Forward This Domain" row. I put `http://michaeljdeeb.com` in the text field and chose not to enable stealth redirection.

This means the URL will change in the browser's address bar. Now [michaeldeeb.com](http://michaeldeeb.com) and [www.michaeldeeb.com](http://michaeldeeb.com) forward to my new domain and any navigation tacked onto the end of the URL will be passed through. For example, [http://michaeldeeb.com/blog](http://michaeldeeb.com/blog) forwards to my new blog and not just [http://michaeljdeeb.com](http://michaeldeeb.com).

###On Your Side###
After I had configured everything correctly, pages were being routed correctly after about ten minutes. It can take up to a full day for things to go into effect though, so don't lose hope and be sure to empty your browser cache.

<!-- Place this tag where you want the widget to render. -->
<div class="text-center"><div class="g-post" data-href="https://plus.google.com/117636037814189714964/posts/JaVCgjxcpig"></div></div>
