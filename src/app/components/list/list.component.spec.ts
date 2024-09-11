import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockHttpClient {
  post() {
    return of({ token: '12345' });
  }
}
describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({}) }
            // ou o que mais você precisar
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
