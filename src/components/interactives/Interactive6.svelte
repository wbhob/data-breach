<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `GTPD has entered the scene and started asking for BuzzCards.
  
  What do you do?`;
  const buttons = [
    "Show them your Fake BuzzCard",
    "Give them your Real BuzzCard"
  ];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("incorrect", index);
    } else if (index == 1) {
      dispatch("correct", index);
    } else {
      throw new Error(
        `impossible condition achieved in Interactive6, got index: ${index}`
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
