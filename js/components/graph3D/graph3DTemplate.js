Template.prototype.graph3DTemplate = () => `
<div>
<input type="checkbox" checked=true id="isPolygons">Грани</input>
<input type="checkbox" id="isEdges">Ребра</input>
<input type="checkbox" id="isPoints">Вершины</input>
<br>
<br>
<input type="checkbox" id="isDynLigth">Освещение</input><br>
<br>
<br>
<input type="checkbox" id="isAnimation">Анимация</input><br>
<canvas id="canvas3D"></canvas>
</div>
`;