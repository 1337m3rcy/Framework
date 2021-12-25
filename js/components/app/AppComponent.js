class AppComponent extends Component {
    constructor(options) {
        super(options);
        this.header = new HeaderComponent({
            id: 'header',
            parent: this.id,
            template: template.headerTemplate,
            callbacks: {
                showPage: (pageName) => this.showPage(pageName)
            }
        });
        this.calculator = new CalculatorComponent({
            id: 'calculator',
            parent: this.id,
            template: template.calculatorTemplate,
            className: 'hide',
            callbacks: {
                polynomial: 
                    (p) => this.graph2D.polynomial = p
            }
        });
        this.graph2D = new Graph2DComponent({
            id: 'graph2D',
            parent: this.id,
            template: template.graph2DTemplate
        });
        this.graph3D = new Graph3DComponent({
            id: 'graph3D',
            parent: this.id,
            template: template.graph3DTemplate,
            className: 'hide'
        });
    }

    showPage(pageName) {
        this.calculator.hide();
        this.graph2D.hide();
        this.graph3D.hide();
        this[pageName].show();
    }
}