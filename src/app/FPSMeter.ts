/* eslint-disable import/prefer-default-export */
import { Container, Ticker, Text } from 'pixi.js';
import { ITick } from './ITick';

export class FPSMeter extends Container implements ITick {
  fps: Text;

  constructor(private ticker: Ticker) {
    super();
    this.fps = new Text('FPS: 0', { fill: 0xffffff });
    this.addChild(this.fps);
  }

  tick(): void {
    this.fps.text = `FPS: ${this.ticker.FPS.toFixed(2)}`;
  }
}
