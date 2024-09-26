/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryComponent } from './recovery.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { HttpClient } from '@angular/common/http';
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

describe('RecoveryComponent', () => {
  let component: RecoveryComponent;
  let fixture: ComponentFixture<RecoveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecoveryComponent],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({}) }
            // ou o que mais você precisar
          }
        },
        { provide: AuthService },
        toastrServiceMock
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecoveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
