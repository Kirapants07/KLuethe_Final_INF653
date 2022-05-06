const express = require('express');
const app = express();
statesArray = require('../model/states.json');

// //custom middleware to verify URL parameter :state for endpoints
//instructor example - function returns a function
const verifyState = () => {
    return (req, res, next) => {
        //check if state abbreviation is missing
         if (!req?.params?.state){
            return res.status(400).json({"message":"Invalid state abbreviation parameter"});
        }
        //convert all inputs to uppercase to compare to json statesArray
        const stateAbbr = req.params.state.toUpperCase();
        //create array of all state names
        const stateCodes = statesArray.map(st => st.code);
        //check if state code exists in array. will return undefined if not found
        const isStateCode = stateCodes.find(code=> code === stateAbbr);

        //if state code does not exist:
        if (!isStateCode) {return res.status(400).json({
            "message":"Invalid state abbreviation parameter"
        })
    }
    //if it was a valid state code
    req.code = stateAbbr;
    next();
    }
  }

module.exports = verifyState;

