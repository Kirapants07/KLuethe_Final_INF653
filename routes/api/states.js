const express = require('express');
const app = express();
const router = express.Router();
const data = {};
data.states = require('../../model/states.json');
const statesController = require('../../controllers/StatesController');


//process requests to states api
router.route('/')
    .get(statesController.getAllStates);

router.route('/:state')
    .get(statesController.getState);

module.exports = router;