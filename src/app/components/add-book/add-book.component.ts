import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './../../services/book.service';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  bookForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: BookService
  ) { 
    this.bookForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit() { }
  
  onSubmit(): any {
    this.crudService.addBook(this.bookForm.value)
    .subscribe({
      complete: () => {
        console.log('Data added successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/book-list'))
      }, error: (err) => {
        console.log(err);
      }
   });
  }
}