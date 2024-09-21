/* eslint-disable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async () => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'info',
      'warning'
    ]);

    await TestBed.configureTestingModule({
      imports: [LoadingComponent],
      providers: [
        { provide: HttpClient, useValue: httpClientSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ token: '12345' })
          }
        },
        {
          provide: ToastrService,
          useValue: toastrServiceSpy
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    httpClientSpy.get.and.returnValue(of({ message: 'Email confirmed' }));
    fixture.detectChanges(); // Move this here
    expect(component).toBeTruthy();
  });
});
