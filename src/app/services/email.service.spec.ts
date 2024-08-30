import { TestBed } from '@angular/core/testing';

import { EmailService } from './email.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

class MockHttpClient {
  post() {
    return of({ token: '12345' });
  }
}

describe('EmailService', () => {
  let service: EmailService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useClass: MockHttpClient }]
    });
    service = TestBed.inject(EmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
