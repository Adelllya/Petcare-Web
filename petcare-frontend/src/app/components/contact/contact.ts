import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  formData = {
    name: '',
    phone: '',
    message: ''
  };

  isSubmitted = signal(false);
  isSubmitting = signal(false);
  errorMessage = signal('');

  constructor(private api: ApiService) {}

  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting.set(true);
    this.errorMessage.set('');

    this.api.submitContactForm(this.formData).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        this.isSubmitted.set(true);
        this.formData = { name: '', phone: '', message: '' };

        setTimeout(() => {
          this.isSubmitted.set(false);
        }, 4000);
      },
      error: (err) => {
        console.error('Ошибка отправки формы:', err);
        this.isSubmitting.set(false);
        this.errorMessage.set('Не удалось отправить. Попробуйте позже.');

        setTimeout(() => {
          this.errorMessage.set('');
        }, 5000);
      }
    });
  }
}
