<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import Stage0 from "../scenes/Stage0.svelte";
  import Stage1 from "../scenes/Stage1.svelte";
  import Stage2 from "../scenes/Stage2.svelte";
  import Stage3 from "../scenes/Stage3.svelte";
  import Stage4 from "../scenes/Stage4.svelte";
  import Stage51 from "../scenes/Stage5-1.svelte";
  import Stage52 from "../scenes/Stage5-2.svelte";
  import Stage6 from "../scenes/Stage6.svelte";
  import Stage7 from "../scenes/Stage7.svelte";
  import Stage8 from "../scenes/Stage8.svelte";

  export let stage;

  export let correct;
  export let incorrect;

  export let techgreen;

  const dispatch = createEventDispatcher();
</script>

<style>
  .scene {
    height: 500px;
    width: 882px;
    border: 5px solid white;
  }
</style>

<div class="scene">
  {#if stage == 0}
    <Stage0 on:complete on:buildout {correct} />
  {/if}
  {#if stage == 1}
    <Stage1 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 2}
    <Stage2 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 3}
    <Stage3 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 4}
    <Stage4 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 5}
    {#if techgreen}
      <Stage51 on:complete on:buildout {correct} {incorrect} />
    {:else}
      <Stage52 on:complete on:buildout {correct} {incorrect} />
    {/if}
  {/if}
  {#if stage == 6}
    <Stage6 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 7}
    <Stage7 on:complete on:buildout {correct} {incorrect} />
  {/if}
  {#if stage == 8}
    <Stage8 on:complete on:buildout on:playagain {correct} {incorrect} />
  {/if}
</div>
