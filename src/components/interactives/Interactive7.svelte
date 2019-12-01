<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `The officer simply took your name and left. You try to leave after lunch, but GTPD is not letting anyone leave until the investigation is closed.`;
  const buttons = ["Break a window and run", "Hit the guard and run"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("correct", index);
    } else if (index == 1) {
      dispatch("incorrect", index);
    } else {
      throw new Error(
        `impossible condition achieved in Interactive7, got index: ${index}`
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
