$(document).ready(function() {
  //global variables
  var namesList = [];

  //event listeners
  $("#addName").on("click", addName);
  $("#clearList").on("click", clearList);
  $("#submitList").on("click", submitList);

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
  };

  function clearList() {
    console.log("Clear list");
    namesList = []; //empty names array
    $("#namesListDisplay").html("(none so far)"); //reset display of names
    $("#giftingList").hide();
    $("#sidebar1").html(""); //remove elves
    $("#sidebar2").html("");
  };

  function submitList() {
    $("#giftingList").html(""); //resets gifting list
    $("#listValid").html(""); //resets validation feedback
    //check if amount of names is valid
    if (!isListValid()) {
      return;
    };

    //Secret Santa random assignment
    var result = [];
    var recipients = namesList.slice();
    var listLength = namesList.length;
    for (var i = 0; i < listLength; i++) {
      //get current sender's name
      var sender = namesList[i];
      //find random recipient
      var recipientIndex = Math.floor(Math.random() * recipients.length);
      while (recipients[recipientIndex] === sender) {
        //find new recipient if sender is same as recipient
        recipientIndex = Math.floor(Math.random() * recipients.length);
      }
      //assign chosen recipient to variable and remove from potential recipients array
      var recipient = recipients.splice(recipientIndex, 1)[0];
      //push an object with sender+recipient to the results array
      result.push({
        sender: sender,
        recipient: recipient
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
    $("#giftingList").show();
    $("#sidebar1").html("<img src='img/elf1.png' alt='elf1' />");
    $("#sidebar2").html("<img src='img/elf2.png' alt='elf2' />");

    return;
  };

}) //ready
