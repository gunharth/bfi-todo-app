let articles = ["todo 4", "todo 5", "todo 6"];
let main = document.querySelector("main");

// <article>todo 4</article>

for (let i = 0; i < articles.length; i++) {
    let article = document.createElement("article");
    let txt = document.createTextNode(articles[i])
    article.appendChild(txt);
    main.appendChild(article);
}
