<script>

</script>

<style type="text/scss">
  @keyframes border-breathe {
    from {
      border-width: 5px;
      padding: 14px 24px;
    }
    80% {
      border-width: 9px;
      padding: 10px 20px;
    }
    to {
      border-width: 9px;
      padding: 10px 20px;
    }
  }

  button {
    font-family: "Press Start 2P", monospace;
    border-radius: 0;
    border: 5px solid white;
    color: white;
    background-color: transparent;
    font-size: 14px;
    line-height: 24px;
    padding: 14px 24px;
    margin: 10px;
    cursor: pointer;
    outline: none;
    transition: 0.1s;
  }

  button:hover {
    animation: border-breathe;
    animation-duration: 0.3s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-timing-function: ease-in-out;
  }

  button:active {
    color: black;
    background: rgb(255, 255, 255);
  }
</style>

<button on:click>
  <slot />
</button>
