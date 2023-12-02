import { Component, ElementRef, EventEmitter, Input, Output, ViewChild, WritableSignal, signal } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.css'
})
export class TodoCardComponent {

  @ViewChild('description')
  description!: ElementRef;

  @Input()
  todoId!: number;

  @Input()
  todoTitle!: string;

  @Input()
  todoDescription!: string;

  @Output()
  refreshEventEmitter = new EventEmitter<boolean>();

  isHidden: WritableSignal<boolean> = signal(true);

  isRemoved: WritableSignal<boolean> = signal(false);

  @Input()
  spaceFromTop!: string;

  constructor(private _localStorage: LocalStorageService){}

  editCard(): void {

  }

  completeTask(): void {

    this.isRemoved.set(true);

    setTimeout(() => {
      this._localStorage.RemoveToDo(this.todoId);
      this.refreshEventEmitter.emit(true);
    }, 400)
  }

}
