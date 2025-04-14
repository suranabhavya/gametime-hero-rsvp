import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { Player, RsvpStatus } from '../core/models/rsvp.types';

@Component({
  selector: 'app-rsvp',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="rsvp-container">
      <header class="header">
        <h1>Add New RSVP</h1>
        <a routerLink="/" class="back-button">← Back to Dashboard</a>
      </header>

      <div class="form-container">
        <div class="form-card">
          <form (ngSubmit)="addRsvp()">
            <div class="form-group">
              <label for="name">Player Name</label>
              <input 
                id="name" 
                [(ngModel)]="newPlayer.name" 
                name="name" 
                placeholder="Enter player name"
                required
              >
            </div>

            <div class="form-group">
              <label for="email">Player Email</label>
              <input 
                id="email" 
                [(ngModel)]="newPlayer.email" 
                name="email" 
                type="email"
                placeholder="Enter player email"
                required
              >
            </div>

            <div class="form-group">
              <label for="status">RSVP Status</label>
              <select 
                id="status" 
                [(ngModel)]="selectedStatus" 
                name="status"
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Maybe">Maybe</option>
              </select>
            </div>

            <div class="form-actions">
              <button type="submit" class="submit-button">Add RSVP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    .rsvp-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
      font-family: 'Poppins', sans-serif;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header h1 {
      font-size: 2rem;
      color: #2c3e50;
      margin: 0;
    }

    .back-button {
      color: #3498db;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .back-button:hover {
      color: #2980b9;
    }

    .form-container {
      max-width: 600px;
      margin: 0 auto;
    }

    .form-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #2c3e50;
      font-weight: 500;
    }

    input, select {
      width: 100%;
      padding: 0.8rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
    }

    input:focus, select:focus {
      outline: none;
      border-color: #3498db;
    }

    .form-actions {
      margin-top: 2rem;
      text-align: center;
    }

    .submit-button {
      padding: 0.8rem 2rem;
      background: #3498db;
      color: white;
      border: none;
      border-radius: 25px;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    .submit-button:hover {
      background: #2980b9;
    }
  `]
})
export class RsvpComponent {
  newPlayer: Player = { id: '', name: '', email: '' };
  selectedStatus: RsvpStatus = 'Yes';

  constructor(
    private rsvpService: RsvpService,
    private router: Router
  ) {}

  addRsvp(): void {
    if (!this.newPlayer.name || !this.newPlayer.email) return;
    
    this.newPlayer.id = Math.random().toString(36).substr(2, 9);
    this.rsvpService.addOrUpdateRsvp(this.newPlayer, this.selectedStatus);
    
    // Redirect to landing page
    this.router.navigate(['/']);
  }
} 