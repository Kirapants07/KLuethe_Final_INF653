const express = require('express');
const app = express();
const router = express.Router();
const data = {};
data.states = require('../../model/states.json');
const statesController = require('../../controllers/StatesController');
const verifyState = require('../../controllers/verifyState');


//process requests to /:states api
router.route('/')
    .get(statesController.getAllStates);

router.route('/:state')
 .get(verifyState(), statesController.getState);

router.route('/:state/funfact')
    .get(verifyState(),statesController.getFunfact)
    .post(statesController.createFunfact)
    .patch(statesController.updateFunfact)
    .delete(statesController.deleteFunfact);

router.route('/:state/capital')
    .get(verifyState(),statesController.getAttribute);

router.route('/:state/nickname')
    .get(verifyState(),statesController.getAttribute);

router.route('/:state/population')
    .get(verifyState(),statesController.getAttribute);

router.route('/:state/admission')
    .get(verifyState(),statesController.getAttribute);


module.exports = router;