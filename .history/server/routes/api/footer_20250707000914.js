const express = require('express');
const router = express.Router();
const Footer = require('../../models/Footer');

// GET footer data
router.get('/', async (req, res) => {
  try {
