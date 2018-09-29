 // Initial array of Gifs
 var gifs = ["The Office", "Michael Scott", "David Brent", "Pam Beesly", "Jim Halpert", "Tim Canterbury", "Erin Hannon", "Darryl Philbin", "Toby Flenderson", "Andy Bernard", "Kelly Kapoor", "Ryan Howard", "Oscar Martinez", "Creed Bratton", "Meredith Palmer", "Phyllis Vance", "Angela Martin", "Kevin Malone", "Stanley Hudson", "Dwight Schrute", "Gareth Keenan"];

 // displayGifInfo function re-renders the HTML to display the appropriate content
 function displayGifInfo() {
    $('#audio').get(0).play();
   var gif = $(this).attr("data-name");
   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=dc6zaTOxFJmzC&limit=10";

   // Creating an AJAX call for the specific movie button being clicked
   $.ajax({
     url: queryURL,
     method: "GET"
   }).then(function(response) {
    console.log(queryURL);

    console.log(response);
    // storing the data from the AJAX request in the results variable
    // var results = response.data;

    // // Looping through each result item
    // for (var i = 0; i < results.length; i++) {

    //   // Creating and storing a div tag
    //   var gifDiv = $("<div>");

    //   // Creating a paragraph tag with the result item's rating
    //   var p = $("<p>").text("Rating: " + results[i].rating);

    //   // Creating and storing an image tag
    //   // var gifImage = $("<img/>",
    //   //   {
    //   //      src: "results[i].images.fixed_height.url",
    //   //   // stillsrc: "results[i].images.fixed_height_still.url",
    //   //   // animatesrc: "results[i].images.fixed_height.url",
    //   //   // statesrc: "still",
    //   //   // addClass: "gif"
    //   //   })
    //   //
    //   //=========================================================================================
    //   // Setting the src attribute of the image to a property pulled off the result item
    //  var gifImage = $("<img>");
    //  gifImage.attr("stillSrc", results[i].images.fixed_height.url);
    // //    gifImage.attr("data-still", results[i].images.fixed_height.url);
    // //    gifImage.attr("data-animate", results[i].images.fixed_height.url);
    // //    gifImage.attr("data-state", still);
    // //    gifImage.addClass("gif");
      

    //   // Appending the paragraph and image tag to the gifDiv
    //   gifDiv.append(p);
    //   gifDiv.append(gifImage);


    //====================================================
    var results = response.data;
       for (var i = 0; i < results.length; i++) {
           if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
        
               var gifDiv = $("<div class='item'>");
               var rating = results[i].rating;
               var p = $("<p>").text("Rating: " + rating);
               var personImage = $("<img animatedSrc = '" + results[i].images.fixed_height.url + "' stillSrc = '" + results[i].images.fixed_height_still.url + "'src='" + results[i].images.fixed_height_still.url + "'>");
               // personImage.attr("src", results[i].images.fixed_height.url);
               gifDiv.append(p);
               gifDiv.append(personImage);
    //=======================================================

    // Prependng the gifDiv to the HTML page in the "#gifs-appear-here" div
      $("#gifs-view").prepend(gifDiv);
    }
  }
  });

 }

 //======================================================================================
 // Function for displaying movie data
 function renderButtons() {

   // Deleting the gifs prior to adding new gifs
   // (this is necessary otherwise you will have repeat buttons)
   $("#buttons-view").empty();

   // Looping through the array of gifs
   for (var i = 0; i < gifs.length; i++) {

     // Then dynamicaly generating buttons for each gif in the array
     var a = $("<button>");
     // Adding a class of gif-btn to our button
     a.addClass("btn btn-outline-primary");
     // Adding a data-attribute
     a.attr("data-name", gifs[i]);
     // Providing the initial button text
     a.text(gifs[i]);
     // Adding the button to the buttons-view div
     $("#buttons-view").append(a);
     console.log(a);
   }
 }
 //========================================================================
 // This function handles events where a gif button is clicked
 $("#add-gif").on("click", function(event) {
   event.preventDefault();
   // This line grabs the input from the textbox
   var gif = $("#gif-input").val().trim();

   // Adding gif from the textbox to our array using '.push'
   gifs.push(gif);

   // Calling renderButtons which handles the processing of our gif array
   renderButtons();
 });

 // Adding a click event listener to all elements with a class of "gif-btn"
 $(document).on("click", ".btn", displayGifInfo);

 // Calling the renderButtons function to display the intial buttons
 renderButtons();

 //======================================================================================

$(document.body).on("click", "img", function() {
  var isAnimated = $(this).attr("isAnimated");
  if(isAnimated==null || isAnimated==''){
    isAnimated =  "false";
  }

  if(isAnimated=="true"){
    $(this).attr("src",  $(this).attr("stillSrc"));
    $(this).attr("isAnimated", "false");

  } else {
    $(this).attr("src",  $(this).attr("animatedSrc") );
    $(this).attr("isAnimated", "true");
  }
});