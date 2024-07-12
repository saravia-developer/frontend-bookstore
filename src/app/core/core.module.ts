import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';

import { CartSidebarComponent } from './cart-sidebar/cart-sidebar.component';
import { DetailCartSidebarComponent } from './detail-cart-sidebar/detail-cart-sidebar.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavbarComponent, CartSidebarComponent, DetailCartSidebarComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatDialogModule,
    RouterModule
  ],
  exports:[NavbarComponent, CartSidebarComponent, DetailCartSidebarComponent]
})
export class CoreModule { }
