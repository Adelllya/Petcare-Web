import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

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

  onSubmit(event: Event) {
    event.preventDefault();
    this.isSubmitting.set(true);

    // Simulate API call (will be replaced with actual Django API)
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
      this.formData = { name: '', phone: '', message: '' };

      setTimeout(() => {
        this.isSubmitted.set(false);
      }, 4000);
    }, 1500);
  }
}
