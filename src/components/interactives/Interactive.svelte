<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Button from "../components/Button.svelte";
  import { type } from "../../utils/type";

  export let script = "";
  export let buttons = [];

  const dispatch = createEventDispatcher();

  let texts = [""];

  let showButtons = false;

  onMount(() => {
    type(script, text => {
      texts = text;
    }).then(() => (showButtons = true));
  });
</script>

<style>
  .interactive {
    width: 100%;
    text-align: center;
    padding: 2em;
  }

  p {
    line-height: 2rem;
    font-variant-ligatures: no-common-ligatures;
    color: white;
  }
  /* 
  .flex {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
  } */

  .text {
    /* max-width: 70%; */
    text-align: center;
  }

  .buttons {
    margin-right: -10px;
    /* max-width:50%; */
    text-align: center;
  }

  .button {
    max-width: 45%;
    display: inline-block;
  }
</style>

<div class="interactive">

  <div class="flex-box text">
    {#each texts as text}
      <p>{text}</p>
    {/each}
  </div>
  <div class="flex-box buttons">
    {#if showButtons}
      {#each buttons as button, i}
        <div class="button">
          <Button on:click={() => dispatch('option', i)}>{button}</Button>
        </div>
      {/each}
    {:else}
      <div style="opacity: 0">
        {#each buttons as button, i}
          <div class="button">
            <Button on:click={() => dispatch('option', i)}>{button}</Button>
          </div>
        {/each}
      </div>
    {/if}
  </div>

</div>
