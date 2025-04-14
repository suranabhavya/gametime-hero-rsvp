import { Injectable } from '@angular/core';
import { LoggerService } from './logger.service';
import { Player, RsvpEntry, RsvpStatus, RsvpStats } from '../models/rsvp.types';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class RsvpService {
  private rsvpEntries: RsvpEntry[] = [];

  constructor(private logger: LoggerService) {}

  addOrUpdateRsvp(player: Omit<Player, 'id'>, status: RsvpStatus): RsvpEntry {
    const existingEntryIndex = this.rsvpEntries.findIndex(
      entry => entry.player.email === player.email
    );

    const playerWithId: Player = {
      ...player,
      id: existingEntryIndex >= 0 ? this.rsvpEntries[existingEntryIndex].player.id : uuidv4()
    };

    const newEntry: RsvpEntry = {
      player: playerWithId,
      status,
      updatedAt: new Date()
    };

    if (existingEntryIndex >= 0) {
      this.rsvpEntries[existingEntryIndex] = newEntry;
      this.logger.log(`Updated RSVP for player ${player.name} to ${status}`);
    } else {
      this.rsvpEntries.push(newEntry);
      this.logger.log(`Added new RSVP for player ${player.name} with status ${status}`);
    }

    return newEntry;
  }

  updateRsvp(rsvp: RsvpEntry): RsvpEntry {
    const index = this.rsvpEntries.findIndex(entry => entry.player.id === rsvp.player.id);
    if (index !== -1) {
      this.rsvpEntries[index] = rsvp;
      this.logger.log(`Updated RSVP for player ${rsvp.player.name} to ${rsvp.status}`);
    }
    return rsvp;
  }

  getConfirmedAttendees(): RsvpEntry[] {
    return this.rsvpEntries.filter(entry => entry.status === 'Yes');
  }

  getRsvpStats(): RsvpStats {
    const stats: RsvpStats = {
      total: this.rsvpEntries.length,
      confirmed: 0,
      declined: 0,
      maybe: 0
    };

    this.rsvpEntries.forEach(entry => {
      switch (entry.status) {
        case 'Yes':
          stats.confirmed++;
          break;
        case 'No':
          stats.declined++;
          break;
        case 'Maybe':
          stats.maybe++;
          break;
      }
    });

    return stats;
  }

  getAllRsvps(): RsvpEntry[] {
    return [...this.rsvpEntries];
  }

  addRsvp(rsvp: RsvpEntry): void {
    const existingIndex = this.rsvpEntries.findIndex(r => r.player.email === rsvp.player.email);
    if (existingIndex >= 0) {
      this.rsvpEntries[existingIndex] = rsvp;
    } else {
      this.rsvpEntries.push({
        ...rsvp,
        player: { ...rsvp.player, id: uuidv4() }
      });
    }
  }
} 