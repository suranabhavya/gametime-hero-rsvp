import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { RsvpStats } from '../core/models/rsvp.types';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="landing-container">
      <header class="header">
        <h1>Gametime Hero RSVP Manager</h1>
        <p class="subtitle">Manage your event RSVPs with ease</p>
      </header>

      <div class="stats-container">
        <div class="stat-card" *ngIf="stats">
          <div class="stat-item total">
            <div class="stat-number">{{ stats.total }}</div>
            <span class="stat-label">Total Responses</span>
          </div>
          <div class="stat-item confirmed">
            <div class="stat-number">{{ stats.confirmed }}</div>
            <span class="stat-label">Confirmed</span>
          </div>
          <div class="stat-item declined">
            <div class="stat-number">{{ stats.declined }}</div>
            <span class="stat-label">Declined</span>
          </div>
          <div class="stat-item maybe">
            <div class="stat-number">{{ stats.maybe }}</div>
            <span class="stat-label">Maybe</span>
          </div>
        </div>
      </div>

      <div class="actions-container">
        <div class="action-card">
          <h2>Add New RSVP</h2>
          <p>Add a new player to your RSVP list</p>
          <a routerLink="/rsvp" class="action-button">Add RSVP</a>
        </div>
        <div class="action-card">
          <h2>View All RSVPs</h2>
          <p>See and Manage all RSVPs</p>
          <a routerLink="/rsvp-list" class="action-button">View List</a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

    .landing-container {
      min-height: 100vh;
      background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
      padding: 2rem;
      font-family: 'Poppins', sans-serif;
    }

    .header {
      text-align: center;
      margin-bottom: 3rem;
    }

    .header h1 {
      font-size: 2.5rem;
      color: #2c3e50;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #7f8c8d;
    }

    .stats-container {
      margin-bottom: 3rem;
    }

    .stat-card {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .stat-item {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease;
    }

    .stat-item:hover {
      transform: translateY(-5px);
    }

    .stat-number {
      font-size: 2.5rem;
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      color: #7f8c8d;
    }

    .confirmed .stat-number { color: #27ae60; }
    .declined .stat-number { color: #e74c3c; }
    .maybe .stat-number { color: #f39c12; }
    .total .stat-number { color: #2c3e50; }

    .actions-container {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      max-width: 1000px;
      margin: 0 auto;
    }

    .action-card {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }

    .action-card:hover {
      transform: translateY(-5px);
    }

    .action-card h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .action-card p {
      color: #7f8c8d;
      margin-bottom: 1.5rem;
    }

    .action-button {
      display: inline-block;
      padding: 0.8rem 2rem;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 25px;
      font-weight: 500;
      transition: background 0.3s ease;
    }

    .action-button:hover {
      background: #2980b9;
    }
  `]
})
export class LandingComponent implements OnInit {
  stats: RsvpStats | null = null;

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    this.stats = this.rsvpService.getRsvpStats();
  }
} 
