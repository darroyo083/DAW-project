import { Component } from '@angular/core';
import { DestinationCardComponent } from '../destination-card/destination-card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CreateDestinationComponent } from '../create-destination/create-destination.component';
import { MatDialog } from '@angular/material/dialog';
import { DestinationService } from '../../service/destination/destination.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [DestinationCardComponent, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  destination = [1, 1, 1, 1, 1, 1, 1];
  destinations = [];

  constructor(public dialog: MatDialog, private destinationService: DestinationService) { }

  openCreateDestinationModal = () => {
    this.dialog.open(CreateDestinationComponent);
  };

  ngOnInit(): void {
    this.getDestinations();
    this.destinationService.destinationsSubject.subscribe((destinationData) => {
      this.destinations = destinationData.destinations;
    });
  }

  getDestinations() {
    this.destinationService.getDestinations().subscribe({
      next: (destinations: any) => {
        console.log('destinations ', destinations);
      },
      error: (error: any) => {
        console.error('Error fetching destinations:', error);
      },
    });
  }

  updateDestination(destination: any) {
    this.destinationService.updateDestination(destination).subscribe({
      next: (updatedDestination: any) => {
        console.log('Destination updated:', updatedDestination);
      },
      error: (error: any) => {
        console.error('Error updating destination:', error);
      },
    });
  }

  deleteDestination(id: number) {
    console.log('delete success', id);
    this.destinationService.deleteDestination(id).subscribe({
      next: (res) => {
        console.log('Destination deleted:', res);
      },
      error: (error: any) => {
        console.error('Error deleting destination:', error);
      },
    });
  }
}
