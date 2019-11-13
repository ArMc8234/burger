$(document).ready(function() {
  var $newItemInput = $("textarea.order");
    //capture the new entry in the "order" text field
    $(document).on('click', "#submit", insertBurger("#order"));
    
    
    //Post the newOrder into to Burgers database
    function insertBurger(event) {
      event.preventDefault();
      var burger = {
        title: $newItemInput.val().trim(),
        devoured: false
      };
  
      $.post("/api/burgers", Burger, burgers);
      $newItemInput.val("");
    }

      function addBurger(data) {
      $.post("/api/burgers", data)
        .then(dbBurgers);
    }
    
    //Devour button (attach it!!!)
    $(document).on("click", "button.delete", handlePostDelete)
    //Get all data from the new items in Burgers database that are labeled "devoured: false" and send to the html page
    //Get all data with devoured equal to true and display 

  
   

  });
  