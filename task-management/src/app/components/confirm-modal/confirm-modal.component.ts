import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm Action</h4>
      <button type="button" class="btn-close" aria-label="Close" (click)="activeModal.dismiss('cancel')"></button>
    </div>
    <div class="modal-body">
      <p>{{ message }}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-sm btn-secondary" (click)="activeModal.dismiss('cancel')">Cancel</button>
      <button type="button" class="btn btn-sm btn-danger" (click)="activeModal.close('confirm')">Confirm</button>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() title!: string;
  @Input() message!: string;

  constructor(public activeModal: NgbActiveModal) {}
}
