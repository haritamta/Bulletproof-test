import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductEditComponent implements OnInit {
  product = {};
  updatedProduct = {};
  oldUnitPrice = 0;
  newUnitPrice = 0;
  storesArray = [];

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
  }

  getProduct(id) {
    this.http.get('/product/' + id).subscribe(data => {
      this.product = data;
      this.oldUnitPrice = data['unitPrice'];
    });
  }

  updateProduct(id, data) {
    this.http.put('/product/' + id, data)
      .subscribe(res => {
        this.updatedProduct = Object.assign({}, data);
        this.sendSnsAlert(this.updatedProduct);
        let id = res['_id'];
        this.router.navigate(['/product-details', id]);
      }, (err) => {
        console.log(err);
      }
      );
  }

  sendSnsAlert(updatedProduct) {
    let alertRequired = false;
    this.newUnitPrice = updatedProduct['unitPrice'];
    this.storesArray = updatedProduct['stores'];
    if (this.newUnitPrice !== this.oldUnitPrice) {
      alertRequired = true;
    }
    if (!alertRequired) {  // check stock level
      for (let i = 0; i < this.storesArray.length; i++ ) {
        if (this.storesArray[i].currentStock < this.storesArray[i].reorderLavel) {
          alertRequired = true;
          break;
        }
      }
    }
    if (alertRequired) {
      this.http.post('/awsSnsAlert', updatedProduct)
        .subscribe(res => {
          console.log(JSON.stringify(res));
        }, (err) => {
          console.log(err);
        });
    }
  }

  deleteProduct(id) {
    this.http.delete('/product/' + id)
      .subscribe(res => {
        this.router.navigate(['/products']);
      }, (err) => {
        console.log(err);
      });
  }
}
