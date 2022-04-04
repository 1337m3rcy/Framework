window.requestAnimFrame =((callback) => {
    return window.requestAnimationFrame(callback) ||
    window.webkitRequestAnimationFrame(callback) ||
    window.mozRequestAnimationFrame(callback) ||
    window.oRequestAnimationFrame(callback) ||
    function (callback) {
        window.setTimeout(callback, 1000 / 60);
    }
})

const template = new Template;
new AppComponent({ 
    id: 'app', 
    template: template.appTemplate 
});