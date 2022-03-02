Figure.prototype.ellipsoid = (a,b,c = 10, count = 10) => {
    const points = [];
    const edges = [];
    const twoPI = 2*Math.PI;

    let t = 0;
    const df = twoPI / count;
    const dt = Math.PI / count;
    while (t < Math.PI) {
        let f = 0;
        while (f < twoPI) {
            points.push(new Point(
                a*Math.sin(t)*Math.cos(f),
                c*Math.cos(t),
                b*Math.sin(t)*Math.sin(f),
            ));
            f += df;
        }
    t +=dt;
    }

    for (let i=0; i < points.length; i++){
        if (points[i+1]){
            if ((i+1)% count ===0){
                edges.push(new Edge(i,i+1 - count));
            } else{
                edges.push(new Edge(i,i+1));
            }
        }
        if (points[i+count]){
            edges.push(new Edge(i,i+count))
        }
    }

    return new Subject(points,edges)
}