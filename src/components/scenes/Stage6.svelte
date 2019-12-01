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

  const correctBuzzcard = "https://via.placeholder.com/50x30";
  const incorrectBuzzCard = "https://via.placeholder.com/50x30";
  let buzzcardSrc = correctBuzzcard;

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

  function expandBuzzCard() {
    let i = 0;
    let buzzCardExpand = setInterval(() => {
      i++;
      console.log((50 * i) / 4);
      buzzcardStyle = `height: ${(50 * i) / 4}px;`;
      if (i == 4) {
        clearInterval(buzzCardExpand);
        slideBuzzCard();
      }
    }, 200);
  }

  function slideBuzzCard() {
    let i = 0;
    let buzzCardSlideOver = setInterval(() => {
      i++;
      buzzcardStyle = `height:50px;margin-left: ${55 - 3 * i}%`;

      if (55 - 3 * i < 40) {
        clearInterval(buzzCardSlideOver);
        shrinkBuzzCard();
      }
    }, 200);
  }

  function shrinkBuzzCard() {
    let i = 4;
    let buzzCardShrink = setInterval(() => {
      i--;
      buzzcardStyle = `height:${(50 * i) / 4}px;margin-left: 42%`;
      if (i == 0) {
        clearInterval(buzzCardShrink);
        buzzcardStyle = `display:none`;
        if (buzzcardSrc == correctBuzzcard) {
          dispatch("buildout");
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
    margin-bottom: 8%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 8%;
    margin-left: 40%;
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
    margin-left: 55%;
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
        message="Faculty found you suspicious and reported you to GTPD."
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
