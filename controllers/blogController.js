const Blog = require('../models/blog');

exports.createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    console.log(req.user);
    const author = req.user.userId;
    const blog = await Blog.create({ title, content, author });
    res.status(201).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    if (blog.author.toString() !== req.user._id) {
      return res.status(401).send('Unauthorized');
    }
    blog.title = req.body.title;
    blog.content = req.body.content;
    await blog.save();
    res.status(200).send('Blog updated');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.getBlog = async (req, res) => {
  try {
    const blog = await Blog.findOne({ title: req.query.title });
    if (!blog) {
      return res.status(404).send('Blog post not found');
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).send('Blog post not found');
    }
    res.status(200).json(blog);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};

exports.listBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  }
};