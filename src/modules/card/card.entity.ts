import { randomNumber } from 'shared/number';
import { shuffleArray } from 'shared/array';

export class CardEntity {
  private readonly colors  = ['green', 'red', 'yellow', 'blue'];
  private readonly numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private readonly symbols = ['⊘', '⇋'];
  private readonly numPlus = ['+2'];
  private readonly numHigh = ['+4'];
  
  private mount() {
    const cards = [];
    
    this.numbers.map(number => {
      this.colors.map(color => {
        for (let repeat = 0; repeat < 2; repeat++) {
          if (cards[color] === undefined) {
            cards[color] = number;
            continue;
          }
        
          cards[color] = cards[color] + ',' + number;
        }
      });
    });
  
    this.symbols.map(symbol => {
      this.colors.map(color => {
        for (let repeat = 0; repeat < 2; repeat++) {
          cards[color] = cards[color] + ',' + symbol;
        }
      });
    });
  
    this.numPlus.map(num => {
      num = num.replace('+', '');
      this.colors.map(color => {
        for (let repeat = 0; repeat < 2; repeat++) {
          cards[color] = cards[color] + ',+' + num;
        }
      });
    });
  
    this.numHigh.map(num => {
      num = num.replace('+', '');
      for (let repeat = 0; repeat < 4; repeat++) {
        cards['none'] = cards['none'] ? cards['none'] + ',+' + num : '+' + num;
      }
    });
    
    return cards;
  }
  
  private randomUniqueCardIndex(exists = [], max = 0) {
    const index = randomNumber(0, max);
  
    if (exists.length === 0) {
      return index;
    }
  
    const hasIndex = exists.some(exist => exist === index);
    if (hasIndex) {
      return this.randomUniqueCardIndex(exists, max);
    }
  
    return index;
  }
  
  private randomCards(cards = [], color = '') {
    const deck   = [];
    const exists = [];
    
    const split = cards[color].split(',');
    const size  = split.length;
    
    for (let i = 0; i < size; i++) {
      const index = this.randomUniqueCardIndex(exists, size);
      exists.push(index);
      deck[i] = color + ',' + split[index];
    }
  
    return deck;
  }
  
  public getDeck() {
    const cards = this.mount();
    const deckOrderByColor = [];
    
    const deckByColor = this.colors.map(color => this.randomCards(cards, color));
    for (const cards of deckByColor) {
      for (const card of cards) {
        deckOrderByColor.push(card);
      }
    }
    
    cards['none']
      .split(',')
      .map(card => deckOrderByColor.push(card));
    
    return shuffleArray(deckOrderByColor);
  }
}