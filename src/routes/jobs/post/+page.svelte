<script lang='ts'>
  import Nav from '../../__components/__nav/+page.svelte'
  import Input from '../../__components/__input/+page.svelte'

  export let data: {
		username: string,
		name: string,
		uuid: string,
		role: string
	};

  let title: string = ''
  let description: string = '';
  let price: number = 0;
  let type: string = ''

  function err() {

  }

  function success() {

  }

  async function postJob() {
    const res = await fetch("/api/job/newJob", {
			method: "post",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
        description,
        price,
        type
			}),
		});

    if (!res.ok) {
      err()
      return
    }

    success()    
  }
</script>

<body>
  <Nav data={data}/>

  <div class="holder">
    <h1>Post a job</h1>
    <div class="formHolder">
      <Input prop='Title' bind:data={title}/>
      <Input prop='Description' bind:data={description}/>
      <Input prop='Price' bind:data={price}/>
      <Input prop='Type' bind:data={type}/>
      <button class="loginButton" on:click={postJob}>Post</button>
    </div>
  </div>

</body>

<style>
  @import '/styles.css';
</style>