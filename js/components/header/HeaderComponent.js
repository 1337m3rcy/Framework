class HeaderComponent extends Component {
    _addEventListeners() {
        const buttons = document.querySelectorAll('.show-page');
        buttons.forEach(button => {
            button.addEventListener(
                'click', 
                () => this.showPage(button.dataset.component)
            );
        });
    }

    showPage(pageName) {
        this.callbacks.showPage(pageName);
    }
}