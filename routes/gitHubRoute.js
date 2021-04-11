const express = require('express'),
      router = express.Router(),
      gitHubControllerRoute = require('../controllers/gitHubController');


router.get('/', gitHubControllerRoute.githubController)

module.exports = router;
