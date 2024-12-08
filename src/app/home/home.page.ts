import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

import { DatePipe } from '@angular/common';
import { Order } from '../models/order.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  orders: Order[] = [];
  newOrder: Order = {
    customerName: '',
    description: '',
    status: 'Novo',
    createdAt: new Date()
  };

  constructor(
    private orderService: OrderService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.orderService.getOrders().subscribe(data => {
      this.orders = data;
    });
  }

  addOrder(order: Order) {
    if (!order.customerName) return;

    this.orderService.addOrder(order).then(() => {
      console.log('Pedido adicionado com sucesso!');
    }).catch(err => {
      console.error('Erro ao adicionar pedido:', err);
    });
  }

  updateStatus(order: Order, newStatus: string) {
    if (order.id) {
      const updatedOrder: Order = { ...order, status: newStatus };

      this.orderService.updateOrder(order.id, updatedOrder).then(() => {
        console.log(`Status do pedido atualizado para ${newStatus}`);
      });
    } else {
      console.error("ID do pedido não encontrado.");
    }
  }

  formatDate(date: any) {
    return this.datePipe.transform(date, 'dd/MM/yyyy HH:mm:ss');
  }

  get newOrders(): Order[] {
    return this.orders.filter(order => order.status === 'Novo');
  }

  get inProgressOrders(): Order[] {
    return this.orders.filter(order => order.status === 'Em Andamento');
  }

  get completedOrders(): Order[] {
    return this.orders.filter(order => order.status === 'Concluído');
  }

  onDragStart(event: DragEvent, order: any) {
    event.dataTransfer?.setData('order', JSON.stringify(order));
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent, targetStatus: string) {
    event.preventDefault();

    const orderData = event.dataTransfer?.getData('order');
    if (orderData) {
      const order = JSON.parse(orderData);

      this.updateStatus(order, targetStatus);
    }
  }

}
