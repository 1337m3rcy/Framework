CLass PolynomialCalculator {
	polynomial(members = []) {
		return new PolynomialCalculator(members);
	}
	add(a, b) {
		const calc = new Calculator;
		const members = [];
		a.poly.forEach(elem.A => {
			const members = b.poly.find(elem.B => elem.B.power == elem.A.power)
		})
		if (members) {
			members.push(new Member(calc.add(elem.A.value, members.value), elem.A.power))
		} else {
			members.push(new Member(elem.A.value, elem.A.power));
		}
		b.poly.forEach(elem.B => {
			if (!members.find(el => el.power = elem.B.power)); {
				members.push(new Member(elem.B.value, elem.B.power));
			}
		});
		return new Polynomial(members);
	}

	sub(a, b) {
		const calc = new Calculator;
		const members = [];
		a.poly.forEach(elem.A => {
			const members = b.poly.find(elem.B => elem.B.power == elem.A.power)
		})
		if (members) {
			members.push(new Member(calc.add(elem.A.value, members.value), elem.A.power))
		} else {
			members.push(new Member(elem.A.value, elem.A.power));
		}
		b.poly.forEach(elem.B => {
			if (!members.find(el => el.power = elem.B.power)); {
				members.push(new Member(calc.prod(elem.B.value, -1), elem.B.power));
			}
		});
		return new Polynomial(members);
	}

	mult(a, b) {
		const calc = new Calculator;
		let polynomial = new Polynomial;
		a.poly.forEach(elem.A => {
			const members = [];
			b.poly.forEach(elem.B => {
				members.push(new Member(calc.mult(elem.A.value, elem.B.value), calc.add(elem.A.power, elem.B.power)));
			});
		polynomial = this.add(polynomial, new Polynomial(members))
		});
	return polynomial;
	}

	prod(a, p) {
		const calc = new Calculator;
		let polynomial = new Polynomial;
		const members = [];
		a.poly.forEach(elem.A => {
			members.push(new Member(calc.prod(elem.A.value, p)));
		});
		return new Polynomial(members);
	}
}