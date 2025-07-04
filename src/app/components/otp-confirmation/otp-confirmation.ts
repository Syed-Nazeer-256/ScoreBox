import { Component, OnInit, OnDestroy } from '@angular/core';
import * as confetti from 'canvas-confetti';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-otp-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './otp-confirmation.html',
  styleUrl: './otp-confirmation.scss'
})
export class OtpConfirmationComponent implements OnInit, OnDestroy {
  countdown = 60;
  interval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCountdown() {
    this.interval = setInterval(() => {
      this.countdown--;
      const progressBar = document.querySelector('.progress-bar') as HTMLElement;
      if (progressBar) {
        progressBar.style.background = `conic-gradient(#ff8a00 ${this.countdown * 6}deg, #f0f0f0 0deg)`;
      }
      if (this.countdown === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  onOtpInput(event: any) {
    const input = event.target;
    const nextInput = input.nextElementSibling;
    if (nextInput && input.value) {
      nextInput.focus();
    }
  }

  verifyOtp() {
    // Dummy OTP verification
    const otpInputs = document.querySelectorAll('.otp-input-fields input') as NodeListOf<HTMLInputElement>;
    const otp = Array.from(otpInputs).map(input => input.value).join('');
    if (otp === '1234') {
      this.triggerConfetti();
    } else {
      alert('Invalid OTP');
    }
  }

  triggerConfetti() {
    confetti.create(document.querySelector('canvas'), {
      resize: true,
      useWorker: true
    })({ particleCount: 200, spread: 70, origin: { y: 0.6 } });
  }
}