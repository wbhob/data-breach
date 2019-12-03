<script>
  import Scene from "./Scene.svelte";
  import InteractiveModule from "./InteractiveModule.svelte";
  import { showOptions } from "./interactive";

  let sceneStage = 0;
  let interactiveStage = -1;

  let techgreen = false;

  let correct = false;
  let incorrect = false;

  function interactiveCorrect() {
    correct = true;
  }

  function interactiveIncorrect() {
    incorrect = true;
  }

  function animationComplete() {
    interactiveStage++;
  }

  function buildOutComplete() {
    sceneStage++;

    if (incorrect) {
      playagain();
    } else {
      correct = false;
      incorrect = false;
      showOptions.set(true);
    }
    
  }

  function playagain() {
    correct = false;
    incorrect = false;

    sceneStage = -1;
    interactiveStage = -1;

    setTimeout(() => {
      sceneStage = 0;
      interactiveStage = -1;
      showOptions.set(true);
    }, 600);
  }
  // special cases
  function northAve() {
    interactiveCorrect();
  }

  function techGreen() {
    interactiveCorrect();
    techgreen = true;
  }
</script>

<style>
  .stage {
    width: 882px;
    padding: 1em;
  }
  .divider {
    height: 40px;
  }
</style>

<div class="side-box" />
<div class="stage">
  <Scene
    {correct}
    {incorrect}
    {techgreen}
    stage={sceneStage}
    on:complete={animationComplete}
    on:buildout={buildOutComplete}
    on:playagain={playagain} />

  <div class="divider" />

  <InteractiveModule
    {techgreen}
    {interactiveStage}
    stage={sceneStage}
    on:correct={interactiveCorrect}
    on:incorrect={interactiveIncorrect}
    on:techgreen={techGreen} />
</div>
<div class="side-box right" />
