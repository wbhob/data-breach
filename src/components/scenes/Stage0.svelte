<script>
  import { onMount, createEventDispatcher } from "svelte";
  import { type } from "../../utils/type";

  export let correct;

  const dispatch = createEventDispatcher();

  let texts = [""];
  const script = `As you are walking down the halls of Skiles, you find a mysterious room emitting a mysterious light. 
  When you step into the room, you find a computer with a spreadsheet containing all the Georgian Tech student and faculty data! 
  Not knowing what to do, your inner demon tells you to steal the data and run away with it! 
  Your mission, should you choose to accept it, is to leak the data and get everyone's identities stolen!`;

  function dispatchComplete() {
    dispatch("complete");
  }

  onMount(() => {
    type(script, text => (texts = text)).then(dispatchComplete);
  });

  let buildoutListener = setInterval(() => {
    if (correct) {
      clearInterval(buildoutListener);
      dispatch("buildout");
    }
  }, 100);
</script>

<style>
  p {
    text-align: left;
    line-height: 2rem;
    font-variant-ligatures: no-common-ligatures;
    margin: 30px;
  }
</style>

<div class="stage-0">
  {#each texts as text}
    <p>{text}</p>
  {/each}
</div>
