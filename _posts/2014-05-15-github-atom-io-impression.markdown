---
layout: post
active: "blog"
title:  "GitHub's Atom.io Impression"
date:   2014-05-15 09:41:00
category: [Thoughts On Tech]
tags: [Atom, Atom Editor, Atom.io, GitHub, Review, xmllint]
description: "GitHub released a text editor at the end of February and I received an invite to try it at the beginning of March. This is my review."
image: "github-atom-io-impression.png"
---

This week's post is on [Atom [Editor]](https://atom.io). I thought it would be appropriate because it is now [open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html). Atom is marketed as, "the text editor that the folks at GitHub have always wanted" and now it's slowly making it's way into my everyday work.

I spend a large majority of my day in [Spring Tool Suite](http://spring.io/tools) so I don't feel like I'm able to leverage Atom as well as I would like to, but it's been my go to for working on [this site](https://github.com/michaeljdeeb/michaeljdeeb.github.io), my [daily-programmer project](https://github.com/michaeljdeeb/daily-programmer), as well as at a Faux Game Jam I participated in with my friends two months ago.

###Benefits###
- Git integration color codes files in the tree view and the number of changed lines in the status bar at the bottom.
- The editor is so modular that it can be built to be exactly what you need if you have the time to do so (The defaults are also pretty great, I've only changed a couple settings).

###What's Missing###
- I need to find an xmllint package as that's the one thing I do use a text editor for regularly and I'd prefer to only have to keep one text editor in my dock. [[Coming Soon]](https://atom.io/packages/linter)
- Stability, particularly around editing single text files as it will sometimes try to make a directory like `~/Desktop` into a project folder and try to remember what files you had open and how the window was configured last time you had that "project" open.
- Cross compatibility. Although this isn't an issue for me, Atom is currently only for OS X. However, the [open source](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html) page mentions Linux and Windows coming in time.

###Quick Tips###
- `cmd-shift-p` - Toggle Command Pallet
    - Every command can be found by using this text field.
- `cmd-p` - Open files
    - Open a file in the project without using the mouse.
- `ctrl-shift-m` - Toggle Markdown Preview
    - Very useful, but Atom renders some markdown different from Jekyll's interpreter so you'll still want to carefully skim the page in your browser.
- `cmd-\` - Toggle Tree View
    - Saves screen real estate or easily provides you a great way to glance at your entire project.
- `cmd-]` - Indent
    - If you select multiple lines this will indent the block
- `cmd-[` - Outdent
    - If you select multiple lines this will outdent the block
- `cmd-l` - Select entire line
- `no default mapping` - Toggle Soft Wrap
    - Necessary for markdown files for me.
    - Only available via the command pallet when the editing window has focus.
- `cmd-space` - Autocomplete

If I missed anything that should be noted feel free to [let me know](../../contact.html).
