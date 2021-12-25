class PolynomialCalculator extends RealCalculator{

    polynomial (members=[]){
        return new Polynomial(members);
    }

add(a,b){
    const calc = new Calculator;
    const members = [];
    a.poly.forEach(elemA => {
        const member = b.poly.find(elemB => elemB.power==elemA.power);
        if (member) {
            members.push(new Member(calc.add(elemA.value,member.value),elemA.power));
        }else {
            members.push(new Member(elemA.value,elemA.power));
            }
        })
    b.poly.forEach(elemB => {    
        const member = members.find(el => el.power==elemB.power);
        if (!member) {
            members.push(new Member(elemB.value,elemB.power));
            }
    })
    return new Polynomial(members);
}
    
sub(a,b){
    const calc = new Calculator;
    b.poly.forEach(el => el.value=calc.prod(el.value,-1));
    return this.add(a,b);
}

mult(a,b){
    const calc = new Calculator;
    let polynomial = new Polynomial([new Member()]);
    a.poly.forEach(elemA => {
        const members = [];
        b.poly.forEach(elemB => {
            members.push(new Member(calc.mult(elemA.value,elemB.value),calc.add(elemA.power,elemB.power)));
            polynomial = this.add(polynomial, new Polynomial(members));
        });
    });
    return polynomial;
}

prod(a,p){
    const calc = new Calculator;
    a.poly.map(el => el.value=calc.prod(el.value,p));
    return a
}

}