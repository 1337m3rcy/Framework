Figure.prototype.hyperSpiral = (amount = 1, r = 10, count = 10) => {
    let points = [];
    let edges = [];
    let step = 2 * Math.PI / 12;
    for (let i = 0; i < amount; i++) {
        let fi = 0;
        for (let n = 0; n < count; n++) {
            points.push(new Point(r * Math.cos(fi) / fi, r * Math.sin(fi) / fi, i * 10));
            fi += step;
            if (n!=0) {edges.push(new Edge(count*i+n-1,count*i+n))}
            if (i!=0) {edges.push(new Edge(count*(i-1)+n,count*i+n))}
        }

    }

    return new Subject(points,edges);
}