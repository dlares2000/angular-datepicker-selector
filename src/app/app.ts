import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule, 
    MatDatepickerModule,
    MatNativeDateModule, 
    MatButtonModule, 
    MatIconModule
  ],
})
export class AppComponent implements OnInit{

  constructor(private cdr: ChangeDetectorRef) {}

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

   hasDates: boolean = false; 

 ngOnInit(): void { // 🛑 Use ngOnInit to set up the subscription
    // Subscribe to value changes to update the visibility flag
    this.range.valueChanges.subscribe(value => {
      // Check if EITHER start OR end has a non-empty, non-null value
      const startValue = value.start;
      const endValue = value.end;
      
      this.hasDates = !!startValue || !!endValue;

      // Optional: Log to verify the flag changes
      console.log('hasDates flag:', this.hasDates); 

      this.cdr.detectChanges(); 
    });
  }


ngDoCheck() {
  // 🛑 Log the value whenever Angular checks for changes
  console.log('Form Value:', this.range.value);
}

  clearDates() {
    this.range.setValue({
    start: null,
    end: null,
    });
   this.cdr.detectChanges(); 
  }
}