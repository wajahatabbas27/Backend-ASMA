const express = require("express");
const router = express.Router();
const auth = require("../middlewear/auth");
const Post = require("../models/post");
const { check, validationResult } = require("express-validator");

//==========================================================================================
// @route POST /api/posts
// @desc Add Post
// @access private
// Post add kreinge frontend se jo schema hai
// Schema ==>> user,body,date
// private hai har bnde ki post to hm middlewear ko bhi apply kreinge yhn pe
//==========================================================================================
router.post(
  "/",
  [auth, [check("body", "Enter something to Post").not().isEmpty()]],
  async (req, res) => {
    // Yh Errors jo arhe hnge uper checks ko use krne ke bad unko handle kra wa hai hmne yhn pe
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // Creating new post
    // Post Model call krleinge jo schema se import krrhe hain hm
    const post = await new Post({
      user: req.user.id,
      body: req.body.body,
    });

    try {
      // post add krdeinge
      // post.save() -->> Isse hmari post yh database mein save hojaegi hmare pass
      await post.save();
      res.status(200).json({ post });
    } catch (err) {
      console.log("Error", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//==========================================================================================
// @route GET /api/posts
// @desc GET All Posts
// @access private
// Jese News Feed pe hota hai na wese yhn pe hm get krleinge all posts
//==========================================================================================
router.get("/", auth, async (req, res) => {
  try {
    // getting all post
    // find() -->> ke method se hmare pass sari posts ajaingi
    const posts = await Post.find().select({ __v: 0 });
    // console.log("posts", posts);
    res.status(200).json({ posts });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//==========================================================================================
// @route GET /api/posts/:userID
// @desc get user's Post
// @access private
// Getting all posts for a particular user like on FB wall
// Dynamically UserId hm add krdeinge request krte we aur wahin se hm sari particular leinge
// req.params.userID -->> yhn se hm user ki particular ID leke find kreinge
// Post.find({ user: req.params.userID }) -->> Is technique ke through hm filter krrhe hain
// filter krne ke bad hm sara data call krrhe hain apne pass aik particular user ka
//==========================================================================================
router.get("/:userID", auth, async (req, res) => {
  try {
    // Authorizing the user
    // jo userID hai kia wohi auth mein bhi id hai hmare pass
    if (req.params.userID !== req.user.id)
      return res
        .status(401)
        .json({ msg: "ID of particular user donot match the ID in the token" });

    // getting all post of a particular user using userID
    // yh userID request mein hm as a parameter send kreinge all the way
    const posts = await Post.find({ user: req.params.userID }).select({
      __v: 0,
    });
    // console.log("Particular Users posts:", posts);
    res.status(200).json({ posts });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

//==========================================================================================
// @route PUT /api/posts:postID
// @desc Update post
// @access private
// Is mein specific post ki Id arhi hogi particularly jo ke hmne update krni hai
// params mein hm postID leleinge --> req.user.postID
// hmne jo post id hogi usko use krte we delete krdena hai post ko
//==========================================================================================
router.put(
  "/:postID",
  [auth, [check("body", "Enter some message to update").not().isEmpty()]],
  async (req, res) => {
    // Yh Errors jo arhe hnge uper checks ko use krne ke bad unko handle kra wa hai hmne yhn pe
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    // aik khali object bnaleinge hm aur uske andar hm update krleinge
    // hm checks lgainge all the way aur phr hm update krdeinge object ko
    // aur phr object ko replace krdeinge hm database mein set keyword se
    // data knse update krna hai wo hm checks lgake aik empty object mein save krleinge apne pass
    const changes = {};

    // agr data hai to wo bs hmare pass changes ke object mein ajae
    // Changes mein data ajaega aur phr hm isko set se update krdeinge
    if (req.body.body) changes.body = req.body.body;

    try {
      // phle post call krli hai hmne database se
      let post = await Post.findById(req.params.postID);
      if (!post)
        return res.status(400).json({ msg: "Post with this Id doesnot exist" });

      // check lgarhe hain user ki id jo database se arhi hai usko middleware ki id se compare krrhe hain
      // Database mein se user object mein aata hai to hmein toString krna zrori hai usko
      if (post.user.toString() !== req.user.id)
        return res
          .status(401)
          .json({ msg: "This User is not authorised to update this post" });

      // Post agr hai hmare pass to hm usko update krdeinge database mein
      // findByIdAndUpdate -->> is function se hm update krdeinge post ko apne database mein
      // $set -->> ismein jo update krna hai wo likheinge hm yhn pe
      // new -->> true se naya wala jo updated hoga data wo leke aega
      post = await Post.findByIdAndUpdate(
        req.params.postID,
        { $set: changes },
        { new: true }
      );
      res.status(200).json({ post });
    } catch (err) {
      console.log("Error", err.message);
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

//==========================================================================================
// @route POST /api/posts/:postID
// @desc Delete Post
// @access private
// delete krrhe hain aik particular post ko uski id pe hm
//==========================================================================================
router.delete("/:postID", auth, async (req, res) => {
  try {
    // Yh check zrori hai hmare pass kionke isse hmein yh pta chl jaega ke post hai hi nhi 
    let post = await Post.findById(req.params.postID);
    if (!post)
      return res.status(400).json({ msg: "Post with this Id doesnot exist" });

    // check lgarhe hain user ki id jo database se arhi hai usko middleware ki id se compare krrhe hain
    // Database mein se user object mein aata hai to hmein toString krna zrori hai usko
    if (post.user.toString() !== req.user.id)
      return res
        .status(401)
        .json({ msg: "This User is not authorised to Delete this post" });

    // findByIdAndDelete -->> isko lgake hm post ko remove krleige database se
    await Post.findByIdAndDelete(req.params.postID);
    res.status(200).json({ msg: "This Post has been deleted" });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
