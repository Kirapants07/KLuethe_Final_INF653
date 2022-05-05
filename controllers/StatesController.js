//import states.json data

const data = {
    states: require('../model/states.json'),
    setStates: function (data) {this.states = data}
}

const { mongo } = require('mongoose');
//import mongoDB data
const mongoStates = require('../model/States.js');

//MAKE ME ASYNC!!!
const getAllStates = async (req, res) => {
    //create array to hold states list
    let statesList;
    const contig = req.query?.contig

    //('/states/?contig=true')
    if (contig === 'true') {
        statesList = data.states.filter(st => st.code !== 'AK' && st.code !== 'HI');
    }
    // ('/states/?contig=false')
    else if (contig === 'false'){
        statesList = data.states.filter(st => st.code === 'AK' || st.code === 'HI');
    }
    //if no contig query is specified ('/states')
    else {
        statesList = data.states;
    }

    statesList.forEach(state => {
        try {
            //const oneMongoState = mongoStates.find({stateCode: state.code});
            //state.funfacts = oneMongoState.funfacts;

            //const stateExists = mongoStates.find(st => st.stateCode === state.code); //CAUSES FATAL ERROR
            //console.log(stateExists);
            //if (stateExists) {
                //let allStateData = [...statesList, ...stateExists.funfacts];
            //delete allStateData.stateCode;
            //}
        } catch (err) {
            console.log("State does not have funfacts.");
        }

    })
    res.json(statesList);
}


const getState = async (req, res) => {
    //check if state abbreviation is missing
    if (!req?.params?.state){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }
    //get array for state from JSON data. if none found, returns empty array 
    const oneJSONState = data.states.filter(st => st.code === req.params.state.toUpperCase());

    //if parameter does not match state abbreviation, show error message
    if (!oneJSONState[0]){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }

    //get info for state from MongoDB
    const oneMongoState = await mongoStates.findOne({stateCode: req.params.state.toUpperCase()}).exec();

    let singleStateData = oneJSONState[0];
    try{
        singleStateData.funfacts = oneMongoState.funfacts;
    } catch (err) {
        //intentionally empty
    }
        res.json(singleStateData);
}

const getFunfact = async (req, res) => {
    //check if state abbreviation is missing
    if (!req?.params?.state){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }
    //get array for state from JSON data. if none found, returns empty array 
    const oneJSONState = data.states.filter(st => st.code === req.params.state.toUpperCase());

    //if parameter does not match state abbreviation, show error message
    if (!oneJSONState[0]){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }

    //get info for state from MongoDB
    const oneMongoState = await mongoStates.findOne({stateCode: req.params.state.toUpperCase()}).exec();

    //if there are no funfacts
    if (!oneMongoState) {
        res.status(404).json({"message":`No Fun Facts found for ${oneJSONState[0].state}`});
    }

    const randomArrayElement = oneMongoState.funfacts[Math.floor(Math.random() * oneMongoState.funfacts.length)];
        res.json({"funfact": randomArrayElement});
}

const createFunfact = async (req, res) => {
    //body should contain {"funfacts": ["fact1", "fact2"]}
    //check if body exists
    if (!req?.body?.funfacts){
        return res.status(400).json({"message": "State fun facts value required"});
    }
    //check if funfacts supplied are in an array
    if (!Array.isArray(req?.body?.funfacts)){
        return res.status(400).json({"message": "State fun facts value must be an array"});
    }
    
    const oneMongoState = await mongoStates.findOne({stateCode: req.params.state.toUpperCase()}).exec();
    
     //if state is not in MongoDB, create a new entry
    if (!oneMongoState) {
        try {
            const result = await mongoStates.create({
                "stateCode": req.params.state.toUpperCase(),
                "funfacts": req.body.funfacts
            });
            res.status(201).json(result);
        } catch (err) {
            //console.log(err);
        }
    }
    //if state is already in MongoDB, add new funfacts to it
    else {
        let allFunfacts = [...oneMongoState.funfacts, ...req.body.funfacts];
        console.log(allFunfacts);
        const update = await mongoStates.updateOne({"stateCode": req.params.state.toUpperCase()},{"funfacts": allFunfacts});
        const result = await mongoStates.findOne({stateCode: req.params.state.toUpperCase()}).exec();
        res.status(201).json(result);
    } 
    

}

const updateFunfact = async (req, res) => {
    res.json({"message": "update funfact"});
}

const deleteFunfact = async (req, res) => {

    //body contains {"index": 1} where 1 is index, starting at position 1, not 0
    res.json({"message": "delete funfact"});
}

const getAttribute = async (req, res) => {
    //check if state abbreviation is missing
    // if (!req?.params?.state){
    //     return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    // }
    //get array for state from JSON data. if none found, returns empty array 
    const oneJSONState = data.states.filter(st => st.code === req.params.state.toUpperCase());

    //if parameter does not match state abbreviation, show error message
    if (!oneJSONState[0]){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }

    //get info for state from MongoDB
    const oneMongoState = await mongoStates.findOne({stateCode: req.params.state.toUpperCase()}).exec();

    //req.route.path.split('/')
    const pathArray = req.route.path.split('/');
    //console.log(pathArray[2]);
    if (pathArray[2] === 'capital'){
        res.json({
            "state" : oneJSONState[0].state,
            "capital" : oneJSONState[0].capital_city
        });
    }
    else if (pathArray[2] === 'nickname'){
        res.json({
            "state" : oneJSONState[0].state,
            "nickname" : oneJSONState[0].nickname
        });
    }
    else if (pathArray[2] === 'population'){
        res.json({
            "state" : oneJSONState[0].state,
            "population" : oneJSONState[0].population.toLocaleString('en-US')
        });
    }
    else if (pathArray[2] === 'admission'){
        res.json({
            "state" : oneJSONState[0].state,
            "admitted" : oneJSONState[0].admission_date
        });
    }

}

module.exports = {
    getAllStates,
    getState,
    getFunfact,
    getAttribute,
    createFunfact,
    updateFunfact,
    deleteFunfact
}