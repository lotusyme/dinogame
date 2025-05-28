/* Reset */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  overflow: hidden;
  background: #f0f0f0;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.game-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: linear-gradient(to top, #8ed0f9, #fff);
  display: flex;
  justify-content: center;
  align-items: flex-end;
}

/* Background */
#background {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
  background: repeating-linear-gradient(
    to right,
    #6bbf59 0,
    #6bbf59 40px,
    #5aaa4a 40px,
    #5aaa4a 80px
  );
  z-index: 1;
}

/* Dino */
#dino {
  position: relative;
  width: 100px;
  height: 100px;
  background-image: url('https://i.gifer.com/origin/56/56b60b071f1a88a50499a3a4d45e0bb0.gif');
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 10;
  bottom: 0;
}

/* Obstacle */
#obstacle {
  position: absolute;
  width: 50px;
  height: 75px;
  background-color: #444;
  border-radius: 6px;
  z-index: 10;
  bottom: 150px; /* đặt trên nền */
  left: 100%;
}

/* Score */
#score {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
  z-index: 20;
}

/* Game Over */
#game-over {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  background: rgba(255,255,255,0.9);
  padding: 20px 30px;
  border-radius: 10px;
  color: #e74c3c;
  z-index: 30;
  user-select: none;
}

.hidden {
  display: none;
}

/* Responsive */
@media (max-width: 600px) {
  #dino {
    width: 70px;
    height: 70px;
  }
  #obstacle {
    width: 35px;
    height: 50px;
    bottom: 100px;
  }
  #score {
    font-size: 14px;
  }
  #game-over {
    font-size: 18px;
  }
}
