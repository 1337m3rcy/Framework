class ComplexCalculator extends RealCalculator {
    /*toComplex(str) {
        if (typeof str == 'number') {
            return new Complex(str);
        }
        if (typeof str == 'string' && str) {
            const arr = str.split('i*');
            if (arr.length == 2) {
                if (arr[0].slice(-1) == '-') {
                    arr[1] = '-' + arr[1];
                }
                return new Complex(
                    arr[0].substring(0, arr[0].length - 1)-0, 
                    arr[1]-0
                );
            }
            if (arr.length == 1) {
                return new Complex(arr[0] - 0);
            }
        }
        return null;
    }*/

    add(a, b) {
        return new Complex(a.re + b.re, a.im + b.im);
    }

    sub(a, b) {
        return new Complex(a.re - b.re, a.im - b.im);
    }

    mult(a, b) {
        return new Complex(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
    }

    div(a, b) {
        let q = b.re*b.re + b.im * b.im;
        return this.mult(a, new Complex(b.re / q, -b.im / q));
    }

    prod(a, p) {
        return new Complex(p * a.re, p * a.im);
    }

    zero() {
        return new Complex;
    }

    one() {
        return new Complex(super.one());
    }

    pow(a, n) {
        let c = this.one();
        for (let i = 0; i < n; i++) {
            c = this.mult(a, c);
        }
        return c;
    }

}