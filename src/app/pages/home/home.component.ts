import { Component, ElementRef, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { TodoCardComponent } from '../../components/todo-card/todo-card.component';
import { LocalStorageService } from '../../services/local-storage.service';
import { ToDo } from '../../types/ToDo.type';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TodoCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnChanges{

  toDosList!: ToDo[];

  @ViewChild('titleField')
  titleField!: ElementRef<HTMLInputElement>;

  @ViewChild('contentField')
  contentField!: ElementRef<HTMLTextAreaElement>;

  constructor(private _localStorage: LocalStorageService){
    this.RefreshToDos();
  }

  SaveToDo(): void {
    const titleElement = this.titleField.nativeElement;
    const contentElement = this.contentField.nativeElement;

    const toSaveToDo: ToDo = {
      id: this._localStorage.GetNewId(),
      title: titleElement.value,
      content: contentElement.value
    }

    this._localStorage.SaveToDo(toSaveToDo);

    titleElement.value = '';
    contentElement.value = '';

    // refresh the ToDo's in view
    this.toDosList = this._localStorage.ReadToDos();
  }

  RefreshToDos(): void {
    this.toDosList = this._localStorage.ReadToDos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

}
