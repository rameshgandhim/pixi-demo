import {
  Loader, Sprite, Texture, Text,
} from 'pixi.js';
import {
  Subscription, timer, take, firstValueFrom,
} from 'rxjs';
import { GameObject } from './GameObject';
import { ScreenConfig } from './ScreenConfig';
import { backout, Tween, Tweener } from './Tween';

const totalSprites = 144;
const availableSprites = 56;

// eslint-disable-next-line import/prefer-default-export
export class CardShuffler extends GameObject {
  sprites: Sprite[] = [];

  subscription: Subscription | null = null;

  startBtnText: Text

  widthOfACard: number;

  heightOfACard: number;

  currentShufflingIdx = 0;

  shuffledCardYAxis = 0;

  pendingTweens: Tween[] = [];

  constructor(private loader: Loader,
    private tweener: Tweener,
    private screen: ScreenConfig) {
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
    button.x = this.screen.width / 2;
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

    for (let i = 0; i < totalSprites; i += 1) {
      const spriteIdx = i % availableSprites;
      const spriteName = `${(spriteIdx + 1).toString()}.png`;
      const texture = cardsSpriteSheet?.textures[spriteName];
      if (texture) {
        const sprite = new Sprite(texture);
        // sprite.skew.x = (offset) * 0;
        // sprite.rotation = 0.1 * i * (0.1 * i);
        // sprite.x = offset * i;
        // sprite.y = 10 * i;
        this.sprites.push(sprite);
        this.addChild(sprite);
      }
    }
  }

  private resetCards() {
    const totalWidth = this.screen.width;
    const totalHeight = this.screen.height;
    const offset = (totalWidth - this.widthOfACard * 2) / totalSprites;
    const offsetP = (totalHeight - this.heightOfACard * 2) / totalSprites;

    for (let i = 0; i < this.sprites.length; i += 1) {
      const sprite = this.sprites[i];
      if (sprite) {
        this.removeChild(sprite);
        this.addChild(sprite);
        if (this.screen.orientation === 'landscape') {
          sprite.x = offset * i;
          sprite.y = 0;
        } else {
          sprite.y = offsetP * i;
          sprite.x = 0;
        }
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
    const isLandscape = this.screen.orientation === 'landscape';

    const t1 = this.tweener.tweenTo(cardToShuffle,
      isLandscape ? 'x' : 'y',
      this.getPositionOfCard(shuffledPos),
      2000,
      backout(0.3),
      undefined,
      (t) => this.onShuffleComplete(t, idx));

    const t2 = this.tweener.tweenTo(cardToShuffle,
      isLandscape ? 'y' : 'x',
      isLandscape ? 300 : this.screen.width - this.widthOfACard,
      2000,
      backout(0.3));

    this.pendingTweens.push(t1, t2);
  }

  private onShuffleComplete(tween: Tween, idx: number): void {
    console.log('shuffle completed for ', idx);

    const pendingIdx = this.pendingTweens.indexOf(tween);
    if (pendingIdx >= 0) {
      this.pendingTweens.splice(pendingIdx, 1);
    }

    if (idx !== 0 && this.visible) {
      this.startShuffling();
    }
  }

  private getPositionOfCard(idx: number): number {
    const totalWidth = this.screen.width;
    const totalHeight = this.screen.height;
    let offset = 0;
    if (this.screen.orientation === 'landscape') {
      offset = (totalWidth - this.widthOfACard * 2) / totalSprites;
    } else {
      offset = (totalHeight - this.heightOfACard * 2) / totalSprites;
    }
    return offset * idx;
  }

  activate(): void {
    this.reset();
    super.activate();
    // this.startShuffling().then();
  }

  deactivate(): void {
    this.unsubscribe();
    super.deactivate();
  }

  reset(): void {
    this.resetCards();
    this.currentShufflingIdx = totalSprites;
  }

  private unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }

    this.pendingTweens.forEach((t) => this.tweener.stop(t));
    this.pendingTweens = [];
  }
}
