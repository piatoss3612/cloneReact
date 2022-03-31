class DrawingBoard {
  MODE = 'NONE';
  IsMouseDown = false;
  eraserColor = '#FFF';
  backgroundColor = '#FFF';

  constructor() {
    this.assignElement();
    this.initContext();
    this.initCanvasBackgroundColor();
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
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector('#brushSizePreview');
    this.eraserEl = this.toolbarEl.querySelector('#eraser');
    this.navigatorEl = this.toolbarEl.querySelector('#navigator');
    this.navigatorImageContainerEl = this.containerEl.querySelector('#imgNav');
    this.navigatorImageEl =
      this.navigatorImageContainerEl.querySelector('#canvasImg');
  }

  initContext() {
    this.context = this.canvasEl.getContext('2d');
  }

  initCanvasBackgroundColor() {
    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);
  }

  addEvent() {
    this.brushEl.addEventListener('click', this.onClickBrush);
    this.canvasEl.addEventListener('mousedown', this.onMouseDown);
    this.canvasEl.addEventListener('mousemove', this.onMouseMove);
    this.canvasEl.addEventListener('mouseup', this.onMouseUp);
    this.canvasEl.addEventListener('mouseout', this.onMouseOut);
    this.brushSliderEl.addEventListener('input', this.onChangeBrushSize);
    this.colorPickerEl.addEventListener('input', this.onChangeColor);
    this.eraserEl.addEventListener('click', this.onClickEraser);
    this.navigatorEl.addEventListener('click', this.onClickNavigator);
  }

  onChangeColor = event => {
    this.brushSizePreviewEl.style.backgroundColor = event.target.value;
  };

  onChangeBrushSize = event => {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`;
    this.brushSizePreviewEl.style.height = `${event.target.value}px`;
  };

  onMouseDown = event => {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = true;
    const currentPosition = this.getMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = 'round';
    if (this.MODE === 'BRUSH') {
      this.context.strokeStyle = this.colorPickerEl.value;
      this.context.lineWidth = this.brushSliderEl.value;
    } else if (this.MODE === 'ERASER') {
      this.context.strokeStyle = this.eraserColor;
      this.context.lineWidth = 50;
    }
  };

  onMouseMove = event => {
    if (!this.isMouseDown) return;
    const currentPosition = this.getMousePosition(event);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
  };

  onMouseUp = () => {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = false;
    this.updateNavigator();
  };

  onMouseOut = () => {
    if (this.MODE === 'NONE') return;
    this.isMouseDown = false;
    this.updateNavigator();
  };

  getMousePosition = event => {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  };

  onClickBrush = event => {
    const IsActive = event.currentTarget.classList.contains('active');
    this.MODE = IsActive ? 'NONE' : 'BRUSH';
    this.canvasEl.style.cursor = IsActive ? 'default' : 'crosshair';
    this.brushPanelEl.classList.toggle('hide');
    event.currentTarget.classList.toggle('active');
    this.eraserEl.classList.remove('active');
  };

  onClickEraser = event => {
    const IsActive = event.currentTarget.classList.contains('active');
    this.MODE = IsActive ? 'NONE' : 'ERASER';
    this.canvasEl.style.cursor = IsActive ? 'default' : 'crosshair';
    this.brushPanelEl.classList.add('hide');
    event.currentTarget.classList.toggle('active');
    this.brushEl.classList.remove('active');
  };

  onClickNavigator = event => {
    event.currentTarget.classList.toggle('active');
    this.navigatorImageContainerEl.classList.toggle('hide');
    this.updateNavigator();
  };

  updateNavigator = () => {
    this.navigatorImageEl.src = this.canvasEl.toDataURL();
  };
}

new DrawingBoard();
