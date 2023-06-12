const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;
const commentData = data.comments;
const diseaseData = data.diseases;
const userData = data.users;
const xss = require('xss');

router.get('/:id', async (req, res) => {
  if(req.session.user) {
      try {
        const postList = await postData.getAllPostsOfForum(xss(req.params.id));
        const getDisease = await diseaseData.getDiseaseById(xss(req.params.id));
        res.render('forum/forum', {
          title: getDisease.diseaseName + " Forum",
          name: req.session.user,
          forumName: getDisease.diseaseName + " Forum",
          getDiseaseId: getDisease._id.toString(),
          postList: postList      
        });
      } catch (e) {
        res.status(400).render('error/error', {
          error: 'Page Not Found',
          title:"Error",
          name: req.session.user
        });
      }
  } else{
    try {
      const postList = await postData.getAllPostsOfForum(xss(req.params.id));
      const getDisease = await diseaseData.getDiseaseById(xss(req.params.id));
      res.render('forum/forum', {
        title: getDisease.diseaseName + " Forum",   
        forumName: getDisease.diseaseName + " Forum",
        getDiseaseId: getDisease._id.toString(),
        postList: postList
      });
    } catch (e) {
      res.status(400).render('error/error', {
        error: 'Page Not Found',
        title:"Error"
      });
    }
  }
});

router.get('/post/:id', async (req, res) => {
  if(req.session.user) {
    try {
      const userInfo = await userData.getByUsername(req.session.user);
      const userId = userInfo._id;
      const getPost = await postData.getPostById(req.params.id);
      const getComments = await commentData.getAllCommentsOfPost(req.params.id);

      if(userId === getPost.userId) {
          res.render('forum/post', {
            title: getPost.title,
            name: req.session.user,
            getPost: getPost,
            getComments: getComments,
            isPostOwner: true,
            userId: userId,
            diseaseId: getPost.diseaseId
          });
        } else {
          res.render('forum/post', {
            title: getPost.title,
            name: req.session.user,
            getPost: getPost,
            getComments: getComments,
            userId: userId,
            diseaseId: getPost.diseaseId
          });
        }
    } catch (e) {
      res.status(400).render('error/error', {
        error: 'Page Not Found',
        title:"Error",
        name: req.session.user
      });
    }
  } else {
    try {
      const getPost = await postData.getPostById(req.params.id);
      const getComments = await commentData.getAllCommentsOfPost(req.params.id);
      res.render('forum/post', {
        title: getPost.title,
        getPost: getPost,
        getComments: getComments,
        diseaseId: getPost.diseaseId
      });
    } catch (e) {
      res.status(400).render('error/error', {
        error: 'Page Not Found',
        title:"Error"
      });
    }
  }   
});

router.post('/search', async (req, res) => {
  if(req.session.user) {
    const postName = xss(req.body.postName);
    if(postName.match(/^\s+$/g) || postName === "") {
      res.render('forum/search', {
        title: "Search Results",
        name: req.session.user,
        error: "You need provide the post name for search",
        hasError: true
      });
      return;
    }
    try {
      const searchPost= await postData.getPostsbyName(postName);
      res.render('forum/search', {
        title: "Search Results",
        searchPost:searchPost,
        name: req.session.user
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    const postName = xss(req.body.postName);
    if(postName.match(/^\s+$/g) || postName === "") {
      res.render('forum/search', {
        title: "Search Results",
        name: req.session.user,
        error: "You need provide the post name for search",
        hasError: true
      });
      return;
    }
    try {
      const searchPost= await postData.getPostsbyName(postName);
      res.render('forum/search', {
        title: "Search Results",
        searchPost:searchPost,
      });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }

});

router.post('/:id', async (req, res) => {
  if(!req.session.user) {
    res.redirect(`/login`);
    return;
  }

  const title = xss(req.body.postTitle);
  const content = xss(req.body.postContent);
  const postList = await postData.getAllPostsOfForum(req.params.id);
  const getDisease = await diseaseData.getDiseaseById(req.params.id);

  if(title.match(/^\s+$/g) || title === "") {
    res.render('forum/forum', {
      title: getDisease.diseaseName + " Forum",
      name: req.session.user,
      forumName: getDisease.diseaseName + " Forum",
      getDiseaseId: getDisease._id.toString(),
      postList: postList, 
      error: "You need provide the title for the post!",
      hasError: true
    });
    return;
  }
  if(content.match(/^\s+$/g) || content === "") {
    res.render('forum/forum', {
      title: getDisease.diseaseName + " Forum",
      name: req.session.user,
      forumName: getDisease.diseaseName + " Forum",
      getDiseaseId: getDisease._id.toString(),
      postList: postList, 
      error: "You need provide the content for the post!",
      hasError: true
    });
    return;
  }
  try {
      const userInfo = await userData.getByUsername(req.session.user);
      const userId = userInfo._id;
      const diseaseId = req.params.id;
      const newPost= await postData.createPost(diseaseId, userId, req.session.user, title, content);
      res.redirect(`/forum/${diseaseId}`);
  } catch (e) {
      res.status(500).json({ error: e });
  }  
});

router.post('/post/:id', async (req, res) => {
  if(!req.session.user) {
    res.redirect(`/login`);
    return;
  }

  const content = xss(req.body.commentContent);
  const userInfo = await userData.getByUsername(req.session.user);
  const userId = userInfo._id;
  const getPost = await postData.getPostById(req.params.id);
  const getComments = await commentData.getAllCommentsOfPost(req.params.id);

  if(content.match(/^\s+$/g) || content === "") {
    if(userId === getPost.userId) {
      res.render('forum/post', {
        title: getPost.title,
        name: req.session.user,
        getPost: getPost,
        getComments: getComments,
        isPostOwner: true,
        userId: userId,
        error: "You need provide the content for the comment!",
        hasError: true
      });
    } else {
      res.render('forum/post', {
        title: getPost.title,
        name: req.session.user,
        getPost: getPost,
        getComments: getComments,
        userId: userId,
        error: "You need provide the content for the comment!",
        hasError: true
      });
    }
    return;
  }
    try {
      const postId = req.params.id;
      const newComment = await commentData.createComment(postId, userId, req.session.user, content);
      res.redirect(`/forum/post/${postId}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
});


router.post('/delete/post/:id', async (req, res) => {
    if(!req.params.id) {
      res.status(400).json({ error: "You must Supply an ID to delete." });
      return;
    }
    try {
      await postData.getPostById(req.params.id);
    } catch (e) {
      res.status(404).json({ error: "Could not find a post with that id." });
      return;
    }

    if(req.session.user) {
      const userInfo = await userData.getByUsername(req.session.user);
      const userId = userInfo._id;
      const getPost = await postData.getPostById(req.params.id);
      const getComments = await commentData.getAllCommentsOfPost(req.params.id);
      if(userId === getPost.userId) {
        try {      
          const diseaseId = getPost.diseaseId;
          const postId = xss(req.body.postId);
          await postData.deletePost(postId);
          res.redirect(`/forum/${diseaseId}`);
        } catch (e) {
          res.status(500).json({ error: e });
        }
      } else {
        res.render('forum/post', {
          title: getPost.title,
          name: req.session.user,
          getPost: getPost,
          getComments: getComments,
          userId: userId,
          deleteError: "You cannot delete other users' post!",
          hasdeleteError: true
        });
      }
    } else {
      res.redirect(`/login`);
      return;
    }
});

router.post('/delete/comment/:id', async (req, res) => {
      if(!req.params.id) {
        res.status(400).json({ error: "You must Supply an ID to delete." });
        return;
      }
      try {
        await commentData.getCommentById(req.params.id);
      } catch (e) {
        res.status(404).json({ error: "Could not find a comment with that id." });
        return;
      }
      if(req.session.user) {
        const userInfo = await userData.getByUsername(req.session.user);
        const userId = userInfo._id;
        const getcomment = await commentData.getCommentById(req.params.id);
        const postId = getcomment.postId;
        const getPost = await postData.getPostById(postId);
        const getComments = await commentData.getAllCommentsOfPost(postId);  
        if(userId === getcomment.userId) {
          try {
            const commentId = xss(req.body.commentId);
            await commentData.deleteComment(commentId);
            res.redirect(`/forum/post/${postId}`);
          } catch (e) {
            res.status(500).json({ error: e });
          }
        } else {
          res.render('forum/post', {
            title: getPost.title,
            name: req.session.user,
            getPost: getPost,
            getComments: getComments,
            userId: userId,
            deleteError: "You cannot delete other users' comment!",
            hasdeleteError: true
          });
        }
      } else {
        res.redirect(`/login`);
        return;
      } 
});

router.post('/like/:pid', async (req, res) => {
  try {
    await postData.getPostById(req.params.pid);
  } catch (e) {
    res.status(404).json({ error: "Could not find a post with that id." });
    return;
  }
  if(req.session.user) {
    try {
      const pid = xss(req.body.pid);
      const uid = xss(req.body.uid);
      const likeStatus = await postData.checkIsLike(pid, uid);
      if(likeStatus === 1) {
        await postData.updateIsLike(pid, uid, 2);
      }
      if(likeStatus === 0) {
        await postData.updateIsLike(pid, uid, 1);
      }
      if(likeStatus === 2) {
        await postData.updateIsLike(pid, uid, 1);
      }
      res.redirect(`/forum/post/${pid}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.redirect(`/login`);
    return;
  }
});


router.post('/dislike/:pid', async (req, res) => {
  try {
    await postData.getPostById(req.params.pid);
  } catch (e) {
    res.status(404).json({ error: "Could not find a post with that id." });
    return;
  }

  if(req.session.user) {
    try {
      const pid = xss(req.body.pid);
      const uid = xss(req.body.uid);
      const likeStatus = await postData.checkIsLike(pid, uid);
      if(likeStatus === 1) {
        await postData.updateIsLike(pid, uid, 0);
      }
      if(likeStatus === 0) {
        await postData.updateIsLike(pid, uid, 2);
      }
      if(likeStatus === 2) {
        await postData.updateIsLike(pid, uid, 0);
      }
      res.redirect(`/forum/post/${pid}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.redirect(`/login`);
    return;
  }
});

router.post('/commentLike/:cid', async (req, res) => {
  try {
    await commentData.getCommentById(req.params.cid);
  } catch (e) {
    res.status(404).json({ error: "Could not find a comment with that id." });
    return;
  }
  if(req.session.user) {
    try {
      const cid = xss(req.body.cid);
      const uid = xss(req.body.uid);
      const getcomment = await commentData.getCommentById(req.params.cid);
      const postId = getcomment.postId;
      const likeStatus = await commentData.checkIsLike(cid, uid);
      if(likeStatus === 1) {
        await commentData.updateIsLike(cid, uid, 2);
      }
      if(likeStatus === 0) {
        await commentData.updateIsLike(cid, uid, 1);
      }
      if(likeStatus === 2) {
        await commentData.updateIsLike(cid, uid, 1);
      }
      res.redirect(`/forum/post/${postId}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.redirect(`/login`);
    return;
  }
});

router.post('/commentDislike/:cid', async (req, res) => {
  try {
    await commentData.getCommentById(req.params.cid);
  } catch (e) {
    res.status(404).json({ error: "Could not find a comment with that id." });
    return;
  }

  if(req.session.user) {
    try {
      const cid = xss(req.body.cid);
      const uid = xss(req.body.uid);
      const getcomment = await commentData.getCommentById(req.params.cid);
      const postId = getcomment.postId;
      const likeStatus = await commentData.checkIsLike(cid, uid);
      if(likeStatus === 1) {
        await commentData.updateIsLike(cid, uid, 0);
      }
      if(likeStatus === 0) {
        await commentData.updateIsLike(cid, uid, 2);
      }
      if(likeStatus === 2) {
        await commentData.updateIsLike(cid, uid, 0);
      }
      res.redirect(`/forum/post/${postId}`);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.redirect(`/login`);
    return;
  }
});

module.exports = router;

