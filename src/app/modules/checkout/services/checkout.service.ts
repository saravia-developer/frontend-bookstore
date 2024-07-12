import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreService } from 'src/app/core/services/core.service';

interface IClient {
  doc_type: number;
  doc_number: string;
  first_name: string;
  last_name: string;
  phone: number;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  url = 'http://localhost:3002';

  constructor(private http: HttpClient, private coreServices: CoreService) {}

  getTypeDocument() {
    return this.http.get<any>(`${this.url}/type-documents`);
  }

  createClient(body: IClient) {
    return this.http.post<any>(`${this.url}/user/create`, body);
  }

  getUserByEmail(email: any) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('email', email);

    return this.http.get<any>(`${this.url}/user/by-email`, {
      params: httpParams,
    });
  }

  // test() {
  //   return this.http.post<any>(
  //     `${this.url}/order/create`,
  //     {
  //       clientId: Number(client_id),
  //       total: Number(total),
  //       typeDocument: Number(payment),
  //       numberDocument: Number(serieNumber),
  //     }
      // {
      //   clientId: 1,
      //   total: 50,
      //   typeDocument: 1,
      //   numberDocument: 81234987
      // }
    // );


  createOrder(data: any) {
    let randomNumber = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
      .map((e, i, arr) => {
        return arr[Math.floor(Math.random() * 10)];
      })
      .join('');

    let serieNumber = `E001-${randomNumber}`;
    const payment = 1;

    return this.coreServices.currentSumItemsCart.subscribe((total) => {
      this.http.post<any>(`${this.url}/order/create`, {
        clientId: Number(data.client_id),
        total: Number(total),
        typeDocument: Number(payment),
        numberDocument: serieNumber + '',
      }).subscribe(result => console.log(result))
    });
  }
}
