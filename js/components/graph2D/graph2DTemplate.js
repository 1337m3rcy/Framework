Template.prototype.graph2DTemplate = () => `
    <div>
        <div class="overlay hide"></div>
        <button id="showHide" class='btn btn-animated'>--></button>
        <div class="funcField hide">
            <button id="addFunction">Добавить</button>
            <div id="funcs"></div>
        </div>
    </div>
    <div>
        <canvas id="canvas"></canvas>
    </div>
`;