'use client';
import {
  Application,
  Texture,
  Assets,
  Container,
  Sprite,
  ContainerChild,
  Ticker,
  Graphics,
  Text,
} from 'pixi.js';
import { useRef, useState, useEffect } from 'react';
import lemonPng from '../images/lemon.png';
import cherryPng from '../images/cherry.png';
import orangePng from '../images/orange.png';
import plumpPng from '../images/plump.png';
import sevenPng from '../images/seven.png';
import sceeenBg from '../images/sceen.jpg';

type Props = {
  id: string;
};
export const FuncSlotMachine = ({ id }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<Application | null>(null);
  const [points, setPoints] = useState(0);

  async function initApplication() {
    const app = new Application();

    await app.init({
      width: 800,
      height: 600,
      backgroundColor: 0x1a1a1a,
    });
    return app;
  }

  useEffect(() => {
    initApplication().then((app) => {
      setApp(app);
    });
  }, []);

  useEffect(() => {
    if (containerRef.current && app) {
      containerRef.current.appendChild(app.view as HTMLCanvasElement);

      // Load textures

      const symbolsSVG = [cherryPng, lemonPng, orangePng, plumpPng, sevenPng];
      const textures: Texture[] = [];

      // Create a promise to load textures
      const loadTextures = async () => {
        for (const symbol of symbolsSVG) {
          const texture = await Assets.load<Texture>(symbol);
          textures.push(texture);
        }
      };

      // Create reels
      const reelCount = 3;
      const symbolCount = 3;
      let reels: Container[] = [];
      const reelWidth = 110;
      const symbolHeight = 100;

      const createReel = (x: number, y?: number) => {
        const reel = new Container();
        reel.x = x;
        if (y) {
          reel.y = y;
        }

        const symbolsInReel: Sprite[] = [];
        for (let i = 0; i < symbolCount; i++) {
          const symbol = new Sprite(textures[Math.floor(Math.random() * textures.length)]);
          const offsetY = i * 10;
          symbol.y = i * symbolHeight + offsetY - symbolHeight;
          symbol.width = reelWidth;
          symbol.height = symbolHeight;
          reel.addChild(symbol);
          symbolsInReel.push(symbol);
        }

        reels.push(reel);
        // app.stage.position.y = 100;
        // app.stage.height = 400;
        app.stage.addChild(reel);
        return symbolsInReel;
      };

      const addSceenBackground = async (zIndex?: number) => {
        const texture = await Assets.load(sceeenBg);

        // Создаем спрайт и добавляем на сцену
        const sprite = new Sprite(texture);
        sprite.x = 0;
        sprite.y = 0;
        sprite.width = 800;
        sprite.height = 600;
        if (zIndex) {
          sprite.zIndex = zIndex;
        }
        app.stage.addChild(sprite);
      };

      const checkWinCondition = (reels: Container<ContainerChild>[]) => {
        const middleRowSymbols = reels.map((reel) => {
          const middleSymbol = reel.children[1] as Sprite;
          return textures.indexOf(middleSymbol.texture);
        });
        const allSymbols = reels.map((reel) => reel.children).flat();
        if (allSymbols.every((symbol) => symbol === allSymbols[0])) {
          setPoints((prev) => prev + 10000);
          alert('Win! Jack Pot!');
          return;
        }
        if (middleRowSymbols.every((symbol) => symbol === middleRowSymbols[0])) {
          setPoints((prev) => prev + 1000);
          alert('Win! Three identical symbols!');
        }
      };

      // Spin animation
      let spinning = false;

      const spin = async () => {
        if (spinning) return;
        spinning = true;

        // Remove existing reels
        app.stage.removeChild(...reels);
        //Creating new reels
        reels = [];
        for (let i = 0; i < reelCount; i++) {
          const offset = i * 100;
          createReel(135 + i * reelWidth + offset, 250);
        }

        const reelAnimations: Promise<void>[] = [];

        reels.forEach((reel, index) => {
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
                symbol.y = ((i * symbolHeight + position) % (symbolCount * symbolHeight)) - symbolHeight - 45; //45 offset for view spinning
              });

              if (Date.now() - startTime > duration) {
                ticker.destroy();
                // Snap to nearest symbol
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                reel.children.forEach((symbol: any) => {
                  symbol.y = Math.round(symbol.y / symbolHeight) * symbolHeight;
                });

                resolve();
              }
            });
          });
          reelAnimations.push(promise);
        });

        await Promise.all(reelAnimations);

        spinning = false;

        // Check win condition (simple: three identical symbols in middle row)
        checkWinCondition(reels);
      };

      const createButton = () => {
        const button = new Graphics();

        button.beginFill(0xff0000);
        button.drawRect(300, 555, 200, 40);

        button.endFill();
        button.interactive = true;

        const buttonText = new Text('SPIN', {
          fontFamily: 'Arial',
          fontSize: 24,
          fill: 0xffffff,
          align: 'center',
        });
        buttonText.x = 375;
        buttonText.y = 560;
        button.addChild(buttonText);
        return button;
      };

      // Initialize game
      const init = async () => {
        await addSceenBackground();
        await loadTextures();

        // Create reels
        for (let i = 0; i < reelCount; i++) {
          const offset = i * 100;
          createReel(135 + i * reelWidth + offset, 250);
        }

        // Create spin button
        const button = createButton();
        app.stage.addChild(button);
        button.on('pointerdown', spin);
      };

      init();
    }

    return () => {
      if (app) app.destroy(true, { children: true, texture: true });
    };
  }, [app]);

  useEffect(() => {
    if (!app) return;
    const div = new Graphics();

    div.beginFill('#54B972');
    div.drawRect(640, 4, 200, 40);
    div.zIndex = 100;

    div.endFill();

    const divText = new Text(points.toString(), {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: 0xffffff,
      align: 'center',
    });
    divText.x = 675;
    divText.y = 10;
    divText.zIndex = 100;
    app.stage.removeChild(div, divText);
    div.addChild(divText);
    app.stage.addChild(div);
  }, [points, app]);

  return <div className="h-screen w-screen" ref={containerRef}></div>;
};
