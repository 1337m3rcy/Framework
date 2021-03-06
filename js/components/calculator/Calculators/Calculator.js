class Calculator extends RealCalculator{

	readString(a) {
		return this.toPolynomial(a) ||
            this.toMatrix(a) ||
			this.toVector(a) ||
			this.toComplex(a) || a - 0;
	}

    toComplex(str) {
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
    }

    toMember(str) {
        if (typeof str == 'string' && str && str.includes('x')) {
            const arr = str.split('*x^');
            if (arr.length == 2) { 
                if (arr[0].slice(-1) == '-') {
                	arr[1] = '-' + arr[1];
                }
                return new Member(
                    arr[0]-0, 
                    arr[1]-0
                );
            }
    }
    return new Member();
    }

    toPolynomial(str) {
        if (typeof str == 'string' && str && str.includes('x')) {
            str = '|'+ str;
			const arr = str.replaceAll('+', '/+').replaceAll('-', '/-').replace('|/','').replace('|','').split('/');
			return new Polynomial(arr.map(el => this.toMember(el)))
		}
        return null;
    }

	toMatrix(str) {
		if (str instanceof Array && str[0] instanceof Array) {
			return new Matrix(str);
		}
		if (typeof str == 'string' && str) {
			const arr = str.split('\n').map(el => el.split(', '));
			if (arr.length >= 2 && arr[0].length >= 2) {
				return new Matrix(
					arr.map(row => row.map(el => this.readString(el))));
			}
		}
		return null;
	}

	toVector(str) {
		if (str instanceof Array) {
			return new Vector(str);
		}
		if (typeof str == 'string' && str) {
			const arr = str.replace('(', '').replace(')', '').split(' ');
			if (arr.length >= 2) {
				return new Vector(arr.map(el => this.readString(el)))
			}
			return null;
		}
	}

    complex(re,im){
        return new this.complex(re,im);
    }

    matrix(values){
        return new Matrix(values)
    }

    vector(values){
        return new Vector(values);
    }

    add(a,b){
        return this.get(a).add(a,b);
    }

    prod(a,p){
            return this.get(a).prod(a,p);
        return null;
    }

    pow(a,n){
        if(typeof n ==='number'){
            return this.get(a).pow(a,n);
        }
        return null;
    }

    mult(a,b){
        return this.get(a).mult(a,b);
    }

    sub(a,b){
        return this.get(a).sub(a,b);
    }

    one(type,elem){
        type=(type)?type:(elem)?elem.constructor.name:null;
        switch (type){
            case 'Complex': return (new ComplexCalculator).one();
            case 'Vector': return (new VectorCalculator).one(elem.values.length,elem.values[0]);
            case 'Matrix': return (new MatrixCalculator).one(elem.values.length,elem.values[0][0]);
        } return super.one();
    }

    zero(type, elem) {
		type = (type) ? type : (elem)
			? elem.constructor.name : null;
		switch (type) {
			case 'Complex': return (new ComplexCalculator).zero();
			case 'Vector': return (new VectorCalculator).zero(elem.values.length, elem.values[0]);
			case 'Matrix': return (new MatrixCalculator).zero(elem.values.length, elem.values[0][0]);
		}
		return super.zero();
	}
}