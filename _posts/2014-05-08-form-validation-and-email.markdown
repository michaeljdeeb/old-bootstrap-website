---
layout: post
active: "blog"
title:  "Form Validation and Email"
date:   2014-05-08 09:41:00
categories: [Javascript, Bootstrap]
tags: [Form, Validation, Jekyll, Bootstrap, Simple Form, Javascript]
description: "With this iteration of my website I opted to avoid email, but then I changed my mind."
image: "form-validation-and-email.png"
---

When I first started working through this iteration of my website I didn't want my email address plastered on every page in the footer like it had been in the past. I believe doing that is what caused all the spam email being sent to my school email address. However, I guess I liked working with [input forms](../../blog/google-site-search/) so much that I decided to add a [contact form](../../contact.html).

I knew I wanted a typical contact form, but without any dynamic content I couldn't process the form directly on this domain. Luckily my search brought me to [Jekyll's Resources page](http://jekyllrb.com/docs/resources/) where I saw ["Use Simple Form to integrate a simple contact form"](http://getsimpleform.com/).

Simple Form integrates well with [Akismet](https://akismet.com) for spam prevention, but I haven't opted to go that route (maybe in the future if the form gets abused). Due to this, I wanted my form validation to be thorough (catch possible abuse), but also offer a pleasing user experience (no captchas).

I settled on two types of validation. The first one occurs when a form element loses focus (onblur) and just does some basic checks to determine if there is content in the field or not. The exception to this is email in which a regex `/^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/` is used to do the validation. After the value is checked I give the user some feedback by utilizing [Bootstrap validation states](http://getbootstrap.com/css/#forms-control-validation).

The second validation occurs when the user presses submit and if everything looks good it will create a another form that is hidden and contains the Simple Form action and submit it. If there are errors (red fields), nothing will happen and it's up to the user to fix them. If the message is short (yellow field) the form will display an alert to the user that their message looks a little short, but if submit is pressed a second time the form will go through.

###HTML###

This form requires [Bootstrap](http://getbootstrap.com) and [Font Awesome](http://fortawesome.github.io/Font-Awesome/) to display correctly.

{% highlight html linenos %}

    <form class="form-horizontal" action="javascript:validateForm()" method="post">
        <div id="name-group" class="form-group">
            <div class="col-xs-10 col-xs-offset-1 input-group">
                <span class="input-group-addon"><i class="fa fa-user"></i></span>
                <input type="text" class="form-control" id="name" placeholder="Name" onblur="javascript:validateInline(this.id, this.value)">
            </div>
        </div>
        <div id="email-group" class="form-group">
            <div class="col-xs-10 col-xs-offset-1 input-group">
                <span class="input-group-addon"><i class="fa fa-envelope"></i></span>
                <input type="email" class="form-control" id="email" placeholder="Email" onblur="javascript:validateInline(this.id, this.value)">
            </div>
        </div>
        <div id="subject-group" class="form-group">
            <div class="col-xs-10 col-xs-offset-1 input-group">
                <span class="input-group-addon"><i class="fa fa-comment"></i></span>
                <input type="text" class="form-control" id="subject" placeholder="Subject" onblur="javascript:validateInline(this.id, this.value)">
            </div>
        </div>
        <div id="message-group" class="form-group">
            <div class="col-xs-10 col-xs-offset-1 input-group">
                <span class="input-group-addon"><i class="fa fa-quote-left"></i></span>
                <textarea class="form-control" id="message" rows="5" placeholder="Message" onblur="javascript:validateInline(this.id, this.value)"></textarea>
            </div>
        </div>
        <div hidden class="form-group" id="short-message-group">
            <div class="col-xs-10 col-xs-offset-1 alert alert-warning alert-dismissable">
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                Your message looks a little short. Press submit again if you'd like to send it anyways.
            </div>
        </div>
        <div class="form-group">
            <div class="col-xs-offset-1">
                <button type="submit" class="btn btn-default">Submit</button>
            </div>
        </div>
    </form>

{% endhighlight %}

###JS###

As a note, `document.getElementById("").classList` doesn't work in IE prior to version 10.

{% highlight javascript linenos %}

    function validateInline(id, input) {
        if(id == "name" || id == "subject" || id == "message")
            if(input.trim().length > 0) {
                if(id == "message" && input.length < 30) {
                    document.getElementById(id + "-group").classList.remove("has-error");
                    document.getElementById(id + "-group").classList.remove("has-success");
                    document.getElementById(id + "-group").classList.add("has-warning");
                } else {
                    document.getElementById(id + "-group").classList.remove("has-error");
                    document.getElementById(id + "-group").classList.remove("has-warning");
                    document.getElementById(id + "-group").classList.add("has-success");
                }
            } else {
                document.getElementById(id + "-group").classList.remove("has-success");
                document.getElementById(id + "-group").classList.remove("has-warning");
                document.getElementById(id + "-group").classList.add("has-error");
            }

        if(id == "email") {
            emailValidator = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
            if(input.length > 0 && input.match(emailValidator)) {
                document.getElementById("email-group").classList.remove("has-error");
                document.getElementById("email-group").classList.add("has-success");
            } else {
                document.getElementById("email-group").classList.remove("has-success");
                document.getElementById("email-group").classList.add("has-error");
            }
        }
    }

    function validateForm() {
        valid = true;

        var name = document.getElementById("name").value;
        var email = document.getElementById("email").value;
        var subject = document.getElementById("subject").value;
        var message = document.getElementById("message").value;

        if(name.trim().length == 0 || subject.trim().length == 0 || message.trim().length == 0)
            valid = false;

        if(email.length > 0) {
            emailValidator = /^[\w._-]+[+]?[\w._-]+@[\w.-]+\.[a-zA-Z]{2,6}$/;
            if(!email.match(emailValidator))
                valid = false;
        } else {
            valid = false;
        }

        if(valid && message.length < 30 && document.getElementById("short-message-group").hidden)
            document.getElementById("short-message-group").hidden = false;
        else if(valid) {
            document.body.innerHTML += '<form id="simpleForm" action="http://getsimpleform.com/messages?form_api_token=SIMPLE_FORM_PUBLIC_API_TOKEN" method="post">' +
                                            '<input type="hidden" name="Name" value="'+name+'">' +
                                            '<input type="hidden" name="Email" value="'+email+'">' +
                                            '<input type="hidden" name="Subject" value="'+subject+'">' +
                                            '<input type="hidden" name="Message" value="'+message+'">' +
                                        '</form>';
            document.getElementById("simpleForm").submit();
        }
    }

{% endhighlight %}

####Criticisms####
If I were to iterate on this implementation I'd probably write more advanced validation checks in Javascript and use jQuery for the real form submission. I'd also write in a workaround for the IE compatibility issue.

If you'd like to see it in action you can check it out on my [contact page](../../contact.html) and if you have any suggestions on how to make it better or any other comments feel free to press that submit button!
