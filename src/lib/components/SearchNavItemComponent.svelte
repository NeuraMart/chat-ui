<script>
	/**
	 * @type {any}
	 */
	export let searchTerm;

	import SearchIcon from "~icons/carbon/search";
</script>

<div
	id="search-input-cont"
	class=" flex h-10 w-full items-center justify-center gap-2 rounded-3xl border bg-white px-2 py-0.5 text-center shadow-sm focus:bg-gray-500 focus:ring hover:shadow-none dark:border-gray-600 dark:bg-gray-700"
>
	<SearchIcon style="font-size: 22px " />
	<input
		type="text"
		id="search-field"
		placeholder="Find chat history"
		class=" w-full border-none bg-white text-gray-800 focus:border-none focus:bg-gray-500 focus:outline-none hover:border-none dark:bg-gray-700 dark:text-gray-200"
		bind:value={searchTerm}
		on:input
	/>
</div>

<!-- <style>
	#search-input-cont {
		width: 100%;
		display: flex;
		align-items: center;
		height: 100%;
	}

	#search-field {
		width: 100%;
		font-size: 1.3rem;
		border: 1px solid gray;
		border-radius: 5px;
		padding: 8px;
		margin: 0 1px 0;
	}
</style> -->
