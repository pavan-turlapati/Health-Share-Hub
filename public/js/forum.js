$(function(){
    const searchForm = $('#searchForm');
    const searchForm2 = $('#searchForm2');
    const addNewPost = $('#addNewPost');
    const addNewComment = $('#addNewComment');

    const searchPost = $('#searchPost');
    const searchPost2 = $('#searchPost2');
    const postTitle = $('#postTitle');
    const postContent = $('#postContent');
    const commentContent = $('#commentContent');

    const searchError = $('#searchError');
    const searchError2 = $('#searchError2');
    const postTitleError = $('#postTitleError');
    const postContentError = $('#postContentError');
    const commentContentError = $('#commentContentError');

    searchForm.submit(function(event) {
        if(searchPost.val().match(/^\s+$/g) || searchPost.val() === "") {
            event.preventDefault();
            postTitleError.hide();
            postContentError.hide();   
            searchError.html("Please provide a post name for search!");
            searchError.show();
           
        }
    });

    searchForm2.submit(function(event) {
        if(searchPost2.val().match(/^\s+$/g) || searchPost2.val() === "") {
            event.preventDefault();
            searchError2.html("Please provide a post name for search!");
            searchError2.show();
           
        }
    });

    addNewPost.submit(function(event) {
        postTitleError.hide();
        postContentError.hide();
        if(postTitle.val().match(/^\s+$/g) || postTitle.val() === "") {
            event.preventDefault();
            postTitleError.html("Please provide a title for the post!");
            postTitleError.show();
            
        }
        if(postContent.val().match(/^\s+$/g) || postContent.val() === "") {
            event.preventDefault();
            postContentError.html("Please provide the content for the post!");
            postContentError.show();
        }
        searchError.hide();
    });

    addNewComment.submit(function(event) {
        commentContentError.hide();
        if(commentContent.val().match(/^\s+$/g) || commentContent.val() === "") {
            event.preventDefault();
            commentContentError.html("Please provide the content for the comment!");
            commentContentError.show();
        }
    });
});

