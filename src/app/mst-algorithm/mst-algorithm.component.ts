import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GraphViewComponent } from "../graph-view/graph-view.component";
@Component({
  selector: 'app-mst-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GraphViewComponent],
  templateUrl: './mst-algorithm.component.html',
  styleUrl: './mst-algorithm.component.css'
})
export class MstAlgorithmComponent {
    nodes: number = 0;
  matrix: number[][] = [];
  result: any[] = [];
  totalWeight: number = 0;

  graphNodes: any[] = [];
  graphEdges: any[] = [];

  generateMatrix() {
    this.matrix = Array(this.nodes).fill(0).map(() => Array(this.nodes).fill(0));
    this.result = [];
  }

  updateSymmetric(i: number, j: number, event: any) {
    const value = parseFloat(event.target.value) || 0;
    this.matrix[i][j] = value;
    this.matrix[j][i] = value;
  }

  calculateMST() {
    // Implementación del algoritmo de Prim
    const nodes = this.nodes;
    const selected = new Set<number>([0]);
    const result = [];

    while (selected.size < nodes) {
      let min = Infinity;
      let from = -1;
      let to = -1;

      for (const i of selected) {
        for (let j = 0; j < nodes; j++) {
          if (!selected.has(j) && this.matrix[i][j] > 0 && this.matrix[i][j] < min) {
            min = this.matrix[i][j];
            from = i;
            to = j;
          }
        }
      }

      if (min === Infinity) break;

      selected.add(to);
      result.push({ from, to, weight: min });
      this.totalWeight += min;
    }

    this.result = result;
    //grafico
    this.graphNodes = Array.from({ length: this.nodes }, (_, i) => ({
      id: i + 1,
      label: `Nodo ${i + 1}`
    }));

    this.graphEdges = this.result.map(edge => ({
      from: edge.from + 1,
      to: edge.to + 1,
      label: edge.weight.toString(),
      color: '#4CAF50',
      width: 3
    }));
  }
  
}
