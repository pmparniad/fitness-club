import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

    constructor(private messageService: MessageService) {}

    addSingle(severity: 'success' | 'error' | 'warn' | 'info', summary: string, detail: string, isSticky = false) {
        this.messageService.add(
          { severity: severity, summary: summary, detail:detail, life: 3000, sticky: isSticky
          });
    }

    clear() {
        this.messageService.clear();
    }
}

