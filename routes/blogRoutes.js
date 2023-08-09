const express = require('express');
const blogController = require('../controllers/blogController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Blog:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the blog post
 *         title:
 *           type: string
 *           description: The title of the blog post
 *         body:
 *           type: string
 *           description: The body of the blog post
 *         author:
 *           type: string
 *           description: The author of the blog post
 *       example:
 *         id: 60f6b3c7d1b5a7a9c8d5e9f4
 *         title: My First Blog Post
 *         body: This is the body of my first blog post.
 *         author: John Doe
 */
router.get('/blogs/:id', blogController.getBlogById);
/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get a list of all blog posts
 *     description: Retrieve a list of all blog posts from the database
 *     responses:
 *       '200':
 *         description: A list of blog posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Blog'
 *       '500':
 *         description: Internal server error
 */
router.get('/blogs', blogController.listBlogs);


/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     description: Create a new blog post with the specified title, body, and author
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               body:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Blog post created
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post('/blogs', authenticateToken, blogController.createBlog);

module.exports = router;