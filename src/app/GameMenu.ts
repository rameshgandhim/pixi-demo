import {
  Text,
} from 'pixi.js';

import {
  Subject,
} from 'rxjs';
import { GameObject } from './GameObject';

const spacing = 20;

// eslint-disable-next-line import/prefer-default-export
export class GameMenu extends GameObject {
  buttons: Text[] = []

  optionSelected: Subject<number> = new Subject()

  constructor() {
    super();
    this.constructMenu();
    this.centerScreen();
  }

  private readonly centerScreen = () => {
    this.x = (window.screen.width - this.width) / 2;
    this.y = (window.screen.height - this.height) / 2;
  }

  private readonly constructMenu = () => {
    console.log('constructing menu');
    const buttons = ['Card Shuffler', 'Random Image Tool', 'Fire Particle'];

    buttons.forEach((b: string, i: number) => {
      const btn = new Text(b, { fill: 0xffffff });
      btn.interactive = true;
      btn.buttonMode = true;
      btn.on('pointerdown', () => this.OnPress(i));
      btn.addListener('mousedown', () => this.OnPress(i));
      btn.y += (btn.height + spacing) * i;
      this.addChild(btn);
    });
    this.addListener('pointerdown', (e: any) => {
      console.log(e);
    });
  }

  private OnPress(btnId: number) {
    console.log('pressing option: ', btnId);
    this.optionSelected.next(btnId);
  }
}
