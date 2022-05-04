const data = {
    states: require('../model/states.json'),
    setStates: function (data) {this.states = data}
}

//MAKE ME ASYNC!!!
const getAllStates = (req, res) => {
    //create array to hold states list
    let statesList;
    const contig = req.query?.contig
    //('/states/?contig=true')
    if (contig === 'true') {
        res.json({"message" : "contig is true"})
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