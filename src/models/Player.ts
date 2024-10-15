interface IPlayerProps {
  x: number;
  y: number;
  radius: number;
  color: string;
  username: string;
}

export class Player {
  x: number;
  y: number;
  radius: number;
  color: string;
  username: string;

  constructor({ x, y, radius, color, username }: IPlayerProps) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.username = username;
  }

  draw(c: CanvasRenderingContext2D) {
    c.font = '12px sans-serif';
    c.fillStyle = 'white';
    c.fillText(this.username, this.x, this.y + 20);
    c.save();
    c.shadowColor = this.color;
    c.shadowBlur = 20;
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.restore();
  }
}