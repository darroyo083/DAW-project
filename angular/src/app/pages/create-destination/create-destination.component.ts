import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { DestinationService } from '../../service/destination/destination.service';

@Component({
  selector: 'app-create-destination',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './create-destination.component.html',
  styleUrl: './create-destination.component.scss',
})
export class CreateDestinationComponent {
  destinationItem: any = {
    title: '',
    description: '',
    destinationType: '',
    image: '',
  };

  constructor(private destinationService:DestinationService){}

  onSubmit() {
    console.log('Form submitted:', this.destinationItem);
    this.createDestination(this.destinationItem)
  }

  createDestination(destination: any): void {
    this.destinationService.createDestination(destination)
      .subscribe(
        {next:(newDestination: any) => {
          console.log('Destination created:', newDestination);
          this.destinationService.getDestinations();
        },
        error:(error: any) => {
          console.error('Error creating destination:', error);
        }}
      );
  }
}
