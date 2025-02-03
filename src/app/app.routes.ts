import { Routes } from '@angular/router';
import { MstAlgorithmComponent } from './mst-algorithm/mst-algorithm.component';
import { DijkstraAlgorithmComponent } from './dijkstra-algorithm/dijkstra-algorithm.component';

export const routes: Routes = [
    { path: 'mst', component: MstAlgorithmComponent },
    { path: 'dijkstra', component: DijkstraAlgorithmComponent },
    { path: '', redirectTo: '/mst', pathMatch: 'full' }
];
