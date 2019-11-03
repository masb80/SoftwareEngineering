var mongoose = require('mongoose');
var Voter = require('../models/Voter');
var Candidate = require('../models/Candidate');
var dialog = require('dialog');
var Election = require('../models/Election');
var Back = require('../models/Back');

var voterController = {};


//Create A voter
voterController.create = (req, res) =>{
  res.render("../views/pages/ilogin");
}

//Verify voters
voterController.verify = (req, res) =>{
  Voter.find({'username': req.body.username},(err, result)=>{
    if (err) console.log(err)

      if (result[0].password == req.body.password)
      {

dialog.info('welcome, '+req.body.username, 'login', (exitCode) =>{
  if (exitCode == 0) res.redirect('/voters/home/'+result[0]._id);
});

    }
      else {
        dialog.err('Wrong Password, '+req.body.username, 'login', (exitCode) =>{
          if (exitCode == 0) res.redirect('/voters/');
        });
      }
  })
}

//Home Voters
voterController.hom =(req, res) =>{
  Voter.findById(req.params.id, (err, result)=>{
    if (err) res.send(err);
    else {
      console.log(req.params.id)
      console.log(result.username)
res.render("../views/pages/ivhome.ejs",{voter: result})
  }
})
}

//Show Voter
voterController.vshow = (req, res) =>{
  Voter.findById(req.params.id, (err,result)=>{
    if (err) res.send(err);
    else {
      res.render("../views/pages/ishow", {voter: result});}
  })
}

//Update voter
voterController.update = (req, res)=>{
  Voter.findById(req.params.id, (err, voter)=>{
    if (err) res.send(err)
    voter.username = req.body.username
    voter.firstname = req.body.firstname
    voter.lastname = req.body.lastname
    voter.middlename = req.body.middlename
    voter.age = req.body.age
    voter.password = req.body.password
    voter.email = req.body.email
    voter.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/voters/show/'+voter._id);
  })
  })
}

//Register
voterController.register = (req, res) =>{
  res.render("../views/pages/icreate");
}

//Save
voterController.save = (req, res) =>{
  var voter = new Voter();
  voter.username = req.body.username
  voter.firstname = req.body.firstname
  voter.lastname = req.body.lastname
  voter.middlename = req.body.middlename
  voter.age = req.body.age
  voter.password = req.body.password
  voter.email = req.body.email
  voter.save((err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/voters/');
})
}
//Elections Start
voterController.elpolist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Ongoing'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/pages/elpoindex',{elections: result})
    }
  })
}

voterController.elposhow = (req, res) =>{
  Election.find({_id: req.params.id},(err, election)=>{
    if (err) res.send(err)
    else {
      Candidate.find({$and : [{'pid': election[0].eid},{'presidential': 'true'}]}, (err, candidate) =>
      {
        console.log(candidate)
        console.log(election[0].eid)
        res.render('../views/pages/elposhow',{elections:election, candidates: candidate})
      })
    }
  })
}

voterController.elpocshow = (req, res) =>{
  Candidate.findById(req.params.id, (err,cand)=>{
    if (err) res.send(err);
    else {
      res.render("../views/pages/elpocshow", {candidates: cand});}
  })
}

voterController.vote = (req, res) =>{
Candidate.findOneAndUpdate({_id:req.params.id},{$inc:{pvote:1}},{new:true},(err, res)=>{
  if (err) res.send(err)
})
res.redirect('/voters/elections/presidential');
}

voterController.elpclist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Completed'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/pages/elpcindex',{elections: result})
    }
  })
}


voterController.elpcshow = (req, res) =>{
  Election.find({_id: req.params.id},(err, election)=>{
    if (err) res.send(err)
    else {

      Back.find({'pid': election[0].eid}, (err, candidate) =>
      {
        Back.find({'pid': election[0].eid+0.1},(err, candidate2)=>{
        if( candidate2.length < 1)
        {
          res.render('../views/pages/elpcshow',{candidates: candidate})
        }
        else {
          res.render('../views/pages/elpc2show',{candidates: candidate, candidates2: candidate2})
        }

         })
      })
    }
  })
}


voterController.elpulist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Upcoming'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/pages/elpuindex',{elections: result})

    }
  })

}




module.exports = voterController;
