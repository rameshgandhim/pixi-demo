import * as PIXI from 'pixi.js';
import {
  Application, Loader, Ticker, Sprite, Texture, Text,
} from 'pixi.js';
import { initializeApp } from 'firebase/app';
import { CardShuffler } from './app/CardsShuffler';
import { FireParticle } from './app/FireParticle';
import { FPSMeter } from './app/FPSMeter';
import { GameMenu } from './app/GameMenu';
import { GameObject } from './app/GameObject';
import { ITick } from './app/ITick';
import { RandomImageTool } from './app/RandomImageTool';
import { Tweener } from './app/Tween';
import { ScreenConfig } from './app/ScreenConfig';

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
  appId: '1:71883800219:web:e78d82f9ba030aa69b903e',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

console.log('initialized firebase app', firebaseApp.name);

// Enables Pixi Dev tool to work
declare let window: Window & { PIXI: unknown };
window.PIXI = PIXI;
// document.head.requestFullscreen();

const bodyWidth = document.body.clientWidth;
const bodyHeight = document.body.clientHeight;
const canvasElement = document.getElementById('gameCanvas') as HTMLCanvasElement;

console.log('body widht and height', bodyWidth, bodyHeight);
// create and append app
const app = new Application({
  backgroundColor: 0x1099bb, // light blue
  sharedTicker: true,
  sharedLoader: true,
  // resolution: devicePixelRatio,
  resizeTo: canvasElement,
  antialias: true,
  view: canvasElement,
  width: bodyWidth,
  height: bodyHeight,
});

function resize() {
  app.stage.scale.x = window.innerWidth / bodyWidth;
  app.stage.scale.y = window.innerHeight / bodyHeight;
  app.renderer.resize(window.innerWidth,
    window.innerHeight);
  // app.resizeTo(canvasElement);
  // app.renderer.resize(Math.ceil(bodyWidth * ratio),
  //   Math.ceil(GAME_HEIGHT * ratio));
}
window.addEventListener('resize', () => resize());

// fake full screen
window.scrollTo(0, 1);

document.body.appendChild(app.view);
const loader = Loader.shared;
const ticker = Ticker.shared;
const tickers: ITick[] = [];
const gameObjects: GameObject[] = [];

// preload needed assets
loader.add('cards', '/assets/spritesheets/cards.json');
loader.add('random', '/assets/spritesheets/random.json');
loader.add('background', '/assets/img/background.jpg');
loader.add('button', '/assets/img/button.png');
loader.add('flame', '/assets/img/fire.png');
loader.add('particle', '/assets/img/particle.png');
loader.add('spark', '/assets/img/spark.png');

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
  if (document.body.requestFullscreen) {
    document.body.requestFullscreen();
  }
}

function createbtn(btnText: string, callback: () => void): Sprite {
  const buttonTex = Texture.from('button');
  const button = new Sprite(buttonTex);
  // button.anchor.set(1, 0);
  button.interactive = true;
  button.addListener('pointerdown', callback);
  const text = new Text(btnText, {
    align: 'left',
    fill: 0xffffff,
    fontSize: 24,
  });
  // text.x = 0;
  text.anchor.set(0, 0);
  button.addChild(text);
  return button;
}

function createback(x: number, y: number, onbackCallback: () => void): Sprite {
  const button = createbtn('back', onbackCallback);
  // button.anchor.set(1, 0);
  button.y = y;
  button.x = x - button.width;
  button.interactive = true;
  button.name = 'back_btn';
  (button.children[0] as Text)?.anchor?.set(-0.5, 0);
  return button;
}

function createfullscreen(x: number, y: number, callback: () => void): Sprite {
  const button = createbtn('fullscreen', callback);
  // button.anchor.set(1, 0);
  button.y = y;
  button.x = x - button.width * 2;
  button.interactive = true;
  button.name = 'full_btn';
  return button;
}

function closeLoadingScreen(): void {
  const loadingScreen = document.getElementById('loadingScreen');
  if (loadingScreen) {
    loadingScreen.style.display = 'none';
  }
}

// when loader is ready
loader.load(() => {
  tryForFullScreen();
  console.log('devicePixelRatio', devicePixelRatio);
  const screenConfig: ScreenConfig = {
    width: app.screen.width,
    height: app.screen.height,
    orientation: app.screen.width > app.screen.height ? 'landscape' : 'portrait',
  };
  const backgroundTexture = Texture.from('background');
  const background = new Sprite(backgroundTexture);
  background.scale.x = screenConfig.width / backgroundTexture.width;
  background.scale.y = screenConfig.height / backgroundTexture.height;
  app.stage.addChild(background);
  const fpsMeter = new FPSMeter(ticker);

  app.stage.addChild(fpsMeter);

  tickers.push(fpsMeter);

  const tweener = new Tweener();
  tickers.push(tweener);
  const gameMenu = new GameMenu(screenConfig);
  const cardsShuffler = new CardShuffler(loader, tweener, screenConfig);
  const fireParticle = new FireParticle(screenConfig);
  const randomImageTool = new RandomImageTool(loader, screenConfig);
  addGameObject(gameMenu);
  addGameObject(cardsShuffler);
  addGameObject(fireParticle);
  tickers.push(fireParticle);
  addGameObject(randomImageTool);

  const backBtn = createback(screenConfig.width, 0, () => {
    console.log('back button');
    gameMenu.optionSelected.next(-1);
    backBtn.visible = false;
    deactivateAll();
    gameMenu.activate();
  });

  const fullScreenBtn = createfullscreen(screenConfig.width, 0, () => {
    console.log('full button');
    tryForFullScreen();
  });

  app.stage.addChild(backBtn);
  app.stage.addChild(fullScreenBtn);
  gameMenu.activate();
  backBtn.visible = false;
  // cardsShuffler.activate();
  closeLoadingScreen();
  gameMenu
    .optionSelected
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

  ticker.add((delta: number) => {
    for (let i = 0; i < tickers.length; i += 1) {
      tickers[i].tick(delta);
    }
  });
});
