import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  isLoginMode = true;

  loginData = {
    email: '',
    password: ''
  };

  registerData = {
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  };

  isLoading = signal(false);
  errorMessage = signal('');
  successMessage = signal('');

  constructor(
    private auth: AuthService,
    private router: Router
  ) {
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  onSubmit() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    this.auth.login(this.loginData.email, this.loginData.password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const msg = err.error?.error || err.error?.detail || 'Ошибка входа. Проверьте данные.';
        this.errorMessage.set(msg);
      }
    });
  }

  onRegister() {
    this.isLoading.set(true);
    this.errorMessage.set('');

    if (this.registerData.password !== this.registerData.passwordConfirm) {
      this.isLoading.set(false);
      this.errorMessage.set('Пароли не совпадают');
      return;
    }

    this.auth.register(
      this.registerData.username,
      this.registerData.email,
      this.registerData.password,
      this.registerData.passwordConfirm
    ).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.successMessage.set('Регистрация успешна!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.isLoading.set(false);
        const errors = err.error;
        if (typeof errors === 'object') {
          const firstKey = Object.keys(errors)[0];
          const msg = Array.isArray(errors[firstKey]) ? errors[firstKey][0] : errors[firstKey];
          this.errorMessage.set(msg);
        } else {
          this.errorMessage.set('Ошибка регистрации');
        }
      }
    });
  }
}
