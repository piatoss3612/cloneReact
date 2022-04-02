import '@fortawesome/fontawesome-free/js/all.min.js';
import '../scss/style.scss';

class TodoList {
  constructor() {
    this.assignElement();
    this.addEvent();
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
    this.createTodoElement(this.todoInputEl.value);
  };

  createTodoElement = value => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

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
  };

  completeTodo = target => {
    const todoDiv = target.closest('.todo');
    todoDiv.classList.toggle('done');
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
}

class Router {
  routes = [];
  notFoundCallback = () => {};

  init() {
    window.addEventListener('hashchange', this.checkRoutes);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    this.checkRoutes();
  }

  addRoute = (url, callback) => {
    this.routes.push({ url, callback });
    return this;
  };

  checkRoutes = () => {
    const currentRoute = this.routes.find(
      route => route.url === window.location.hash,
    );

    if (!currentRoute) {
      this.notFoundCallback();
      return;
    }

    currentRoute.callback();
  };

  setNotFound = callback => {
    this.notFoundCallback = callback;
    return this;
  };
}

document.addEventListener('DOMContentLoaded', () => {
  const router = new Router();
  const todoList = new TodoList();
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
