import { v4 as uuid } from "uuid";
import {addToStorage } from "../utils";



//класс для задачи. Храним уид, текст задачи и уид пользователя
//type = 0 - ready
//type = 1 - InProgress
//type = 2 - Finished

export class Task {
    constructor(taskText, user, type) {
      this.id = uuid();
      this.text = taskText;
      this.user = user;
      this.storageKey = "task";
      if (type == 1 || type == 2) 
      {
          this.type = type;
      }
      else
      {
        this.type = 0;
      }
      addToStorage(this, this.storageKey);
      console.log(`создал ${this.id}:${this.text}`);
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }  
    
    getUser() {
        return this.user;
    }
    
    getType() {
        return this.type;       
    }

    setType(type){
        if (type != 0 || type != 1 || type != 2)
        {
            this.type = 0;
        } else {
            this.type = type;
        }
    }
}