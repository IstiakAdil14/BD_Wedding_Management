const express = require("express");
const router = express.Router();
const AboutContent = require("../../../models/AboutContent");
const dbConnect = require("../../../utils/dbConnect");

// Connect to database
dbConnect();

// GET about content (only one document)
router.get("/", async (req, res) => {
  try {
    let aboutContent = await AboutContent.findOne();
    if (!aboutContent) {
      // Create default content if none exists
      aboutContent = new AboutContent({
        ourStory: "",
        missionAndValues: "",
      });
      await aboutContent.save();
    }
    res.json(aboutContent);
  } catch (error) {
    res.status(500).json({ message: "Error fetching about content", error });
  }
});

// PUT update about content
router.put("/", async (req, res) => {
  try {
    const { ourStory, missionAndValues } = req.body;
    let aboutContent = await AboutContent.findOne();
    if (!aboutContent) {
      aboutContent = new AboutContent({ ourStory, missionAndValues });
    } else {
      aboutContent.ourStory = ourStory;
      aboutContent.missionAndValues = missionAndValues;
    }
    const savedContent = await aboutContent.save();
    res.json(savedContent);
  } catch (error) {
    res.status(400).json({ message: "Error updating about content", error });
  }
});

module.exports = router;
