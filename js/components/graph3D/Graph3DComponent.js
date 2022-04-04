class Graph3DComponent extends Component {
    constructor(options) {
        super(options);

        this.WIN = {
            LEFT: -15,
            BOTTOM: -10,
            WIDTH: 30,
            HEIGHT: 20,
            CAMERA: new Point(0, 0, 50),
            DISPLAY: new Point(0, 0, 30)
        };

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas3D',
            width: 1200,
            callbacks: {
                wheel: event => this.wheel(event),
                move: (event) => this.mousemove(event),
                down: (event) => this.mousedown(event),
                up: () => this.mouseup()
            }
        })


        this.graph3D = new Graph3D({
            WIN: this.WIN,
        });

        this.dx = 0;
        this.dy = 0;
        this.gradus = Math.PI / 180;
        this.colorClear = "#ddd"

        this.LIGTH = new Ligth(-10, 0, 0, 25000);
        this.figures = [(new Figure).cube()];

        this.canRotate = false;
        this.unlocked = true;

        this.ZERO = { x: 0, y: 0, z: 0 }
        this.FPS = 0;
        let FPS = 0;
        let lastTimestamp = Date.now();

        const animLoop = () => {
            FPS++;
            const timestamp = Date.now();
            if (timestamp - lastTimestamp >= 1000) {
                this.FPS = FPS;
                FPS = 0;
                lastTimestamp = timestamp;
            }
            if (document.getElementById('isAnimation').checked) {
                this.goAnimation(this.animations)
            };
            this.render();
            requestAnimFrame(animLoop);
        }

        animLoop();

    }

    createPlanet() {
        this.LIGTH = new Ligth(0, 0, 0, 10000000);
        const Sun = (new Figure).sphere(35, 30, 0, 0, 0, "#ffffff", "#eeeeee");
        const Earth = (new Figure).sphere(5, 30, 200, 0, 0, "#80A6FF", "#00FF00");
        const Moon = (new Figure).sphere(2, 10, 210, 0, 0, "#aaaaaa", "#dddddd");
        const Mercury = (new Figure).sphere(2, 15, -70, 0, 0, "#999999", "#aaaaaa");
        const Venus = (new Figure).sphere(4, 20, 120, 0, 50, "#964b00", "#654321");
        const Mars = (new Figure).sphere(4, 20, -320, 0, 0, "#DC143C", "#dc143c");
        const Deimos = (new Figure).sphere(1, 5, -327, 0, 0, "#aaaaaa", "#dddddd");
        const Phobos = (new Figure).sphere(1, 5, -330, 0, 0, "#aaaaaa", "#dddddd");

        this.figures = [
            Sun,
            Earth,
            Moon,
            Mercury,
            Venus,
            Mars,
            Deimos,
            Phobos];
        
            this.animations = [
                {
                    root: Sun,
                },
                {
                    root: Earth,
                    nodes: [
                        {
                            root: Moon
                        }]
                },
                {
                    root: Mars,
                    nodes: [
                        {
                            root: Deimos
                        },
                        {
                            root: Phobos
                        }
                    ]
                },
                {
                    root: Mercury
                },
                {
                    root: Venus,
                }]

        //Солнце
        Sun.addAnimation({ method: 'rotateOx', value: this.gradus });
        //Земля
        Earth.addAnimation({ method: 'rotateOx', value: 5 * this.gradus })
        Earth.addAnimation({ method: 'rotateOx', value: this.gradus / 5, center: Sun.center, forChilds: true })
        //Луна
        Moon.addAnimation({ method: 'rotateOx', value: 3 * this.gradus, center: Earth.center })
        //Меркурий
        Mercury.addAnimation({ method: 'rotateOx', value: 2 * this.gradus, center: Sun.center })
        //Венера
        Venus.addAnimation({ method: 'rotateOx', value: -2 * this.gradus })
        Venus.addAnimation({ method: 'rotateOx', value: this.gradus / 2, center: Sun.center })
        //Марс
        Mars.addAnimation({ method: 'rotateOx', value: this.gradus / 2, center: Sun.center })
        Mars.addAnimation({ method: 'rotateOx', value: 8 * this.gradus })
        //Деймос
        Deimos.addAnimation({ method: 'rotateOx', value: this.gradus / 2, center: Sun.center })
        Deimos.addAnimation({ method: 'rotateOx', value: 6 * this.gradus, center: Mars.center })
        //Фобос
        Phobos.addAnimation({ method: 'rotateOx', value: this.gradus / 2, center: Sun.center })
        Phobos.addAnimation({ method: 'rotateOx', value: 4 * this.gradus, center: Mars.center })
    }

    _addEventListeners() {
        document.addEventListener('keydown', event => this.keyDownHandler(event));
        document.getElementById('isAnimation').addEventListener('change', () => {
            const check = document.getElementById('isAnimation').checked;
            this.LIGTH = new Ligth(-10, 0, 0, 25000);
            this.figures = [(new Figure).cube()];
            this.colorClear = (check) ? "#000" : "#ddd";
            if (check) {
                this.createPlanet()
            };
            this.unlocked = !check;
            this.zoom(0.07);
        })
    }

    keyDownHandler(event) {
        if (this.unlocked) {
            switch (event.keyCode) {
                case 65: //A
                    this.figures.forEach(figure => {
                        this.graph3D.calcPoint(this.graph3D.move(-1, 0, 0), figure.center)
                        figure.points.forEach(point => this.graph3D.calcPoint(this.graph3D.move(-1, 0, 0), point))
                    });
                    break;
                case 68: //D
                    this.figures.forEach(figure => {
                        this.graph3D.calcPoint(this.graph3D.move(1, 0, 0), figure.center)
                        figure.points.forEach(point => this.graph3D.calcPoint(this.graph3D.move(1, 0, 0), point))
                    });
                    break;
                case 87: //W
                    this.figures.forEach(figure => {
                        this.graph3D.calcPoint(this.graph3D.move(0, 1, 0), figure.center)
                        figure.points.forEach(point => this.graph3D.calcPoint(this.graph3D.move(0, 1, 0), point))
                    });
                    break;
                case 83: //S
                    this.figures.forEach(figure => {
                        this.graph3D.calcPoint(this.graph3D.move(0, -1, 0), figure.center)
                        figure.points.forEach(point => this.graph3D.calcPoint(this.graph3D.move(0, -1, 0), point))
                    });
                    break;
            }
        }
    }

    mousedown(event) {
        if (this.unlocked) {
            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.canRotate = true;
        }
    }

    mouseup() {
        this.canRotate = false;
    }

    mousemove(event) {
        if (this.canRotate) {
            this.figures.forEach(figure => {
                figure.points.forEach(point => {
                    this.graph3D.calcPoint(this.graph3D.rotateOx((this.dx - event.offsetX) * this.gradus), point);
                    this.graph3D.calcPoint(this.graph3D.rotateOy((this.dy - event.offsetY) * this.gradus), point);
                });
            })
            if (document.getElementById('isDynLigth').checked) {
                this.graph3D.calcPoint(this.graph3D.rotateOx((this.dx - event.offsetX) * this.gradus), this.LIGTH);
                this.graph3D.calcPoint(this.graph3D.rotateOy((this.dy - event.offsetY) * this.gradus), this.LIGTH);
            }
            this.dx = event.offsetX;
            this.dy = event.offsetY;
        }
    }

    parentAnimation(figure, matrix) {
        if (figure.parent) {
            let anim = matrix;
            figure.parent.animations.forEach((animation) => {
                if (animation.forChilds) {
                    anim = this.graph3D.multMatrix(anim, this.graph3D[animation.method](animation.value))
                }
            })
            return this.parentAnimation(figure.parent, anim);
        }
        return matrix;
    }

    matrixForChild(figure, parentMatrix) {
        const matrix = figure.animations.reduce(
            (S, animation) => {
                const center = animation.center || figure.center;
                return this.graph3D.multMatrix(
                    S,
                    this.graph3D.multMatrix(
                        this.graph3D.multMatrix(
                            this.graph3D.moveTo(center, this.ZERO),
                            (animation.forChilds) ? this.graph3D[animation.method](animation.value): this.graph3D.one()
                        ),
                        this.graph3D.moveTo(this.ZERO, center)
                    )
                )
            },
            parentMatrix
        )
        return matrix;
    }

    goAnimation(anims, parentMatrix = this.graph3D.one()) {
        anims.forEach(anim => {
            const matrixForChild = this.matrixForChild(anim.root, parentMatrix);
            if (anim.nodes) {
                this.goAnimation(anim.nodes, matrixForChild)
            }
            let matrix = anim.root.animations.reduce(
                (S, animation) => {
                    const center = animation.center || anim.root.center;
                    return this.graph3D.multMatrix(
                        S,
                        this.graph3D.multMatrix(
                            this.graph3D.multMatrix(
                                this.graph3D.moveTo(center, this.ZERO),
                                this.graph3D[animation.method](animation.value)
                            ),
                            this.graph3D.moveTo(this.ZERO, center)
                        )
                    )
                },
                parentMatrix
            )
            anim.root.points.forEach(point => {
                this.graph3D.calcPoint(matrix, point)
            });
            this.graph3D.calcPoint(matrix, anim.root.center)
        })
    }

    render() {
        this.canvas.clear(this.colorClear);
        if (document.getElementById('isPolygons').checked) {
            const polygons = [];
            this.figures.forEach((figure, index) => {
                this.graph3D.calcDistance(figure, this.WIN.CAMERA, 'distance');
                this.graph3D.calcDistance(figure, this.LIGTH, 'lumen');
                figure.polygons.forEach(polygon => {
                    polygon.indexFigure = index;
                    polygons.push(polygon);
                });
            });
            this.graph3D.sortByArtist(polygons);
            polygons.forEach(polygon => {
                const points = polygon.points.map(point => {
                    const figure = this.figures[polygon.indexFigure]
                    return {
                        x: this.graph3D.xs(figure.points[point]),
                        y: this.graph3D.ys(figure.points[point])
                    }
                });
                const lumen = this.graph3D.calcIllumination(polygon.lumen, this.LIGTH.lumen);
                let { r, g, b } = polygon.hexToRgb(polygon.color);
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);
                this.canvas.polygon(points, polygon.rgbToHex(r, g, b));
            });
        }
        if (document.getElementById('isEdges').checked) {
        this.figures.forEach(figure => {
                figure.edges.forEach(edge => {
                    this.canvas.line(
                        this.graph3D.xs(figure.points[edge.p1]),
                        this.graph3D.ys(figure.points[edge.p1]),
                        this.graph3D.xs(figure.points[edge.p2]),
                        this.graph3D.ys(figure.points[edge.p2])
                    );
                    })
            })
        };
        if (document.getElementById('isPoints').checked) {
                figure.points.forEach(el => {
                    this.canvas.point(this.graph3D.xs(el), this.graph3D.ys(el));
                })
            }
       this.canvas.text(this.FPS, -15, 9, 18, "red");
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? 0.9 : 1.1;
        this.zoom(delta);
    }

    zoom(delta) {
        this.figures.forEach(figure => {
            this.graph3D.calcPoint(this.graph3D.zoom(delta), figure.center);
            figure.points.forEach(point => this.graph3D.calcPoint(this.graph3D.zoom(delta), point))
        })
        this.graph3D.calcPoint(this.graph3D.zoom(delta), this.LIGTH)
        this.LIGTH.lumen *= Math.pow(delta, 3);
    }

}