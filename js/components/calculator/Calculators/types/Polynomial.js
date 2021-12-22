class Polynomial {
	constructor(poly = []) {
		this.poly = poly;
		this.poly.sort((a, b) => b.power - a.power);
	getValue(x) {
		const calc = new Calculator;
		return this.poly.reduce((S, elem) => 
			calc.add(S, calc.prod(calc.pow(x, elem.power), elem.value)), calc.zero(null, x)
			);
		} 
	}

	toString() {
		if (el > 0) {
			return this.values.map(el => el.toString().join('+'));
		} else
	}
}
