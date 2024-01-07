import { Cell } from './Cell';

export class Minesweeper {
	width: number;
	height: number;
	grid: Cell[][];

	constructor(width: number, height: number, minePercent: number) {
		this.width = width;
		this.height = height;
		this.grid = this.createGrid();
		this.placeMines(minePercent);
		this.calculateAdjacency();
	}

	private createGrid(): Cell[][] {
		// Initialize grid with zeros
		const grid = Array.from({ length: this.height }, () =>
			Array.from({ length: this.width }, () => new Cell())
		);

		// Add mines and numbers to the grid
		// ... (this part of the logic will be implemented later)

		return grid;
	}

	private placeMines(minePercent: number): void {
		const totalCells = this.width * this.height;
		const mineCount = Math.floor(totalCells * minePercent);

		let minesPlaced = 0;
		while (minesPlaced < mineCount) {
			const rowIndex = Math.floor(Math.random() * this.height);
			const colIndex = Math.floor(Math.random() * this.width);

			const cell = this.grid[rowIndex][colIndex];
			if (!cell.isMine) {
				cell.isMine = true;
				minesPlaced++;
			}
		}
	}

	private calculateAdjacency(): void {
		for (let rowIndex = 0; rowIndex < this.height; rowIndex++) {
			for (let colIndex = 0; colIndex < this.width; colIndex++) {
				if (this.grid[rowIndex][colIndex].isMine) continue;

				// Check surrounding cells for mines
				let mines = 0;
				for (let y = -1; y <= 1; y++) {
					for (let x = -1; x <= 1; x++) {
						if (y === 0 && x === 0) continue;
						const newY = rowIndex + y;
						const newX = colIndex + x;
						if (newY >= 0 && newY < this.height && newX >= 0 && newX < this.width) {
							if (this.grid[newY][newX].isMine) mines++;
						}
					}
				}
				this.grid[rowIndex][colIndex].adjacentMines = mines;
			}
		}
	}

	private revealAdjacentCells(row: number, col: number) {
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				if (y === 0 && x === 0) continue; // Skip the current cell

				const newY = row + y;
				const newX = col + x;

				// Check bounds
				if (newY >= 0 && newY < this.height && newX >= 0 && newX < this.width) {
					const adjacentCell = this.grid[newY][newX];
					if (!adjacentCell.isMine && !adjacentCell.isRevealed) {
						adjacentCell.cellReveal();

						// If an adjacent cell also has 0 adjacent mines, reveal its neighbors recursively
						if (adjacentCell.adjacentMines === 0) {
							this.revealAdjacentCells(newY, newX);
						}
					}
				}
			}
		}
	}

	cellReveal(cell: Cell, row: number, col: number){
		if (cell.isFlagged){
			cell.toggleFlag();
			return;
		}
		cell.cellReveal();
		if (cell.isMine){
			alert("You lost!");
			return;
		}
		if (cell.adjacentMines === 0) {
			this.revealAdjacentCells(row, col);
		}
		if (this.checkWin()){
			alert("You won!");
		}
	}

	toggleFlag(cell: Cell){
		cell.toggleFlag();
		if (this.checkWin()){
			alert("You won!");
		}
	}

	private checkWin(): boolean {
		let mineCount = 0;
		let flagCount = 0;
		let revealedCount = 0;
	  
		for (let row of this.grid) {
		  for (let cell of row) {
			if (cell.isMine) {
			  mineCount++;
			  if (cell.isFlagged) {
				flagCount++;
			  }
			} else if (cell.isRevealed) {
			  revealedCount++;
			}
		  }
		}
	  
		// Win condition: all mines are flagged and all non-mine cells are revealed
		return flagCount === mineCount && revealedCount === (this.width * this.height - mineCount);
	}
}
// <style>
// 	#minesweeper {
// 		display: flex;
// 		justify-content: center;
// 		margin: 0 auto;
// 		background-color: rgba(190, 230, 255, 0.768); /* Corrected RGBA syntax */
// 	}
// 	.grid {
// 		display: grid;
// 		gap: 4px; /* Adjust the gap size as needed */
// 	}
// 	.row {
// 		display: flex;
// 	}
// 	button {
// 		background: #ccc; /* Slightly darker background for unrevealed cells */
// 		border: 1px solid #ddddddc1; /* Light grey border */
// 		border-radius: 4px; /* Rounded corners */
// 		width: 40px; /* Fixed width */
// 		height: 40px; /* Fixed height */
// 		box-sizing: border-box; /* Include padding and border in the element's total width and height */
// 		display: flex;
// 		align-items: center; /* Center content vertically */
// 		justify-content: center; /* Center content horizontally */
// 		font-size: 1rem; /* Font size */
// 		font-weight: bold; /* Bold font weight */
// 		cursor: pointer; /* Pointer cursor on hover */
// 		user-select: none; /* Prevents text selection */
// 	}
// 	/* Styling for the bomb icon and numbers to ensure consistent rendering */
// 	.revealed {
// 		background: rgb(212, 255, 255); /* Cyan background */
// 	}
// </style>