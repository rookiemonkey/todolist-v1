// FUTURE SELF: // animation abrupt upon revealing the input div



// reveal add to-do input
$("#addButton").on("click", function(){
    $(this).toggleClass("rotate");
    $("#inputContainer").fadeToggle()
    $("#inputBox").fadeToggle()
});

// adding to-do
$("#inputBox").on("keypress", function(e){
    let $newTodo = $("#inputBox").val(); // returns the user input
    if($newTodo !== "") { // for the use not to enter an empty input
        if(e.which === 13) {
            let $newToDoCard = $("<div id=\"todoCard\" class=\"todoCards\"><a id=\"iconContainer\"><i class=\"fas fa-trash-alt\"></i></a><p class=\"todoCardText\">"+ $newTodo +"</p></div>") // creates the element and insert the user inut
            $("#listContainer").append($newToDoCard); // prepend(add to the beggining) it to the listContainer
            $("#inputBox").val(""); // after enetering, set the input to empty string
        }
    }
});

// $("#todoCard").on("click", function(){}); .on only will not work for dynamically added elements
// since the eventlisteners are attached on page load, elements that are added dynamically (by JS)
// unfortunately will not have these event listeners unless we use ".on" AND! add 2nd parameter on the initial func
// you can see 3 para on the on method. the 2nd para is the child of the DOM selected #listcontainer
$("#listContainer").on("click", "div", function(){ 
    if($(this).hasClass("todoCards")) {
        $(this).removeClass("todoCards");
        $(this).addClass("done");
    } else {
        $(this).addClass("todoCards");
        $(this).removeClass("done");
    }
});

// delete feature
$("#listContainer").on("click", "a", function(){
    $(this).fadeToggle("725", function(){ // fade out before deleting the node 
        $(this).parent().remove();
    })
})