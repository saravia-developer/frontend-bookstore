import { Component } from '@angular/core';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CheckoutService } from './services/checkout.service';

// export class MyErrorStateMatcher implements ErrorStateMatcher {

//   isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
//     const isSubmitted = form && form.submitted;
//     return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
//   }
// }

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  formCheckout: FormGroup
  typeDocuments: any

  constructor(
    private formBuilder: FormBuilder,
    private checkoutServices: CheckoutService
  ){
    this.formCheckout = this.createFormCheckout()
    this.getTypeDocument()
  }

  createFormCheckout() {
    return this.formBuilder.group({
      firstname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
      lastname: ['', Validators.compose([Validators.required, Validators.minLength(2), Validators.maxLength(40)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      phone: [0, Validators.compose([Validators.required, Validators.maxLength(9)])],
      typeDocument: [0, Validators.compose([Validators.required,  Validators.maxLength(2)])],
      numberDocument: [0, Validators.compose([Validators.required, Validators.minLength(20)])],
    })
  }

  getTypeDocument() {
    return this.checkoutServices.getTypeDocument().subscribe(data => {
      this.typeDocuments = data?.result?.item.rows
    })
  }

  // Ahora al darle submit al formulario que seria el checkout se estará cargando un usuario
  onSubmit() {
    if (this.formCheckout.valid) {
      alert('Formulario completado');
      let infoForm = this.formCheckout.value;
      this.checkoutServices.createClient(infoForm).subscribe(data => {
        console.log('Termino la creación de cliente');

        this.checkoutServices.getUserByEmail(infoForm.email).subscribe(data => {
          // console.log(data)

          this.checkoutServices.createOrder(data.result.item.rows[0])
        });
      });

      // .test().subscribe(data => {
      //   console.log(data)
      // })


      // console.log(infoForm)
      // console.log(infoForm.email)



      this.formCheckout.reset();
    } else {
      alert('El Formulario no es válido');
    }
  }
}



