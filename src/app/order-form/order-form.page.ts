import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../services/order.service'; // Importar o serviço de pedidos
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
    private orderService: OrderService // Injetar o serviço de pedidos
  ) {}

  addOrder() {
    if (this.newOrder.customerName) {
      // Chamar o serviço para adicionar o pedido no Firestore
      this.orderService.addOrder(this.newOrder).then(() => {
        console.log('Pedido adicionado com sucesso!');
        this.router.navigate(['/']); // Redireciona para a home
      }).catch(err => {
        console.error('Erro ao salvar pedido:', err);
      });

      // Resetar o formulário após adicionar o pedido
      this.newOrder = { customerName: '', description: '', status: 'Novo', createdAt: new Date() };
    }
  }
}
