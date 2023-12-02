import { Injectable } from '@angular/core';
import { ToDo } from '../types/ToDo.type';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  ReadToDos(): ToDo[] {
    let data = localStorage.getItem('allToDo')

    if (data === null){
      localStorage.setItem('allToDo', '[]');
      data = '[]';
    }

    return JSON.parse(data);
  }

  SaveToDo(newToDo: ToDo): void {
    const actualData: ToDo[] = this.ReadToDos();
    actualData.push(newToDo);

    localStorage.setItem('allToDo', JSON.stringify(actualData));
  }

  UpdateToDo(toModify: ToDo) {
    const actualData: ToDo[] = this.ReadToDos();

    const toUpdateId = actualData.findIndex((savedToDo: ToDo) => savedToDo.id === toModify.id);

    actualData[toUpdateId].title = toModify.title;
    actualData[toUpdateId].content = toModify.content;

    localStorage.setItem('allToDo', JSON.stringify(actualData));
  }

  GetNewId(): number {
    const actualData: ToDo[] = this.ReadToDos();

    // get a new array only with the id's of each note and extract the max of them
    let maxIndex: number = Math.max(...actualData.map(toDo => toDo.id));

    return maxIndex + 1;
  }

  RemoveToDo(id: number): void {
    const actualData: ToDo[] = this.ReadToDos();

    const newData: ToDo[] = actualData.filter((toDo:ToDo) => toDo.id !== id);

    localStorage.setItem('allToDo', JSON.stringify(newData));
  }

}
