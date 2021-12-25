class ComplexCalculator extends RealCalculator {

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