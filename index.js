// let form=document.querySelector("form");
// let text=document.getElementById("text");
// let todoCon=document.querySelector(".todo-con")
// form.addEventListener('submit', (e)=>{
//     e.preventDefault();
//     addtodo();
// })
// let todos=JSON.parse(localStorage.getItem("todos"));
// if(todos){
//     todos.forEach(element => {
//         addtodo(element)
//     });
// }
// function addtodo(elem) {
//     let todoColl=document.createElement("div");
//     todoColl.classList.add("todocoll")
//     let todotext=text.value;
//     if(elem){
//         todotext=elem.text;
//     }
//     if(todotext){
//     todoColl.innerHTML=`
//     <div class="todo-li">
//     <div class="check ${elem && elem.complete?"active-check":""}"><img src="./images/icon-check.svg" alt=""></div>
//     <p class="ptag ${elem && elem.complete?"complete":""}">${todotext}</p>
//     <button class="close"><img src="./images/icon-cross.svg" alt=""></button>
//   </div>
//   <div class="hr"></div>`;
//     todoCon.appendChild(todoColl);
//     updateLs()
//     }
//     let close=todoColl.querySelector(".close");
//     close.addEventListener("click", ()=>{
//         todoColl.remove();
//         updateLs();
//     })
//     let check=todoColl.querySelector(".check");
//     check.addEventListener('click', ()=>{
//         check.classList.toggle("active-check")
//         todoColl.children[0].children[1].classList.add("complete")  
//         updateLs()
//     })
//     text.value="";
// }

// function updateLs() {
//     let ptag=document.querySelectorAll(".ptag")
//     let arr=[];
//     ptag.forEach(element => {
//         arr.push({
//             text:element.innerText,
//             complete:element.classList.contains("complete")
//         })
//     });
//     localStorage.setItem("todos",JSON.stringify(arr));
// }
// let info=document.querySelectorAll(".choice p")
// let todoli=document.querySelectorAll(".todocoll")
// console.log(info);
// info.forEach(element => {
//    element.addEventListener("click", ()=>{
//     info.forEach(item => {
//         item.classList.remove("active");
//     });
//     element.classList.add("active")
//     if(element.innerText=="Active"){
//         todoli.forEach(elem => {
//             if(!elem.children[0].children[1].classList.contains("complete")){
//                 elem.style.display="block";
//             }else{
//                 elem.style.display="none";
//             }
//         });
//     }else if(element.innerText=="Completed"){
//         todoli.forEach(elem => {
//             if(elem.children[0].children[1].classList.contains("complete")){
//                 elem.style.display="block";
//             }else{
//                 elem.style.display="none";
//             }
//         });
//     }else{
//         todoli.forEach(elem => {
//             elem.style.display="block";
//         });
//     }
//    })
// });
// let clear=document.querySelector(".clear");
// clear.addEventListener("click", ()=>{
//     todoli.forEach(elem => {
//         if(elem.children[0].children[1].classList.contains("complete")){
//             elem.remove()
//             updateLs();
//         }
//     });
// })
// let left=document.querySelector(".left");
// function setitem() {
//     let activeTodo=document.querySelectorAll(".todo-li .active-check");
//     let diff=todoli.length-activeTodo.length;
//     left.innerText=`${diff} items left`
    
// }
// setitem();
// Retrieve the necessary elements from the HTML
const form = document.querySelector('form');
const input = document.getElementById('text');
const todoList = document.querySelector('.todo-con');
const choiceButtons = document.querySelectorAll('.choice p');
const clearButton = document.querySelector('.clear');
const itemsLeft = document.querySelector('.left');

// Load the todos from local storage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Function to update the todos in local storage
const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

// Function to create a new todo item
const createTodoItem = (todo) => {
  // Create the necessary elements
  const todoItem = document.createElement('div');
  const checkButton = document.createElement('div');
  const checkIcon = document.createElement('img');
  const todoText = document.createElement('p');
  const closeButton = document.createElement('button');
  
  // Set up the todo item
  todoItem.classList.add('todo-li');
  checkButton.classList.add('check');
  todoText.innerText = todo.text;
  closeButton.classList.add('close');
  closeButton.innerHTML = '&times;';
  
  // Add event listeners
  checkButton.addEventListener('click', () => {
    todoItem.classList.toggle('complete');
    todo.completed = !todo.completed;
    updateLocalStorage();
    updateItemsLeft();
  });
  
  closeButton.addEventListener('click', () => {
    const index = todos.indexOf(todo);
    todos.splice(index, 1);
    todoItem.remove();
    updateLocalStorage();
    updateItemsLeft();
  });
  
  // Append elements to the todo item
  checkButton.appendChild(checkIcon);
  todoItem.appendChild(checkButton);
  todoItem.appendChild(todoText);
  todoItem.appendChild(closeButton);
  
  // Add the todo item to the list
  todoList.appendChild(todoItem);
  
  // Check if the todo is completed
  if (todo.completed) {
    todoItem.classList.add('complete');
  }
};

// Function to render the todos
const renderTodos = () => {
  // Clear the todo list
  todoList.innerHTML = '';
  
  // Iterate through the todos and create the todo items
  todos.forEach((todo) => {
    createTodoItem(todo);
  });
  
  // Update the items left count
  updateItemsLeft();
};

// Function to update the items left count
const updateItemsLeft = () => {
  const count = todos.filter((todo) => !todo.completed).length;
  itemsLeft.innerText = `${count} item${count !== 1 ? 's' : ''} left`;
};

// Function to filter the todos based on the selected option
const filterTodos = (option) => {
  const todoItems = Array.from(todoList.children);
  
  todoItems.forEach((item) => {
    switch (option) {
      case 'all':
        item.style.display = 'flex';
        break;
      case 'active':
        item.style.display = item.classList.contains('complete') ? 'none' : 'flex';
        break;
      case 'completed':
        item.style.display = item.classList.contains('complete') ? 'flex' : 'none';
        break;
      default:
        item.style.display = 'flex';
        break;
    }
  });
};

// Event listener for form submission
// Event listener for form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    // Get the todo text from the input
    const todoText = input.value.trim();
  
    if (todoText !== '') {
      // Create a new todo object
      const todo = {
        text: todoText,
        completed: false,
      };
  
      // Add the new todo to the todos array
      todos.push(todo);
  
      // Create the todo item and render the updated todos
      createTodoItem(todo);
      updateLocalStorage();
      updateItemsLeft();
  
      // Clear the input field
      input.value = '';
    }
  });
  
// Event listener for choice buttons
choiceButtons.forEach((button) => {
    button.addEventListener('click', () => {
    // Remove the active class from all buttons
    choiceButtons.forEach((btn) => {
    btn.classList.remove('active');
    });
    // Add the active class to the clicked button
    button.classList.add('active');

    // Filter the todos based on the selected option
    const option = button.innerText.toLowerCase();
    filterTodos(option);

    });
});
// Event listener for clear button
clearButton.addEventListener('click', () => {
    // Filter out the completed todos
    todos = todos.filter((todo) => !todo.completed);
    
    // Clear the todo list and render the updated todos
    todoList.innerHTML = '';
    renderTodos();
    
    // Update the items left count
    updateItemsLeft();
    });
    
    // Render the initial todos
    renderTodos();