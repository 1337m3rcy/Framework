class CalculatorComponent extends Component {
    constructor(options) {
        super(options);
        this.calc = new Calculator;
    }

    _addEventListeners() {
        const buttons = document.querySelectorAll(".operand");
        buttons.forEach(button => {
            button.addEventListener(
                'click',
                () => {
                    console.log(button.dataset.operand);
                    this.calculate(button.dataset.operand)
                }
            );
        });
    }

    calculate(operand) {
        let a = this.calc.readString(document.getElementById('a').value);
        let b = this.calc.readString(document.getElementById('b').value);
        if (a && b) {
            let c;
            if ((operand == 'prod' || operand == 'pow') && (b instanceof Complex)) {
                c = this.calc[operand](a, b.re);
            } else {
                c = this.calc[operand](a, b);
            }
            document.getElementById('c').value = c.toString();
        }
    }
}
