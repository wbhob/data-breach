<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";
  import Win from "../components/Win.svelte";

  export let correct;
  export let incorrect;

  $: gameOver = false;
  $: win = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 140;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
  let spriteSrc = "characters/male.png";

  let copDistanceFromLeft = 20;
  let copStyle = `margin-left: ${copDistanceFromLeft}px`;

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let i = 0;
    let interval = setInterval(() => {
      if (characterDistanceFromLeft > 340) {
        dispatchComplete();
        clearInterval(interval);
      }

      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
      if (i > 2) {
        copDistanceFromLeft += 20;
        copStyle = `margin-left: ${copDistanceFromLeft}px`;
      }
      i++;
    }, 200);
  });

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);
    moveCharactersForward();
  }

  function moveCharactersForward() {
    let i = 0;
    let correctInterval = setInterval(() => {
      if (i == 5) {
        clearInterval(correctInterval);
        spriteSrc = "characters/scooter-dude.png";
        scootAway();
      }

      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

      copDistanceFromLeft += 33;
      copStyle = `margin-left: ${copDistanceFromLeft}px`;
      i++;
    }, 200);
  }

  function scootAway() {
    let i = 0;
    let scooterInterval = setInterval(() => {
      if (i == 9) {
        clearInterval(scooterInterval);
        win = true;
      }

      characterDistanceFromLeft += 40;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

      copDistanceFromLeft += 20;
      copStyle = `margin-left: ${copDistanceFromLeft}px`;
      i++;
    }, 200);
  }

  function animateIncorrect() {
    clearInterval(stateListener);

    let incorrectInterval = setInterval(() => {
      if (copDistanceFromLeft + 50 > characterDistanceFromLeft) {
        clearInterval(incorrectInterval);
        setTimeout(() => {
          gameOver = true;
        }, 1000);
      }

      characterDistanceFromLeft += 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

      copDistanceFromLeft += 33;
      copStyle = `margin-left: ${copDistanceFromLeft}px`;
    }, 200);
  }
</script>

<style>
  div.stage-8 {
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
    margin-bottom: 7%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 7%;
    margin-left: 40%;
  }
  .scooter img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 10%;
    margin-left: 53%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .black {
    height: 100%;
    width: 300px;
    overflow: hidden;
    margin-left: 100%;
    position: absolute;
    background-color: black;
    border-left: 5px solid white;
    top: 0;
  }
</style>

<div class="stage-8">
  <div class="background" in:fade>
    <img src="backgrounds/street.jpg" alt="" />
  </div>
  {#if spriteSrc != 'characters/scooter-dude.png'}
    <div class="scooter">
      <img style src="characters/scooter.png" alt="" />
    </div>
  {/if}
  <div class="sprite">
    <img style={spriteStyle} src={spriteSrc} alt="" />
  </div>

  <div class="cop">
    <img style={copStyle} src="characters/policeman.png" alt="" />
  </div>

  {#if gameOver}
    <div in:fade class="overlay">
      <GameOver
        message="You couldn't outrun GTPD and got arrested!"
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}

  {#if win}
    <div in:fade class="overlay">
      <Win on:playagain={() => dispatch('playagain')} />
    </div>
  {/if}

  <div class="black" />
</div>
