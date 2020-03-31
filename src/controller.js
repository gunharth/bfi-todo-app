/* structure
<main>
    <article>
        <div>Brot</div>
        <button data-index="0" data-action="edit">Editieren</button>
        <button data-index="0" data-action="delete">Löschen</button>
    </article>
</main>
*/

export class Controller {
  constructor() {
    this.model = this.getLocalStorage();
    this.edit = -1;

    // add Todos
    this.eingabe = document.getElementById("todo-input");
    this.einfuegen = document.querySelector("#todo-add");
    this.einfuegen.addEventListener("click", () => this.addTodo());

    // edit Todos
    this.main = document.querySelector("main");
    this.main.addEventListener("click", e => this.action(e));

    // load todos in local storage
    this.render();

    // Execute a function when the user releases a key on the keyboard
    document.addEventListener("keyup", event => {
      // Number 13 is the "Enter" key on the keyboard
      if (event.keyCode === 13) {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        this.einfuegen.click();
      }
    });
  }

  // edit, save and delete Todos
  action(e) {
    let source = e.target;
    if (source.dataset.action == "delete") {
      this.removeTodo(source.dataset.index);
    } else if (source.dataset.action == "edit") {
      this.edit = source.dataset.index;
      this.render();
    } else if (source.dataset.action == "save") {
      let input = document.querySelector("main input").value;
      this.model[this.edit] = input;
      this.setLocalStorage();
      this.edit = -1;
      this.render();
    }
  }

  // remove Todo
  removeTodo(index) {
    this.model.splice(index, 1);
    this.setLocalStorage();
    this.render();
  }

  // add Todo
  addTodo() {
    let value = this.eingabe.value;
    if (value != "") {
      this.model.push(value);
      this.eingabe.value = "";
      this.setLocalStorage();
      this.render();
    }
  }

  // get todos from local Storage
  getLocalStorage() {
    // aussage (ja/nein) ? ja tu was : nein tu was;
    return localStorage.getItem("modelStorage")
      ? JSON.parse(localStorage.getItem("modelStorage"))
      : [];
    // if (localStorage.getItem('modelStorage')) {
    //     return JSON.parse(localStorage.getItem('modelStorage'));
    // }
    // return [];
  }

  // save Todos to local Storage
  setLocalStorage() {
    localStorage.setItem("modelStorage", JSON.stringify(this.model));
  }

  // loop through todos and display on page
  render() {
    this.main.innerHTML = "";

    for (let i = 0; i < this.model.length; i++) {
      let article = document.createElement("article");
      let text = document.createElement("div");
      let button1 = document.createElement("button");
      button1.dataset.index = i;

      if (i == this.edit) {
        let edit = document.createElement("input");
        edit.value = this.model[i];
        text.appendChild(edit);
        button1.innerHTML = "Speichern";
        button1.dataset.action = "save";
      } else {
        text.innerHTML = this.model[i];
        button1.innerHTML = "Editieren";
        button1.dataset.action = "edit";
      }

      let button2 = document.createElement("button");
      button2.innerHTML = "Löschen";
      button2.dataset.index = i;
      button2.dataset.action = "delete";

      article.appendChild(text);
      article.appendChild(button1);
      article.appendChild(button2);

      this.main.appendChild(article);
    }
  }
}
