Template.prototype.graph3DTemplate = () => `
    <canvas id="canvas3D"></canvas>
    <div class="settengs">
        <div>
            <label class="text">
                <input class="check" type="checkbox" checked=true id="isPolygons"><label></input>
            &nbsp;Полигоны</label>
            <label class="text">
                <input class="check" type="checkbox" id="isEdges"></input>
            &nbsp;Ребра</label>
            <label class="text">
                <input class="check" type="checkbox" id="isPoints"></input>
            &nbsp;Вершины</label>
        </div>
        <div>
            <select id="selectFigure" class="figures">
                <option value="empty">выбор фигуры</option>
                <option value="cube">Куб</option>
                <option value="sphera">Сфера</option>
                <option value="cone">Конус</option>
                <option value="cylinder">Цилиндр</option>
                <option value="ring">Тор</option>
                <option value="ellipsoid">Эллипсоид</option>
                <option value="onesheetedhyperboloid">Однополостной гиперболоид</option>
                <option value="twosheetedhyperboloid">Двуполостной гиперболоид</option>
                <option value="ellipticalparaboloid">Эллиптический параболоид</option>
                <option value="ellipticalcylinder">Эллиптический цилиндр</option>
                <option value="paraboliccylinder">Параболический цилиндр</option>
                <option value="hyperbolicparaboloid">Гиперболический параболоид</option>
                <option value="hyperboliccylinder">Гиперболический цилиндр</option>
            </select>
        </div>
        <div>
            <input type="color" id="color" placeholder="color" class="color" value="#11B2F7">
        </div>
        <div>
            <input class="light" type="range" min="25000" max="50000" value="powerlight" id="powerlight">
        </div>
    </div>
`;