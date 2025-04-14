import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  log(message: string, data?: unknown): void {
    console.log(`[RSVP] ${message}`, data ? data : '');
  }

  error(message: string, error?: unknown): void {
    console.error(`[RSVP] ${message}`, error ? error : '');
  }
} 