<script>
    export let todos;
</script>

<h1>Liste</h1>

<ul>
	{#each todos as todo}
	 	<li>{todo.id} {todo.data().desc}</li>
	{/each}
</ul>
