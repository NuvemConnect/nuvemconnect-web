import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, Observable, tap } from 'rxjs';
import { ConfirmationResponse } from '../../interfaces/confirmation-response';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  loading = true;
  success = false;
  error = false;
  title = '';
  messageLoading = '';
  message = '';
  errorMessage = '';

  private route = inject(ActivatedRoute);
  private http = inject(HttpClient);

  ngOnInit() {
    this.route.queryParams.subscribe({
      next: (params) => {
        const token = params['token'];
        if (token) {
          this.confirmEmail(token);
        } else {
          this.handleError('Token não fornecido.');
        }
      },
      error: (err) => this.handleError('Erro ao ler parâmetros da URL. ' + err)
    });
  }

  confirmEmail(token: string) {
    this.getConfirmationObservable(token).subscribe({
      next: (response) => {
        this.success = true;
        this.title = 'Confirmação de e-mail';
        this.messageLoading = 'Loading...';
        this.message = response.message;
        this.loading = false;
      },
      error: (error) => {
        this.handleError(error.error?.error || 'Ocorreu um erro ao confirmar o e-mail.');
      }
    });
  }

  private getConfirmationObservable(token: string): Observable<ConfirmationResponse> {
    return this.http.get<ConfirmationResponse>(`/api/confirm-email?token=${token}`).pipe(
      tap(() => (this.loading = false)),
      catchError((error) => {
        this.handleError(error.error?.error || 'Ocorreu um erro ao confirmar o e-mail.');
        throw error;
      })
    );
  }

  private handleError(message: string) {
    this.error = true;
    this.errorMessage = message;
    this.loading = false;
  }
}
