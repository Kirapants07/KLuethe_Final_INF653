const express = require('express');
const app = express();
const router = express.Router();
const data = {};
data.states = require('../../model/states.json');
const statesController = require('../../controllers/StatesController');
const verifyState = require('../../controllers/verifyState');


//process requests to states api
router.route('/')
    .get(statesController.getAllStates);

router.route('/:state')
    .get(statesController.getState);

router.route('/:state/funfact')
    .get(statesController.getFunfact);

router.route('/:state/capital')
    .get(statesController.getAttribute);

router.route('/:state/nickname')
    .get(statesController.getAttribute);

router.route('/:state/population')
    .get(statesController.getAttribute);

router.route('/:state/admission')
    .get(statesController.getAttribute);


module.exports = router;