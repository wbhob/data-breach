<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `"Ok, well don't go into random offices next time!"
  
  Where do you go next?`;
  const buttons = ["Tech Green", "North Ave"];

  function option(event) {
    let index = event.detail;

    dispatch("correct", index);
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
