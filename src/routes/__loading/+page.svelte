<script lang="ts">
	import { onMount } from 'svelte';
	import anime from 'animejs';
	console.log(anime);
	let tilesDiv: any;

	const colours = [
		'rgb(229, 57, 54)',
		'rgb(253, 216, 53)',
		'rgb(244, 81, 30)',
		'rgb(76, 175, 80)',
		'rgb(33, 150, 243)',
		'rgb(156, 39, 176)'
	];
	let count = 0;

	function click(index: any) {
		const { columns, rows } = getDimensions();
		anime({
			targets: '.tile',
			backgroundColor: colours[count % (colours.length - 1)],
			opacity: count % 2 ? 1 : 0,
			delay: anime.stagger(count % 2 ? 50 : 50, {
				grid: [columns, rows],
				from: 'center',
				direction: count % 2 == 0 ? 'reverse' : 'normal'
			})
		});

		count += 1;
	}

	function getDimensions() {
		let columns = Math.floor(document.body.clientHeight / 50),
			rows = Math.floor(document.body.clientWidth / 50);

		return { columns, rows };
	}

	function createTile(index: any) {
		const tile = document.createElement('div');

		tile.classList.add('tile');
		// tile.style.border = '1px solid white'
		tile.onclick = (e) => click(index);
		return tile;
	}

	function createTiles(quantity: number) {
		Array.from(Array(quantity)).map((tile, index) => {
			tilesDiv.appendChild(createTile(index));
		});
	}

	function createGrid() {
		tilesDiv.innerHTML = '';

		const { columns, rows } = getDimensions();

		tilesDiv.style.setProperty('--columns', columns);
		tilesDiv.style.setProperty('--rows', rows);

		createTiles(columns * rows);
	}

	function start() {
		const { columns, rows } = getDimensions();
		createTiles(columns * rows);
	}

	onMount(() => {
		console.log(tilesDiv);
		window.addEventListener('resize', createGrid);
		createGrid();
	});
</script>

<div class="tiles" bind:this={tilesDiv} />

<style>
	.tiles {
		height: 100%;
		width: 100vw;

		position: absolute;
		top: 0;

		display: grid;
		grid-template-columns: repeat(var(--columns), 0.75fr);
		grid-template-rows: repeat(var(--rows), 1fr);
	}

	.tile {
		border: 1px solid white;
	}


</style>
