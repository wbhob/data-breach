<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  let src = "backgrounds/northave.jpg";

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
      if (characterDistanceFromLeft > 340) {
        copStyle = "display:block";
      }

      if (characterDistanceFromLeft > 260) {
        dispatchComplete();
        clearInterval(interval);
      }

      characterDistanceFromLeft += 10;
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

      if (characterDistanceFromLeft > 820) {
        clearInterval(correctInterval);
        dispatch("buildout");
      }
    }, 200);
  }

  function animateIncorrect() {
    clearInterval(stateListener);
    spriteStyle = `display:block;height: 50%;margin-left:${characterDistanceFromLeft}px`;
    src = "backgrounds/dorm.jpg";
    let characterDistanceFromBottom = 4;

    let incorrectInterval = setInterval(() => {
      if (characterDistanceFromLeft < 600) {
        characterDistanceFromLeft += 20;
        spriteStyle = `display:block;height: 50%;margin-left:${characterDistanceFromLeft}px;margin-bottom:${characterDistanceFromBottom}%;`;
      } else if (characterDistanceFromBottom < 40) {
        characterDistanceFromBottom += 4;
        spriteStyle = `display:block;height: 50%;margin-left:${characterDistanceFromLeft}px;margin-bottom:${characterDistanceFromBottom}%;`;
      } else {
        spriteStyle = `display:block;transform:rotate(-85deg);height: 50%;margin-left:${characterDistanceFromLeft -
          80}px;margin-bottom:${characterDistanceFromBottom - 12}%;`;

        setTimeout(() => {
          copStyle = "display:block";

          setTimeout(() => {
            gameOver = true;
            clearInterval(incorrectInterval);
          }, 1500);
        }, 800);
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
    height: 20%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-bottom: 4%;
  }
  .cop img {
    height: 50%;
    width: auto;
    position: absolute;
    bottom: 0;
    margin-left: 10%;
    transform: rotateY(180deg);
    margin-bottom: 5%;
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
        message="You were caught by the student living in that dorm room! Didn't your mother teach you not to enter someone's room without knocking?"
        on:playagain={() => dispatch('buildout')} />
    </div>
  {/if}
</div>
