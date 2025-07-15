const express = require('express');
const router = express.Router();
const Category = require('../../../models/Category');
const portfolioEventsRouter = require('./portfolioEvents');


// GET all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find({});
    // Parse description JSON string to object for each category
    const parsedCategories = categories.map(cat => {
      let parsedDescription;
      try {
        parsedDescription = JSON.parse(cat.description);
      } catch (e) {
        parsedDescription = cat.description; // fallback to original string if parse fails
      }
      return {
        ...cat.toObject(),
        description: parsedDescription,
      };
    });
    res.json(parsedCategories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// POST create a new category
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'Name and description are required' });
    }
    const newCategory = new Category({ name, description });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create category' });
  }
});

// PUT update a category by id
router.put('/:id', async (req, res) => {
  try {
    const { name, description } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
});

// DELETE a category by id
router.delete('/:id', async (req, res) => {
  try {
    const deletedCategory = await Category.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
});

router.use('/portfolioEvents', portfolioEventsRouter);

module.exports = router;
