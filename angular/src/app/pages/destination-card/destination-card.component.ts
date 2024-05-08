import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { SharedModalComponent } from './shared-modal/shared-modal.component';
import { DestinationService } from '../../service/destination/destination.service';
import { UpdateDestinationComponent } from './update-destination/update-destination.component';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-destination-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './destination-card.component.html',
  styleUrl: './destination-card.component.scss'
})
export class DestinationCardComponent {

  @Input() destination: any;
  user: any


  constructor(public dialog: MatDialog, public destinationService: DestinationService, public authService: AuthService) { }

  ngOnInit() {
    this.authService.authSubject.subscribe((auth) => {
      this.user = auth.user
    })
  }
  openDialog() {
    this.dialog.open(SharedModalComponent);
  }
  openUpdateDestinationModal = () => {
    this.dialog.open(UpdateDestinationComponent, { data: this.destination });
  };
  deleteDestination(id: number) {
    console.log("Deleted successfully", id)
    this.destinationService.deleteDestination(id)
      .subscribe(
        {
          next: (res) => {
            console.log('Destination deleted:', res);
          },
          error: (error: any) => {
            console.error('Error deleting destination:', error);
          }
        }
      );
  }

  handleDestinationLike(id: number) {

    this.destinationService.likeDestination(id).subscribe({
      next: data => console.log("like: ", data),
      error: error => console.log("error: ", error)
    })
  }

}
