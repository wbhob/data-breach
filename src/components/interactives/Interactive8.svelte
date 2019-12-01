<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `GTPD saw you run and is on your tail!`;
  const buttons = ["Run run run!", "Rent an electric scooter"];

  function option(event) {
    let index = event.detail;

    if (index == 0) {
      dispatch("incorrect", index);
    } else if (index == 1) {
      dispatch("correct", index);
    } else {
      throw new Error(
        `impossible condition achieved in Interactive8, got index: ${index}`
      );
    }
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
