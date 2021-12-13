class UIComponent {
    constructor({ callbacks = {} }){
        this.callbacks = callbacks;
        document.getElementById('showHide')
            .addEventListener('click', this.showHideFuncField);
        document.querySelector('.overlay')
            .addEventListener('click', this.showHideFuncField);
        document.getElementById('addFunction')
            .addEventListener('click', () => this.addFunction());
        this.num = 0;
        }

    showHideFuncField() {
        document.querySelector('.overlay').classList.toggle('hide');
        document.querySelector('.funcField').classList.toggle('hide');
    }

    addFunction() {
        const funcs = document.getElementById('funcs');
        // инпут функции
        const input = document.createElement('input');
        input.dataset.num = this.num;
        input.placeholder = `функция №${this.num}`;
        input.addEventListener('keyup', () => this.keyup(input));
        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.dataset.num = this.num;
        checkbox.addEventListener('click', () => {
            this.callbacks.canDevirative(input.dataset.num, checkbox.checked);
            console.log('ok');
        });
        // кнопка удаления функции
        const button = document.createElement('button');
        button.innerHTML = 'Удалить';
        button.addEventListener('click', () => {
            this.callbacks.delFunction(input.dataset.num);
            funcs.removeChild(input);
            funcs.removeChild(button);
            funcs.removeChild(checkbox);
        });
        funcs.appendChild(input);
        funcs.appendChild(button);
        funcs.appendChild(checkbox);
        this.num++;
    }

    keyup(input) {
        try {
            let f;
            let a;
            let b;
            let splits = input.value.split(' ');
            for (let i=0; i<splits.length;i++){
                if (splits[i].includes("f=")) {
                    f = splits[i].substr(2);
                }
                if (splits[i].includes("a=")) {
                    a = splits[i].substr(2);
                }
                if (splits[i].includes("b=")) {
                    b = splits[i].substr(2);
                }
            }
            console.log(f);
            eval(`f = function(x) { return ${f}; }`);
            this.callbacks.addFunction(f,a,b, input.dataset.num);
        } catch (e) {
            console.log(e);
        }
    }
}