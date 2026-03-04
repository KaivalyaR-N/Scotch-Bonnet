// simple enhancements for interactivity

document.addEventListener('DOMContentLoaded', function () {
    // click the rover
    const rover = document.getElementById('rover');
    if (rover) {
        rover.addEventListener('click', function () {
            alert('🚀 Rover has landed! Ready to explore more spice.');
        });
    }

    // typewriter effect for headline(s) that have data-typewriter attribute
    const typewriters = document.querySelectorAll('[data-typewriter]');
    typewriters.forEach(function (el) {
        const text = el.textContent;
        el.textContent = '';
        let i = 0;
        function step() {
            if (i < text.length) {
                el.textContent += text.charAt(i);
                i++;
                setTimeout(step, 75);
            }
        }
        step();
    });
});