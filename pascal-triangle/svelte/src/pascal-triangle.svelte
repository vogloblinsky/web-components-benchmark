<svelte:options tag="pascal-triangle"/>

<script>
	function generateData(rows) {
		const n = rows;

		const data = [];
		data[0] = [1];
		data[1] = [1, 1];

		for (let row = 2; row < n; row++) {
			data[row] = [1];

			for (let col = 1; col <= row - 1; col++) {
				const prevRow = data[row - 1];
				data[row][col] = prevRow[col] + prevRow[col - 1];
				data[row].push(1);
			}
		}
		return data;
	}

	let list = generateData(100);

	function handleLoad(event) {
		console.log('handleLoad: ',  event.target.dataset.value);
		list = generateData(event.target.dataset.value);
	}
</script>

<div>
    <button on:click={handleLoad} data-value="10">
        Load 10
    </button>
    <button  on:click={handleLoad} data-value="100">
        Load 100
    </button>
    <button on:click={handleLoad} data-value="500">
        Load 500
    </button>
</div>
<div>
    {#each list as line}
		<div>
			{#each line as item}
					<triangle-item text={item} />
			{/each}
		</div>
    {/each}
</div>
