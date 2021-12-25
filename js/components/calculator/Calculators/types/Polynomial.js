class Polynomial{
    constructor(poly=[]){
        this.poly = poly;
        this.poly.sort((a,b)=>b.power-a.power);
    }

    getValue(x){
        const calc = new Calculator;
        const type = (x instanceof Complex) ? 'Complex': 
            (x instanceof Matrix) ? 'Matrix':
            (x instanceof Vector) ? 'Vector' : null;
        return this.poly.reduce((S, elem)=>
        calc.add(S,calc.prod(calc.pow(x,elem.power),elem.value)),calc.zero(type,x))
    }

        toString() {
        return this.poly.map(el => el.toString()).join("+").replaceAll('+0','').replaceAll('+-','-');
    }

    toMath() {
        return this.poly.map(el => el.toMath()).join("+").replaceAll('+0','').replaceAll('+-','-');
    }
}