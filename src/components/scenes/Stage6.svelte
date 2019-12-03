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

  const copStyle = "display: none;";

  let buzzcardStyle = "height: 0px;";

  const correctBuzzcard = "graphics/buzzcard-real.png";
  const incorrectBuzzCard = "graphics/buzzcard-fake.png";
  let buzzcardSrc = correctBuzzcard;

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    let interval = setInterval(() => {
      if (characterDistanceFromLeft < 320) {
        dispatchComplete();
        clearInterval(interval);
      }

      characterDistanceFromLeft -= 20;
      spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";
    }, 200);
  });

  let numTimes = 8;

  function expandBuzzCard() {
    let i = 0;
    let buzzCardExpand = setInterval(() => {
      i++;
      buzzcardStyle = `height: ${(50 * i) / numTimes}px;`;
      if (i == numTimes) {
        clearInterval(buzzCardExpand);
        slideBuzzCard();
      }
    }, 200);
  }

  function slideBuzzCard() {
    let i = 0;
    let buzzCardSlideOver = setInterval(() => {
      i++;
      buzzcardStyle = `height:50px;margin-left: ${35 - 2 * i}%`;

      if (32 - 2 * i < 20) {
        clearInterval(buzzCardSlideOver);
        shrinkBuzzCard();
      }
    }, 200);
  }

  function shrinkBuzzCard() {
    let i = numTimes;
    let buzzCardShrink = setInterval(() => {
      i--;
      buzzcardStyle = `height:${(50 * i) / numTimes}px;margin-left: 22%`;
      if (i == 0) {
        clearInterval(buzzCardShrink);
        buzzcardStyle = `display:none`;
        if (buzzcardSrc == correctBuzzcard) {
          setTimeout(() => {
            dispatch("buildout");
          }, 1000);
        } else {
          gameOver = true;
        }
      }
    }, 200);
  }

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);
    expandBuzzCard();
  }

  function animateIncorrect() {
    clearInterval(stateListener);
    buzzcardSrc = incorrectBuzzCard;
    expandBuzzCard();
  }
</script>

<style>
  div.stage-6 {
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
    margin-bottom: 4%;
    transform: rotateY(180deg);
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 4%;
    margin-left: 20%;
  }

  .overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .buzzcard img {
    height: 10%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 20%;
    margin-left: 35%;
  }
</style>

<div class="stage-6">
  <div class="background" in:fade>
    <img src="backgrounds/lunchroom.jpg" alt="" />
  </div>

  <div class="sprite">
    <img style={spriteStyle} src="characters/male.png" alt="" />
  </div>

  <div class="cop">
    <img src="characters/policeman.png" alt="" />
  </div>

  <div class="buzzcard">
    <img style={buzzcardStyle} src={buzzcardSrc} alt="" />
  </div>

  {#if gameOver}
    <div in:fade class="overlay">
      <GameOver
        message="Your fake BuzzCard was not found in the database. GTPD searched you, and found the data."
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
