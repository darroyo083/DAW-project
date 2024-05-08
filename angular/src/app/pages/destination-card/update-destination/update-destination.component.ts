import { Component, Inject } from '@angular/core';
import { DestinationService } from '../../../service/destination/destination.service';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-destination',
  standalone: true,
  imports: [
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './update-destination.component.html',
  styleUrl: './update-destination.component.scss',
})
export class UpdateDestinationComponent {
  destinationItem: any = {
    title: '',
    description: '',
    destinationType: '',
    image: '',
  };

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private destinationService: DestinationService) {
    this.destinationItem = data
  }

  handleUpdateDestination() {
    console.log('Form submitted:', this.destinationItem);
    this.destinationService.updateDestination(this.destinationItem).subscribe({
      next: (res) => console.log("res", res),
      error: (error) => console.log("error ", error)
    });
  }


}
