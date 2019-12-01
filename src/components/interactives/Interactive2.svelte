<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `You got caught by a faculty member in the hall. What do you do?`;
  const buttons = ["Run", "Act Normal"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("incorrect");
    } else if (index == 1) {
      dispatch("correct");
    } else {
      throw new Error(
        "impossible condition achieved in Interactive2, got index: " + index
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
