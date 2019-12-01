<script context="module">

</script>

<script>
  import { createEventDispatcher } from "svelte";
  import Interactive0 from "../interactives/Interactive0.svelte";
  import Interactive1 from "../interactives/Interactive1.svelte";
  import Interactive2 from "../interactives/Interactive2.svelte";
  import Interactive3 from "../interactives/Interactive3.svelte";
  import Interactive4 from "../interactives/Interactive4.svelte";
  import Interactive51 from "../interactives/Interactive5-1.svelte";
  import Interactive52 from "../interactives/Interactive5-2.svelte";
  import Interactive6 from "../interactives/Interactive6.svelte";
  import Interactive7 from "../interactives/Interactive7.svelte";
  import Interactive8 from "../interactives/Interactive8.svelte";
  import { showOptions } from "./interactive";

  const dispatch = createEventDispatcher();

  export let stage;
  export let interactiveStage;

  export let techgreen;

  let show = true;
  showOptions.subscribe(val => (show = val));

  function dispatchCorrect() {
    select();
    dispatch("correct");
  }

  function dispatchIncorrect() {
    select();
    dispatch("incorrect");
  }

  function dispatchTechGreen() {
    select();
    dispatch("techgreen");
  }

  function select() {
    showOptions.set(false);
  }
</script>

<style>
  .interactive-module {
    height: 240px;
    width: 882px;
    border: 5px solid white;
    display: flex;
    align-items: center;
  }
</style>

<div class="interactive-module">
  {#if stage == interactiveStage && show}
    {#if stage == 0}
      <Interactive0 on:correct={dispatchCorrect} />
    {/if}
    {#if stage == 1}
      <Interactive1
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
    {#if stage == 2}
      <Interactive2
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
    {#if stage == 3}
      <Interactive3
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
    {#if stage == 4}
      <Interactive4
        on:correct={event => {
          if (event.detail == 0) {
            dispatchTechGreen();
          } else {
            dispatchCorrect();
          }
        }} />
    {/if}
    {#if stage == 5}
      {#if techgreen}
        <Interactive51
          on:correct={dispatchCorrect}
          on:incorrect={dispatchIncorrect} />
      {:else}
        <Interactive52
          on:correct={dispatchCorrect}
          on:incorrect={dispatchIncorrect} />
      {/if}
    {/if}
    {#if stage == 6}
      <Interactive6
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
    {#if stage == 7}
      <Interactive7
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
    {#if stage == 8}
      <Interactive8
        on:correct={dispatchCorrect}
        on:incorrect={dispatchIncorrect} />
    {/if}
  {/if}
</div>
