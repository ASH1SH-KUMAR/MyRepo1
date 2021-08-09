let addtodobutton = document.querySelector(".add-todo");
let input_value = document.querySelector(".todo-input");
let search = document.querySelector(".todo-list-container"); // . is very imp as it represent a class



addtodobutton.addEventListener("click", input);
input_value.addEventListener("keypress",input);

function input(event) // by default a object of event type is passed 
{
    // console.log(event);
    if( event.type=="click" || (event.key == "Enter" ))
    {
        let show = input_value.value;
        addtodo(show);
        input_value.value ="";
    }
    
}
function addtodo(show)
{
    let newDiv = document.createElement("div"); //this is to create a new div type element
    newDiv.classList.add("todo-input-list");  //this is to add a class name to the input

    let newP = document.createElement("p");
    newP.classList.add("todo");
    newP.textContent = show; //this is to add the text in between the tags

    let newButton = document.createElement("button");
    newButton.classList.add("delete-todo");
    // newButton.textContent = "Delete";

    newButton.addEventListener("click",func1);

    // let testBut = document.querySelector("delete-todo"); ####  can't use this to apply the event listener 

    newButton.addEventListener("click",func1);

    newDiv.append(newP);  //this is to add the child of the parent node as p is a child to the div node
    newDiv.append(newButton);

    search.append(newDiv); // this is to append the div class in the todo-list-container div class

}

function func1(event){
       event.target.parentNode.remove();  // this is to remove the parent element of 
    
    }
