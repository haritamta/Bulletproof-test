import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductCreateComponent implements OnInit {

  product = {};

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }

  saveProduct() {
    this.http.post('/product', this.product)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
