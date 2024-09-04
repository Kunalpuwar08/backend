const express = require("express");
const auth = require("../middleware/auth");
const Blog = require("../models/Blog");
const router = express.Router();

//create blog
router.post("/create", auth, async (req, res) => {
  const { title, description, category } = req.body;
  try {
    const newBlog = new Blog({
      title,
      description,
      category,
      user: req.user.id,
    });
    await newBlog.save();

    res.json({ message: "Blog Created Sucessfully" });
  } catch (error) {}
});

//list blog
router.get("/list", async (req, res) => {
  const blogs = await Blog.find()
    .populate("user", ["name", "email"])
    .sort({ createdAt: -1 });

  res.status(200).json(blogs);
});

//edit
router.put("/:id", auth, async (req, res) => {
  const { title, description, category } = req.body;
  let blog = await Blog.findById(req.params.id);
  if (!blog) {
    return res.status(401).json({ message: "Blog Not found" });
  }
  if (blog.user.toString() !== req.user.id) {
    return res.status(401).json({ message: "You dont have any permisstion " });
  }

  blog = await Blog.findByIdAndUpdate(
    req.params.id,
    {
      $set: { title, description, category },
    },
    {
      new: true,
    }
  );

  res.status(200).json({ message: "Updated" });
});

//delete
router.delete("/:id", auth, async (req, res) => {
  try {
    let blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(401).json({ message: "Blog Not found" });
    }

    if (blog.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You dont have any permisstion " });
    }

    await blog.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Item deleted" });
  } catch (error) {}
});

module.exports = router;
