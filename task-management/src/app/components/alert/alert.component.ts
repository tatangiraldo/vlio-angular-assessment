import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      this.showErrorMessage = ''
    }, 5000);
  }
  @Input() showErrorMessage: string = ''

}
