function writeReadingTime() {
    var wordsPerMinute = 180;

    var posts = document.getElementsByClassName('post');
    for(var i = 0; i < posts.length; i++) {
        var postContent = posts[i].getElementsByClassName('post-content')[0].innerHTML;

        // Remove HTML from post to an appropriate reading time
        // TODO - Investigate whitespace removal
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
