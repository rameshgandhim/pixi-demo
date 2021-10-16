import {
  Loader, Sprite, Texture, Text,
} from 'pixi.js';
import {
  Subscription, timer, take, firstValueFrom,
} from 'rxjs';
import { GameObject } from './GameObject';
import { backout, Tweener } from './Tween';

const totalSprites = 5;
const availableSprites = 56;

// eslint-disable-next-line import/prefer-default-export
export class CardShuffler extends GameObject {
  sprites: Sprite[] = [];

  subscription: Subscription = new Subscription();

  startBtnText: Text

  widthOfACard: number;

  heightOfACard: number;

  currentShufflingIdx = 0;

  shuffledCardYAxis = 0;

  constructor(private loader: Loader, private tweener: Tweener) {
    super();
    const cardsSpriteSheet = this.loader.resources.cards.spritesheet;
    const textureOfCard = cardsSpriteSheet?.textures['1.png'];
    this.widthOfACard = textureOfCard?.width ?? 100;
    this.heightOfACard = textureOfCard?.height ?? 100;

    this.constructSprites();
    this.y = 100;
    this.shuffledCardYAxis = this.y + this.heightOfACard + 10;
    // this.x = 100;
    // this.y = window.screen.height / 4;
    // this.x = window.screen.width / 2;
    this.startBtnText = this.createbutton();
  }

  private createbutton(): Text {
    const button = new Sprite(Texture.from('button'));
    button.anchor.x = 0.5;
    button.anchor.y = 0;
    button.y = this.y + this.heightOfACard;
    button.x = window.screen.width / 2;
    button.interactive = true;
    button.buttonMode = true;
    button.addListener('pointerdown', () => this.onStart());
    this.addChild(button);

    const text = new Text('Start', {
      align: 'left',
      fill: 0xffffff,
      fontSize: 24,
    });
    text.x = 0;
    text.anchor.set(0.5, 0);
    button.addChild(text);
    return text;
  }

  private onStart() {
    console.log('start shuffling');
    this.startShuffling();
  }

  private readonly constructSprites = () => {
    const cardsSpriteSheet = this.loader.resources.cards.spritesheet;
    const totalWidth = window.screen.width;
    const offset = (totalWidth - this.widthOfACard * 2) / totalSprites;

    for (let i = 0; i < totalSprites; i += 1) {
      const spriteIdx = i % availableSprites;
      const spriteName = `${(spriteIdx + 1).toString()}.png`;
      const texture = cardsSpriteSheet?.textures[spriteName];
      if (texture) {
        const sprite = new Sprite(texture);
        // sprite.skew.x = (offset) * 0;
        // sprite.rotation = 0.1 * i * (0.1 * i);
        sprite.x = offset * i;
        // sprite.y = 10 * i;
        this.sprites.push(sprite);
        this.addChild(sprite);
      }
    }
  }

  private resetCards() {
    const totalWidth = window.screen.width;
    const offset = (totalWidth - this.widthOfACard * 2) / totalSprites;

    for (let i = 0; i < this.sprites.length; i += 1) {
      const sprite = this.sprites[i];
      if (sprite) {
        sprite.x = offset * i;
      }
    }
  }

  private async startShuffling() {
    this.currentShufflingIdx -= 1;
    await firstValueFrom(timer(1000).pipe(take(1)));
    this.shuffleCard(this.currentShufflingIdx);
  }

  private shuffleCard(idx: number): void {
    const shuffledPos = totalSprites - this.currentShufflingIdx - 1;
    const cardToShuffle = this.sprites[idx];
    this.removeChild(cardToShuffle);
    this.addChild(cardToShuffle);
    this.tweener.tweenTo(cardToShuffle,
      'x',
      this.getPositionOfCard(shuffledPos),
      2000,
      backout(0.3),
      undefined,
      () => this.onShuffleComplete(idx));

    this.tweener.tweenTo(cardToShuffle,
      'y',
      300,
      2000,
      backout(0.3));
  }

  private onShuffleComplete(idx: number): void {
    console.log('shuffle completed for ', idx);

    if (idx !== 0) {
      this.startShuffling();
    }
  }

  private getPositionOfCard(idx: number): number {
    const totalWidth = window.screen.width;
    const offset = (totalWidth - this.widthOfACard * 2) / totalSprites;
    return offset * idx;
  }

  activate(): void {
    this.reset();
    super.activate();
    // this.startShuffling().then();
  }

  deactivate(): void {
    super.deactivate();
  }

  reset(): void {
    this.resetCards();
    this.currentShufflingIdx = totalSprites;
  }
}
