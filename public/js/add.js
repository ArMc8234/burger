$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burgers
  var $newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgersContainer
  var $burgerContainer = $(".burger-container");

  // Adding event listeners for deleting, editing, and adding burgerss
   $(document).on("submit", "#burger-form", insertBurgers);
   $(document).on("click", "button.delete", toggleDevoured);
  // Our initial burgers array
  var burgers = [];

  // Getting burgers from database when page loads
  getBurgers();

  // This function resets the burgerss displayed with new burgerss from the database
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.append(rowsToAdd);
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // Toggles devoured status
  function toggleDevoured(event) {
    event.stopPropagation();
    var burgers = $(this).parent().data("burgers");
    burgers.devoured = !burger.devoured;
    updateBurgers(burgers);
  }

 

  // This function updates a burgers in our database
  function updateBurgers(burgers) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burgers
    }).then(getBurgers);
  }

 
  // This function constructs a burger-item row
  function createNewRow(burgers) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burgers-item'>",
        "<span>",
        burgers.title,
        "</span>",
        "<button class='delete btn btn-danger'>Devour It!</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burgers.id);
    $newInputRow.data("burgers", burgers);
    // if (burgers.devoured) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }
  // This function inserts a new burgers into our database and then updates the view
  function insertBurgers(event) {
    event.preventDefault();
    var burgers = {
      title: $newItemInput.val().trim(),
      // devoured: false
    };
    console.log($newItemInput);
    $.post("/api/burgers", burgers, getBurgers)
    $newItemInput.val("");
      // .then(function(){
      //   var row = $("<div>");
      //   row.addClass("burger");
      //   row.append("<p>" + newBurgers.body + "</p>");
      //   $("#burger-container").append(row);
      // });
  }

});
