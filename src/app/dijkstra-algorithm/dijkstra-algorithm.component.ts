import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dijkstra-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dijkstra-algorithm.component.html',
  styleUrls: ['./dijkstra-algorithm.component.css']
})
export class DijkstraAlgorithmComponent {
  nodes: number = 0;
  matrix: number[][] = [];
  source: number = 0;
  target: number = 0;
  path: number[] = [];
  distance: number = 0;

  generateMatrix() {
    this.matrix = Array(this.nodes).fill(0).map(() => Array(this.nodes).fill(0));
    this.path = [];
  }

  calculateDijkstra() {
    const distances = new Array(this.nodes).fill(Infinity);
    const visited = new Array(this.nodes).fill(false);
    const prev = new Array(this.nodes).fill(-1);

    distances[this.source] = 0;

    for (let i = 0; i < this.nodes - 1; i++) {
      const u = this.minDistance(distances, visited);
      visited[u] = true;

      for (let v = 0; v < this.nodes; v++) {
        if (!visited[v] && this.matrix[u][v] > 0 &&
          distances[u] + this.matrix[u][v] < distances[v]) {
          distances[v] = distances[u] + this.matrix[u][v];
          prev[v] = u;
        }
      }
    }

    this.distance = distances[this.target];
    this.path = this.getPath(prev, this.target);
  }

  private minDistance(distances: number[], visited: boolean[]) {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < this.nodes; v++) {
      if (!visited[v] && distances[v] <= min) {
        min = distances[v];
        minIndex = v;
      }
    }
    return minIndex;
  }

  private getPath(prev: number[], target: number): number[] {
    const path = [];
    let u = target;

    while (u !== -1) {
      path.unshift(u);
      u = prev[u];
    }

    return path.length > 1 ? path : [];
  }

  updateMatrixValue(i: number, j: number, event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value ? parseFloat(inputElement.value) : 0;
    this.matrix[i][j] = value;
  }
}
