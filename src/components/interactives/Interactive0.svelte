<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `Do you want to accept the challenge?`;
  const buttons = ["Yes"];

  function option(index) {
    dispatch("correct", index);
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
