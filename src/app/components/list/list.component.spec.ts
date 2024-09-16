/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export class MockToastrService {
  success(message: string, title?: string) {}
  error(message: string, title?: string) {}
  info(message: string, title?: string) {}
  warning(message: string, title?: string) {}
}

export const toastrServiceMock = {
  provide: ToastrService,
  useClass: MockToastrService
};
class MockHttpClient {
  post() {
    return of({ token: 'Senhateste1!' });
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
        },
        toastrServiceMock
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
