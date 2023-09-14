
export class RGBA{
  constructor(
    public r: number,
    public g: number,
    public b: number,
    public a: number
  ) {}

  private toHex(c: number) {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  }
  get hex() {
    return "#" + this.toHex(this.r) + this.toHex(this.g) + this.toHex(this.b) + this.toHex(this.a)
  }
}

export class PixelImage{
  public image: RGBA[][]
  constructor(
    data: Uint8ClampedArray,
    width: number
  ) {
    this.image = [];
    let temp: RGBA[] = [];
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      const a = data[i + 3];
      temp.push(new RGBA(r, g, b, a))
      if (temp.length === width) {
        this.image.push(temp);
        temp = [];
      }
    }
    // console.log(this.image);
  }
}