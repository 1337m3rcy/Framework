class Canvas {
    constructor({
        WIN,
        id,
        width = 800,
        height = 800,
        callbacks = {}
    }) {
        this.WIN = WIN;
        this.canvas = document.getElementById(id);
        this.canvas.width = width;
        this.canvas.height = height;
        this.context = this.canvas.getContext('2d');
        this.canvas.addEventListener('wheel', callbacks.wheel);
        this.canvas.addEventListener('mousemove', callbacks.move);
        this.canvas.addEventListener('mousedown', callbacks.down);
        this.canvas.addEventListener('mouseup', callbacks.up);
    }

    xs(x) {
        return (x - this.WIN.LEFT) / 
            this.WIN.WIDTH * this.canvas.width;
    }
    ys(y) {
        return this.canvas.height - (y - this.WIN.BOTTOM) / 
            this.WIN.HEIGHT * this.canvas.height;
    }
    sx(x) {
        return x * this.WIN.WIDTH / this.canvas.width;
    }
    sy(y) {
        return -y * this.WIN.HEIGHT / this.canvas.height;
    }

    clear() {
        this.context.fillStyle = '#eee';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    line(x1, y1, x2, y2, color = 'purple', width = 2, isDash) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.lineWidth = width;
        if (isDash) {
            this.context.setLineDash([10,5])
        } else {
            this.context.setLineDash([])
        };
        this.context.moveTo(this.xs(x1), this.ys(y1));
        this.context.lineTo(this.xs(x2), this.ys(y2));
        this.context.stroke();
    }

    point(x, y, color = 'purple', size = 2) {
        this.context.beginPath();
        this.context.strokeStyle = color;
        this.context.fillStyle = color;
        this.context.arc(this.xs(x), this.ys(y), size, 0, Math.PI * 2);
        this.context.stroke();
        this.context.fill();
    }

    polygon (points, color ="#FF800055"){
        this.context.beginPath();
        this.context.fillStyle = color;
        this.context.moveTo(this.xs(points[0].x),this.ys(points[0].y));
        for(let i=1;i<points.length;i++){
            this.context.lineTo(this.xs(points[i].x),this.ys(points[i].y));
        }
        this.context.moveTo(this.xs(points[0].x),this.ys(points[0].y));
        this.context.closePath;
        this.context.fill();
    }
}