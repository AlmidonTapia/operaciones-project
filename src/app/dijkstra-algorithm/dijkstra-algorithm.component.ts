import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GraphViewComponent } from "../graph-view/graph-view.component";

@Component({
  selector: 'app-dijkstra-algorithm',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, GraphViewComponent],
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

  graphNodes: any[] = [];
  graphEdges: any[] = [];
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

    //grafico
    this.graphNodes = Array.from({ length: this.nodes }, (_, i) => ({
      id: i + 1,
      label: `Nodo ${i + 1}`
    }));

    this.graphEdges = [];
    for (let i = 0; i < this.nodes; i++) {
      for (let j = 0; j < this.nodes; j++) {
        if (this.matrix[i][j] > 0) {
          this.graphEdges.push({
            from: i + 1,
            to: j + 1,
            label: this.matrix[i][j].toString(),
            color: this.isPathEdge(i, j) ? '#FF4081' : '#3F51B5',
            width: this.isPathEdge(i, j) ? 3 : 1
          });
        }
      }
    }
  }

  private isPathEdge(i: number, j: number): boolean {
    for (let k = 0; k < this.path.length - 1; k++) {
      if (this.path[k] === i && this.path[k + 1] === j) return true;
    }
    return false;
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
