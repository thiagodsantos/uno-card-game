import { randomNumber } from 'utils/number';
import { shuffleArray } from 'utils/array';

const TWO_CARDS = 2;
const FOUR_CARDS = 4;

interface AddCardType {
  value: string | number;
  cards: string;
  separator?: boolean;
  plus?: boolean;
}

export class CardEntity {
  private readonly colors = ['green', 'red', 'yellow', 'blue'];
  private readonly numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  private readonly symbols = ['⊘', '⇋'];
  private readonly numPlus = ['+2'];
  private readonly numHigh = ['+4'];

  private addCard(card: AddCardType) {
    let cards = card.cards ?? '';

    if (card.separator) {
      cards += ',';
    }

    if (card.plus) {
      cards += '+';
    }

    return cards + card.value;
  }

  private mountDeck() {
    const cards: string[] = [];

    this.numbers.map(number => {
      this.colors.map(color => {
        for (let repeat = 0; repeat < TWO_CARDS; repeat++) {
          cards[color] = this.addCard({
            cards: cards[color],
            value: number,
            separator: Boolean(cards[color])
          });
        }
      });
    });

    this.symbols.map(symbol => {
      this.colors.map(color => {
        for (let repeat = 0; repeat < TWO_CARDS; repeat++) {
          cards[color] = this.addCard({
            cards: cards[color],
            value: symbol,
            separator: true
          });
        }
      });
    });

    this.numPlus.map(num => {
      num = num.replace('+', '');
      this.colors.map(color => {
        for (let repeat = 0; repeat < TWO_CARDS; repeat++) {
          cards[color] = this.addCard({
            cards: cards[color],
            value: num,
            separator: true,
            plus: true
          });
        }
      });
    });

    this.numHigh.map(num => {
      num = num.replace('+', '');
      for (let repeat = 0; repeat < FOUR_CARDS; repeat++) {
        cards['none'] = this.addCard({
          cards: cards['none'],
          value: num,
          separator: Boolean(cards['none']),
          plus: true
        });
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
    const deck = [];
    const exists = [];

    const split = cards[color].split(',');
    const size = split.length;

    for (let i = 0; i < size; i++) {
      const index = this.randomUniqueCardIndex(exists, size);
      exists.push(index);
      deck[i] = color + ',' + split[index];
    }

    return deck;
  }

  public getDeck() {
    const cards = this.mountDeck();
    const deck = [];

    const deckWithColors: string[][] = this.colors.map(color => this.randomCards(cards, color));
    for (const cards of deckWithColors) {
      for (const card of cards) {
        deck.push(card);
      }
    }

    cards['none']
      .split(',')
      .map((card: string) => deck.push(card));

    return shuffleArray(deck);
  }
}