<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  $: gameOver = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 0;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

  let copDistanceFromLeft = 0;
  let copStyle =
    "display: none;margin-left: " + copDistanceFromLeft + "px";

  let folderDistanceFromLeft = 300;
  let folderDistanceFromBottom = 200;
  let folderStyle = `margin-left:${folderDistanceFromLeft}px; margin-bottom:${folderDistanceFromBottom}px`;

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let interval = setInterval(() => {
      if (characterDistanceFromLeft > 500) {
        showFileFolder();
        clearInterval(interval);
      }
      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  });

  function showFileFolder() {
    let reverse = false;
    let interval = setInterval(() => {
      if (folderDistanceFromLeft > 530) {
        let i = 0;

        let interval2 = setInterval(() => {
          folderStyle = `z-index: 80;margin-left:${folderDistanceFromLeft}px; margin-bottom:${folderDistanceFromBottom}px;height:${10 -
            2.5 * i}%`;
          i++;
          if (i == 5) {
            clearInterval(interval2);
            dispatchComplete();
          }
        }, 200);
        clearInterval(interval);
      }

      folderDistanceFromLeft += 17;

      if (folderDistanceFromBottom > 300) reverse = true;

      if (reverse) folderDistanceFromBottom -= 15;
      else folderDistanceFromBottom += 15;
      folderStyle = `z-index: 80;margin-left:${folderDistanceFromLeft}px; margin-bottom:${folderDistanceFromBottom}px`;
    }, 200);
  }

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);

    let correctInterval = setInterval(() => {
      if (characterDistanceFromLeft > 760) {
        clearInterval(correctInterval);
        dispatch("buildout");
      }
      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  }

  function animateIncorrect() {
    clearInterval(stateListener);

    let incorrectInterval = setInterval(() => {
      if (copDistanceFromLeft > 360) {
        gameOver = true;
        clearInterval(incorrectInterval);
      }

      copDistanceFromLeft += 30;
      copStyle = "display:block;margin-left: " + copDistanceFromLeft + "px";
    }, 200);
  }
</script>

<style>
  div.stage-1 {
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
    margin-bottom: 5%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 5%;
  }
  .folder img {
    height: 10%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 5%;
    /* display: none; */
  }
  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
</style>

<div class="stage-1">
  <div class="background" in:fade>
    <img src="backgrounds/office1.jpg" alt="" />
  </div>
  <div class="folder">
    <img style={folderStyle} src="graphics/file-folder.png" alt="" />
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
        message="You were in the Dean's office and got caught!"
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
