const express = require("express");
const router = express.Router();
const dbConnect = require("../../utils/dbConnect");
const AdminUser = require("../../models/AdminUser");
const nodemailer = require("nodemailer");

const AdminProfileDetails = require("../../models/AdminProfileDetails");

router.post("/", async (req, res) => {
  await dbConnect();

  const { email, name, password, adminType, requesterEmail } = req.body;

module.exports = router;
