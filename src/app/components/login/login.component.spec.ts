import { TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

class MockHttpClient {
  post() {
    return of({ token: '12345' });
  }
}
describe('LoginComponent', () => {
  let component: LoginComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent], // O componente é standalone, então podemos importá-lo diretamente
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
    component = TestBed.createComponent(LoginComponent).componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
