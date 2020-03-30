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


// app
let articles = getLocalStorage();
let main = document.querySelector("main");
let eingabe = document.getElementById("todo-input");
let einfuegen = document.querySelector("#todo-add");

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

function addTodo() {
    let value = eingabe.value;
    if (value != "") {
      articles.push(value);
      eingabe.value = "";
      eingabe.focus();
      setLocalStorage();
      render();
    }
}

// <article>todo 4</article>

function render() {
    main.innerHTML = "";
    for (let i = 0; i < articles.length; i++) {
        let article = document.createElement("article");
        article.innerHTML = articles[i];
        main.appendChild(article);
    }
}

function getLocalStorage() {
    return localStorage.getItem("articles") ? JSON.parse(localStorage.getItem("articles")) : [];
}

function setLocalStorage() {
    localStorage.setItem("articles", JSON.stringify(articles));
}
