const express = require('express');
const router = express.Router();
const gitHubControllerRoute = require('../controllers/gitHubController');

router.get('/', gitHubControllerRoute.githubController);

module.exports = router;
