import { Component, ElementRef, ViewChild, WritableSignal, signal } from '@angular/core';
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
export class HomeComponent {

  toDosList!: ToDo[];

  @ViewChild('titleField')
  titleField!: ElementRef<HTMLInputElement>;

  errorInTitle: WritableSignal<boolean> = signal(false);

  editMode: WritableSignal<boolean> = signal(false);
  toEditId: WritableSignal<number> = signal(0);

  constructor(private _localStorage: LocalStorageService){
    this.RefreshToDos();
  }

  SaveToDo(): void {
    const titleElement = this.titleField.nativeElement;

    if (titleElement.value === '') {
      this.errorInTitle.set(true);
      return;
    }

    this.errorInTitle.set(false);

    const toSaveToDo: ToDo = {
      id: 0,
      title: titleElement.value
    }


    if (!this.editMode()) {
      toSaveToDo.id = this._localStorage.GetNewId();
      this._localStorage.SaveToDo(toSaveToDo);
    }
    else {
      toSaveToDo.id = this.toEditId();
      this._localStorage.UpdateToDo(toSaveToDo);
    }

    // reset vars
    titleElement.value = '';
    this.toEditId.set(0);
    this.editMode.set(false);

    // refresh the ToDo's in view
    this.toDosList = this._localStorage.ReadToDos();
  }

  RefreshToDos(): void {
    this.toDosList = this._localStorage.ReadToDos();
  }

  OnEditCard(toDo: ToDo): void {
    const titleElement = this.titleField.nativeElement;
    titleElement.value = toDo.title;
    this.editMode.set(true);
    this.toEditId.set(toDo.id);
  }

}
