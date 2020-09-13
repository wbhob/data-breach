<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";
  import Button from "./Button";

  const dispatch = createEventDispatcher();

  export let message;
  let showButton = false;

  let texts = [];

  let script = `${message}

  Credits
  Story - REDACTED
  Graphics - Nathan Davenport
  Engineering - Wilson Hobbs
  `;

  onMount(() => {
    type(script, text => (texts = text)).then(() => (showButton = true));
  });
</script>

<style type="text/scss">
  div.flex {
    height: 100%;
    width: 100%;
    text-align: center;
    background-color: blue;
  }
  .container {
    padding: 3em;
  }
  p {
    font-size: 14px;
  }
</style>

<div class="flex">
  <div class="container">
    <h1>THE END</h1>

    {#each texts as text}
      <p>{text}&nbsp;</p>
    {/each}

    {#if showButton}
      <div transition:fade>
        <Button on:click={() => dispatch('playagain')}>Play Again</Button>
      </div>
    {/if}
  </div>
</div>
