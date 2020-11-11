$(document).ready(function() {
  //global variables
  var namesList = [];

  //event listeners
  $("#addName").on("click", addName);
  $("#clearList").on("click", clearList);
  $("input#submitList").on("click", submitList);

  //functions
  function isListValid() {
    let isValid = true;
    //Check if at least three names have been added to the list
    if (namesList.length < 3) {
      isValid = false;
      $("#listValid").html("Please enter three or more names.");
    }
    return isValid;
  };

  function isNameValid() {
    let isValid = true;
    //Check if there is a value in the name input field
    if ($("#nameInput").val() == "") {
      isValid = false;
      $("#nameValid").html("Please input a name.");
    }
    return isValid;
  };

  function displayNames() {
    //create unordered list
    var listDisplay = $('<ul />');
    formatList(namesList); // run function and fill the UL with LI's
    $("#namesListDisplay").html(listDisplay); //display list in specific div

    function formatList(result) {
      jQuery.each(result, function(index, value) {
        // output each name to a list item
        $('<li />', {
          text: value
        }).appendTo(listDisplay);
      });
    };

    return;
  };

  function addName() {
    $("#nameValid").html(""); //resets validation feedback
    //check if there is a name in the input field
    if (!isNameValid()) {
      return;
    };

    //add name in the input field to the array of names
    namesList.push($("#nameInput").val());

    //display unordered list to page
    displayNames();

    $("#nameInput").val(""); //clear name input field
    $("#nameInput").focus(); //set cursor to field

    return;
  };

  function clearList() {
    console.log("Clear list");
    namesList = []; //empty names array
    $("#namesListDisplay").html("(none so far)"); //reset display of names
    $("#giftingList").hide();
    $("#sidebar1").html(""); //remove elves
    $("#sidebar2").html("");

    return;
  };

  function submitList() {
    $("#giftingList").html(""); //resets gifting list
    $("#listValid").html(""); //resets validation feedback
    //check if amount of names is valid
    if (!isListValid()) {
      return;
    };

    //Secret Santa random assignment
    secretSanta(namesList);

    $("#giftingList").show();
    $("#sidebar1").html("<img src='img/elf1.png' alt='elf1' />");
    $("#sidebar2").html("<img src='img/elf2.png' alt='elf2' />");

    return;
  };

  function secretSanta(arr) {
    var result = [];
    var reciArray = arr.slice();
    var listLength = arr.length;

    //define shuffle function
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }

    //shuffle recipient array
    shuffle(reciArray);

    //check if any of the pairs are between the same person
    for (var i = 0; i < listLength; i++) {
      if (arr[i] == reciArray[i] && i != listLength - 1) {
        //swap between current and last item if there is a same-person pair
        var temp = reciArray[i];
        reciArray[i] = reciArray[listLength - 1];
        reciArray[listLength - 1] = temp;
      }
      if (arr[i] == reciArray[i] && i == listLength - 1) {
        //if there are no more items to swap, just shuffle recipients and start over
        shuffle(reciArray);
        i = 0;
      }
    }

    //push an object with sender+recipient to the results array
    for (var i = 0; i < listLength; i++) {
      result.push({
        sender: arr[i],
        recipient: reciArray[i]
      });
    }

    //Display final list to webpage
    var giftingListDisplay = $('<ul />');
    jQuery.each(result, function(index, value) {
      //Output each sender/recipient pair to a list item
      $('<li />', {
        text: value.sender + " 🎁→ " + value.recipient
      }).appendTo(giftingListDisplay);
    });
    $("#giftingList").append("<h2>Gifting List</h2>");
    $("#giftingList").append(giftingListDisplay);

    return;
  }

}) //ready
