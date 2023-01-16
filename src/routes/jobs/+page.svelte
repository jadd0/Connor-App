<script lang="ts">
	import Nav from '../__components/__nav/+page.svelte';

	import Admin from './__components/admin/+page.svelte';
	import Writer from './__components/writer/+page.svelte';
	import Client from './__components/client/+page.svelte';

	export let data: {
		username: string;
		name: string;
		uuid: string;
		role: string;
	};

	console.log(data);
</script>

<body>
	<Nav {data} />

	{#if data.role == 'Admin'}
		<Admin {data} />
	{:else if data.role == 'Writer'}
		<Writer {data} />
	{:else}
		<Client {data} />
	{/if}

	<!-- <div class="holder">
    <h1>What are you looking to do?</h1>
    <div class="buttonHolder">
      <a class="choice" href='/jobs/find'><span class="big">FIND</span><span class="small">A JOB</span></a>
      <a class="choice" href='/jobs/post'><span class="big">POST</span><span class="small">A JOB</span></a>
    </div>
  </div> -->
</body>

<style>
	@import '/styles.css';

	body {
		width: calc(100vw - 70px);
		float: right;
	}

	.holder {
		width: 100%;
		height: 100%;

		margin: 0 auto;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.holder > h1 {
		margin-top: -100px;
	}

	.holder > .buttonHolder {
		width: 90%;
		height: 30%;

		margin: 0 auto;
		margin-top: 35px;

		display: flex;
		justify-content: center;
		align-items: center;
		gap: 20px;
	}

	.holder > .buttonHolder > .choice {
		width: 250px;
		height: 150px;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;

		background: #262626;
		border-radius: 10px;

		transition: all 0.3s ease-in-out;
		cursor: pointer;
	}

	.holder > .buttonHolder > .choice:hover {
		transform: scale(1.05);
		background: #2e2e2e;
	}

	.holder > .buttonHolder > .choice > .big {
		font-size: 40px;
		font-family: BoldCircular;
	}

	.holder > .buttonHolder > .choice > .small {
		font-size: 20px;
	}

	h1 {
		color: white;
	}
</style>
