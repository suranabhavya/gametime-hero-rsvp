import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { RsvpEntry, RsvpStatus } from '../core/models/rsvp.types';

@Component({
  selector: 'app-rsvp-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="list-container">
      <header class="header">
        <h1>All RSVPs</h1>
        <a routerLink="/" class="back-button">← Back to Dashboard</a>
      </header>

      <div class="rsvp-list">
        <div *ngFor="let rsvp of rsvps" class="rsvp-card">
          <div class="rsvp-info">
            <h3>{{ rsvp.player.name }}</h3>
            <p class="email">{{ rsvp.player.email }}</p>
            <div class="status-section">
              <div class="status-buttons">
                <button 
                  class="status-button" 
                  [ngClass]="{ active: rsvp.status === 'Yes' }"
                  (click)="updateStatus(rsvp, 'Yes')">
                  Yes
                </button>
                <button 
                  class="status-button" 
                  [ngClass]="{ active: rsvp.status === 'No' }"
                  (click)="updateStatus(rsvp, 'No')">
                  No
                </button>
                <button 
                  class="status-button" 
                  [ngClass]="{ active: rsvp.status === 'Maybe' }"
                  (click)="updateStatus(rsvp, 'Maybe')">
                  Maybe
                </button>
              </div>
            </div>
          </div>
          <div class="rsvp-meta">
            <p class="date">{{ rsvp.updatedAt | date:'medium' }}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    .list-container {
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

    .rsvp-list {
      max-width: 800px;
      margin: 0 auto;
    }

    .rsvp-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      transition: transform 0.3s ease;
    }

    .rsvp-card:hover {
      transform: translateY(-2px);
    }

    .rsvp-info h3 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.2rem;
    }

    .email {
      color: #7f8c8d;
      margin: 0.5rem 0;
      font-size: 0.9rem;
    }

    .status-section {
      margin-top: 1rem;
    }

    .status-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .status-button {
      padding: 0.4rem 1rem;
      border: none;
      border-radius: 15px;
      font-size: 0.8rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      background: #f5f6fa;
      color: #7f8c8d;
    }

    .status-button:hover {
      background: #e8e9ec;
    }

    .status-button.active {
      color: white;
    }

    .status-button.active:nth-child(1) {
      background: #27ae60;
    }

    .status-button.active:nth-child(2) {
      background: #e74c3c;
    }

    .status-button.active:nth-child(3) {
      background: #f39c12;
    }

    .rsvp-meta {
      text-align: right;
    }

    .date {
      color: #7f8c8d;
      font-size: 0.8rem;
      margin: 0;
    }
  `]
})
export class RsvpListComponent implements OnInit {
  rsvps: RsvpEntry[] = [];

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    this.rsvps = this.rsvpService.getAllRsvps();
  }

  updateStatus(rsvp: RsvpEntry, newStatus: RsvpStatus): void {
    const updatedRsvp = {
      ...rsvp,
      status: newStatus,
      updatedAt: new Date()
    };
    this.rsvpService.updateRsvp(updatedRsvp);
    
    // Update the local list
    const index = this.rsvps.findIndex(r => r.player.id === rsvp.player.id);
    if (index !== -1) {
      this.rsvps[index] = updatedRsvp;
      this.rsvps = [...this.rsvps]; // Trigger change detection
    }
  }
} 