import { Component, OnInit } from '@angular/core';
import { tsParticles } from "tsparticles";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class GameComponent implements OnInit {
  calledNumbers: number[] = [];
  bingoCard: { number: number | string, selected: boolean }[] = [];

  ngOnInit() {
    this.generateBingoCard();
    this.startCallingNumbers();
  }

  generateBingoCard() {
    const card: { number: number | string, selected: boolean }[][] = [];
    const columns = [
      this.generateColumn(1, 15, 5),
      this.generateColumn(16, 30, 5),
      this.generateColumn(31, 45, 5),
      this.generateColumn(46, 60, 5),
      this.generateColumn(61, 75, 5)
    ];

    for (let i = 0; i < 5; i++) {
      card[i] = [];
      for (let j = 0; j < 5; j++) {
        if (i === 2 && j === 2) {
          card[i][j] = { number: 'Free', selected: true };
        } else {
          card[i][j] = { number: columns[j].pop()!, selected: false };
        }
      }
    }
    this.bingoCard = card.flat();
  }

  generateColumn(min: number, max: number, count: number): number[] {
    const column: number[] = [];
    while (column.length < count) {
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      if (!column.includes(randomNumber)) {
        column.push(randomNumber);
      }
    }
    return column;
  }

  startCallingNumbers() {
    setInterval(() => {
      let newNumber;
      do {
        newNumber = Math.floor(Math.random() * 75) + 1;
      } while (this.calledNumbers.includes(newNumber));
      this.calledNumbers.push(newNumber);
    }, 2000);
  }

  toggleCell(cell: { number: number | string, selected: boolean }) {
    if (typeof cell.number === 'number') {
      cell.selected = !cell.selected;
    }
  }

  checkBingo() {
    const winningPatterns = [
      // Rows
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      // Columns
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      // Diagonals
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20]
    ];

    for (const pattern of winningPatterns) {
      const isWinner = pattern.every(index => this.bingoCard.flat()[index].selected);
      if (isWinner) {
        this.triggerWinningAnimation();
        return;
      }
    }
    alert('Not a Bingo yet!');
  }

  triggerWinningAnimation() {
    tsParticles.load("tsparticles", {
      "fullScreen": {
        "enable": true,
        "zIndex": 1
      },
      "particles": {
        "number": {
          "value": 100,
          "density": {
            "enable": true
          }
        },
        "color": {
          "value": "#ff0000"
        },
        "shape": {
          "type": "star",
        },
        "opacity": {
          "value": 0.5,
          "random": true
        },
        "size": {
          "value": 3,
          "random": true
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "top",
          "out_mode": "destroy"
        }
      },
      "interactivity": {
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          }
        }
      }
    });
  }
}