<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  let src = "backgrounds/techgreen1.jpg";

  $: gameOver = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 0;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

  let copDistanceFromLeft = 0;
  let copStyle = "display: none;";

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let interval = setInterval(() => {
      if (characterDistanceFromLeft > 540) {
        copStyle = "display:block";
      }

      if (characterDistanceFromLeft > 460) {
        dispatchComplete();
        clearInterval(interval);
      }

      characterDistanceFromLeft += 20;
      spriteStyle =
        "display:block;margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  });

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);

    let correctInterval = setInterval(() => {
      characterDistanceFromLeft += 20;
      spriteStyle =
        "display:block;margin-left: " + characterDistanceFromLeft + "px;";

      if (characterDistanceFromLeft > 780) {
        clearInterval(correctInterval);
        dispatch("buildout");
      }
    }, 200);
  }

  function animateIncorrect() {
    clearInterval(stateListener);
    src = "backgrounds/hammock.jpg";
    spriteStyle = `display:block;margin-left:${characterDistanceFromLeft}px;margin-bottom: 5%`;

    let incorrectInterval = setInterval(() => {
      characterDistanceFromLeft -= 20;
      spriteStyle =
        "display:block;margin-left: " +
        characterDistanceFromLeft +
        "px;margin-bottom: 5%";

      if (characterDistanceFromLeft < 380) {
        clearInterval(incorrectInterval);
        spriteStyle = `display:block;margin-left:${characterDistanceFromLeft}px;transform: rotate(-85deg);margin-bottom: 5%`;
        copStyle = "display:block;";

        setTimeout(() => (gameOver = true), 1500);
      }
    }, 200);
  }
</script>

<style>
  div.stage-3 {
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
    margin-bottom: 11%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 3%;
    margin-left: 80%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="stage-3">
  <div class="background" in:fade>
    <img {src} alt="" />
  </div>

  <div class="sprite">
    <img style={spriteStyle} src="characters/male.png" alt="" />
  </div>

  <div class="cop">
    <img style={copStyle} src="characters/policeman.png" alt="" />
  </div>
  {#if gameOver}
    <div in:fade class="overlay">
      <GameOver
        message="You eventually fell asleep and got caught by GTPD!"
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
