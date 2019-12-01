<script>
  import { onMount, createEventDispatcher } from "svelte";
  import Interactive from "./Interactive.svelte";

  const dispatch = createEventDispatcher();

  const script = `"Hey! What were you doing in there?!?"`;
  const buttons = ["I saw a mysterious light!", "My pencil rolled in there..."];

  function option(event) {
    let index = event.detail;

    dispatch("correct");
  }
</script>

<style>

</style>

<Interactive {script} {buttons} on:option={option} />
