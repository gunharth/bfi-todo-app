window.$ = window.jQuery = require("jquery");

let articles = getLocalStorage();
// let main = document.querySelector("main");
let main = $("main");
// let eingabe = document.getElementById("todo-input");
let eingabe = $("#todo-input");
// let einfuegen = document.querySelector("#todo-add");
let einfuegen = $("#todo-add");

render();

// einfuegen.addEventListener("click", function(e) {
// einfuegen.click(function() {
einfuegen.on("click", function(e) {
    e.preventDefault();
    let value = eingabe.val();
    if(value != "") {
        articles.push(value);
        // eingabe.value = "";
        eingabe.val("");
        eingabe.focus();
        setLocalStorage();
        render();
    }
})

function render() {
    // main.innerHTML = "";
    // main.text("");
    main.html("");
    for (let i = 0; i < articles.length; i++) {
        // let article = document.createElement("article");
        // article.innerHTML = articles[i];
        //let article = $("<article>" + articles[i] + "</article>");
        // main.appendChild(article);s
        //main.append( $("<article>" + articles[i] + "</article>") );
        main.append( $( `<article> ${articles[i]} </article>` ) );
    }
}

function getLocalStorage() {
    return localStorage.getItem("articles") ? JSON.parse(localStorage.getItem("articles")) : [];
}

function setLocalStorage() {
    localStorage.setItem("articles", JSON.stringify(articles));
}
