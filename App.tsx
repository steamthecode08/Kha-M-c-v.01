
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GameState, Position, Tetromino, CellState, LoveLetter } from './types';
import { GRID_WIDTH, GRID_HEIGHT, TETROMINOS, LOVE_LETTERS, HEART_MASK, GAME_SPEED, WIN_MESSAGE_CONTENT } from './constants';
import TransferData from './components/TransferData';
import Notepad from './components/Notepad';
import RetroWindow from './components/RetroWindow';
import StickyNote from './components/StickyNote';
import DesktopIcon from './components/DesktopIcon';
import LoadingScreen from './components/LoadingScreen';

const App: React.FC = () => {
  // Application Boot State
  const [isLoaded, setIsLoaded] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Application Window States
  const [showGameWindow, setShowGameWindow] = useState(false);
  const [showLettersWindow, setShowLettersWindow] = useState(false);
  const [activeLetter, setActiveLetter] = useState<LoveLetter | null>(null);

  // Game Logic States
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [grid, setGrid] = useState<CellState[][]>([]);
  const [currentPiece, setCurrentPiece] = useState<Tetromino | null>(null);
  const [nextPiece, setNextPiece] = useState<Tetromino | null>(null);
  const [piecePos, setPiecePos] = useState<Position>({ x: 0, y: 0 });
  const [score, setScore] = useState(0);
  
  const gameLoopRef = useRef<number | null>(null);

  // Update real-time clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { 
    hour: 'numeric', 
    minute: '2-digit', 
    hour12: true 
  });

  const initGrid = useCallback(() => {
    const newGrid: CellState[][] = [];
    for (let y = 0; y < GRID_HEIGHT; y++) {
      const row: CellState[] = [];
      for (let x = 0; x < GRID_WIDTH; x++) {
        row.push({
          filled: false,
          color: null,
          isValid: HEART_MASK[y][x] === 1,
        });
      }
      newGrid.push(row);
    }
    setGrid(newGrid);
  }, []);

  const getRandomPiece = useCallback(() => {
    const types: (keyof typeof TETROMINOS)[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    return TETROMINOS[randomType];
  }, []);

  const spawnPiece = useCallback(() => {
    const piece = nextPiece || getRandomPiece();
    const futurePiece = getRandomPiece();
    const initialPos = { x: Math.floor(GRID_WIDTH / 2) - 2, y: -1 };
    
    setCurrentPiece(piece);
    setNextPiece(futurePiece);
    setPiecePos(initialPos);

    if (checkCollision(initialPos, piece.shape, grid)) {
      setGameState(GameState.GAMEOVER);
    }
  }, [grid, nextPiece, getRandomPiece]);

  const startGame = () => {
    initGrid();
    setScore(0);
    const initialNext = getRandomPiece();
    setNextPiece(initialNext);
    setGameState(GameState.PLAYING);
  };

  const handleReturnHome = () => {
    setShowGameWindow(false);
    setShowLettersWindow(false);
    setActiveLetter(null);
    setGameState(GameState.START);
    setCurrentPiece(null);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  const closeGameWindow = () => {
    setShowGameWindow(false);
    setGameState(GameState.START);
    setCurrentPiece(null);
    if (gameLoopRef.current) clearInterval(gameLoopRef.current);
  };

  useEffect(() => {
    if (gameState === GameState.PLAYING && !currentPiece) {
      spawnPiece();
    }
  }, [gameState, currentPiece, spawnPiece]);

  const checkCollision = (pos: Position, shape: number[][], currentGrid: CellState[][]) => {
    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x]) {
          const newY = pos.y + y;
          const newX = pos.x + x;
          if (newX < 0 || newX >= GRID_WIDTH || newY >= GRID_HEIGHT) return true;
          if (newY < 0) continue;
          if (currentGrid[newY][newX].filled) return true;
        }
      }
    }
    return false;
  };

  const checkWin = useCallback((currentGrid: CellState[][]) => {
    for (let y = 0; y < GRID_HEIGHT; y++) {
      for (let x = 0; x < GRID_WIDTH; x++) {
        if (currentGrid[y][x].isValid && !currentGrid[y][x].filled) {
          return false;
        }
      }
    }
    return true;
  }, []);

  const lockPiece = useCallback(() => {
    if (!currentPiece) return;
    const newGrid = [...grid.map(row => [...row])];
    currentPiece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value) {
          const gridY = piecePos.y + y;
          const gridX = piecePos.x + x;
          if (gridY >= 0 && gridY < GRID_HEIGHT && gridX >= 0 && gridX < GRID_WIDTH) {
            newGrid[gridY][gridX].filled = true;
            newGrid[gridY][gridX].color = currentPiece.color;
          }
        }
      });
    });
    setGrid(newGrid);
    setScore(prev => prev + 100);
    setCurrentPiece(null);
    if (checkWin(newGrid)) {
      setGameState(GameState.TRANSFERRING);
    }
  }, [currentPiece, piecePos, grid, checkWin]);

  const moveDown = useCallback(() => {
    if (!currentPiece) return;
    const nextPos = { ...piecePos, y: piecePos.y + 1 };
    if (!checkCollision(nextPos, currentPiece.shape, grid)) {
      setPiecePos(nextPos);
    } else {
      lockPiece();
    }
  }, [currentPiece, piecePos, grid, lockPiece]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== GameState.PLAYING || !currentPiece) return;
      switch (e.key) {
        case 'ArrowLeft': {
          const nextPos = { ...piecePos, x: piecePos.x - 1 };
          if (!checkCollision(nextPos, currentPiece.shape, grid)) setPiecePos(nextPos);
          break;
        }
        case 'ArrowRight': {
          const nextPos = { ...piecePos, x: piecePos.x + 1 };
          if (!checkCollision(nextPos, currentPiece.shape, grid)) setPiecePos(nextPos);
          break;
        }
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowUp': {
          const rotatedShape = currentPiece.shape[0].map((_, index) =>
            currentPiece.shape.map(row => row[index]).reverse()
          );
          if (!checkCollision(piecePos, rotatedShape, grid)) {
            setCurrentPiece({ ...currentPiece, shape: rotatedShape });
          }
          break;
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, currentPiece, piecePos, grid, moveDown]);

  useEffect(() => {
    if (gameState === GameState.PLAYING) {
      gameLoopRef.current = window.setInterval(moveDown, GAME_SPEED);
    } else {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    }
    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, moveDown]);

  if (!isLoaded) {
    return <LoadingScreen onComplete={() => setIsLoaded(true)} />;
  }

  return (
    <div className="relative w-screen h-screen flex flex-col overflow-hidden">
      {/* Menu Bar */}
      <div className="mac-menu-bar">
        <span 
          className="font-bold px-2 cursor-pointer hover:bg-black hover:text-white"
          onClick={handleReturnHome}
          title="Return to Desktop"
        >
          
        </span>
        <span className="mac-menu-item">File</span>
        <span className="mac-menu-item">Edit</span>
        <span className="mac-menu-item">Help</span>
        <div className="flex-grow"></div>
        <span className="font-bold">{formattedTime}</span>
      </div>

      <div className="flex-grow relative p-10 pt-16">
        
        {/* Desktop Background Layer */}
        <div className="absolute inset-0 z-0">
          <StickyNote 
            content="Chào mừng đến Kha Mác Ó phiên bản 0.1" 
            color="bg-[#fef08a]"
            className="top-[15%] left-[10%]"
            rotation="-rotate-2"
          />
          <StickyNote 
            content="Đây là bản thử nghiệm, mong quý user thông cảm nếu có lỗi xảy ra, vì tui cũng chưa biết sửa làm sao, nhưng tui sẽ cố gắng làm cho nó ít lỗi nhất có thể. Chúc quý user trải nghiệm vui!" 
            color="bg-[#bbf7d0]"
            className="top-[35%] left-[5%]"
            rotation="rotate-1"
          />
          <StickyNote 
            content="Trong tương lai gần tui sẽ cố gắng cho nó nhiều tính năng thú dị hơn, nên quý user hãy ở bên cạnh tui lâu nhất có thể để trải nghiệm Kha Mác Ó nhé!!" 
            color="bg-[#c7d2fe]"
            className="bottom-[20%] left-[12%]"
            rotation="-rotate-1"
          />

          {/* Core App Icons on Desktop */}
          <div className="absolute top-20 right-10 flex flex-col items-center gap-12">
            <DesktopIcon 
              label="Mac OS 8 full" 
              icon="💿" 
              onClick={() => {}} 
            />
            <DesktopIcon 
              label="Heart Game" 
              icon="💝" 
              onClick={() => {
                setShowGameWindow(true);
                if (gameState === GameState.START) setGameState(GameState.START);
              }} 
            />
            <DesktopIcon 
              label="Love Letters" 
              icon="📂" 
              onClick={() => setShowLettersWindow(true)} 
            />
          </div>

          <div className="absolute bottom-10 right-10">
            <DesktopIcon label="Trash" icon="🗑️" onClick={() => {}} />
          </div>
        </div>

        {/* Windows Layer */}
        <div className="relative z-10 w-full h-full flex items-center justify-center pointer-events-none">
          
          {/* Game Window */}
          {showGameWindow && (
            <div className="pointer-events-auto">
              {gameState === GameState.START ? (
                <RetroWindow title="Kha Reconstruction System" onClose={closeGameWindow}>
                  <div className="flex flex-col items-center gap-6 py-2 text-black">
                    <h1 className="text-3xl font-bold italic tracking-tighter text-center">Lấp đầy trái tim</h1>
                    <div className="w-16 h-16 bg-blue-100 border border-black flex items-center justify-center text-4xl shadow-md">❤</div>
                    <p className="text-sm text-center max-w-[280px]">
                      Initialize protocol for heart fragment reconstruction.
                    </p>
                    <div className="flex flex-col gap-3 w-full px-8">
                        <button 
                          onClick={startGame}
                          className="w-full py-2 border border-black shadow-[1px_1px_0_#fff] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none bg-[#cecece] font-bold text-lg hover:bg-blue-100"
                        >
                          Initialize (Cực khoái)
                        </button>
                    </div>
                  </div>
                </RetroWindow>
              ) : (gameState === GameState.PLAYING || gameState === GameState.GAMEOVER) && (
                <div className="flex items-start gap-6">
                  <RetroWindow title="Appearance Manager" width="w-auto" onClose={closeGameWindow}>
                    <div className="flex flex-col items-center gap-4">
                        <div className="flex gap-10 w-full px-4 border-b border-gray-400 pb-2 mb-2 text-black text-xs font-bold">
                            <span>Mức độ: Cực khoái</span>
                            <span>Score: {score}</span>
                        </div>
                        
                        <div className="bg-white border-2 border-black p-4 shadow-inner">
                            <div 
                            className="grid gap-[2px]" 
                            style={{ 
                                gridTemplateColumns: `repeat(${GRID_WIDTH}, 24px)`,
                                gridTemplateRows: `repeat(${GRID_HEIGHT}, 24px)`
                            }}
                            >
                            {grid.map((row, y) =>
                                row.map((cell, x) => {
                                let isCurrentPiece = false;
                                let pColor = '';
                                if (currentPiece) {
                                    const pieceY = y - piecePos.y;
                                    const pieceX = x - piecePos.x;
                                    if (pieceY >= 0 && pieceY < currentPiece.shape.length && pieceX >= 0 && pieceX < currentPiece.shape[0].length && currentPiece.shape[pieceY][pieceX]) {
                                    isCurrentPiece = true;
                                    pColor = currentPiece.color;
                                    }
                                }
                                const isFilled = cell.filled || isCurrentPiece;
                                const finalColor = isCurrentPiece ? pColor : cell.color || '#fff';
                                
                                return (
                                    <div 
                                    key={`${x}-${y}`} 
                                    className={`w-[24px] h-[24px] border ${cell.isValid ? 'border-gray-200' : 'border-transparent'}`}
                                    style={{
                                        backgroundColor: isFilled ? finalColor : (cell.isValid ? '#f0f0f0' : 'transparent'),
                                        boxShadow: isFilled ? 'inset 1px 1px rgba(255,255,255,0.8), inset -1px -1px rgba(0,0,0,0.5), 1px 1px #000' : 'none',
                                    }}
                                    >
                                    </div>
                                );
                                })
                            )}
                            </div>
                        </div>
                    </div>
                  </RetroWindow>

                  <div className="flex flex-col gap-4">
                    <RetroWindow title="Preview" width="w-32" onClose={closeGameWindow}>
                      <div className="flex flex-col items-center gap-2">
                        <span className="text-[10px] font-bold text-black uppercase">Next Piece</span>
                        <div className="bg-white border border-black p-2 shadow-inner w-20 h-20 flex items-center justify-center">
                          {nextPiece && (
                            <div 
                              className="grid gap-[1px]"
                              style={{
                                gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 16px)`,
                                gridTemplateRows: `repeat(${nextPiece.shape.length}, 16px)`
                              }}
                            >
                              {nextPiece.shape.map((row, y) =>
                                row.map((cell, x) => (
                                  <div 
                                    key={`${x}-${y}`}
                                    className="w-4 h-4"
                                    style={{
                                      backgroundColor: cell ? nextPiece.color : 'transparent',
                                      boxShadow: cell ? 'inset 1px 1px rgba(255,255,255,0.8), inset -1px -1px rgba(0,0,0,0.5), 1px 1px #000' : 'none'
                                    }}
                                  />
                                ))
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </RetroWindow>
                  </div>
                </div>
              )}

              {gameState === GameState.TRANSFERRING && (
                <TransferData onComplete={() => setGameState(GameState.WIN)} />
              )}
              {gameState === GameState.WIN && (
                <div className="z-[70] shadow-2xl">
                  <Notepad 
                      title="System: DATA RECONSTRUCTED"
                      content={WIN_MESSAGE_CONTENT}
                      onClose={closeGameWindow} 
                      width="w-[600px]"
                  />
                </div>
              )}
            </div>
          )}

          {/* Letters Window */}
          {showLettersWindow && (
            <div className="pointer-events-auto">
              <RetroWindow title="Letters for you" width="w-[450px]" onClose={() => setShowLettersWindow(false)}>
                  <div className="bg-white border border-black p-4 h-80 overflow-y-auto grid grid-cols-4 gap-4 items-start content-start">
                      {LOVE_LETTERS.map((letter) => (
                          <div 
                              key={letter.id} 
                              className="flex flex-col items-center cursor-pointer group"
                              onClick={() => setActiveLetter(letter)}
                          >
                              <div className="text-4xl mb-1 group-hover:scale-110 transition-transform">📄</div>
                              <span className="text-[10px] text-center font-bold px-1 break-words line-clamp-2 bg-[#cecece] border border-black max-w-[80px]">
                                  {letter.date}
                              </span>
                          </div>
                      ))}
                  </div>
              </RetroWindow>
            </div>
          )}

          {/* Individual Letter Viewers */}
          {activeLetter && (
            <div className="absolute z-[100] top-1/2 left-1/2 -translate-x-[45%] -translate-y-[45%] shadow-2xl pointer-events-auto">
              <Notepad 
                  title={`Note: ${activeLetter.title}`}
                  date={activeLetter.date}
                  content={activeLetter.content}
                  onClose={() => setActiveLetter(null)} 
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
