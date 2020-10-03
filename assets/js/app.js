$(document).ready(function () {

    // append todos from local storage
    const todos = JSON.parse(localStorage.getItem('todos'))

    if (todos && todos.length > 0) {
        todos.forEach(todo => {
            if (todo.done) {
                // done
                let $newToDoCard = $("<div id=\"todoCard\" data-label=\"" + todo.todo + "\" class=\"done\"><a id=\"iconContainer\"><i class=\"fas fa-trash-alt\"></i></a><p class=\"todoCardText\">" + todo.todo + "</p></div>")
                $("#listContainer").append($newToDoCard);
            }

            else {
                // not done
                let $newToDoCard = $("<div id=\"todoCard\" data-label=\"" + todo.todo + "\" class=\"todoCards\"><a id=\"iconContainer\"><i class=\"fas fa-trash-alt\"></i></a><p class=\"todoCardText\">" + todo.todo + "</p></div>")
                $("#listContainer").append($newToDoCard);
            }
        })
    }
});

// reveal add to-do input
$("#addButton").on("click", function () {
    $(this).toggleClass("rotate");
    $("#inputContainer").fadeToggle()
    $("#inputBox").fadeToggle()
});

// adding to-do
$("#inputBox").on("keypress", function (e) {
    let $newTodo = $("#inputBox").val(); // returns the user input
    if ($newTodo !== "") { // for the use not to enter an empty input
        if (e.which === 13) {

            // store to do on local storage
            const todos = JSON.parse(localStorage.getItem('todos'))

            if (todos) {
                // succeeding add
                localStorage.setItem('todos', JSON.stringify([...todos, {
                    todo: $newTodo,
                    done: false
                }]))
            } else {
                // initial add
                localStorage.setItem('todos', JSON.stringify([{
                    todo: $newTodo,
                    done: false
                }]))
            }

            let $newToDoCard = $("<div id=\"todoCard\" data-label=\"" + $newTodo + "\" class=\"todoCards\"><a id=\"iconContainer\"><i class=\"fas fa-trash-alt\"></i></a><p class=\"todoCardText\">" + $newTodo + "</p></div>") // creates the element and insert the user inut
            $("#listContainer").append($newToDoCard); // prepend(add to the beggining) it to the listContainer
            $("#inputBox").val(""); // after enetering, set the input to empty string
        }
    }
});

// $("#todoCard").on("click", function(){}); .on only will not work for dynamically added elements
// since the eventlisteners are attached on page load, elements that are added dynamically (by JS)
// unfortunately will not have these event listeners unless we use ".on" AND! add 2nd parameter on the initial func
// you can see 3 para on the on method. the 2nd para is the child of the DOM selected #listcontainer
$("#listContainer").on("click", "div", function () {
    const toBeUpdated = $(this)['0'].dataset.label;
    const todos = JSON.parse(localStorage.getItem('todos'))

    // update local storage
    const updatedTodos = todos.map(todo => {
        if (todo.todo === toBeUpdated) {
            todo.done = !todo.done;
            return todo
        }
        return todo
    })

    // sort todos, finished todos goes to the bottom
    const done = updatedTodos.filter(todo => todo.done)
    const notDone = updatedTodos.filter(todo => !todo.done)
    const sorted = [...notDone, ...done]

    localStorage.setItem('todos', JSON.stringify(sorted))

    // update dom
    if ($(this).hasClass("todoCards")) {
        // done
        $(this).removeClass("todoCards");
        $(this).addClass("done");
        sort();
    } else {
        // not done
        $(this).addClass("todoCards");
        $(this).removeClass("done");
        sort();
    }
});

// remove to-do
$("#listContainer").on("click", "a", function () {
    $(this).fadeToggle("725", function () { // fade out before deleting the node 
        const toBeDeleted = $(this).parent()['0'].dataset.label;

        const todos = JSON.parse(localStorage.getItem('todos'))

        const updatedTodos = todos.filter(todo => todo.todo !== toBeDeleted)

        localStorage.setItem('todos', JSON.stringify(updatedTodos))

        $(this).parent().remove();
    })
})

function sort() {

    // sorts the dom

    const listContainerChildren = Object.assign({}, $('#listContainer').children())

    const DOM_done = Object.values(listContainerChildren).filter(child => {
        return child.constructor.name === 'HTMLDivElement' && child.className === 'done'
    })

    const DOM_notDone = Object.values(listContainerChildren).filter(child => {
        return child.constructor.name === 'HTMLDivElement' && child.className === 'todoCards'
    })

    $('#listContainer').children().remove()
    $("#listContainer").append(DOM_notDone)
    $("#listContainer").append(DOM_done)
}