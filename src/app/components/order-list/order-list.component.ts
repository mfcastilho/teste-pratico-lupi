import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent {
  @Input() title!: string;
  @Input() orders: Order[] = [];
  @Output() statusChange = new EventEmitter<{ order: Order; newStatus: string }>();
  @Output() drop = new EventEmitter<{ event: DragEvent; status: string }>();

  onDragStart(event: DragEvent, order: Order) {
    event.dataTransfer?.setData('order', JSON.stringify(order));
  }

  onDrop(event: DragEvent) {
    this.drop.emit({ event, status: this.title });
  }

  changeStatus(order: Order, newStatus: string) {
    this.statusChange.emit({ order, newStatus });
  }

  nextStatus(currentStatus: string): string {
    const statusOrder = ['Novo', 'Em Andamento', 'Concluído'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    return statusOrder[currentIndex + 1] || currentStatus;
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }
}
