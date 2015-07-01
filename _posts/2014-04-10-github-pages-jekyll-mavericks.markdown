---
layout: post
active: "blog"
title:  "GitHub Pages, Jekyll, and Mavericks, Oh My!"
date:   2014-04-10 09:41:00
category: [Troubleshooting]
tags: [GitHub Pages, Jekyll, Mavericks, Ruby]
description: "My tutorial on how to get up and running with GitHub Pages and Jekyll under OS X Mavericks."
image: "github-pages-jekyll-mavericks.png"
---

Using Jekyll within GitHub Pages is relatively straight forward, but due to some operating system (OS 10.9.2, Xcode 5.1) issues it became more difficult than necessary.

**At the time of writing, if you are using OS X, do not use the version of ruby that comes with your computer.**

[Issue #2125](https://github.com/jekyll/jekyll/issues/2125) is the problem and although the ARCHFLAGS work around worked to install Jekyll, it didn't work when running `jekyll serve --watch`.

###Install Xcode (Command Line Tools)###
1. Download Xcode from the [Mac App Store](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- Navigate to Xcode > Preferences > Downloads > Command Line Tools and click the download arrow.
(You can also start the installation via Terminal with `xcode-select --install` in Mavericks.)

###Install Brew###
Navigate to [brew.sh](http://brew.sh) for more information or type:
{% highlight bash %}
	ruby -e "$(curl -fsSL https://raw.github.com/Homebrew/homebrew/go/install)"
{% endhighlight %}

###Install RVM & Ruby###
Navigate to [rvm.io](https://rvm.io) for more information or type:
{% highlight bash %}
	\curl -sSL https://get.rvm.io | bash -s stable
{% endhighlight %}

At this point I had to quit Terminal and reopen it to get it to recognize the `rvm` command.

After reopening Terminal you'll want to run `rvm install 2.1.1` or you can attempt to find a newer version of Ruby by running `rvm list known`.

**The install should've switched to this version of Ruby (2.1.1), but to make sure you aren't using the native version of Ruby, type `rvm use 2.1.1` or verify you're using the latest by typing `which ruby` and `ruby --version`.**


###Finally, Install Jekyll###
Navigate to [jekyllrb.com](http://jekyllrb.com) for more information or type:
{% highlight bash %}
	gem install -V jekyll
{% endhighlight %}
**You can omit the `-V`, but your Terminal window will be blank for a lengthy amount of time.**

###Configure your GitHub Pages Project###
1. Pull your GitHub Pages project.
	- If you need to set one up check out the [GitHub Pages](https://pages.github.com) site.
- In Terminal run:  
    `jekyll new /path/to/repository/project-name`
	- Note: `/path/to/repository/project-name` must be a path, you cannot run `jekyll new` from within the directory you wish to use.
	- If Jekyll says `Conflict: /path/to/repository/project-name exists and is not empty.`, you'll have to move the files in your project to a temporary location and rerun the command.
- In Terminal change directory to your project:  
	`cd /path/to/repository/project-name`
- Then in Terminal run:  
	`jekyll serve --watch --drafts`
	- `--watch` updates your local copy every time you save a file.
	- `--drafts` shows drafts on your local copy
	- Note: on OS X with the native version of Ruby this is where things fell apart and *really* stopped working.
	- Note: to stop hosting a local copy you can press `ctrl-c`
- At this point if another service isn't using port 4000, you can navigate to [http://localhost:4000/](http://localhost:4000/) or [http://0.0.0.0:4000](http://0.0.0.0:4000) after a couple minutes have passed.
- Jekyll's documentation has great information about the [Folder Structure](http://jekyllrb.com/docs/structure/) and you'll probably want to reference their [documentation](http://jekyllrb.com/docs/home/) from here on out.

Good luck and hopefully this guide was of some help!

Also, feel free to checkout the [source](https://github.com/michaeljdeeb/michaeljdeeb.github.io) of this website.
