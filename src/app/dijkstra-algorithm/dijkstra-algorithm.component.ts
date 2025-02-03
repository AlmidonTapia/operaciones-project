import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-dijkstra-algorithm',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './dijkstra-algorithm.component.html',
  styleUrl: './dijkstra-algorithm.component.css'
})
export class DijkstraAlgorithmComponent {
  form: FormGroup;
  matrix = signal<number[][]>([]);
  result = signal<{ path: string; distance: number } | null>(null);
  nodes = signal<number>(0);
  showPathSelection = signal<boolean>(false);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nodes: ['', [Validators.required, Validators.min(2)]],
      start: [''],
      end: [''],
    });
  }

  generateMatrix() {
    const nodes = this.form.value.nodes;
    this.nodes.set(nodes);
    this.matrix.set(Array(nodes).fill(0).map(() => Array(nodes).fill(0)));
    this.showPathSelection.set(true);
  }

  calculateDijkstra() {
    const graph = this.matrix().map((row) => [...row]);
    const start = this.form.value.start - 1;
    const end = this.form.value.end - 1;

    const dist = new Array(this.nodes()).fill(Infinity);
    const visited = new Array(this.nodes()).fill(false);
    const prev = new Array(this.nodes()).fill(-1);

    dist[start] = 0;

    for (let i = 0; i < this.nodes() - 1; i++) {
      const u = this.minDistance(dist, visited);
      visited[u] = true;

      for (let v = 0; v < this.nodes(); v++) {
        if (!visited[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
          dist[v] = dist[u] + graph[u][v];
          prev[v] = u;
        }
      }
    }

    const path = [];
    let current = end;
    while (current !== -1) {
      path.unshift(current + 1);
      current = prev[current];
    }

    this.result.set({
      path: path.join(' -> '),
      distance: dist[end],
    });
  }

  private minDistance(dist: number[], visited: boolean[]): number {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < dist.length; v++) {
      if (!visited[v] && dist[v] <= min) {
        min = dist[v];
        minIndex = v;
      }
    }
    return minIndex;
  }
}
