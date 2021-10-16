/* eslint-disable import/prefer-default-export */
import {
  Loader, Text, Sprite, Texture, Spritesheet,
} from 'pixi.js';
import { Subscription, interval } from 'rxjs';
import { GameObject } from './GameObject';
import { ScreenConfig } from './ScreenConfig';

const totalRandomImage = 10;
const totalRandomTexts1 = [
  'You won cash prize!',
  'Better luck next time!',
  'Weather is not so nice!',
  'Weather is fantastic today!',
  'You are on a roll',
];

const totalRandomTexts2 = [
  'You won cash prize!',
  'Better luck next time!',
  'Weather is not so nice!',
  'Weather is fantastic today!',
  'You are on a roll',
];

const totalRandomTexts3 = [
  'You won cash prize!',
  'Better luck next time!',
  'Weather is not so nice!',
  'Weather is fantastic today!',
  'You are on a roll',
];

function getRandomValue(min: number, max: number): number {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}

export class RandomImageTool extends GameObject {
  startBtnText: Text;

  panel: GameObject;

  spriteSheet: Spritesheet;

  subscription: Subscription | null = null;

  helpText: Text;

  constructor(loader: Loader,
    private screen: ScreenConfig) {
    super();
    this.panel = new GameObject();
    this.panel.x = screen.width / 2;
    this.panel.y = screen.height / 2;
    this.addChild(this.panel);
    this.startBtnText = this.createbutton();
    this.spriteSheet = loader.resources.random.spritesheet!;
    this.helpText = new Text('Click On Start', {
      align: 'center',
      fill: 0xffffff,
      fontSize: 38,
    });
    this.helpText.anchor.set(0.5, 0.5);
    this.helpText.x = screen.width / 2;
    this.helpText.y = screen.height / 2;
    this.addChild(this.helpText);
  }

  private createbutton(): Text {
    const button = new Sprite(Texture.from('button'));
    button.anchor.set(1, 1);
    button.y = this.screen.height - 10;
    button.x = this.screen.width - 10;
    button.interactive = true;
    button.buttonMode = true;
    button.addListener('pointerdown', () => this.onStart());
    this.addChild(button);

    const text = new Text('Start', {
      align: 'center',
      fill: 0xffffff,
      fontSize: 24,
    });
    // text.x = 0;
    text.anchor.set(1.5, 1);
    button.addChild(text);
    return text;
  }

  onStart(): void {
    this.start();
  }

  private start() {
    if (this.subscription != null) {
      this.unsubscribe();
      this.startBtnText.text = 'Start';
      // this.reset();
    } else {
      this.helpText.visible = false;
      this.subscription = new Subscription();
      this.subscription.add(interval(2000).subscribe(() => this.shuffleImages()));
      this.startBtnText.text = 'Stop';
    }
  }

  private reset() {
    this.helpText.visible = true;
    this.startBtnText.text = 'Start';
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  private shuffleImages(): void {
    this.panel.removeChildren();
    const padding = 10;

    // first emoji
    const obj1 = this.addTextOrImage('christmas/r0', totalRandomTexts1);
    this.panel.addChild(obj1);
    // second weather
    const obj2 = this.addTextOrImage('weather/r1', totalRandomTexts2);
    this.panel.addChild(obj2);

    // third gifts
    const obj3 = this.addTextOrImage('emoticons/r2', totalRandomTexts3);
    this.panel.addChild(obj3);

    const allObjects = [obj1, obj2, obj3];

    const maxHeight = Math.max(obj1.height, obj2.height, obj3.height);
    const maxWidth = Math.max(obj1.width, obj2.width, obj3.width);
    if (this.screen.orientation === 'landscape') {
      obj3.y = maxHeight + padding;
      obj3.x = maxWidth / 2;
    } else {
      obj3.y = maxHeight * 2 + padding;
    }

    if (this.screen.orientation === 'landscape') {
      obj2.x = maxWidth + padding;
    } else {
      obj2.y = maxHeight + padding;
    }

    console.log(`Max Height ${maxHeight} and Width ${maxWidth}`);

    for (let i = 0; i < 2; i += 1) {
      const selectedObj = allObjects[i];
      if (selectedObj instanceof Text) {
        console.log(`Index ${i} is text`);
        if (this.screen.orientation === 'landscape') {
          selectedObj.y = maxHeight / 2 + padding;
        } else {
          selectedObj.y = maxHeight / 2 + (i * maxHeight) + padding;
        }
      }
    }
    this.panel.anchorX = 0.5;
    this.panel.anchorY = 0.5;
    // this.start();
  }

  private addTextOrImage(prefix: string, texts: string[]): Sprite {
    const canShowText = getRandomValue(0, 1) === 0;
    let displayObject: Sprite;
    if (canShowText) {
      const textIdx = getRandomValue(0, texts.length - 1);
      displayObject = this.addText(texts[textIdx]);
    } else {
      displayObject = this.addSprite(prefix);
    }
    return displayObject;
  }

  private addText(text: string): Text {
    const displayObject = new Text(text, {
      align: 'center',
      fill: 0xffffff,
      fontSize: getRandomValue(10, 40),
    });
    this.panel.addChild(displayObject);
    return displayObject;
  }

  private addSprite(prefix: string): Sprite {
    const spriteId = getRandomValue(0, totalRandomImage - 1);
    const spriteName = `${prefix}${spriteId.toString()}.png`;
    const texture = this.spriteSheet.textures[spriteName];
    if (!texture) {
      console.log('texture not available for ', spriteName);
    }
    const displayObject = new Sprite(texture);
    this.panel.addChild(displayObject);
    return displayObject;
  }

  activate(): void {
    this.panel.removeChildren();
    this.reset();
    super.activate();
  }

  deactivate(): void {
    this.unsubscribe();
    super.deactivate();
  }
}
