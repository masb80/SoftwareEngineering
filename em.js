var express = require('express');
var router = express.Router();
var em = require("../controllers/EmController.js");


router.get('/',(req, res) =>{
    res.render('../views/EM/elogin')
});

router.post('/create', (req, res) =>{
  em.save(req, res);
});

router.post('/verify', (req, res) =>{
  em.verify(req, res);
});

router.get('/home/:id',(req, res) =>{
em.hom(req, res)
});
//================================em/candidates===================================
//candidates Start
router.get('/candidates',(req, res)=>{
  em.cahome(req, res)
})
//Show
router.get('/candidates/show/:id',(req, res)=>{
  em.cashow(req, res);
});
//Edit
router.get('/candidates/edit/:id', (req, res) =>{
  em.caedit(req, res);
});

//Update on EDIT
router.post('/candidates/update/:id', (req, res) =>{
  em.caupdate(req, res);
});

//Delete
router.post('/candidates/delete/:id',(req, res) =>{
  em.cadelete(req, res);
});


//++++++++++++++++++++++++++++++em/candidates+++++++++++++++++++++++++++++++++++++

//================================em/party===================================
//party Start
router.get('/party', (req,res)=>{
  em.phome(req, res)
})

router.get('/party/show/:name', (req, res) =>{
  em.pshow(req, res);
});

router.get('/party/edit/:name',(req, res) =>{
  em.pedit(req, res)
})

router.post('/party/update/:id', (req, res) =>{
  em.pupdate(req, res);
});
router.post('/party/delete/:name',(req, res) =>{
  em.pdelete(req, res);
});


//++++++++++++++++++++++++++++++em/party+++++++++++++++++++++++++++++++++++++

//================================em/voters===================================
//candidates Start
router.get('/voters',(req, res)=>{
  em.vhome(req, res)
})
//Show
router.get('/voters/show/:id',(req, res)=>{
  em.vshow(req, res);
});
//Edit
router.get('/voters/edit/:id', (req, res) =>{
  em.vedit(req, res);
});

//Update on EDIT
router.post('/voters/update/:id', (req, res) =>{
  em.vupdate(req, res);
});

//Delete
router.post('/voters/delete/:id',(req, res) =>{
  em.vdelete(req, res);
});


//++++++++++++++++++++++++++++++em/candidates+++++++++++++++++++++++++++++++++++++
//==============================em/elections======================================
router.get('/elections/', (req, res) =>{
  res.render('../views/EM/elhome')
})

router.get('/elections/create',(req, res) =>{
  em.elcreate(req, res)
})
router.post('/elections/create/save',(req, res) =>{
  em.elsave(req, res)
})

router.get('/elections/presidential',(req, res) =>{
  res.render('../views/EM/elpview')
})

router.get('/elections/presidential/ongoing',(req, res) =>{
  em.elpolist(req, res)
})

router.get('/elections/presidential/oshow/:id',(req, res) =>{
  em.elposhow(req, res)
})

router.post('/elections/presidential/cal/:id',(req, res) =>{
  em.elpocal(req, res)
})

router.get('/elections/presidential/upcoming',(req, res) =>{
  em.elpulist(req, res)
})

router.get('/elections/presidential/completed',(req, res) =>{
  em.elpclist(req, res)
})
router.get('/elections/presidential/cshow/:id',(req, res) =>{
  em.elpcshow(req, res)
})
//++++++++++++++++++++++++++++++em/elections++++++++++++++++++++++++++++++++++++++



module.exports = router;
