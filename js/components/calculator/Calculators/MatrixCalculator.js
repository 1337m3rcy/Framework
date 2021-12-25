class MatrixCalculator extends RealCalculator {
    add (a, b) {
        const calc=this.get(a.values[0][0]);
        return new Matrix (a.values.map((arr, i) => arr.map((elem, j) => calc.add(elem,b.values[i][j]))));
    }

    sub (a, b) {
        const calc=this.get(a.values[0][0]);
        return new Matrix (a.values.map((arr, i) => arr.map((elem, j) => calc.sub(elem,b.values[i][j]))));
    }

    prod (a, p) {
        const calc=this.get(a.values[0][0]);
        return new Matrix (a.values.map (arr => arr.map (elem => calc.prod(elem,p))));
    }

    zero (length,elem) {
        const calc=this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
                values.push ([]);
                for (let j = 0; j < length; j++) {
                    values [i][j] = this.type(calc,elem,'zero');
            }
        }
        return new Matrix(values);
    }

    one(length,elem) {
        const calc=this.get(elem);
        const values = [];
        for (let i = 0; i < length; i++) {
                values.push ([]);
                for (let j = 0; j < length; j++) {
                    values [i][j] = this.type(calc,elem,(i === j) ? 'one' : 'zero');
            }
        }
        return new Matrix(values);
    }

    mult (a, b) {
        const calc=this.get(a.values[0][0]);
        const c = this.zero(a.values.length,a.values[0][0]);
        let s = calc.zero;
        for (let i = 0; i < a.values.length; i++) {
            for (let j = 0; j < a.values[i].length; j++) {
                s = this.type(calc,a.values[0][0],'zero');
                for (let k = 0; k < a.values[i].length; k++){
                    s = calc.add(s, calc.mult(a.values[i][k],b.values[k][j]));
                }
            c.values[i][j] = s;
        }
    }
        return c;
    }

    pow(a, n) {
        let c = this.one(a.values.length, a.values[0][0]);
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c
    }

}