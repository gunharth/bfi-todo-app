<script>
  import db from "./firebase.js";
  import { fade, slide } from 'svelte/transition'
  // import TodosList from "./components/TodosList.svelte"

  let todos = [];
  let newTodoValue = "";

  db.collection("todo")
    .onSnapshot(snapData => todos = snapData.docs )

  function addTodo() {
    let todo = { desc: newTodoValue}
    db.collection("todo").add(todo);
  }

  function deleteTodo(id) {
    db.collection("todo").doc(id).delete();
  }

  function updateTodo(id, descValue) {
    db.collection("todo").doc(id).update({desc: descValue});
  }

</script>

<h1>Todos</h1>
<input type="text" bind:value="{newTodoValue}">
<button on:click={addTodo}>Save</button>
<ul>
	{#each todos as todo}
	 	<li transition:slide>
      <button on:click={deleteTodo(todo.id)}>X</button>
      {#if todo.editMode == true}
        <input type="text" value={todo.data().desc} bind:this={todo.inputTodoValue}>
        <button on:click={updateTodo(todo.id, todo.inputTodoValue.value)}>Update</button>
      {:else}
        <span on:click="{() => {
        todo.editMode = true;
        todos = todos;
        }}">{todo.data().desc}</span>
      {/if}
     </li>
	{/each}
</ul>

<!-- <TodosList {todos} /> -->
