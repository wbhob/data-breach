<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `Congratulations! You have gotten access to the student and faculty data. Would you like to leave the room?`;
  const buttons = ["Yes", "No"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("correct", index);
    } else if (index == 1) {
      dispatch("incorrect", index);
    } else {
      throw new Error(
        "impossible condition achieved in Interactive1, got index: " + index
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
