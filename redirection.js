
  function cand()
  {
    location.href = "Cand.html";
  }

  function voter()
  {
    location.href = "Voter.html";
  }

  function odistrict()
  {
    location.href = "odistrict.html";
  }

  function opresidential()
  {
    location.href = "opresidential.html";
  }

  function odvote(){
        bootbox.alert({
    message: "Vote Successful",
    callback: function () {
        odistrict();
    }
})
  }

  function opvote(){
        bootbox.alert({
    message: "Vote Successful",
    callback: function () {
        opresidential();
    }
})
  }
  function cdistrict()
  {
    location.href = "cdistrict.html";
  }
  function cpresidential()
  {
    location.href = "cpresidential.html";
  }
  function udistrict()
  {
    location.href = "udistrict.html";
  }
  function upresidential()
  {
    location.href = "upresidential.html";
  }
