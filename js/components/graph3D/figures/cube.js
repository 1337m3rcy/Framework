Figure.prototype.cube = () => {
    return new Subject([
        new Point(10, 10, 10), new Point(-10, 10, 10), new Point(-10, -10, 10), new Point(10, -10, 10),
        new Point(10, 10, -10), new Point(-10, 10, -10), new Point(-10, -10, -10), new Point(10, -10, -10)
    ],
        [
            new Edge(0, 1), new Edge(1, 2), new Edge(2, 3), new Edge(3, 0),
            new Edge(4, 5), new Edge(5, 6), new Edge(6, 7), new Edge(7, 4),
            new Edge(0, 4), new Edge(5, 1), new Edge(6, 2), new Edge(7, 3),
        ])
}