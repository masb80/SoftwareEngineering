var mongoose = require('mongoose');
var Candidate = require('../models/Candidate');
var Election = require('../models/Election');


var electionController = {};

electionController.save = (req, res) =>{
  var election = new Election()
  election.type = req.body.type
  election.status = req.body.status
  election.save((err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    //res.redirect('');
})
}

electionController.pon =(req, res) =>{
  Election.find({'type':'Presidential'}&&{'status':'Ongoing'},(err, election)=>{
    if (err) return console.log(err)
    res.render('../views/elections/pon',{elections: election})
  })
}

electionController.ponshow =(req, res) =>{
  Candidate.find({'eid': req.params.id},(err, candidate)=>{
    if(err) return console.log(err)
    res.render('../views/elections/ponshow',{candidates: candidate})
  })
}

module.exports = electionController;
