import { Component } from '@angular/core';
import { Input, OnChanges, ViewChild, ElementRef } from '@angular/core';
import { DataSet, Network } from 'vis';


@Component({
  selector: 'app-graph-view',
  standalone: true,
  imports: [],
  templateUrl: './graph-view.component.html',
  styleUrl: './graph-view.component.css'
})
export class GraphViewComponent implements OnChanges {
  @Input() nodes: any[] | undefined;
  @Input() edges: any[] | undefined;

  @ViewChild('network') networkContainer!: ElementRef;
  private network!: Network;

  ngOnChanges() {
    this.drawNetwork();
  }

  private drawNetwork() {
    const container = this.networkContainer.nativeElement;
    const data = {
      nodes: new DataSet(this.nodes),
      edges: new DataSet(this.edges)
    };

    const options = {
      nodes: {
        shape: 'circle',
        size: 30,
        font: {
          size: 16
        }
      },
      edges: {
        arrows: 'to',
        smooth: false,
        font: {
          size: 14,
          align: 'middle'
        },
        labelHighlightBold: true
      },
      physics: {
        stabilization: true,
        barnesHut: {
          gravitationalConstant: -2000
        }
      }
    };

    this.network = new Network(container, data, options);
  }
}
