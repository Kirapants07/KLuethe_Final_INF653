//import states.json data

const data = {
    states: require('../model/states.json'),
    setStates: function (data) {this.states = data}
}

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
        // statesList.forEach(state => {

        // })
        res.json(statesList);
    }
    // ('/states/?contig=false')
    else if (contig === 'false'){
        statesList = data.states.filter(st => st.code === 'AK' || st.code === 'HI');
        statesList.forEach(state => {
            //const stateExists = mongoStates.find(st => st.stateCode === state.code); //CAUSES FATAL ERROR
            //console.log(stateExists);
            //if (stateExists) {
                //let allStateData = [...statesList, ...stateExists.funfacts];
                //delete allStateData.stateCode;
            //}
         })
        res.json(statesList);
    }
    //if no contig query is specified ('/states')
    else {
        res.json(data.states);
    }
    
}

const createNewState = (req,res) => {
    req.json({
        //list attributes to return
    });
}

const updateState = (req, res) => {
    res.json({
        //list attributes to return
    });
}

const deleteState = (req, res) => {
    res.json({ "id": req.body.id });
}

const getState = async (req, res) => {
    if (!req?.params?.state){
        return res.status(400).json({"message":"Invalid state abbreviation parameter"});
    }
    const oneState = await mongoStates.findOne({stateCode: req.body.state}).exec();
    // if (!oneState){
    //     return res.status(204).json({"message":"Invalid state abbreviation parameter"});
    // }
    res.json(oneState);
}

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState
}