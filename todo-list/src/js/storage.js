class Storage {
  saveTodo = (id, todoContent) => {
    const todosData = this.getTodos();
    todosData.push({ id, content: todoContent, status: 'TODO' });
    localStorage.setItem('todos', JSON.stringify(todosData));
  };
  editTodo = (id, todoContent, status = 'TODO') => {
    const todosData = this.getTodos();
    const todoIndex = todosData.findIndex(todo => todo.id == id);
    const targetTodoData = todosData[todoIndex];
    const editedTodoData =
      todoContent === ''
        ? { ...targetTodoData, status }
        : { ...targetTodoData, content: todoContent };
    todosData.splice(todoIndex, 1, editedTodoData);
    localStorage.setItem('todos', JSON.stringify(todosData));
  };
  deleteTodo = id => {
    const todosData = this.getTodos();
    todosData.splice(
      todosData.findIndex(todo => todo.id == id),
      1,
    );
    localStorage.setItem('todos', JSON.stringify(todosData));
  };
  getTodos = () => {
    return localStorage.getItem('todos') === null
      ? []
      : JSON.parse(localStorage.getItem('todos'));
  };
}

export default Storage;
