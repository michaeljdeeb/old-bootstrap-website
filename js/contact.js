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
        document.body.innerHTML += '<form id="simpleForm" action="http://getsimpleform.com/messages?form_api_token=d7da16b4c2cbcfb0f28042e901897193" method="post">' +
                                        '<input type="hidden" name="Name" value="'+name+'">' +
                                        '<input type="hidden" name="Email" value="'+email+'">' +
                                        '<input type="hidden" name="Subject" value="'+subject+'">' +
                                        '<input type="hidden" name="Message" value="'+message+'">' +
                                    '</form>';
        document.getElementById("simpleForm").submit();
    } else
        console.log("Invalid!");
}
