/* eslint-disable import/prefer-default-export */
import { Emitter } from '@pixi/particle-emitter';
import { fireEmitter, sparkEmitter } from './FireEmitter';
import { GameObject } from './GameObject';
import { ITick } from './ITick';
import { ScreenConfig } from './ScreenConfig';

export class FireParticle extends GameObject implements ITick {
  emitter: Emitter;

  emitter2: Emitter;

  constructor(screen: ScreenConfig) {
    super();
    this.x = screen.width / 2;
    this.y = screen.height - 200;
    this.emitter = new Emitter(this, { ...fireEmitter, autoUpdate: true });
    this.emitter2 = new Emitter(this, { ...sparkEmitter, autoUpdate: true });
  }

  activate(): void {
    // this.addChild(this.particleContainer);
    this.emitter.emit = true;
    this.emitter2.emit = true;
    super.activate();
  }

  deactivate(): void {
    this.emitter.emit = false;
    this.emitter2.emit = false;
    // this.removeChildren();
    super.deactivate();
  }

  tick(delta: number): void {
    if (this.visible) {
      this.emitter.update(delta);
    }
  }
}
