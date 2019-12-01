<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  $: gameOver = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 20;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

  let copDistanceFromLeft = 0;
  let copStyle = "";

  let foreground = "backgrounds/window.png";
  let foregroundStyle = "";

  function breakWindow() {
    foreground = "backgrounds/window-cracked.png";
    foregroundStyle = "z-index: 1000";
  }

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let interval = setInterval(() => {
      if (characterDistanceFromLeft > 200) {
        dispatchComplete();
        clearInterval(interval);
      }

      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  });

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);
    moveCharacterBack();
  }

  function moveCharacterBack() {
    let charAnimation = setInterval(() => {
      characterDistanceFromLeft -= 30;
      spriteStyle = "transform: rotateY(180deg);margin-left: " + characterDistanceFromLeft + "px";

      if (characterDistanceFromLeft < 140) {
        clearInterval(charAnimation);
        moveCharacterOutOfWindow();
      }
    }, 200);
  }

  let characterDistanceFromBottom = 8;

  function moveCharacterOutOfWindow() {
    let charAnimation = setInterval(() => {
      characterDistanceFromBottom += 2;
      spriteStyle = `transform: rotateY(180deg);margin-left: ${characterDistanceFromLeft}px;margin-bottom:${characterDistanceFromBottom}%`;

      if (characterDistanceFromBottom > 16) {
        clearInterval(charAnimation);
        moveCharacterOutBackToGround();
        breakWindow();
      }
    }, 200);
  }

  function moveCharacterOutBackToGround() {
    let charAnimation = setInterval(() => {
      characterDistanceFromBottom -= 2;
      spriteStyle = `transform: rotateY(180deg);z-index: 3;margin-left: ${characterDistanceFromLeft}px;margin-bottom:${characterDistanceFromBottom}%`;

      if (characterDistanceFromBottom < 8) {
        clearInterval(charAnimation);
        exitCharacter();
      }
    }, 200);
  }

  function exitCharacter() {
    let charAnimation = setInterval(() => {
      characterDistanceFromLeft -= 30;
      spriteStyle = `transform: rotateY(180deg);z-index: 3;margin-left: ${characterDistanceFromLeft}px`;

      if (characterDistanceFromLeft < 20) {
        clearInterval(charAnimation);
        dispatch("buildout");
      }
    }, 200);
  }

  function animateIncorrect() {
    clearInterval(stateListener);

    let incorrectInterval = setInterval(() => {
      if (characterDistanceFromLeft < 300) {
        clearInterval(incorrectInterval);
        setTimeout(() => {
          copStyle = "transform: rotate(90deg); margin-bottom: 0%";
          setTimeout(() => {
            copStyle = "";
            setTimeout(() => {
              spriteStyle = `display:block;margin-left: ${characterDistanceFromLeft - 40}px;margin-bottom: -1%;transform:rotate(-90deg)`;
              setTimeout(() => {
                gameOver = true;
              }, 1000);
            }, 1000);
          }, 1000);
        }, 800);
      }

      characterDistanceFromLeft += 20;
      spriteStyle = `display:block;margin-left: ${characterDistanceFromLeft}px`;
    }, 200);
  }
</script>

<style>
  div.stage-7 {
    height: 100%;
    width: 100%;
    position: relative;
  }
  .background,
  .background img {
    height: 100%;
    width: 100%;
    z-index: 1;
  }
  .background-2,
  .background-2 img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 5;
  }
  .foreground,
  .foreground img {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 6;
  }
  .sprite img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
    z-index: 7;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
    margin-left: 40%;
    z-index: 8;
  }
  .cop2 img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 6%;
    margin-left: 53%;
    z-index: 8;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 80;
  }
</style>

<div class="stage-7">
  <div class="background" in:fade>
    <img src="backgrounds/street.jpg" alt="" />
  </div>

  <div class="background-2" in:fade>
    <img src="backgrounds/door-background.png" alt="" />
  </div>
  <div class="foreground" in:fade>
    <img src={foreground} style={foregroundStyle} alt="" />
  </div>

  <div class="sprite">
    <img style={spriteStyle} src="characters/male.png" alt="" />
  </div>

  <div class="cop">
    <img style={copStyle} src="characters/policeman.png" alt="" />
  </div>

  <div class="cop2">
    <img style={copStyle} src="characters/policeman.png" alt="" />
  </div>

  {#if gameOver}
    <div in:fade class="overlay">
      <GameOver
        message="That was a mistake; you really think you're strong enough to overpower two GTPD officers?"
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
