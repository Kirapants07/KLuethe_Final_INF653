const express = require('express');
const router = express.Router();
const data = {};
data.states = require('../../model/states.json');
const statesController = require('../../controllers/StatesController');

//process get requests to index page
router.route('/')
    .get(statesController.getAllStates)
    .post(statesController.createNewState)
    .put(statesController.updateState)
    .delete(statesController.deleteState);

//NEED TO add router for config = true and false

// router.route('/:state')
//     .get(statesController.getState);

router.route('/:states/funfact')
    .get(statesController.getState);

router.route('/:states/captital')
    .get(statesController.getState);
    
router.route('/:states/nickname')
    .get(statesController.getState);
        
router.route('/:states/population')
    .get(statesController.getState);

router.route('/:states/admission')
    .get(statesController.getState);
            

    // Yes, the tests will send a request for contig with both true and false values if I remember right. There is likely an issue if you try to access a property that does not exist. You can avoid that error with optional chaining ?. so req.query?.contig OR you could destructure the object: const { contig } = req.query and then check for undefined / false / null like this: if (!contig) // do stuff 


module.exports = router;