<script>

    let isDragging = false;
    let price = 20;

   function calculateMousePosition(event) {
        // Get the bounding rect of the input element
        const rect = event.target.getBoundingClientRect();

        // Calculate the center point of the input element
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Calculate the angle between the center point and the mouse position
        return Math.atan2(event.clientY - centerY, event.clientX - centerX);
    }

    function calculateAngle(radians) {
        // Convert angle to degrees
        let angle = radians * 180 / Math.PI;

        // Make sure angle is between 0 and 360
        return (angle + 360) % 360;
    }

    function calculateValue(angle) {
        // Convert the angle to a value between 0 and 100
        let value = angle / 360 * 100;

        if(value < 0){
            value = 0;
        }else if(value > 100){
            value = 100;
        }
        return value;
    }

    function updateInput(event, value) {
        // Update the value of the input element
        event.target.value = value;
        price = event.target.value;
    }

    function updateDot(value) {
        const dot = document.getElementById("range");

        // Set the transform property of the dot element
        dot.style.transform = `rotate(${(value / 100) * 360}deg)`;
    }

    function calculateAngleValue(event) {
        if (isDragging) {
            const mousePosition = calculateMousePosition(event);
            const angle = calculateAngle(mousePosition);
            const value = calculateValue(angle);
            updateInput(event, value);
            updateDot(value);
        }
    }
</script>

<!-- <div class="debug">$ {price}</div> -->
<div class="circle">
    <input
        type="range"
        id="range"
        class="dot"
        min="0" max="200" step="1"
        value={price}
        on:mousedown={() => isDragging = true}
        on:mousemove={calculateAngleValue}
        on:mouseup={() => isDragging = false}
        on:mouseleave={() => isDragging = false}
    >
    <span class="debug">$ {price}</span>
</div>

<style>
    .debug {
        color: #9b59b6;
        font-family: monospace;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 100;
        font-size: 3vw;
    }
    .circle {
        position: relative;
        width: 10rem;
        height: 10rem;
        /* padding-bottom: 25%; */
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
        background-color: green;
        width: 20px;
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
