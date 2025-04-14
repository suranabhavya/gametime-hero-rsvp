import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RsvpService } from '../core/services/rsvp.service';
import { RsvpEntry, RsvpStatus } from '../core/models/rsvp.types';

@Component({
  selector: 'app-rsvp-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './rsvp-list.component.html',
  styleUrls: ['./rsvp-list.component.scss']
})
export class RsvpListComponent implements OnInit {
  rsvps: RsvpEntry[] = [];

  constructor(private rsvpService: RsvpService) {}

  ngOnInit(): void {
    this.loadRsvps();
  }

  private loadRsvps(): void {
    this.rsvps = this.rsvpService.getAllRsvps();
  }

  updateStatus(rsvp: RsvpEntry, newStatus: RsvpStatus): void {
    const updatedRsvp = {
      ...rsvp,
      status: newStatus,
      updatedAt: new Date()
    };
    
    this.rsvpService.updateRsvp(updatedRsvp);
    this.loadRsvps(); // Reload the list to ensure consistency
  }
} 