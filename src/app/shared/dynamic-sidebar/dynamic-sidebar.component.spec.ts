import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicSidebarComponent } from './dynamic-sidebar.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('DynamicSidebarComponent', () => {
  let component: DynamicSidebarComponent;
  let fixture: ComponentFixture<DynamicSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicSidebarComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({}) }
            // ou o que mais você precisar
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
