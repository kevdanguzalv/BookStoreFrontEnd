import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new Subject<string>();

  getMessage(): Subject<string> {
    return this.messageSubject;
  }

  setMessage(message: string): void {
    this.messageSubject.next(message);
  }
}