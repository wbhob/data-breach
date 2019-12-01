<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `Oh no! Georgian Tech is on lockdown because they found out some data was stolen! What do you do?`;
  const buttons = ["Act casual, and lay down in a hammock", "Go to lunch"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("incorrect");
    } else if (index == 1) {
      dispatch("correct");
    } else {
      throw new Error(
        "impossible condition achieved in Interactive5-1, got index: " + index
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
