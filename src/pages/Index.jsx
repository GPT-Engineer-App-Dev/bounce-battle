import { Box, Flex, Button, Text, useBoolean } from "@chakra-ui/react";
import { useRef, useEffect } from "react";

const Index = () => {
  const [isPlaying, setIsPlaying] = useBoolean(false);
  const canvasRef = useRef(null);

  const startGame = () => {
    setIsPlaying.on();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let ballX = canvas.width / 2;
    let ballY = canvas.height / 2;
    let ballSpeedX = 2;
    let ballSpeedY = 2;
    let paddle1Y = 150;
    let paddle2Y = 150;
    const paddleHeight = 100;
    const paddleWidth = 10;
    const paddleSpeed = 30;

    const keyDownHandler = (e) => {
      if (e.key === "ArrowUp") {
        paddle2Y = Math.max(paddle2Y - paddleSpeed, 0);
      } else if (e.key === "ArrowDown") {
        paddle2Y = Math.min(paddle2Y + paddleSpeed, canvas.height - paddleHeight);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    const moveEverything = () => {
      ballX += ballSpeedX;
      ballY += ballSpeedY;

      if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
      }
      if (ballX < 0) {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      } else if (ballX > canvas.width) {
        ballSpeedX = -ballSpeedX;
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
      }
    };

    const drawEverything = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = 'white';
      ctx.fillRect(0, paddle1Y, paddleWidth, paddleHeight);
      ctx.fillRect(canvas.width - paddleWidth, paddle2Y, paddleWidth, paddleHeight);

      ctx.beginPath();
      ctx.arc(ballX, ballY, 10, 0, Math.PI * 2, true);
      ctx.fill();
    };

    const framesPerSecond = 30;
    setInterval(() => {
      moveEverything();
      drawEverything();
    }, 1000 / framesPerSecond);
  };

  useEffect(() => {
    if (isPlaying) {
      startGame();
    }
  }, [isPlaying]);

  return (
    <Flex direction="column" align="center" justify="center" h="100vh">
      <Text fontSize="4xl" mb="8">Welcome to Pong Game</Text>
      <canvas ref={canvasRef} width="600" height="400" style={{ background: "black" }}></canvas>
      <Button mt="4" colorScheme="teal" onClick={isPlaying ? () => setIsPlaying.off() : startGame}>
        {isPlaying ? "Pause Game" : "Start Game"}
      </Button>
    </Flex>
  );
};

export default Index;