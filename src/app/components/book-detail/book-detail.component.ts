import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './../../services/book.service';
import { FormGroup, FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  getId: any;
  updateForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private bookService: BookService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBook(this.getId).subscribe(res => {
      this.updateForm.setValue({
        name: res['name'],
        price: res['price'],
        description: res['description']
      });
    });
    this.updateForm = this.formBuilder.group({
      name: [''],
      price: [''],
      description: ['']
    })
  }

  ngOnInit() { }

  onUpdate(): any {
    this.bookService.updateBook(this.getId, this.updateForm.value)
    .subscribe({
      complete: () => {
        console.log('Data updated successfully!')
        this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }
}