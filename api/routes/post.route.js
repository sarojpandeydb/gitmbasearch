const router = require("express").Router();
const PostController = require("../controllers/post.controller");

router.get("/",PostController.getPosts);
router.post("/",PostController.savePost);

module.exports = router;
