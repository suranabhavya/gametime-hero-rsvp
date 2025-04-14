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

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files?.length) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      this.processCSV(text);
    };

    reader.readAsText(file);
  }

  private processCSV(csvText: string): void {
    try {
      const lines = csvText.split('\n');
      const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
      
      // Validate headers
      const requiredHeaders = ['name', 'email', 'status'];
      const missingHeaders = requiredHeaders.filter(h => !headers.includes(h));
      
      if (missingHeaders.length > 0) {
        alert(`Missing required columns: ${missingHeaders.join(', ')}`);
        return;
      }

      const nameIndex = headers.indexOf('name');
      const emailIndex = headers.indexOf('email');
      const statusIndex = headers.indexOf('status');

      let successCount = 0;
      let errorCount = 0;

      // Process each line
      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue; // Skip empty lines

        const values = lines[i].split(',').map(v => v.trim());
        if (values.length < 3) continue; // Skip invalid lines

        const name = values[nameIndex];
        const email = values[emailIndex];
        const status = values[statusIndex];

        // Validate status
        if (!['Yes', 'No', 'Maybe'].includes(status)) {
          errorCount++;
          continue;
        }

        try {
          this.rsvpService.addOrUpdateRsvp(
            { name, email },
            status as RsvpStatus
          );
          successCount++;
        } catch {
          errorCount++;
        }
      }

      // Update stats after import
      this.stats = this.rsvpService.getRsvpStats();

      // Show results
      alert(`Import completed!\nSuccessfully imported: ${successCount}\nFailed: ${errorCount}`);
    } catch {
      alert('Error processing CSV file. Please check the format and try again.');
    }
  }
} 
