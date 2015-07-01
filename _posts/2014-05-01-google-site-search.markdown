---
layout: post
active: "blog"
title:  "Implementing a Search Bar without PHP"
date:   2014-05-01 09:41:00
category: [Programming]
tags: [Jekyll, Search, PHP, Google]
description: "Search is important, but how do you accomplish it without any server-side scripting?"
image: "google-site-search.png"
---

My current website implementation has been more encouraging to me than any past iteration. However, that being said, this is a blog and what good is a blog without search? Typically this can be overcome in a multitude of ways, but without any dynamic pages (not allowed by GitHub Pages), your options become rather limited.

I chose to rely on one of my favorite Google Search tricks to accomplish this.

###site:michaeljdeeb.com###
Typing `site:michaeljdeeb.com search` into Google will return all pages from my domain that contain the word "search" on them. Using this knowledge you can rig up a `<form>` that will search your website for the keywords a user enters into the search bar.

###HTML:###
{% highlight html linenos %}

    <form class="navbar-form navbar-right" action="https://google.com/search" method="get" role="search">
        <div class="form-group">
            <input type="hidden" name="q" value="site:example.com">
            <input type="search" name="q" class="form-control" placeholder="Search">
        </div>
            <button type="submit" class="btn btn-default hidden-xs"><i class="fa fa-search"></i></button>
    </form>

{% endhighlight %}

Placing the snippet above in your navbar and swapping out `example.com` for your domain will add this Google search functionality to your GitHub Pages site.

###CSS:###

On my site, I utilize a navbar fixed to the top so that when you scroll it scrolls with you. The navbar is also responsive so it looks different on extra-small devices than it does on desktops and tablets. On OS X with Safari 7.0.3 I noticed that when the `<input>` received focus the rest of my links font-weight changed and they got less bold (thinner).

This is a [known issue](https://github.com/twbs/bootstrap/issues/11333) and is caused by "Use LCD font smoothing when available" being checked under System Preferences > General. The following rule fixes this issue without having to tell users to disable LCD font smoothing.

**bootstrap.css**
{% highlight css linenos %}

    .navbar-fixed-top,
    .navbar-fixed-bottom {
      -webkit-font-smoothing: subpixel-antialiased;
    }

{% endhighlight %}

This rule below corrects some oddities that come with having a search bar in a responsive navbar. These include spacing issues between the search bar and the rest of your links and the border around the search bar.

**custom.css**
{% highlight css linenos %}

    .navbar .navbar-form{
        padding: 0 15px;
        border: 0;
        -webkit-box-shadow: none;
        box-shadow: none;
    }

{% endhighlight %}

I don't foresee any major issues with this search solution, but if you do be sure to let me know. The worst I can think is that Google Analytics keywords reports will be skewed.

Happy <i class="fa fa-search"></i>ing!
