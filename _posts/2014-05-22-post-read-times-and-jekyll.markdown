---
layout: post
active: "blog"
title:  "Post Read Times and Jekyll"
date:   2014-05-22 09:41:00
category: [Programming]
tags: [Jekyll, Plug-in, GitHub Pages, JavaScript, Reading Times]
description: "Jekyll has been good to me, but I've fallen in Love with Medium's \"x min read\" metric and wanted it for my own site."
image: "post-read-times-and-jekyll.png"
---

It's safe to say that the folks at [Medium](https://medium.com) have done a superb job designing their platform and many people across the Internet are looking to borrow bits and pieces of their look. Aside from the Parallax-esque effect on their hero image, the other small detail that caught my attention was their reading length estimates on every article. In the future it could make way for a feature where you put in how much time you have and they'll curate a single article or a list of articles worth reading in that timeframe.

Thinking about the implementation, it didn't seem terribly difficult to get a rough estimation based on the number of words in a post and the average number of words per minute a person can read.

The solution I came up with runs on an entire page when called. It looks for elements where `class="post"`. It then looks for an element inside of that one where `class="post-content"`. After computing a reading estimation on the content it then looks for an element inside the post element where `class="post-length"`. I purposely set it up this way so that I could execute the same script on both my blog's [index pages](../../blog/index.html) and any [individual pages](../../blog/post-read-times-and-jekyll/).

###Example HTML:###
{% highlight html linenos %}
<div class="post">
    <h3>Post's Title</h3>
    <div class="post-length">
        By YOUR-NAME-HERE
    </div>
    <div class="post-content">
        Write your blog post here...
    </div>
</div>
{% endhighlight %}

I chose not to execute this function until after the page has loaded because I wanted the page to load faster rather than display the reading time sooner, so as a placeholder I just author the article to myself in the `post-length` section. This also works well as a fallback if the user has opted to disable JavaScript.

**footer.html**
{% highlight html linenos %}
{% raw %}
{% if page.active == 'blog' %}
    <script src="/js/reading-time.js"></script>
{% endif %}
{% endraw %}
{% endhighlight %}

Because I use Jekyll I setup a variable that I could set for anything that is a blog post or a series of blog posts (I didn't want this function attempting to execute on every page). If you'd like understand how it's setup check out the [source code](https://github.com/michaeljdeeb/michaeljdeeb.github.io) for this site.

**reading-time.js**
{% highlight javascript linenos %}
function writeReadingTime() {
    var wordsPerMinute = 180;

    var posts = document.getElementsByClassName('post');
    for(var i = 0; i < posts.length; i++) {
        var postContent = posts[i].getElementsByClassName('post-content')[0].innerHTML;

        // Remove HTML tags from post to an appropriate reading time
        var noHTML = postContent.replace(/(<([^>]+)>)/ig,"");
        var numberOfWords = noHTML.split(" ").length;
        var timeInMinutes = numberOfWords / wordsPerMinute;
        timeInMinutes = Math.ceil(timeInMinutes);

        if(timeInMinutes == 1)
            posts[i].getElementsByClassName('post-length')[0].innerHTML = '<i class="fa fa-clock-o"></i> 1 minute in length';
        else
            posts[i].getElementsByClassName('post-length')[0].innerHTML = '<i class="fa fa-clock-o"></i> ' + timeInMinutes + ' minutes in length';
    }
}
{% endhighlight %}

For this page's icon set I went with [Font Awesome](http://fortawesome.github.io/Font-Awesome/). If you're using something different just correct lines 15 and 17 in the above function to what you need them to be.

####Criticisms####
If I were to improve upon this initial implementation I would refine the estimation algorithm. Using jQuery it looks like I could efficiently remove the `<code>` snippets so that they weren't factoring into the reading time as someone will take longer reading through code snippets. Also, I'd probably abandon JavaScript all together for this and find a way to write it up with [Liquid](http://docs.shopify.com/themes/liquid-basics) so that it wouldn't have to be computed by the user's device.

Hopefully this article took you exactly 4 minutes to read.
