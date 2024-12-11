let highestZ = 1;

class Paper {
  holdingPaper = false;
  currentPaperX = 0;
  currentPaperY = 0;
  velX = 0;
  velY = 0;

  startDrag(startX, startY, paper) {
    this.holdingPaper = true;
    this.touchStartX = startX;
    this.touchStartY = startY;
    this.prevTouchX = startX;
    this.prevTouchY = startY;

    paper.style.zIndex = highestZ;
    highestZ += 1;
  }

  moveDrag(moveX, moveY, paper) {
    if (this.holdingPaper) {
      this.velX = moveX - this.prevTouchX;
      this.velY = moveY - this.prevTouchY;

      this.currentPaperX += this.velX;
      this.currentPaperY += this.velY;

      paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px)`;

      this.prevTouchX = moveX;
      this.prevTouchY = moveY;
    }
  }

  endDrag() {
    this.holdingPaper = false;
  }

  init(paper) {
    // Mouse Events
    paper.addEventListener('mousedown', (e) => {
      this.startDrag(e.clientX, e.clientY, paper);
    });

    document.addEventListener('mousemove', (e) => {
      this.moveDrag(e.clientX, e.clientY, paper);
    });

    document.addEventListener('mouseup', () => {
      this.endDrag();
    });

    // Touch Events
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.startDrag(touch.clientX, touch.clientY, paper);
    });

    paper.addEventListener('touchmove', (e) => {
      e.preventDefault(); // Prevent screen scrolling
      const touch = e.touches[0];
      this.moveDrag(touch.clientX, touch.clientY, paper);
    });

    paper.addEventListener('touchend', () => {
      this.endDrag();
    });
  }
}

const papers = Array.from(document.querySelectorAll('.paper'));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
