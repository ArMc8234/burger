$(document).ready(function() {
  // Getting a reference to the input field where user adds a new burgers
  var $newItemInput = $("input.new-item");
  // Our new burgerss will go inside the burgersContainer
  var $burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding burgerss
  $(document).on("click", "button.delete", deleteBurgers);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".burger-item", editBurgers);
  $(document).on("keyup", ".burger-item", finishEdit);
  $(document).on("blur", ".burger-item", cancelEdit);
  $(document).on("submit", "#burger-form", insertBurgers);

  // Our initial burgerss array
  var burgers = [];

  // Getting burgerss from database when page loads
  getBurgers();

  // This function resets the burgerss displayed with new burgerss from the database
  function initializeRows() {
    $burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < burgers.length; i++) {
      rowsToAdd.push(createNewRow(burgers[i]));
    }
    $burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs burgerss from the database and updates the view
  function getBurgers() {
    $.get("/api/burgers", function(data) {
      burgers = data;
      initializeRows();
    });
  }

  // This function deletes a burgers when the user clicks the delete button
  function deleteBurgers(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/burgers/" + id
    }).then(getBurgers);
  }

  // This function handles showing the input box for a user to edit a burgers
  function editBurgers() {
    var currentBurgers = $(this).data("burgers");
    $(this).children().hide();
    $(this).children("input.edit").val(currentBurgers.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var burgers = $(this).parent().data("burgers");
    burgers.complete = !burger.complete;
    updateBurgers(burgers);
  }

  // This function starts updating a burgers in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedBurgers = $(this).data("burgers");
    if (event.which === 13) {
      updatedBurgers.text = $(this).children("input").val().trim();
      $(this).blur();
      updateBurgers(updatedBurger);
    }
  }

  // This function updates a burgers in our database
  function updateBurgers(burgers) {
    $.ajax({
      method: "PUT",
      url: "/api/burgers",
      data: burgers
    }).then(getBurgers);
  }

  // This function is called whenever a burger item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentBurgers = $(this).data("burgers");
    if (currentBurgers) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentBurgers.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a burger-item row
  function createNewRow(burgers) {
    var $newInputRow = $(
      [
        "<li class='list-group-item burgers-item'>",
        "<span>",
        burgers.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", burgers.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("burgers", burgers);
    if (burgers.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new burgers into our database and then updates the view
  function insertBurgers(event) {
    event.preventDefault();
    var burgers = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/burgers", burgers, getBurgers);
    $newItemInput.val("");
  }
});
