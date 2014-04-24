---
layout: post
active: "blog"
title:  "Excluding Yourself from Google Analytics"
date:   2014-04-24 09:41:00
categories: [Analytics]
tags: [Google, Google Analytics, Javascript]
description: "Website analytics are exciting until you realize you're most of your site's visitors."
image: "excluding-self-from-google-analytics.png"
---

Although it may feel like an invasion of privacy from the consumer side, analytics are really fun and exciting to see when you're the webmaster. However, nothing is more depressing than getting excited at a jump in your visitor count only to remember you were the visitor(s).

I tried avoiding my production site altogether because I can spin up a local copy with ease, but as I push things to GitHub I get nervous that they aren't taking affect or are causing the site to break ("It worked on my machine"), requiring me to still occasionally visit my site. I finally decided to take the time to solve this problem and hopefully this post is of some help to you.

####Possible Exclusion Methods####
- Opt-out Browser Add-on
- Exclude via ISP/IP
- Opt-out via cookies

*&#42;As a note, use universal analytics (analytics.js) (asynchronous). Method three in the list above will be specific to that.*

###Opt-out Browser Add-on###
Google has created the [Google Analytics Opt-out Browser Add-on](https://tools.google.com/dlpage/gaoptout) to do just what the name says. This is the easiest and quickest way to start blocking your views and the add-on is available for all modern desktop browsers, not just Chrome.

That said, I had two caveats with this method. The biggest issue with the add-on is that I wanted to be able to do native mobile device testing and add-ons like this aren't available for mobile (at least on iOS). Also, the add-on will exclude you from **all** Google Analytics and since I use analytics on my website I don't think it's fair to opt-out of other people's.

###Exclude via ISP/IP###
Log in to Google Analytics and click on the "Admin" tab. Select your account from the dropdown and then click "All Filters". Make sure "Exclude" is selected from the dropdown and then decide how you'd like to filter (On a Mac, you can type `cat /etc/resolv.conf` into Terminal to see your ISP domain).

This method wasn't ideal for me either because I wanted to be able to work on the site from anywhere and not have to think about where I can and can't view my production website without skewing analytical data. Also, like most people, I don't have a static public IP address so I would have to switch the numbers out regularly or use my ISP's domain which might filter out visits from my neighbors (could be a big deal if you're in a well populated area).

###Opt-out via cookies###
I settled for creating a cookie to opt-out of tracking because they work on desktops and mobile devices and won't require much maintenance long-term. Google has great documentation on how to implement this on their [advanced configurations for Google Analytics](https://developers.google.com/analytics/devguides/collection/analyticsjs/advanced#optout) webpage.

Since my site is relatively static (not passing multiple arguments via URL) I used some pretty basic Javascript to detect if the argument was passed and create a cookie to opt-out if that's the case.

{% highlight javascript linenos %}

    // Place me in a <script> tag above your Google Analytics tracking code
    if (location.search) {
        // Set to the same value as the web property used on the site
        var gaProperty = 'UA-XXXX-Y';

        // Since location.search == true, grab the parameter
        // TODO - Handle URL arguments better if your site utilizes them
        var param = location.search.split("param=")[1];

        // Verify the url is like http://example.com?param=true
        // and then create the opt-out cookie
        var disableStr = 'ga-disable-' + gaProperty;
        if (customurl) {
            document.cookie = disableStr + "=true; expires=Thu, 31 Dec 2099 23:59:59 UTC; path=/";
            window[disableStr] = true
        }
    }

    // Disable tracking if the opt-out cookie exists
    if (document.cookie.indexOf(disableStr + "=true") > -1) {
        window[disableStr] = true
    }

{% endhighlight %}

By changing `UA-XXXX-Y` to your Google Analytics ID and then placing the code above before any Google Analytics tracking code in your site will allow you to hit any page containing the code and append `?param=true` to the URL to create an opt-out cookie which will not count your current visit or any future visits.

####Important Things to Note####
- A cookie will need to be created per browser
- A new cookie will need to be created per device
- A new cookie will need to be created if you clear your cookies
- YMMV when using a browser's private mode

If you're using the classic version of Google Analytics (ga.js), you might have some luck implementing something similar by looking at this [Google Groups topic](https://productforums.google.com/d/topic/analytics/NTHhcXNvE3A/discussion).

Good luck and thanks for the page view(s)!
