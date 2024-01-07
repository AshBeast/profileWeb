<script lang="ts">
	console.log(`starting page`);

	import { Minesweeper } from './Minesweeper';
	import type { Cell } from './Cell';
	import { onMount, beforeUpdate } from 'svelte';

	let game: Minesweeper;

	function initializeGame() {
		game = new Minesweeper(12, 12, 0.2);
	}

	onMount(() => {
		initializeGame();
		window.addEventListener('beforeunload', onBeforeUnload);
	});

	beforeUpdate(() => {
		window.removeEventListener('beforeunload', onBeforeUnload);
	});

	function onBeforeUnload(event: BeforeUnloadEvent) {
		// This will display a confirmation dialog before leaving/reloading the page
		event.preventDefault();
		event.returnValue = '';
	}

	function onCellClick(cell: Cell, rowIndex: number, colIndex: number) {
		console.log(`Cell clicked: ${rowIndex}, ${colIndex}`);
		game.cellReveal(cell, rowIndex, colIndex);
		game.grid = game.grid; // Reassign the grid to trigger reactivity
	}

	function onRightClick(event: MouseEvent, cell: Cell) {
		event.preventDefault(); // Prevent the default context menu
		game.toggleFlag(cell);
		game.grid = game.grid; // Reassign the grid to trigger reactivity
	}

	game = new Minesweeper(12, 12, 0.2);
</script>

<svelte:head>
	<title>Minesweeper</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>Minesweeper</h1>
	<p>not finished yet.... come back soon</p>
</div>
<div id="minesweeper">
	<div class="grid">
		{#each game.grid as row, rowIndex}
			<div class="row">
				{#each row as cell, colIndex}
					<button
						on:click={() => onCellClick(cell, rowIndex, colIndex)}
						on:contextmenu={(event) => onRightClick(event, cell)}
						class={cell.isRevealed ? 'revealed' : ''}
					>
						<div class="button-content">
							{#if cell.isRevealed}
								<span class={cell.isMine ? 'bomb' : 'number'}>
									{cell.isMine ? '💣' : cell.adjacentMines || ''}
								</span>
							{:else if cell.isFlagged}
								<span class="flag">🚩</span>
							{/if}
						</div>
					</button>
				{/each}
			</div>
		{/each}
	</div>
</div>
<button on:click={initializeGame}>New Game</button>

<style>
	#minesweeper {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: auto;
		background-color: rgba(190, 230, 255, 0.768);
		padding: 1em;
		box-sizing: border-box;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(12, 1fr); /* 12 columns as per your Minesweeper size */
		gap: 1px;
	}

	button {
		background: #ccc;
		border: 1px solid #dddddd;
		border-radius: 4px;
		width: calc(
			(600px - (11 * 2px)) / 12
		); /* Calculate the width based on the max-width of the grid and the gap */
		height: calc((600px - (11 * 2px)) / 12); /* Height matches width to keep cells square */
		position: relative; /* Allows absolute positioning inside the button */
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
		user-select: none;

		display: flex;
		justify-content: center;
		align-items: center;
		overflow: hidden; /* Prevent content from affecting button size */
	}

	.button-content {
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center; /* Center text for single numbers */
		width: 100%;
		height: 100%;
	}

	.revealed {
		background: rgb(212, 255, 255);
	}

	.bomb,
	.number,
	.flag {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
	}

	.flag {
		font-size: 1.5rem; /* Larger size for visibility */
	}
</style>
