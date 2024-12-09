import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operators';
import { Timestamp } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  getOrdersByStatus(status: string) {
    return this.firestore.collection('orders', ref =>
      ref.where('status', '==', status).orderBy('createdAt', 'desc')
    ).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Order;
        const id = a.payload.doc.id;

        if (data.createdAt instanceof Timestamp) {
          data.createdAt = data.createdAt.toDate();
        }

        return { id, ...data };
      }))
    );
  }


  addOrder(order: Order) {
    const newOrder = {
      ...order,
      createdAt: new Date()
    };
    return this.firestore.collection('orders').add(newOrder);
  }

  updateOrder(orderId: string, updatedOrder: Order) {
    return this.firestore.collection('orders').doc(orderId).update(updatedOrder);
  }
}
