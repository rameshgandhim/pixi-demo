/* eslint-disable import/prefer-default-export */
import {
  Container,
} from 'pixi.js';

export class GameObject extends Container {
  activate(): void {
    this.visible = true;
  }

  deactivate(): void {
    this.visible = false;
  }
}
