const express = require('express');
const app = express();
data.states = require('../../model/states.json');

//custom middleware to verify URL parameter :state for endpoints
//app.use() gets executed for all CRUD requests
const verifyState = (req, res, next) => {
    //convert all inputs to uppercase to compare to json data
    const stateAbbr = req.params.state.toUpperCase();
    //create array of all state names
    const stateCode = data.map(st=> st.code);
    //check if state code exists in array. will return undefined if not found
    const isStateCode = stateCode.find(code=> code === stateCode);
    //if state code does not exist:
    if (!isStateCode) return res.status(400).json({
        "message":"Invalid state abbreviation parameter"
    })
    //if it was a valid state code
    if (isStateCode) {
        //attach verified code to request object
        req.code = stateCode;
        next();
    }
};

module.exports = verifyState;