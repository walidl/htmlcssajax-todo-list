function clearCards(){

  var cards = $(".card-container .card");

  cards.remove();
}

function callList(){

  clearCards();

  $.ajax({

    url: "http://157.230.17.132:3013/todos",
    method: "GET",
    success: function(inData,state){

      console.log(inData);
      var cont = $(".card-container");
      var temp = $("#card-template").html();
      var comp =  Handlebars.compile(temp);

      for (var i = 0; i < inData.length; i++) {

        var data = {

          id: inData[i].id,
          testo: inData[i].text,
        }

        var card = comp(data);
        cont.append(card)
      }
    },
    error: function(){

      console.log("error");
    }
  })
}

function addItem(item){

  $.ajax({

    url: "http://157.230.17.132:3013/todos",
    method: "POST",
    data: {text: item},
    success: function(inData,state){

      callList();

    },
    error: function(){

      console.log("error");
    }
  })
}

function deleteItem(id){

  // console.log(id);
  $.ajax({

    url: "http://157.230.17.132:3013/todos/" + id,
    method: "DELETE",
    success: function(inData,state){

      callList();
    },
    error: function(){

      console.log("error");
    }
  })
}

function modifyItem(id , input ){

  // console.log(id, input);

  $.ajax({

    url: "http://157.230.17.132:3013/todos/" + id,
    method: "PUT",
    data: {text: input,},
    success: function(inData,state){

      callList();
    },
    error: function(){

      console.log("error");
    }
  })
}

function editText(){

  var list = $(".card-container");

  list.on("click", ".options",function(event){

    var thisCard =   $(this).closest(".card");
    var textArea = thisCard.find(".testo");

    if ($(event.target).is(".editButton")){

      thisCard.find(".options").toggleClass("hidden");
      textArea.attr("readonly", false).focus();
    }
    else if($(event.target).is(".denyButton")){

      thisCard.find(".options").toggleClass("hidden");
      textArea.attr("readonly", true);

    }
    else if($(event.target).is(".confirmButton")){

      var id = thisCard.find(".identità").text();
      var newText = textArea.val()

      modifyItem(parseInt(id,10),newText);

    }
  })






}


function init(){

  callList();


  var btn = $("#addButton");
  var inp = $("#itemImput");
  var list = $(".card-container");


  // Elimina item

  list.on("click", ".card .del-button", function(){

    var id = $(this).closest(".card").find(".identità").text()
    deleteItem(parseInt(id,10));
  })

  // Crea Item

  btn.click(function(){

    if(inp.val() != "" ) {

    addItem(inp.val());
    inp.val("");
    }
    else alert("Inserisci Item");

  })


   //Modifica item

  editText();

}

$(document).ready(init)
