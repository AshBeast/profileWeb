<script lang="ts">
	import { page } from '$app/stores';
	import github from '$lib/images/github.svg';
	import linkedin from '$lib/images/linked.png';
	import logo from '$lib/images/logo.jpeg';
	import scaryImageSrc from '$lib/images/scary.jpg';

	import { onMount } from 'svelte';
	let clickCount = 0;
	let clickTimer = 0;
	let showScaryImage = false;

	function handleClick() {
		clickCount++;
		if (clickCount === 1) {
			// Start the timer when the first click is detected
			clickTimer = setTimeout(() => {
				clickCount = 0; // Reset the count after 5 seconds
			}, 5000);
		}

		if (clickCount === 3) {
			// If the logo is clicked thrice, show the scary image
			showScaryImage = true;
			clickCount = 0; // Reset the count
			clearTimeout(clickTimer); // Clear the timer
			// Hide the scary image after 2 seconds
			setTimeout(() => {
				showScaryImage = false;
			}, 2000);
		}
	}

	onMount(() => {
		return () => {
			// Clean up the timer when the component is destroyed
			clearTimeout(clickTimer);
		};
	});
</script>

<header>
	<div class="corner">
		<a on:click|preventDefault={handleClick}>
			<img class="logo" src={logo} alt="" />
		</a>
	</div>

	<nav>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/education' ? 'page' : undefined}>
				<a href="/education">Education</a>
			</li>
			<li aria-current={$page.url.pathname === '/projects' ? 'page' : undefined}>
				<a href="/projects">Projects</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname === '/minesweeper' ? 'page' : undefined}>
				<a href="/minesweeper">Minesweeper</a>
			</li>
			<!-- <li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li> -->
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>
	<div class="corner">

	</div>
</header>
{#if showScaryImage}
<div class="scary-image-container">
	<img src={scaryImageSrc} alt="Scary Image" />
</div>
{/if}
<style>
	.logo {
		/* This creates a circle shape for the image */
		border-radius: 50%;

		/* Additional styles to ensure the image scales properly */
		width: 100px; /* or any other size */
		height: 100px; /* this should match the width to maintain the aspect ratio */
	}

	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		display: flex; /* This will arrange the child elements (the links) in a row */
		justify-content: space-around; /* This will space the child elements evenly */
		align-items: center; /* This will center the child elements vertically */
		width: 6em; /* Adjust the width as needed to contain both icons */
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 50%; /* Each link will take up half of the container width */
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}

	.scary-image-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000; /* Ensure it's above everything else */
	}

	.scary-image-container img {
		max-width: 90%; /* Adjust as needed */
		max-height: 90%; /* Adjust as needed */
		object-fit: contain;
	}
</style>
