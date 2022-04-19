import '@fortawesome/fontawesome-free/js/all.min.js';
import Storage from './storage';
import Router from './router';
import '../scss/style.scss';

class TodoList {
  constructor(storage) {
    this.initStorage(storage);
    this.assignElement();
    this.addEvent();
    this.loadSavedData();
  }

  initStorage(storage) {
    this.storage = storage;
  }

  assignElement() {
    this.inputContainerEl = document.getElementById('input-container');
    this.inputAreaEl = this.inputContainerEl.querySelector('#input-area');
    this.todoInputEl = this.inputAreaEl.querySelector('#todo-input');
    this.addBtnEl = this.inputAreaEl.querySelector('#add-btn');

    this.todoContainerEl = document.getElementById('todo-container');
    this.todoListEl = this.todoContainerEl.querySelector('#todo-list');

    this.radioAreaEl = this.inputContainerEl.querySelector('#radio-area');
    this.filterRadioBtnEls =
      this.radioAreaEl.querySelectorAll('input[name=filter]');
  }

  addEvent() {
    this.addBtnEl.addEventListener('click', this.onClickAddBtn);
    this.todoListEl.addEventListener('click', this.onClickTodoList);
    this.addRadioBtnEvent();
  }

  addRadioBtnEvent() {
    for (const filterRadioBtnEl of this.filterRadioBtnEls) {
      filterRadioBtnEl.addEventListener('click', this.onClickRadioBtn);
    }
  }

  onClickAddBtn = () => {
    if (this.todoInputEl.value.length === 0) {
      alert('내용을 입력해주세요.');
      return;
    }
    const id = Date.now();
    this.storage.saveTodo(id, this.todoInputEl.value);
    this.createTodoElement(id, this.todoInputEl.value);
  };

  createTodoElement = (id, value, status = null) => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    if (status === 'DONE') {
      todoDiv.classList.add('done');
    }

    todoDiv.dataset.id = id;
    const todoContent = document.createElement('input');
    todoContent.value = value;
    todoContent.readOnly = true;
    todoContent.classList.add('todo-item');

    const fragment = new DocumentFragment();
    fragment.appendChild(todoContent);
    fragment.appendChild(
      this.createButton('complete-btn', 'complete-btn', ['fas', 'fa-check']),
    );
    fragment.appendChild(
      this.createButton('edit-btn', 'edit-btn', ['fas', 'fa-edit']),
    );
    fragment.appendChild(
      this.createButton('delete-btn', 'delete-btn', ['fas', 'fa-trash']),
    );
    fragment.appendChild(
      this.createButton('save-btn', 'save-btn', ['fas', 'fa-save']),
    );
    todoDiv.appendChild(fragment);
    this.todoListEl.append(todoDiv);
    this.todoInputEl.value = '';
  };

  createButton = (btnId, btnClassName, iconClassName) => {
    const btn = document.createElement('button');
    const icon = document.createElement('i');
    icon.classList.add(...iconClassName);
    btn.appendChild(icon);
    btn.id = btnId;
    btn.classList.add(btnClassName);
    return btn;
  };

  onClickTodoList = event => {
    const { target } = event;
    const btn = target.closest('button');
    if (!btn) return;
    if (btn.matches('#delete-btn')) {
      this.deleteTodo(target);
    } else if (btn.matches('#edit-btn')) {
      this.editTodo(target);
    } else if (btn.matches('#save-btn')) {
      this.saveTodo(target);
    } else if (btn.matches('#complete-btn')) {
      this.completeTodo(target);
    }
  };

  deleteTodo = target => {
    const todoDiv = target.closest('.todo');
    todoDiv.addEventListener('transitionend', () => {
      todoDiv.remove();
    });
    todoDiv.classList.add('delete');
    this.storage.deleteTodo(todoDiv.dataset.id);
  };

  editTodo = target => {
    const todoDiv = target.closest('.todo');
    const todoInputEl = todoDiv.querySelector('input');
    todoInputEl.readOnly = false;
    todoInputEl.focus();
    todoDiv.classList.add('edit');
  };

  saveTodo = target => {
    const todoDiv = target.closest('.todo');
    const todoInputEl = todoDiv.querySelector('input');
    todoDiv.classList.remove('edit');
    todoInputEl.readOnly = true;
    const { id } = todoDiv.dataset;
    this.storage.editTodo(id, todoInputEl.value);
  };

  completeTodo = target => {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.toggle('done');
    const { id } = todoDiv.dataset;
    this.storage.editTodo(
      id,
      '',
      todoDiv.classList.contains('done') ? 'DONE' : 'TODO',
    );
  };

  onClickRadioBtn = event => {
    const { value } = event.target;
    window.location.href = `#/${value.toLowerCase()}`;
  };

  filterTodo = status => {
    const todoDivEls = this.todoListEl.querySelectorAll('div.todo');
    for (const todoDivEl of todoDivEls) {
      switch (status) {
        case 'ALL':
          todoDivEl.style.display = 'flex';
          break;
        case 'DONE':
          todoDivEl.style.display = todoDivEl.classList.contains('done')
            ? 'flex'
            : 'none';
          break;
        case 'TODO':
          todoDivEl.style.display = todoDivEl.classList.contains('done')
            ? 'none'
            : 'flex';
          break;
      }
    }
  };

  loadSavedData = () => {
    const todosData = this.storage.getTodos();

    for (const todoData of todosData) {
      const { id, content, status } = todoData;
      this.createTodoElement(id, content, status);
    }
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  const todoList = new TodoList(new Storage());
  const routeCallback = status => () => {
    todoList.filterTodo(status);
    document.querySelector(
      `input[type='radio'][value='${status}']`,
    ).checked = true;
  };
  router
    .addRoute('#/all', routeCallback('ALL'))
    .addRoute('#/todo', routeCallback('TODO'))
    .addRoute('#/done', routeCallback('DONE'))
    .setNotFound(routeCallback('ALL'))
    .init();
});
