---
layout: post
title:  "Programming Challenge: Change Calculator [Obj-C]"
date:   2013-03-11 12:00:00
categories: [Migrated, dailyprogrammer]
tags: [Gist, GitHub, Mac, Objective-C, ObjectiveC, Programming, r/dailyprogrammer, Xcode]
---
*As a note, this is a post that was migrated from the few entries on my WordPress blog.*

This week, my major’s on-campus organization has a meeting and we’ll be discussion solutions to [r/dailyprogrammer](http://www.reddit.com/r/dailyprogrammer/)‘s [Challenge #119 [Easy] Change Calculator](http://www.reddit.com/r/dailyprogrammer/comments/17f3y2/012813_challenge_119_easy_change_calculator/).

Since this is categorized as an easy challenge I decided to revisit an old friend, Objective-C to come up with a solution.

First off, you’ll need Xcode from the Mac App Store. I’m using version 4.6 of Xcode and Mac OS 10.8.2 as a reference.

When you get that installed and configured, you’ll want to create a new project by clicking “Create a new Xcode project” on the splash screen, clicking File > New > Project…, or ⇧⌘N on your keyboard.

At the project selection screen, under Mac OS X, click “Application”, and then “Command Line Tool”.

Select a name for your product and organization and an identifier. To utilize Objective-C, you’ll want to select “Foundation” for the type. I chose to use Automatic Reference Counting (ARC) because I didn’t want to deal with retain/release, but feel free to select whatever you’re comfortable with. Click “Next” and pick somewhere to save the project.

I thought this challenge came from a past [ACM competition](http://icpc.baylor.edu/) so I read the numbers in from a text file. You could put them in an array in code, or retrieve them via a terminal prompt.

If you want to read them in from a text file, you’ll want to click File > New > File… or ⌘N. Under “Mac OS X”, you’ll want to click “Other” and then “Empty”. I called mine “file.in” and saved it under “Supporting Files” rather than “ChangeCalculator”. Populate it with a bunch of test numbers (think of all possible edge cases) followed by returns, save it, and click on the project so we can edit the project settings.

On the project settings page, click on the target and then click “Build Phases”. Under “Copy File” change the destination to “Products Directory”, delete everything out of the Subpath text field, and drag your text file into the window or click the “+” button and navigate to your text file.

Now your project is all setup to read input from a text file within the application.

If you’d like to see what I came up with as a solution you can download the gist [here](https://gist.github.com/michaeljdeeb/5131772).

~~It’s been awhile since I’ve had to deal with Objective-C, so if you have any ways to improve/refactor this code, definitely leave it in the comments or link to your solution to this challenge.~~
