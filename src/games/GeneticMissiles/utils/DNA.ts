import { Vec2 } from "@website/games/utils/vec2";

export class DNA {
  public genes: Vec2[] = [];
  public size: number;
  constructor(
    dna: number | DNA
  ){
    if (typeof dna === "number") {
      this.size = dna;
      for (let i = 0; i < dna; i++) {
        this.genes.push(Vec2.Random());
      }
    } else {
      this.genes = [...dna.genes];
      this.size = dna.genes.length;
    }
    
  }

  public copy = () => {
    const copy = new DNA(0);
    copy.size = this.size;
    for (let i = 0; i < this.size; i++) {
      copy.genes.push(this.genes[i].copy())
    }

    return copy;
  }
  
  public crossover = (partner: DNA) => {
    if (this.size !== partner.size) {
      console.log("DNA PARTNERS DO NOT MATCH IN SIZE!");
      throw Error()
    }
    const newDNA = new DNA(0);
    newDNA.size = this.size;
    const mid = Math.floor(Math.random() * this.size);
    for (let i = 0; i < this.size; i++) {
      if (i < mid) {
        newDNA.genes.push(this.genes[i].copy())
      } else {
        newDNA.genes.push(partner.genes[i].copy())
      }
    }

    return newDNA;
  }

  public mutation = () => {
    for (let i = 0; i < this.genes.length; i++) {
      if (Math.random() < 0.01) {
        this.genes[i] = Vec2.Random();
      }
    }
  }

}