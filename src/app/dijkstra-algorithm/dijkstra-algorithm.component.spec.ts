import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DijkstraAlgorithmComponent } from './dijkstra-algorithm.component';

describe('DijkstraAlgorithmComponent', () => {
  let component: DijkstraAlgorithmComponent;
  let fixture: ComponentFixture<DijkstraAlgorithmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DijkstraAlgorithmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DijkstraAlgorithmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
