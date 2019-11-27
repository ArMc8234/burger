$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burgers
  var $newItemInput = $("input.new-item");
  // Our new burgers will go inside the burgersContainer
  var $burgerContainer = $(".burger-container");
  var $burgerDevouredContainer = $(".burger-devoured-container");

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
    $burgerDevouredContainer.empty();
    var rowsToAdd = [];
    var devouredRowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      console.log("readey to add:", burgers[i]);
      if(burgers[i].devoured === false) {
        rowsToAdd.push(createNewRow(burgers[i]));
        $burgerContainer.append(rowsToAdd);
      }
      else {
        devouredRowsToAdd.push(createDevouredRow(burgers[i]));
        console.log("burger is devoured array", devouredRowsToAdd);
        $burgerDevouredContainer.append(devouredRowsToAdd);
      }  
    }
  }

  // This function grabs burgers from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      console.log('data within getBurgers', data)
      burgers = data;
      initializeRows();
    });
  }

  // Toggles devoured status
  function toggleDevoured(event) {
    console.log('we tried to devour')
    event.stopPropagation();
    var burgerToDevour = $(this).parent().data("burgers");
    burgerToDevour.devoured = true;
    console.log('burger after being devoured', burgerToDevour)
    updateBurgers(burgerToDevour);
  }

 

  // This function updates a burgers in our database
  function updateBurgers(burgerToDevour) {
    console.log('burgerToDevour within updateBurgers', burgerToDevour)
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burgerToDevour
    }).then(function() {
      $.get("/api/burgers", function(data) {
        console.log('data within getBurgers', data)
        burgers = data;
        initializeRows();
      });
    });
  }

 
  // This function constructs a burger-item row
  function createNewRow(burgers) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burgers-item'>",
        "<span>",
        burgers.title,
        "</span>",
        "<button class='delete btn btn-danger align-middle float-right p-0'>Devour It!</button>",
        "</li>"
      ].join("")
    );

    // $newInputRow.find("button.delete").data("id", burgers.id);
    $newInputRow.data("burgers", burgers);
    // if (burgers.devoured) {
    //   $newInputRow.find("span").css("text-decoration", "line-through");
    // }
    return $newInputRow;
  }
  function createDevouredRow(burgers) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burgers-item'>",
        "<span>",
        burgers.title,
        ": Devoured it!", 
        "</span>",
        "</li>"
      ].join("")
    );
    $newInputRow.data("burgers", burgers);
    return $newInputRow;
  }
  // This function inserts a new burger into our database and then updates the view
  function insertBurgers(event) {
    event.preventDefault();
    var burgers = {
      title: $newItemInput.val().trim(),
      devoured: false
    };
    console.log('burger within insertBurgers fuction:', burgers);
    $.post("/api/burgers", burgers, getBurgers)
    $newItemInput.val("");
   }
});
