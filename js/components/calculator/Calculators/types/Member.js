class Member {
    constructor(value=0,power=0){
        this.value=value;
        this.power=power;
    }

    toString() {
        if (this.value!=0) {return this.value+'*x^'+this.power}
        return '0';
    }

    toMath() {
        if (this.value === 0) {
            return '';
        }
        return `${this.value}*Math.pow(x,${this.power})`;
    }
}