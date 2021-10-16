import * as PIXI from 'pixi.js';
import {
  Application, Loader, Ticker, Sprite, Texture, Text,
} from 'pixi.js';
import { distinctUntilChanged } from 'rxjs';
import { initializeApp } from 'firebase/app';
import { CardShuffler } from './app/CardsShuffler';
import { FireParticle } from './app/FireParticle';
import { FPSMeter } from './app/FPSMeter';
import { GameMenu } from './app/GameMenu';
import { GameObject } from './app/GameObject';
import { ITick } from './app/ITick';
import { RandomImageTool } from './app/RandomImageTool';
import { Tweener } from './app/Tween';

// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyARWfnfZlizjmfmf9fktCMuVKm_C3c7o1I',
  authDomain: 'pixijs-demo-f3037.firebaseapp.com',
  projectId: 'pixijs-demo-f3037',
  storageBucket: 'pixijs-demo-f3037.appspot.com',
  messagingSenderId: '71883800219',
  appId: '1:71883800219:web:e78d82f9ba030aa69b903e'
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

console.log('initialized firebase app', firebaseApp.name);

// Enables Pixi Dev tool to work
declare let window: Window & { PIXI: unknown };
window.PIXI = PIXI;
// document.head.requestFullscreen();

// create and append app
const app = new Application({
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
  resolution: devicePixelRatio,
  resizeTo: window,
});
document.body.style.width = '100wh';
document.body.style.height = '100vh';
document.body.style.margin = '0px';
document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;
const tickers: ITick[] = [];
const gameObjects: GameObject[] = [];

// preload needed assets
loader.add('cards', '/assets/spritesheets/cards.json');
loader.add('background', '/assets/img/background.jpg');
loader.add('button', '/assets/img/button.png');

function deactivateAll(): void {
  gameObjects.forEach((g) => {
    g.deactivate();
  });
}

function addGameObject(g: GameObject): void {
  app.stage.addChild(g);
  gameObjects.push(g);
  g.deactivate();
}

function tryForFullScreen(): void {
  document.body.requestFullscreen();
}

function createback(onbackCallback: () => void): Sprite {
  const buttonTex = Texture.from('button');
  const button = new Sprite(buttonTex);
  // button.anchor.set(1, 0);
  button.y = 0;
  button.x = document.body.offsetWidth - buttonTex.width;
  button.interactive = true;
  button.addListener('pointerdown', onbackCallback);
  const text = new Text('back', {
    align: 'left',
    fill: 0xffffff,
    fontSize: 24,
  });
  // text.x = 0;
  text.anchor.set(-0.5, 0);
  button.addChild(text);
  return button;
}

// when loader is ready
loader.load(() => {
  const backgroundTexture = Texture.from('background');
  const background = new Sprite(backgroundTexture);
  background.scale.x = window.screen.width / backgroundTexture.width;
  background.scale.y = window.screen.height / backgroundTexture.height;
  app.stage.addChild(background);
  const fpsMeter = new FPSMeter(ticker);

  app.stage.addChild(fpsMeter);

  tickers.push(fpsMeter);

  const tweener = new Tweener();
  tickers.push(tweener);
  const gameMenu = new GameMenu();
  const cardsShuffler = new CardShuffler(loader, tweener);
  const fireParticle = new FireParticle();
  const randomImageTool = new RandomImageTool();
  addGameObject(gameMenu);
  addGameObject(cardsShuffler);
  addGameObject(fireParticle);
  addGameObject(randomImageTool);

  const backBtn = createback(() => {
    console.log('back button');
    gameMenu.optionSelected.next(-1);
    backBtn.visible = false;
    deactivateAll();
    gameMenu.activate();
  });

  app.stage.addChild(backBtn);
  gameMenu.activate();
  backBtn.visible = false;
  // cardsShuffler.activate();
  gameMenu
    .optionSelected
    .pipe(distinctUntilChanged())
    .subscribe((option) => {
      deactivateAll();
      tryForFullScreen();
      backBtn.visible = option !== -1;
      switch (option) {
        case 0:
          cardsShuffler.activate();
          break;
        case 1:
          randomImageTool.activate();
          break;
        case 2:
          fireParticle.activate();
          break;
        case -1:
          gameMenu.activate();
          break;
        default:
          break;
      }
    });

  ticker.add(() => {
    for (let i = 0; i < tickers.length; i += 1) {
      tickers[i].tick();
    }
  });
});
