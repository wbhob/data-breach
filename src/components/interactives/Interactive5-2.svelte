<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `Oh no! Georgian Tech is on lockdown because they found out some data was stolen! What do you do?`;

  const buttons = ["Go to lunch", "Hide in a dorm room"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("correct");
    } else if (index == 1) {
      dispatch("incorrect");
    } else {
      throw new Error(
        "impossible condition achieved in Interactive5-2, got index: " + index
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
