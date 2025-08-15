'use client';
import { Application, Container, Sprite, Texture, Ticker, Graphics, Text } from 'pixi.js';

export class SlotGames {
  containerRef: HTMLDivElement | null = null;
  app: Application | null = null;
  textures: Texture[] = [];
  symbols = ['🍒', '🍋', '🍊', '🍇', '🔔'];
  //Create reels
  reelCount = 3;
  symbolCount = 3;
  reels: Container[] = [];
  reelWidth = 150;
  symbolHeight = 100;
  // Spinning state
  spinning = false;

  constructor(containerRef: HTMLDivElement) {
    this.containerRef = containerRef;
    this.initApplication().then((app) => {
      this.app = app;
    });
  }

  async initApplication() {
    const app = new Application();
    await app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x1a1a1a,
    });
    return app;
  }

  // Create a promise to load textures
  async loadTextures() {
    if (!this.app) return;
    for (const symbol of ['🍒', '🍋', '🍊', '🍇', '🔔']) {
      const text = new Text(symbol, {
        fontFamily: 'Arial',
        fontSize: 60,
        fill: 0xffffff,
      });
      const texture = this.app.renderer.generateTexture(text);
      this.textures.push(texture);
      text.destroy(); // Очистка
    }
  }

  createReel(x: number) {
    if (!this.app) return;

    const reel = new Container();
    reel.x = x;

    const symbolsInReel: Sprite[] = [];
    for (let i = 0; i < this.symbolCount + 2; i++) {
      const symbol = new Sprite(this.textures[Math.floor(Math.random() * this.textures.length)]);
      symbol.y = i * this.symbolHeight - this.symbolHeight;
      symbol.width = this.reelWidth;
      symbol.height = this.symbolHeight;
      reel.addChild(symbol);
      symbolsInReel.push(symbol);
    }

    this.reels.push(reel);
    this.app.stage.addChild(reel);
    return symbolsInReel;
  }

  // Check win condition
  checkWinCondition(reels: Container[]) {
    const middleRowSymbols = reels.map((reel) => {
      const middleSymbol = reel.children[1] as Sprite;

      return this.textures.indexOf(middleSymbol.texture);
    });

    if (middleRowSymbols.every((symbol) => symbol === middleRowSymbols[0])) {
      alert('Win! Three identical symbols!');
    }
  }

  // Spin animation
  async spin() {
    if (this.spinning) return;
    this.spinning = true;

    const reelAnimations: Promise<void>[] = [];

    this.reels.forEach((reel, index) => {
      const symbolsInReel = reel.children as Sprite[];
      const promise = new Promise<void>((resolve) => {
        let position = 0;
        const speed = 10;
        const duration = 1000 + index * 500;

        const ticker = new Ticker();
        ticker.start();

        const startTime = Date.now();

        ticker.add(() => {
          position += speed;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          reel.children.forEach((symbol: any, i: number) => {
            symbol.y =
              ((i * this.symbolHeight + position) % ((this.symbolCount + 2) * this.symbolHeight)) -
              this.symbolHeight;
          });

          if (Date.now() - startTime > duration) {
            ticker.destroy();
            // Snap to nearest symbol
            const offset = position % this.symbolHeight;

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            reel.children.forEach((symbol: any) => {
              symbol.y = Math.round(symbol.y / this.symbolHeight) * this.symbolHeight;
            });

            resolve();
          }
        });
      });
      reelAnimations.push(promise);
    });

    await Promise.all(reelAnimations);
    this.spinning = false;

    // Check win condition (simple: three identical symbols in middle row)
    this.checkWinCondition(this.reels);
  }

  // Initialize game
  async init() {
    if (!this.app || !this.containerRef) return;

    await this.loadTextures();

    // Create reels
    for (let i = 0; i < this.reelCount; i++) {
      this.createReel(200 + i * (this.reelWidth + 20));
    }

    // Create spin button
    const button = new Graphics();

    button.beginFill(0xff0000);
    button.drawRect(300, 500, 200, 50);
    button.endFill();
    button.interactive = true;

    const buttonText = new Text('SPIN', {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center',
    });
    buttonText.x = 350;
    buttonText.y = 515;

    button.addChild(buttonText);
    this.app.stage.addChild(button);

    button.on('pointerdown', this.spin);

    this.containerRef.appendChild(this.app.view as HTMLCanvasElement);
  }

  destroyMachine() {
    if (this.app) this.app.destroy(true, { children: true, texture: true });
  }
}
