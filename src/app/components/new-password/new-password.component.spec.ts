import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPasswordComponent } from './new-password.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { EmailService } from '../../services/email.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

class MockHttpClient{
  post(){
    return of({ token: '12345' });
  }
}

describe('NewPasswordComponent', () => {
  let component: NewPasswordComponent;
  let fixture: ComponentFixture<NewPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPasswordComponent],
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

    fixture = TestBed.createComponent(NewPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
