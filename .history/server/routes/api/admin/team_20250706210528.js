const express = require("express");
const router = express.Router();
const TeamMember = require("../../../../models/TeamMember");
const dbConnect = require("../../../../utils/dbConnect");

// Connect to database
dbConnect();

// GET all team members
router.get("/", async (req, res) => {
  try {
    const teamMembers = await TeamMember.find();
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
});

// POST create new team member
router.post("/", async (req, res) => {
  try {
    const newMember = new TeamMember(req.body);
    const savedMember = await newMember.save();
    res.status(201).json(savedMember);
  } catch (error) {
    res.status(400).json({ message: "Error creating team member", error });
  }
});

// PUT update team member by id
router.put("/:id", async (req, res) => {
  try {
    const updatedMember = await TeamMember.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMember) {
      return res.status(404).json({ message: "Team member not found" });
    }
    res.json(updatedMember);
  } catch (error) {
    res.status(400).json({ message: "Error updating team member", error });
  }
});

// DELETE team member by id
router.delete("/:id", async (req, res) => {
  try {
