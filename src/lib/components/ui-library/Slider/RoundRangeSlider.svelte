<script>
  import { onMount } from "svelte";


  /** @type {Number} Set the min value. By default is 0*/
  export let min = 0;

  /** @type {Number} Set the max value. By default is 100*/
  export let max = 100;

  /** @type {Number} Set the jump step value. By default is 1*/
  export let step = 1;

  /** @type {Number} Set the current value. By default min value
  */
  export let value = 0;

  /** @type {String} */
  export let label = "deg";

  /** @type {"before" | "after"} */
  export let textPosition = "before";

  let isDragging = false;
  let angle = 0;

  function calculateAngle(value) {
    angle = (value / max) * 360;
  }

  function handleMouseDown() {
    isDragging = true;
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    const circle = e.currentTarget.parentNode;
    const centerX = circle.offsetWidth / 2;
    const centerY = circle.offsetHeight / 2;
    const posX = e.clientX - circle.offsetLeft;
    const posY = e.clientY - circle.offsetTop;
    const deltaY = centerY - posY;
    const deltaX = centerX - posX;
    angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle -= 90;
    if (angle < 0) {
        angle = 360 + angle;
    }

    angle = Math.round(angle);
    value = (angle * (max - min)) / 360;
    value = Math.round(value / step) * step;
    value = value + min;
}

  onMount( async () => {
    calculateAngle(value);
  })

</script>

<div
    class="circle"
    on:mousedown={handleMouseDown}
    on:mouseup={handleMouseUp}
    on:mousemove={handleMouseMove}
    on:mouseleave={handleMouseUp}
  >
    {#if textPosition === "before" }
        <p class="debug">{label} {value}</p>
    {/if}

    {#if textPosition === "after"}
    <p class="debug">{value} {label}</p>
    {/if}

  <div class="dot" style={`transform: rotate(${angle}deg)`}></div>
</div>

<style>
   .debug {
        color: #9b59b6;
        font-family: monospace;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        font-size: 1.4rem;
    }
    .circle {
        position: relative;
        width: 15rem;
        height: 15rem;
        padding-bottom: 25%;
        margin: 0 auto;
        background-color: #9b59b6;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
    .dot{
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
    }
    .circle:before {
        content: "";
        position: absolute;
        width: 90%;
        height: 90%;
        background-color: #ecf0f1;
        border-radius: 50%;
        top: 5%;
        left: 5%;
        box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
    }
    .circle .dot {
        position: absolute;
        /* background-color: green; */
        width: 25px;
        height: 50%;
        left: 47.5%;
        top: 0;
        transform: rotate(0deg);
        transform-origin: center bottom;
    }
    .circle .dot:before {
        content: "";
        position: absolute;
        background-color: #fff;
        box-shadow: 0 0 10px #000;
        width: 200%;
        height: 0;
        padding-bottom: 200%;
        border-radius: 50%;
        cursor: pointer;
        transform: translate(-25%, -25%);
    }
</style>
