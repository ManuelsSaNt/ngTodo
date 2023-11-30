import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {

  @ViewChild('desplegableSide')
  desplegableSide!: ElementRef<HTMLElement>;

  @ViewChild('description')
  description!: ElementRef;

  @Input()
  todoTitle!: string;

  @Input()
  todoDescription!: string;

  showCard(): void {

    const contentHeight: number = this.description.nativeElement.getBoundingClientRect().height;
    const desplegableHeight: number = this.desplegableSide.nativeElement.getBoundingClientRect().height;

    if (desplegableHeight > 0) {
      this.desplegableSide.nativeElement.style.height = '0px';
    } else {
      this.desplegableSide.nativeElement.style.height = (contentHeight + 40).toString() + 'px';
    }

  }


}
