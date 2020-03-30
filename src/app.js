if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js');
}

// network status online / offline
let networkStatus = document.getElementById("networkStatus");
window.addEventListener("load", function() {
  function handleNetworkChange(event) {
    if (navigator.onLine) {
      networkStatus.classList.remove("offline");
    } else {
      networkStatus.classList.add("offline");
    }
  }
  window.addEventListener("online", handleNetworkChange);
  window.addEventListener("offline", handleNetworkChange);
});


// start the app ...
let model = getLocalStorage(); // todo list
let main = document.querySelector("main");
let eingabe = document.getElementById("todo-input");
let einfuegen = document.querySelector("#todo-add");
let edit = -1;

render();

document.addEventListener("keyup", function(e) {
    e.preventDefault();
    if(e.keyCode === 13) {
        addTodo();
    }
})

einfuegen.addEventListener("click", function(e) {
    e.preventDefault();
    addTodo();
})

main.addEventListener("click", function(e) {
  e.preventDefault()
  action(e)
})

function action(e) {
  let index = e.target.dataset.index;
  let action  = e.target.dataset.action;
  if(!index) { return; }
  if(action === 'delete') {
    removeTodo(index);
  } else if (action === 'edit') {
    edit = index;
    render();
  } else {
    let input = document.querySelector("main input").value;
    model[edit] = input;
    setLocalStorage();
    edit = -1;
    render();
  }
}

function addTodo() {
    let value = eingabe.value;
    if (value != "") {
      model.push(value);
      eingabe.value = "";
      eingabe.focus();
      setLocalStorage();
      render();
    }
}

function removeTodo(index) {
  model.splice(index, 1);
  setLocalStorage();
  render();
}

// <article>todo 4</article>

function render() {
    main.innerHTML = "";
    for (let i = 0; i < model.length; i++) {
        let article = document.createElement("article");
        let text = document.createElement('div');
        let button1 = document.createElement('button');
        button1.dataset.index = i;

        if(i == edit) {
          let edit = document.createElement('input');
          edit.value = model[i];
          text.appendChild(edit);
          button1.innerHTML = 'Speichern';
          button1.dataset.action = 'save';
        } else {
          text.innerHTML = model[i];
          button1.innerHTML = 'Editieren';
          button1.dataset.action = 'edit';
        }

        let button2 = document.createElement('button');
        button2.innerHTML = 'Löschen';
        button2.dataset.index = i;
        button2.dataset.action = 'delete';

        article.appendChild(text);
        article.appendChild(button1);
        article.appendChild(button2);

        main.appendChild(article);
    }
}

function getLocalStorage() {
    return localStorage.getItem("model") ? JSON.parse(localStorage.getItem("model")) : [];
}

function setLocalStorage() {
    localStorage.setItem("model", JSON.stringify(model));
}
