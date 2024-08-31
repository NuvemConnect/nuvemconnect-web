import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterComponent } from './register.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EmailService } from '../../services/email.service';
import { AuthService } from '../../services/auth.service';

class MockHttpClient {
  post() {
    return of({ token: '12345' });
  }
}
describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: of({}) }
            // ou o que mais você precisar
          }
        },
        { provide: EmailService },
        { provide: AuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
