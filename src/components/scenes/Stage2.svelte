<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  $: gameOver = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 700;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

  let copStyle = "display: none;";

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let interval = setInterval(() => {
      if (characterDistanceFromLeft < 520) {
        dispatchComplete();
        clearInterval(interval);
      }
      characterDistanceFromLeft -= 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  });

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);
    dispatch("buildout");
  }

  function animateIncorrect() {
    clearInterval(stateListener);

    let incorrectInterval = setInterval(() => {
      if (characterDistanceFromLeft < 240) {
        copStyle = "display:block";
      }

      if (characterDistanceFromLeft < 160) {
        gameOver = true;
        clearInterval(incorrectInterval);
      }

      characterDistanceFromLeft -= 40;
      spriteStyle = `display:block;margin-left:${characterDistanceFromLeft}px`;
    }, 200);
  }
</script>

<style>
  div.stage-2 {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .background,
  .background img {
    height: 100%;
    width: 100%;
  }
  .sprite img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
  }
  .faculty img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
    margin-left: 40%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="stage-2">
  <div class="background" in:fade>
    <img src="backgrounds/hallway1.jpg" alt="" />
  </div>

  <div class="sprite">
    <img style={spriteStyle} src="characters/male.png" alt="" />
  </div>

  <div class="faculty">
    <img src="characters/girl.png" alt="" />
  </div>

  <div class="cop">
    <img style={copStyle} src="characters/policeman.png" alt="" />
  </div>
  {#if gameOver}
    <div in:fade class="overlay">
      <GameOver
        message="Faculty found you suspicious and reported you to GTPD."
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
