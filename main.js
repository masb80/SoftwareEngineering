$(document).ready(function()
{
  var candidates = []; //create an array

  getandappendname();   //Gets object and also appends it into array

  function addcandidate(name)  // create data object to contain form data
  { this.name = name ;}

  addtolist(); //Get candidates into list

  $("#remove").click(function()  //clear list
  {
     localStorage.clear();
     reloadpage();
  });

$("#subcand").click(function()
{
  var val = $("#cname").val(); //get values from form fields
  var dName = new addcandidate(val); // create new object using constructor
  candidates.push(dName); //push into array
  localStorage.setItem("candidates",JSON.stringify(candidates)); //serialize
  addtolist();
 });

  function addtolist()  //add to list in html
  {
    var list = [];
    var i = candidates.length;
    while(i!=0)
    {
      i--;
      var cName = candidates[i].name;
      list += "<li>" + cName + "<li>";
            }
    $("#candies").html(list);

  }

function getandappendname() // get names and append them into local storage using array
{
var can = localStorage.getItem("candidates");
candidates = JSON.parse(can);
console.log(can);
console.log(candidates);
if (!candidates)
{
  candidates = []; // in-case its empty initialise array to empty
}
}
function reloadpage()
{
  var c=10;

    var returnURL = "Cand.html";

while(c=0)
{
  c--;
    setTimeout(function()
    {
        window.location=returnURL;
    }, 50 );
}

}

        });
