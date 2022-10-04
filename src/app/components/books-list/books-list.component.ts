import { Component, OnInit } from '@angular/core';
import { BookService } from './../../services/book.service';
@Component({
  selector: 'app-book-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  
  books:any = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(res => {
      console.log(res)
      this.books =res;
    });    
  }

  delete(id:any, i:any) {
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.bookService.deleteBook(id).subscribe((res) => {
        this.books.splice(i, 1);
      })
    }
  }
}