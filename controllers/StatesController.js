//import states.json data
const data = {
    states: require('../model/states.json'),
    setStates: function (data) {this.states = data}
}
//import mongoDB data
const mongoStates = require('../model/States');

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
        // statesList.forEach(state => {

        // })
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
    })
}

const deleteState = (req, res) => {
    res.json({ "id": req.body.id })
}

const getState = (req, res) => {
    res.json(data.states)
}

module.exports = {
    getAllStates,
    createNewState,
    updateState,
    deleteState,
    getState
}