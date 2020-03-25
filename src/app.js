let articles = getLocalStorage();
let main = document.querySelector("main");
let eingabe = document.getElementById("todo-input");
let einfuegen = document.querySelector("#todo-add");

render();

einfuegen.addEventListener("click", function() {
    let value = eingabe.value;
    if(value != "") {
        articles.push(value);
        eingabe.value = "";
        eingabe.focus();
        setLocalStorage();
        render();
    }
})

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
