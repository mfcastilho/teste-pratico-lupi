import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { DatePipe } from '@angular/common';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [DatePipe]
})
export class HomePage implements OnInit {
  orders: Order[] = [];

  constructor(
    private orderService: OrderService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.loadOrdersByStatus('Novo');
    this.loadOrdersByStatus('Em Andamento');
    this.loadOrdersByStatus('Concluído');
  }

  loadOrdersByStatus(status: string) {
    this.orderService.getOrdersByStatus(status).subscribe(data => {
      if (status === 'Novo') {
        this.newOrders = data;
      } else if (status === 'Em Andamento') {
        this.inProgressOrders = data;
      } else if (status === 'Concluído') {
        this.completedOrders = data;
      }
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

  newOrders: Order[] = [];
  inProgressOrders: Order[] = [];
  completedOrders: Order[] = [];

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
