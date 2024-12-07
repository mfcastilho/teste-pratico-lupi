import { Component, EventEmitter, Output } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Output() orderAdded = new EventEmitter<Order>();

  newOrder: Order = {
    customerName: '',
    description: '',
    status: 'Novo',
    createdAt: new Date()
  };

  addOrder() {
    if (this.newOrder.customerName) {
      this.orderAdded.emit(this.newOrder);
      this.newOrder = { customerName: '', description: '', status: 'Novo', createdAt: new Date() };
    }
  }
}
