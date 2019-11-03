var mongoose = require('mongoose');
var Candidate = require('../models/Candidate');
var Party = require('../models/Party');
var Remote = require('../models/Request');
var dialog = require('dialog')

var candidateController = {};

candidateController.verify =(req, res) =>{

    Candidate.find({'name': req.body.name},(err, result)=>{
      if (err) console.log(err)
        if( result[0].name = req.body.name )
        {
  dialog.info('welcome, '+req.body.name, 'login', (exitCode) =>{
    if (exitCode == 0) res.redirect('/candidates/home/'+result[0]._id);});
  }
  else
    {
      dialog.err('You Dont Exist', 'login', (exitCode) =>{
        if (exitCode == 0) res.redirect('/candidates');});

    }

    })

}
//Create a candidate
candidateController.create = (req, res) =>{
  res.render("../views/candidates/create");
}


//Save
candidateController.save = (req, res) =>{
  var cand = new Candidate();
  cand.name = req.body.name
  cand.age = req.body.age
  cand.party = req.body.party
  cand.address = req.body.address
  cand.save((err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/candidates');
})
}


//Home
candidateController.hom = (req, res) =>{

    Candidate.findById(req.params.id, (err, result)=>{
      if (err) res.send(err);
      else {
  res.render("../views/candidates/home",{candidates: result})
    }
  })
}

//show
candidateController.show=(req, res) =>{
    Candidate.findById(req.params.id, (err,result)=>{
      if (err) res.send(err);
      else {
        res.render("../views/candidates/show", {candidates: result});}
    })
}


//Update voter
candidateController.update = (req, res)=>{
  Candidate.findById(req.params.id, (err, result)=>{
    if (err) res.send(err)
    result.name = req.body.name
    result.party = req.body.party
    result.address = req.body.address
    result.age = req.body.age
    result.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/candidates/show/'+result._id);
  })
  })
}

candidateController.plist =(req, res) =>{
  Party.find((err, result)=>{
    if (err) res.send(err)
    res.render("../views/candidates/plist",{parties: result})
  })

}

candidateController.rlist =(req, res) =>{
  var stored = req.params.id
    Candidate.findById(req.params.id, (err, result)=>{
      if (err) res.send(err)
      else{
    res.render("../views/candidates/rlist",{candidates: result})
    }
  })
}

candidateController.rreg = (req, res) =>{
  var reg = new Remote()
  reg.from = req.body.cname
  reg.to = req.body.pname
  reg.content = req.body.content
  reg.save((err, result) =>{
    if (err) return console.log(err)
    else{
    console.log('Request Pushed')
    Candidate.find({'name': req.body.cname},(err, result)=>{
      if (err) console.log(err)
      res.redirect('/candidates/home/'+ result[0].id);
    })
  }
})
}






module.exports = candidateController;
