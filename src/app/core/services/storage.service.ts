import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  constructor() { }

  getItem(key: string): any {
    return JSON.parse(localStorage.getItem(key) || '{}');
  }   

  setItem(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }  

  deleteItem(key: string): void {
    localStorage.removeItem(key);
  } 

  clear(): void {
    localStorage.clear();
  }
}