import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.page.html',
  styleUrls: ['./order-form.page.scss']
})
export class OrderFormPage {
  @Output() orderAdded = new EventEmitter<Order>();

  newOrder: Order = {
    customerName: '',
    description: '',
    status: 'Novo',
    createdAt: new Date()
  };

  constructor(
    private router: Router,
    private orderService: OrderService
  ) {}

  addOrder() {
    if (this.newOrder.customerName) {
      this.orderService.addOrder(this.newOrder).then(() => {
        console.log('Pedido adicionado com sucesso!');
        this.router.navigate(['/']);
      }).catch(err => {
        console.error('Erro ao salvar pedido:', err);
      });

      this.newOrder = { customerName: '', description: '', status: 'Novo', createdAt: new Date() };
    }
  }

  goBack() {
    this.router.navigateByUrl('/');
  }
}
