class CalculatorComponent extends Component {
    constructor(options){
        super(options);
        this.calc = new Calculator;
    }

    _addEventListeners() {
        const buttons = document.querySelectorAll(".operand");
        buttons.forEach(button => {
            button.addEventListener(
                'click',
                () => {
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
            if (operand == 'value' && a instanceof Polynomial){
                c = a.getValue(b);
            } else if (operand == 'prod' || operand == 'pow') {
                if ((b instanceof Complex) && (b.im == 0))  {
                    c = this.calc[operand](a, b.re);
                }
                else
                c = 'Ошибка ввода';
            } else {
                c = this.calc[operand](a, b);
            }
            document.getElementById('c').value = c.toString();
        }
    }
}