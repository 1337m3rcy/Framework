class Graph2DComponent extends Component {
    constructor(options) {
        super(options);

        this.funcs = [];
        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        };

        this.canMove = false;

        this.canvas = new Canvas({
            WIN: this.WIN,
            id: 'canvas',
            callbacks: {
                wheel: (event) => this.wheel(event),
                move: (event) => this.move(event),
                down: () => this.down(),
                up: () => this.up()
            }
        });

        new UIComponent({
            callbacks: {
                addFunction: (f, a, b, num) => this.addFunction(f, a, b, num),
                delFunction: (num) => this.delFunction(num),
                canDevirative: (num, can) => this.canDevirative(num, can),
            }
        });

        
        this.render();
    }

    polynomial = new Polynomial;

    printPolynomial(p) {
        var x = this.WIN.LEFT;
        var dx = this.WIN.WIDTH / 200;
        var y = p.getValue(x);
        var dy = p.getValue(x + dx);
        while (x < this.WIN.LEFT + this.WIN.WIDTH) {
            if (Math.abs(y - dy) <= this.WIN.HEIGHT) {
                this.canvas.line(x, y, x + dx, dy);
            }
            y = p.getValue(x);
            dy = p.getValue(x + dx);
            x += dx;
        }
    }

    addFunction(f, a, b, num) {
        this.funcs[num] = {
            f,
            a: a - 0,
            b: b - 0,
            color: 'red',
            width: 2
        }
        this.render();
    }

    delFunction(num) {
        this.funcs[num] = null;
        this.render();
    }

    canDevirative(num, can) {
        this.funcs[num].canDevirative = can;
    }

    down() {
        this.canMove = true;
    }

    up() {
        this.canMove = false;
    }

    move(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.canvas.sx(event.movementX);
            this.WIN.BOTTOM -= this.canvas.sy(event.movementY);
        }
        this.derivativeX = this.WIN.LEFT + this.canvas.sx(event.offsetX);
        this.render();
    }

    wheel(event) {
        var delta = (event.wheelDelta >= 0) ? -0.2 : 0.2;
        if (this.WIN.WIDTH + delta > 0) {
            this.WIN.WIDTH += delta;
            this.WIN.HEIGHT += delta;
            this.WIN.LEFT -= delta / 2;
            this.WIN.BOTTOM -= delta / 2;
            this.render();
        }
    }

    printOXY() {
        const { LEFT, BOTTOM, WIDTH, HEIGHT } = this.WIN;
        for (var i = 0; i < WIDTH + LEFT; i++) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#aaa', 1);
            this.canvas.line(i, -0.1, i, 0.1, 'black');
        }
        for (var i = 0; i > LEFT; i--) {
            this.canvas.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#aaa', 1);
            this.canvas.line(i, -0.1, i, 0.1, 'black');
        }
        for (var i = 0; i < HEIGHT + BOTTOM; i++) {
            this.canvas.line(LEFT, i, WIDTH + LEFT, i, '#aaa', 1);
            this.canvas.line(-0.1, i, 0.1, i, 'black');
        }
        for (var i = 0; i > BOTTOM; i--) {
            this.canvas.line(LEFT, i, WIDTH + LEFT, i, '#aaa', 1);
            this.canvas.line(-0.1, i, 0.1, i, 'black');
        }
        this.canvas.line(LEFT, 0, WIDTH + LEFT, 0, 'black');
        this.canvas.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 'black');
    }

    printFunction(f) {
        var x = this.WIN.LEFT;
        var dx = this.WIN.WIDTH / 200;
        var y = f(x);
        var dy = f(x + dx);
        while (x < this.WIN.LEFT + this.WIN.WIDTH) {
            if (Math.abs(y - dy) <= this.WIN.HEIGHT) {
                this.canvas.line(x, y, x + dx, dy);
            }
            y = f(x);
            dy = f(x + dx);
            x += dx;
        }
    }


    getDerivative(f, x0, dx = 0.00001) {
        return (f(x0 + dx) - f(x0)) / dx;
    }

    getIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a - 0;
        let S = 0;
        while (x <= b - 0) {
            S += (Math.abs(f(x)) + Math.abs(f(x + dx))) / 2 * dx;
            x += dx;
        }
        return S;
    }

    printIntegral(f, a, b, n = 100) {
        const dx = (b - a) / n;
        let x = a;
        const points = [];
        points.push({ x, y: 0 });
        while (x <= b) {
            points.push({ x, y: f(x) });
            x += dx;
        }
        points.push({ x: b, y: 0 });
        this.canvas.polygon(points);
    }

    printDerivative(f, x0, dx) {
        const k = this.getDerivative(f, x0, dx);
        const b = f(x0) - k * x0;
        const x1 = this.WIN.LEFT;
        const x2 = this.WIN.LEFT + this.WIN.WIDTH;
        this.canvas.line(
            x1, k * x1 + b,
            x2, k * x2 + b,
            "#0f0", 1, "true"
        )
    }


    render() {
        this.canvas.clear();
        this.printOXY();
        this.printPolynomial(this.polynomial);
        for (let i = 0; i < this.funcs.length; i++) {
            if (this.funcs[i]) {
                if (this.funcs[i].a < this.funcs[i].b) {
                    this.printIntegral(this.funcs[i].f, this.funcs[i].a, this.funcs[i].b);
                    console.log(this.getIntegral(this.funcs[i].f, this.funcs[i].a, this.funcs[i].b));
                }
                this.printFunction(this.funcs[i].f);
                if (this.funcs[i].canDevirative) {
                    this.printDerivative(this.funcs[i].f, this.derivativeX);
                }
            }
        }
    }
}