class DrawingBoard {
    MODE = 'NONE';
    IsMouseDown = false;
    constructor(){
        this.assignElement();
        this.initContext();
        this.addEvent();
    }
    assignElement() {
        this.containerEl = document.getElementById('container');
        this.canvasEl = this.containerEl.querySelector('#canvas');
        this.toolbarEl = this.containerEl.querySelector('#toolbar');
        this.brushEl = this.toolbarEl.querySelector('#brush');
        this.colorPickerEl = this.toolbarEl.querySelector('#colorPicker');
        this.brushPanelEl = this.containerEl.querySelector('#brushPanel');
        this.brushSliderEl = this.brushPanelEl.querySelector('#brushSize');
        this.brushSizePreviewEl = this.brushPanelEl.querySelector('#brushSizePreview');
    }
    initContext() {
        this.context = this.canvasEl.getContext('2d');
    }
    addEvent() {
        this.brushEl.addEventListener('click', this.onClickBrush);
        this.canvasEl.addEventListener('mousedown', this.onMouseDown);
        this.canvasEl.addEventListener('mousemove', this.onMouseMove);
        this.canvasEl.addEventListener('mouseup', this.onMouseUp);
        this.canvasEl.addEventListener('mouseout', this.onMouseOut);
        this.brushSliderEl.addEventListener('input', this.onChangeBrushSize);
        this.colorPickerEl.addEventListener('input', this.onChangeColor);
    }
    onChangeColor = (event)=>{
        this.brushSizePreviewEl.style.backgroundColor = event.target.value;
    };
    onChangeBrushSize = (event)=>{
        this.brushSizePreviewEl.style.width = `${event.target.value}px`;
        this.brushSizePreviewEl.style.height = `${event.target.value}px`;
    };
    onMouseDown = (event)=>{
        if (this.MODE === 'NONE') return;
        this.isMouseDown = true;
        const currentPosition = this.getMousePosition(event);
        this.context.beginPath();
        this.context.moveTo(currentPosition.x, currentPosition.y);
        this.context.lineCap = 'round';
        this.context.strokeStyle = this.colorPickerEl.value;
        this.context.lineWidth = this.brushSliderEl.value;
    };
    onMouseMove = (event)=>{
        if (!this.isMouseDown) return;
        const currentPosition = this.getMousePosition(event);
        this.context.lineTo(currentPosition.x, currentPosition.y);
        this.context.stroke();
    };
    onMouseUp = ()=>{
        if (this.MODE === 'NONE') return;
        this.isMouseDown = false;
    };
    onMouseOut = ()=>{
        if (this.MODE === 'NONE') return;
        this.isMouseDown = false;
    };
    getMousePosition = (event)=>{
        const boundaries = this.canvasEl.getBoundingClientRect();
        return {
            x: event.clientX - boundaries.left,
            y: event.clientY - boundaries.top
        };
    };
    onClickBrush = (event)=>{
        const IsActive = event.currentTarget.classList.contains('active');
        this.MODE = IsActive ? 'NONE' : 'BRUSH';
        this.canvasEl.style.cursor = IsActive ? 'default' : 'crosshair';
        this.brushPanelEl.classList.toggle('hide');
        this.brushEl.classList.toggle('active');
    };
}
new DrawingBoard();

//# sourceMappingURL=index.3ff90424.js.map
