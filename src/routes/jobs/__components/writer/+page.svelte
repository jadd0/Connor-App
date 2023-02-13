<script lang='ts'>
  import Input from '../../../__components/__input/+page.svelte'

  export let data: {
		username: string,
		name: string,
		uuid: string,
		role: string
	};

  let jobs: any = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]
  let colours: string[] = ['red', 'green', 'yellow', 'blue', 'orange', 'purple', 'pink', 'black', 'light gray']
 
</script>


  <div class="holder">
    <div id="filters"></div>
    <div id="content">
      {#each jobs as job}
        <div class="job">
          <div class="colourHolder" style='background: {colours[Math.floor(Math.random() * 8)]}'>

          </div>
        </div>
      {/each}
    </div>
  </div>

<style>
  @import '/styles.css';

  .holder {
    width: 80vw;
    height: 100vh;
    margin: 0 auto;
  }

  .holder > #filters {
    width: 100%;
    height: 10%;
  }

  .holder > #content {
    width: 100%;
    height: 150vh;
    display: grid;
    grid-template-columns: auto;
    gap: 0px 50px;
  }

  .holder > #content > .job {
    height: 400px;
    background-image: linear-gradient(to bottom right, #4b62fa, #ba89dd, #fdb973);
    border-radius: 20px;
  }

  /* .holder > #content > .job > .colourHolder {
    height: 50px;
    width: 100%;
  } */


</style>