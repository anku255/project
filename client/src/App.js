import React, { Component } from 'react';
import Image from './Components/Image';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: ['img-1.jpg', 'img-2.jpg', 'img-3.jpg', 'img-4.jpg', 'img-5.jpg'],
      isDrag: false,
      startX: -1,
      startY: -1,
      curX: -1,
      curY: -1
    };
  }

  componentDidMount = () => {
    this.addMouseEvents();
  };

  componentWillUnmount = () => {
    this.removeMouseEvents();
  };

  addMouseEvents = () => {
    document.addEventListener('mousedown', this.onMouseDown, false);
    document.addEventListener('mousemove', this.onMouseMove, false);
    document.addEventListener('mouseup', this.onMouseUp, false);
  };

  removeMouseEvents = () => {
    document.removeEventListener('mousedown', this.onMouseDown, false);
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  };

  onMouseDown = e => {
    const element = e.target;
    if (element.nodeName === 'IMG') {
      this.setState({
        isDrag: true,
        startX: e.offsetX,
        startY: e.offsetY,
        curX: e.offsetX,
        curY: e.offsetY
      });
    }
  };

  onMouseMove = e => {
    if (!this.state.isDrag) return;
    this.setState({ curX: e.offsetX, curY: e.offsetY });
  };

  onMouseUp = e => {
    this.setState({ isDrag: false });

    const image = e.target;
    const rectangleId = image.getAttribute('data-id');
    if (rectangleId) {
      const Y = Math.min(this.state.startY, this.state.curY);
      const X = Math.min(this.state.startX, this.state.curX);
      const width = Math.abs(e.offsetX - this.state.startX);
      const height = Math.abs(e.offsetY - this.state.startY);
      this.drawRectangle(rectangleId, X, Y, width, height);
    }
  };

  drawRectangle = (rectangleId, x, y, width, height) => {
    const rectangle = document.getElementById(rectangleId);
    // Need a better algorithm here
    rectangle.style.top = y + 10 + 'px';
    rectangle.style.left = x + 10 + 'px';
    rectangle.style.width = width + 'px';
    rectangle.style.height = height + 'px';
  };

  renderImages = () => {
    return this.state.images.map(imageName => {
      return <Image imageName={imageName} drawRectangle={this.drawRectangle} />;
    });
  };

  render() {
    return (
      <div className="container">
        <div className="columns">{this.renderImages()}</div>
      </div>
    );
  }
}

export default App;
