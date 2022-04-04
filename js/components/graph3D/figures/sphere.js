Figure.prototype.sphere = (r = 10, count = 10, x0 = 0, y0 = 0, z0 = 0, color = "#ffaaff", color2 = color) => {
    const points = []; //создаем пустой массив точек
    const edges = []; //создаем пустой массив ребер
    const polygons = []; //создаем пустой массив граней
    const twoPI = 2 * Math.PI; //переменная равная двум пи


//задаем точки сферы
    let t = 0; //задаем начальный угол тета
    const df = twoPI / count; //задаем изменение угла Фи в каждом повторе цикла
    const dt = Math.PI / count; //задаем изменение угла Тета в каждом повторе цикла
    while (t < Math.PI + dt) { //запускаем цикл по углу Тета
        let f = 0; //Задаем начальный угол Фи
        while (f < twoPI) { //цикл в цикле по углу Фи
            points.push(new Point( //Добавляем точку в массив точек с координатам x, y, z через параметрическое уровнение сферы
                x0 + r * Math.sin(t) * Math.cos(f),
                y0 + r * Math.cos(t),
                z0 + r * Math.sin(t) * Math.sin(f),
            ));
            f += df; //меняем угол фи каждый раз в цикле в цикле
        }
        t += dt; //меняем угол тета каждый раз в цикле
    }
//задаем ребра сферы
    for (let i = 0; i < points.length; i++) { //пробегаем по всему массиву точек
        if (points[i + 1]) { //проверяем существует ли следующая точка
            if ((i + 1) % count === 0) { //Если следующая точка последняя в ряду
                edges.push(new Edge(i, i + 1 - count)); //то соединяем ее с первой
            } else {
                edges.push(new Edge(i, i + 1)); //иначе со следующей
            }
        }
        if (points[i + count]) { // если существует точка под текущей
            edges.push(new Edge(i, i + count)) //то соединяем их
        }
    }

//задаем грани
    for (let i = 0; i < points.length; i++) {
        if (points[i + 1 + count]) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count], (Math.random()>0.3)?color:color2));
        }
    }
//создаем объект с массивами, что мы заполнили, в качестве параметров.
    return new Subject(points, edges, polygons, new Point(x0,y0,z0))
}