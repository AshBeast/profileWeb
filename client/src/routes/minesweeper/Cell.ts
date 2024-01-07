export class Cell {
	isMine: boolean;
	isRevealed: boolean;
	isFlagged: boolean;
	adjacentMines: number;

	constructor() {
		this.isMine = false;
		this.isRevealed = false;
		this.isFlagged = false;
		this.adjacentMines = 0;
	}

	cellReveal() {
		if (this.isRevealed) return;
		this.isRevealed = true;
	}

	toggleFlag() {
        if (this.isRevealed) return; // Can't flag a cell that's already revealed
        this.isFlagged = !this.isFlagged;
    }
}
