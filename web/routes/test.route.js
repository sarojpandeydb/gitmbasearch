const router = require("express").Router();
const { getLatestFewerPosts } = require("../helpers/utlity");
router.get("/", async(req, res) => {
    try {
        const data = await getLatestFewerPosts();
        res.json({ posts: data.posts });
    } catch (e) {
        res.json({ msg: e.message });
    }
});

module.exports = router;