Template.prototype.calculatorTemplate = () => `
    <div>
        <textarea class='input' id='a'></textarea>
        <textarea class='input' id='b'></textarea>
        <textarea class='input' id='c'></textarea>
    </div>

    <div >
        <button class='btn btn-three operand' data-operand='add'>+</button>
        <button class='btn btn-three operand' data-operand='sub'>-</button>
        <button class='btn btn-three operand' data-operand='mult'>*</button>
    </div>

    <div>
        <button class='btn btn-three operand' data-operand='div'>/</button>
        <button class='btn btn-three operand' data-operand='prod'>*p</button>
        <button class='btn btn-three operand' data-operand='pow'>^n</button>
    </div>
    <div>
        <button class='btn btn-three operand' data-operand='value'>Посчитать</button>
    </div>
`;