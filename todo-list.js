const todolist = [{
  name: 'Task', 
duedate: 'due date',
delete: 'action'
}];

renderTodolist();

function renderTodolist() {
  let todolistHTML = '';

  todolist.forEach((todoObject, index) => {

    const {name, duedate} = todoObject

    const html = `
      <div><input type="checkbox"> ${name}</div> 
      <div>${duedate}</div>
      <button class="delete jsdelete" >Delete</button>
    `;
    
    todolistHTML += html;
  });
  document.querySelector('.js-todo-list').innerHTML = todolistHTML;

  document.querySelectorAll('.jsdelete')
    .forEach((deletebutton, index) => {
      deletebutton.addEventListener('click', () => {
        todolist.splice(index, 1);
        renderTodolist();
      })
    });
  }
document.querySelector('.addbutton').addEventListener('click', () => {
  addTodo()
})

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;

  const dateInputElement = document.querySelector('.js-duedate');
  const duedate = dateInputElement.value;
 
  todolist.push({
    //name: name,
    //duedate: duedate,
  name,
  duedate
  });

  inputElement.value = '';

  renderTodolist();

}


