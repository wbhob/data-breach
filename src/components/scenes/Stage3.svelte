<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { fade } from "svelte/transition";
  import { type } from "../../utils/type";

  import GameOver from "../components/GameOver.svelte";

  export let correct;
  export let incorrect;

  $: gameOver = false;

  const dispatch = createEventDispatcher();

  let characterDistanceFromLeft = 480;
  let spriteStyle = "margin-left: " + characterDistanceFromLeft + "px";

  let copDistanceFromLeft = 0;
  let copStyle = "display: none;";

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    dispatchComplete();
  });

  let stateListener = setInterval(() => {
    if (correct) animateCorrect();
    if (incorrect) animateIncorrect();
  }, 100);

  function animateCorrect() {
    clearInterval(stateListener);
    dispatch("buildout");
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
</style>

<div class="stage-3">
  <div class="background" in:fade>
    <img src="backgrounds/hallway1.jpg" alt="" />
  </div>

  <div class="sprite">
    <img style={spriteStyle} src="characters/male.png" alt="" />
  </div>

  <div class="faculty">
    <img src="characters/girl.png" alt="" />
  </div>

</div>
