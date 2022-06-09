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


/******************** РАСКРАСКИ ********************/

/* 

КЛЕТКА для гиперболического параболоида

let color1 = '#00ff00'; тут выбираем 1 цвет
let color2 = '#00ffff'; тут 2 цвет
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i%2===0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0 && i%2===0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i+1+count)%count===0) {
        let a=color1;
        color1=color2;
        color2=a;
    }
}
    
КЛЕТКА для всех остальных фигур

let color1 = '#00ff00'; тут выбираем 1 цвет  
let color2 = '#00ffff'; тут 2 цвет
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if (i%2===0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
    if ((i+1+count)%count===0) {
        let a=color1;
        color1=color2;
        color2=a;
    }
}
    
ПОЛОСКА для гиперболического параболоида

let color1 = '#00ff00';    
let color2 = '#00ffff';
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0) {
        if ( i % 2 === 0) polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
        else polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2));
    } 
}
    
ПОЛОСКА для всех остальных фигур

let color1 = '#00ff00';    
let color2 = '#00ffff';
for (let i = 0; i < points.length; i++) {
    if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 === 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color1));
    } else if (i + 1 + count < points.length && (i + 1) % count !== 0 && i % 2 !== 0) {
        polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], color2))
    } else if (i + count < points.length && (i + 1) % count === 0) {
        polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count], color2))
    }
}

*/