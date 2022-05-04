const data = {
    states: require('../model/states.json'),
    setStates: function (data) {this.states = data}
}

const getAllStates = (req, res) => {
    res.json(data.states);
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