import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { RsvpStats, RsvpStatus } from '../core/models/rsvp.types';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  stats: RsvpStats | null = null;

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    this.stats = this.rsvpService.getRsvpStats();
  }

  downloadCSV(status: 'all' | RsvpStatus): void {
    const rsvps = this.rsvpService.getAllRsvps()
      .filter(rsvp => status === 'all' || rsvp.status === status);

    if (rsvps.length === 0) {
      alert('No entries to download');
      return;
    }

    const headers = ['Name', 'Email', 'Status', 'Last Updated'];
    const csvContent = [
      headers.join(','),
      ...rsvps.map(rsvp => {
        const date = new Date(rsvp.updatedAt);
        const formattedDate = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        return [
          rsvp.player.name,
          rsvp.player.email,
          rsvp.status,
          formattedDate
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', `rsvp-${status}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
} 
