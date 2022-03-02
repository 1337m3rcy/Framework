Figure.prototype.circle = (amount = 1, r = 2, count = 10) => {
    let points = [];
    let edges = [];
    let step = 2 * Math.PI / count;
    for (let i = 0; i < amount; i++) {
        let fi = 0;
        let n = 0;
        while (fi < 2 * Math.PI) {
            points.push(new Point(r * Math.cos(fi), r * Math.sin(fi), i * 10));
            fi += step;
        }
    }
    for (let j = 0; j < amount; j++) {
        for (let k = 1; k < count; k++) {
            edges.push(new Edge(count * j + (k - 1), count * j + k));
            if (j != 0) { edges.push(new Edge(count * (j - 1) + (k - 1), count * j + (k - 1))) };
        }
        edges.push(new Edge(count * j, count * (j + 1) - 1));
        if (j != 0) { edges.push(new Edge(count * j - 1, count * (j + 1) - 1)) };
    }

    return new Subject(points, edges);
}