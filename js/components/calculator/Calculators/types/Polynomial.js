class Member {
	constructor(value = 0, power = 0) {
		this.value = value;
		this.power = power;
	}
}

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
}