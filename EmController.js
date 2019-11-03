var mongoose = require('mongoose');
//var Candidate = require('../models/Candidate');
//var Election = require('../models/Election');
//var Voter = require('../models/Voter');
//var Party = require('../models/Party');
var Em = require('../models/Em');
var dialog = require('dialog');
var Back = require('../models/Back');

var emController = {};

emController.save = (req, res) =>{
  var eleman = new Em()
  eleman.name = req.body.name
  eleman.password = req.body.password
  eleman.save((err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    //res.redirect('');
})
}

emController.verify = (req, res) =>{
  Em.find({'name': req.body.name},(err, result)=>{
    if (err) console.log(err)

      if (result[0].password == req.body.password)
      {

dialog.info('welcome, '+req.body.name, 'login', (exitCode) =>{
  if (exitCode == 0) res.redirect('/em/home/'+result[0]._id);
});

    }
      else {
        dialog.err('Wrong Password, '+req.body.username, 'login', (exitCode) =>{
          if (exitCode == 0) res.redirect('/em/');
        });
      }
  })
}

emController.hom =(req, res) =>{

    Em.findById(req.params.id, (err, result)=>{
      if (err) res.send(err);
      else {
  res.render("../views/EM/ehome",{feed: result})
    }
  })
}

//============================em/candidates=============================================================
//Home candidates

emController.cahome = (req, res) =>{
    Candidate.find((err,result)=>{
    if (err) return console.log(err)
      res.render("../views/EM/ecindex",{candidates: result})
  })
}

emController.cashow = (req, res) =>{
    Candidate.findById(req.params.id, (err,cand)=>{
      if (err) res.send(err);
      else {
        res.render("../views/EM/cashow", {candidates: cand});}
    })
}


//Edit Candidates
emController.caedit = (req, res) =>{
  Candidate.findById(req.params.id, (err,cand)=>{
    if (err) res.send(err);
    else {
      res.render("../views/EM/caedit", {candidates: cand});}
  })
}

//Update Candidates
emController.caupdate = (req, res)=>{
  Candidate.findById(req.params.id, (err, cand)=>{
    if (err) res.send(err)
    cand.name = req.body.name
    cand.address = req.body.address
    cand.party = req.body.party
    cand.age = req.body.age
    cand.presidential = req.body.presidential
    cand.district = req.body.district
    cand.pid = req.body.pid
    cand.pvote = req.body.pvote
    cand.vote = req.body.vote

    cand.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/candidates/show/'+cand._id);
  })
  })
}

//delete CandidateS
emController.cadelete = (req, res) =>{
  Candidate.remove({_id: req.params.id}, (err) =>{
    if (err){
      console.log(err);
    }
    else{
      console.log("Candidate Removed!");
      res.redirect("/em/candidates");
    }
  });
};




//+++++++++++++++++++++++++++em/candidates++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===========================em/Party===================================================================
emController.phome =(req, res) =>{
  Party.find((err,result)=>{
  if (err) return console.log(err)
  res.render('../views/EM/pindex',{parties: result})
})
}

emController.pshow = (req, res) =>{
  Candidate.find({ 'party': req.params.name}, (err,result)=>{
    if (err) res.send(err);
    else {
      console.log(result);
      res.render("../views/EM/pshow", {parties: result});}
  })
}

emController.pedit = (req, res) =>{
  Party.find({'name': req.params.name}, (err,result) =>{
    if (err) res.send(err)
    else{
      console.log(result)
      res.render("../views/EM/pedit",{parties: result})
    }
  })
}

//Update Candidates
emController.pupdate = (req, res)=>{
  Party.findById(req.params.id, (err, result)=>{
    if (err) res.send(err)
    result.name = req.body.name
    result.symbol = req.body.symbol
    result.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/party');
  })
  })
}

//delete CandidateS
emController.pdelete = (req, res) =>{
  Party.remove({'name': req.params.name}, (err) =>{
    if (err){
      console.log(err);
    }
    else{
      console.log(req.params.name)
      console.log("Party Removed!");
      res.redirect("/em/party");
    }
  });
};




//+++++++++++++++++++++++++++em/party+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++


//===========================em/voters=================================================================
//Home Voters

emController.vhome = (req, res) =>{
    Voter.find((err,result)=>{
    if (err) return console.log(err)
      res.render("../views/EM/vindex",{voters: result})
  })
}

emController.vshow = (req, res) =>{
    Voter.findById(req.params.id, (err,cand)=>{
      if (err) res.send(err);
      else {
        res.render("../views/EM/vshow", {voters: cand});}
    })
}


//Edit Voters
emController.vedit = (req, res) =>{
  Voter.findById(req.params.id, (err,result)=>{
    if (err) res.send(err);
    else {
      res.render("../views/EM/vedit", {voters: result});}
  })
}

//Update Voters
emController.vupdate = (req, res)=>{
  Voter.findById(req.params.id, (err, result)=>{
    if (err) res.send(err)
    result.username = req.body.username
    result.password = req.body.password
    result.email = req.body.email
    result.age = req.body.age
    result.firstname = req.body.firstname
    result.middlename = req.body.middlename
    result.lastname = req.body.lastname

    result.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/em/voters/show/'+result._id);
  })
  })
}

//delete VoterS
emController.vdelete = (req, res) =>{
  Voter.remove({_id: req.params.id}, (err) =>{
    if (err){
      console.log(err);
    }
    else{
      console.log("Voter Removed!");
      res.redirect("/em/voters");
    }
  });
};


//+++++++++++++++++++++++++++em/voters++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//===========================em/elections===========================================================
emController.elcreate = (req, res) =>{
  res.render('../views/EM/elcreate')
}

emController.elsave =(req, res) =>{
  var election = new Election ()
  election.eid = req.body.eid
  election.type = req.body.type
  election.status = req.body.status
  election.save((err, result) =>{
    if (err) return console.log(err)
    else {
      console.log("New Election!!Phew");
      res.redirect('/em/elections')
    }
  })
}

emController.elpolist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Ongoing'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/EM/elpoindex',{elections: result})
    }
  })
}

emController.elposhow = (req, res) =>{
  Election.find({_id: req.params.id},(err, election)=>{
    if (err) res.send(err)
    else {
      Candidate.find({$and : [{'pid': election[0].eid},{'presidential': 'true'}]}, (err, candidate) =>
      {
        console.log(candidate)
        console.log(election[0].eid)
        res.render('../views/EM/elposhow',{elections:election, candidates: candidate})
      })
    }
  })
}

emController.elpocal = (req, res) =>{
Election.findById(req.params.id, (err, election) =>{
  if (err) res.send(err)
  else{
    Candidate.find({$and : [{'pid': election.eid},{'presidential': 'true'}]})
    .sort({pvote: -1})
    .exec((err, result) =>{
      var max = 0;
      for (var i=0;i<result.length;i++)
      {
        var max = max + result[i].pvote;
      }
      if (result[0].pvote > max/2)
      {
          for( var i=0; i<result.length;i++)
          {
            var back = new Back();
            back.name = result[i].name;
            back.party = result[i].party;
            back.age = result[i].age;
            back.presidential = result[i].presidential;
            back.pid = result[i].pid;
            back.pvote = result[i].pvote;
            back.save();
            console.log("New BackUP"+ [i]+back);
          }
        election.status = 'Completed'
        election.save();
        for(var i=0;i<result.length;i++)
        {
          result[i].pvote = 0;
          result[i].presidential = false;
          result[i].pid = 0;
          result[i].save();
        }
        console.log("No round 2");
        res.redirect('/em/elections/presidential');
      }
      else {
        console.log('Round 2');
        console.log(election.eid+0.1);

        for( var i=0; i<result.length;i++)
        {
          var back = new Back();
          back.name = result[i].name;
          back.party = result[i].party;
          back.age = result[i].age;
          back.presidential = result[i].presidential;
          back.pid = result[i].pid;
          back.pvote = result[i].pvote;
          back.save();
          console.log("New Backup"+ [i] +back);
        }

        for(var i=0;i<2;i++)
        {
          result[i].pvote =0;
          result[i].pid = result[i].pid + 0.1;
          result[i].save()
        }
        if ( result.length > 2)
        {
        for(var i=2;i<result.length;i++)
        {
          result[i].pvote = 0;
          result[i].presidential= false;
          result[i].pid =0;
          result[i].save()
        }
      }

        var election1 = new Election ();
        election1.eid = election.eid + 0.1;
        election1.type = election.type;
        election1.status = election.status;
        console.log(election1.eid+election1.type+election1.status);
        election1.save((err, result)=>{
          console.log(result);
        });
        election.status = "Completed";
        election.save();
        res.redirect('/em/elections/presidential')
      }
    })
  }
})
}




emController.elpulist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Upcoming'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/EM/elpuindex',{elections: result})

    }
  })

}

emController.elpclist = (req, res) =>{
  Election.find({$and : [{'type': 'Presidential'},{'status': 'Completed'}]},(err, result)=>{
    if (err) res.send(err)
    else {
      console.log(result);
      res.render('../views/EM/elpcindex',{elections: result})

    }
  })
}

emController.elpcshow = (req, res) =>{
  Election.find({_id: req.params.id},(err, election)=>{
    if (err) res.send(err)
    else {

      Back.find({'pid': election[0].eid}, (err, candidate) =>
      {
        Back.find({'pid': election[0].eid+0.1},(err, candidate2)=>{
        //console.log('Round 2');
        //console.log(candidate2);
        //console.log('Round 1');
        //console.log(candidate)
        if( candidate2.length < 1)
        {
          res.render('../views/EM/elpcshow',{candidates: candidate})
        }
        else {
          res.render('../views/EM/elpc2show',{candidates: candidate, candidates2: candidate2})
        }

         })
      })
    }
  })
}
//+++++++++++++++++++++++++++em/elections+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

module.exports = emController;
