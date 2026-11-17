$("body").before('<div class="fps wow animate__slideInRight"></div>');
var showFPS = (function () {
    appendFps = function (fps) {
        $(".fps").html(fps + " FPS");
    };
    var requestAnimationFrame =
        window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
    var e, pe, pid, fps, last, offset, step, appendFps;
    appendFps(0);
    fps = 0;
    last = Date.now();
    step = function () {
        offset = Date.now() - last;
        fps += 1;
        if (offset >= 1000) {
            last += offset;
            appendFps(fps);
            fps = 0;
        }
        requestAnimationFrame(step);
    };
    step();
})();
