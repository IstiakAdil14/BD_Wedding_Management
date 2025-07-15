
const express = require("express");
const router = express.Router();
const CustomizeService = require("../../../models/CustomizeService");

// GET all customize services with category and eventType details
const Category = require("../../../models/Category");
const EventType = require("../../../models/EventType");

router.get("/", async (req, res) => {
  try {
    const customizeServices = await CustomizeService.find({});

    // Fetch all categories and event types for lookup
    const categories = await Category.find({});
    const eventTypes = await EventType.find({});

    // Map categories and event types by their identifiers
    const categoryMap = {};
    categories.forEach((cat) => {
      categoryMap[cat._id.toString()] = cat;
    });

    const eventTypeMap = {};
    eventTypes.forEach((et) => {
      eventTypeMap[et.name] = et;
    });

    // Attach full category and eventType details to each customize service
    const result = customizeServices.map((cs) => {
      return {
        ...cs.toObject(),
        categoryDetails: categoryMap[cs.category] || null,
        eventTypeDetails: eventTypeMap[cs.eventType] || null,
      };
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch customize services" });
  }
});

// New route for distinct categories from CustomizeService
router.get("/categories", async (req, res) => {
  try {
    const categories = await CustomizeService.distinct("category");
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories from CustomizeService" });
  }
});

// New route for distinct event types from CustomizeService
router.get("/eventTypes", async (req, res) => {
  try {
    const eventTypes = await CustomizeService.distinct("eventType");
    res.json(eventTypes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch event types from CustomizeService" });
  }
});


// POST create a new customize service
router.post("/", async (req, res) => {
  try {
    const { category, categoryDescription, eventType, ratePerGuest } = req.body;
    if (!category || !eventType || ratePerGuest === undefined) {
      return res
        .status(400)
        .json({ error: "Category, eventType and ratePerGuest are required" });
    }
    // Check if customize service with same category and eventType exists
    const existing = await CustomizeService.findOne({ category, eventType });
    if (existing) {
      return res
        .status(400)
        .json({
          error:
            "Customize service for this category and event type already exists. Please update instead.",
        });
    }
    const newCustomizeService = new CustomizeService({
      category,
      categoryDescription,
      eventType,
      ratePerGuest,
    });
    await newCustomizeService.save();
    res.status(201).json(newCustomizeService);
  } catch (error) {
    res.status(500).json({ error: "Failed to create customize service" });
  }
});

// PUT update a customize service by id
router.put("/:id", async (req, res) => {
  try {
    const { category, categoryDescription, eventType, ratePerGuest } = req.body;
    const updatedCustomizeService = await CustomizeService.findByIdAndUpdate(
      req.params.id,
      { category, categoryDescription, eventType, ratePerGuest },
      { new: true }
    );
    if (!updatedCustomizeService) {
      return res.status(404).json({ error: "Customize service not found" });
    }
    res.json(updatedCustomizeService);
  } catch (error) {
    res.status(500).json({ error: "Failed to update customize service" });
  }
});

// DELETE a customize service by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedCustomizeService = await CustomizeService.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCustomizeService) {
      return res.status(404).json({ error: "Customize service not found" });
    }
    res.json({ message: "Customize service deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete customize service" });
  }
});

module.exports = router;
