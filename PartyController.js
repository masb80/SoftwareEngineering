var mongoose = require('mongoose');
var Party = require('../models/Party');
var Candidate = require('../models/Candidate');
var Remote = require('../models/Request');
var dialog = require('dialog')

var candidateController = {};

var partyController = {};

partyController.verify =(req, res) =>{

    Party.find({'name': req.body.name},(err, result)=>{
      if (err) console.log(err)
        if( result[0].name = req.body.name )
        {
  dialog.info('welcome, '+req.body.name, 'login', (exitCode) =>{
    if (exitCode == 0) res.redirect('/party/home/'+result[0]._id);});
  }
  else
    {
      dialog.err('You Dont Exist', 'login', (exitCode) =>{
        if (exitCode == 0) res.redirect('/party');});

    }

    })

}
//Create a candidate
partyController.create = (req, res) =>{
  res.render("../views/party/create");
}


//Save
partyController.save = (req, res) =>{
  var par = new Party();
  par.name = req.body.name
  par.symbol = req.body.symbol
  par.save((err, result) =>{
    if (err) return console.log(err)
    console.log('Force Pushed')
    res.redirect('/party');
})
}


//Home
partyController.hom = (req, res) =>{

    Party.find({_id:req.params.id}, (err, party)=>{
      console.log(party[0].name);
      Candidate.find({'party': party[0].name}, (err, cand) =>{
      if (err) res.send(err);
      else {
  res.render("../views/party/home",{parties: party, candidates: cand})
    }

    })
  })
}

//show
partyController.show=(req, res) =>{
    Party.findById(req.params.id, (err,result)=>{
      if (err) res.send(err);
      else {
        res.render("../views/party/show", {parties: result});}
    })
}


//Update voter
partyController.update = (req, res)=>{
  Party.findById(req.params.id, (err, result)=>{
    if (err) res.send(err)
    result.name = req.body.name
    result.symbol = req.body.symbol
    result.save((err, result) =>{
      if (err) return console.log(err)
      console.log('Force Updates')
      res.redirect('/party/show/'+result._id);
  })
  })
}

partyController.rlist =(req, res) =>{
  var stored = req.params.id
  Party.findById(req.params.id, (err, presult) =>{
    Remote.find({'to': presult.name}, (err, rresult) =>{
      if(err) res.send(err)
      else{
        console.log(rresult)
        res.render("../views/party/rlist",{reqs: rresult})
      }
    })
  })
}

partyController.resolve = (req, res) =>{
  var stored = req.params.id
  console.log(stored)
  Remote.find({_id: stored }, (req, result) =>{
    Remote.remove({_id: stored}, (err) =>{
       if (err) {
         console.log(err);
       }
       else
       {
         console.log("Removed!")
       }
     })


     Party.find({'name':result[0].to},(err, result1) =>{
       dialog.info('Resolved Succesfully ', 'Resolution', (exitCode) =>{
         if (exitCode == 0) res.redirect('/party/request/'+result1[0]._id);

     })

     })
   })
 }


partyController.clist = (req, res) =>{
  Party.find({_id: req.params.id}, (err,party) =>{
    if (err) res.send(err)
    else {
      Candidate.find({'party': ''}, (err,result) =>{
        if (err) res.send(err)
        else {
          res.render('../views/party/clist',{candidates: result, parties: party})
        }
    })

      }
  })
}

partyController.cshow = (req, res)=>{
  Party.find({'name': req.params.name}, (err,party) =>{
    if (err) res.send(err)
    else {
      console.log(party)
      Candidate.find({_id: req.params.id}, (err, cand) =>{
        res.render('../views/party/cshow',{candidates: cand, parties: party})
      })
        }
    })
      }

partyController.cupdate =(req, res) =>{
  Party.find({'name': req.params.name}, (err, party)=>{
    if (err) res.send(err)
    else {
      Candidate.findById(req.params.id,(err, candidate) =>{
        candidate.party = party[0].name
        candidate.save((err, result) =>{
          if (err) return console.log(err)
          else
          {
            console.log('Candidate-Party Updated')
            res.redirect('/party/candidates/'+party[0].name+'/show/'+candidate._id);

          }
      })
      })
    }
  })
}

partyController.cdelete = (req, res) =>{
  Party.find({'name': req.params.name}, (err, party) =>{
    Candidate.findById(req.params.id,(err, candidate) =>{

      candidate.party = req.body.party
      candidate.save((err, result) =>{
        if (err) return console.log(err)
        else
        {
          console.log('Removed from party')
          res.redirect('/party/home/'+party[0]._id);

        }
    })

    })

  })

}



module.exports = partyController;
