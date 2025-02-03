import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-mst-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mst-algorithm.component.html',
  styleUrl: './mst-algorithm.component.css'
})
export class MstAlgorithmComponent {
  form: FormGroup;
  matrix = signal<number[][]>([]);
  result = signal<{ edges: string[]; cost: number } | null>(null);
  nodes = signal<number>(0);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nodes: ['', [Validators.required, Validators.min(2)]],
    });
  }

  generateMatrix() {
    const nodes = this.form.value.nodes;
    this.nodes.set(nodes);
    this.matrix.set(Array(nodes).fill(0).map(() => Array(nodes).fill(0)));
  }

  calculateMST() {
    const graph = this.matrix().map((row) => [...row]);
    const selected = new Array(this.nodes()).fill(false);
    selected[0] = true;
    const edges: string[] = [];
    let cost = 0;

    for (let count = 0; count < this.nodes() - 1; count++) {
      let min = Infinity;
      let x = 0,
        y = 0;

      for (let i = 0; i < this.nodes(); i++) {
        if (selected[i]) {
          for (let j = 0; j < this.nodes(); j++) {
            if (!selected[j] && graph[i][j] && graph[i][j] < min) {
              min = graph[i][j];
              x = i;
              y = j;
            }
          }
        }
      }

      selected[y] = true;
      edges.push(`${x + 1} - ${y + 1} (${min})`);
      cost += min;
    }

    this.result.set({ edges, cost });
  }
}
