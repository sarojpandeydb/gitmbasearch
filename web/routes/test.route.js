const router = require("express").Router();
const { getPostDetails } = require("../helpers/utlity");
router.get("/", async(req, res) => {
    try {
        const data = await getPostDetails("5d933843fbb7eb18f06b7b4f");
        res.json({ posts: data.posts });
    } catch (e) {
        res.json({ msg: e.message });
    }
});

module.exports = router;