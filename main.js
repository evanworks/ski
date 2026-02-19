const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

const skier = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 16,
  height: 24,

  image: new Image(),
  speedY: 2,
  speedX: 0,
  direction: 0
}

const trees = [];
const TREE_COUNT = 10;
let treeImage = new Image();
treeImage.src = "res/img/tree.png"

// Spawn random trees
for (let i = 0; i < TREE_COUNT; i++) {
  trees.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    w: 75,
    h: 140
  });
}

function drawSkier() {
  if (skier.direction === 0) {
    skier.image.src = "res/img/skier3.png";
    skier.speedY = 3;
    skier.speedX = 0;
  } else if (skier.direction === 30 || skier.direction === -30) {
    skier.image.src = "res/img/skier2.png";
    skier.speedY = 2.5;
    skier.speedX = 0.5;
  } else if (skier.direction === 60 || skier.direction === -60) {
    skier.image.src = "res/img/skier1.png";
    skier.speedY = 1;
    skier.speedX = 1;
  }
  ctx.save();
  ctx.translate(skier.x, skier.y);

  if (skier.direction < 0) {
    ctx.scale(-1, 1);
    skier.speedX = -skier.speedX;
  }

  ctx.drawImage(skier.image, -skier.width/2, -skier.height/2, skier.width, skier.height);
  ctx.restore();
}
function drawTrees() {
  trees.forEach(tree => {
    ctx.drawImage(treeImage, tree.x, tree.y, tree.w, tree.h);
    tree.y -= skier.speedY / 2
    tree.x += skier.speedX
    if (tree.y > canvas.height) tree.y = -tree.h;
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault();
    skier.direction += 30;
  }
  if (e.key === 'ArrowRight') {
    e.preventDefault();
    skier.direction -= 30;
  }
});

function loop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#cfd3dc";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  drawSkier();
  drawTrees();
  requestAnimationFrame(loop);
}

loop();