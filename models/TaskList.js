import { Task } from "./Task";
import { updateInToStorage } from "../utils";

//Класс для управления конкретным списком задач
//status = 0 - ready
//status = 1 - InProgress
//status = 2 - Finished
export class TaskList {
    constructor(user, status, htmlObj) {
        //выбираем все задачи, что есть и выводим
        this.user = user;
        this.status = status;
        this.htmlObj = htmlObj;
        this.tasks = [];  
    }
    
    //показываем все задачи
    viewTasks(){
        let taskListHtml = '';
        this.tasks.forEach(task => {
            taskListHtml = taskListHtml +
/*            `<div class="sortable-item" id="task">
            dsfdsf
            </div>`; */
            `<div class="row" id="task">
                <h3 class="task" guid="${task.getId()}">${task.getText()}</h3>
             </div>`;
        });
        this.htmlObj.innerHTML = taskListHtml;
    }

    //получить количество задач по типу
    taskCount()
    {
        return this.tasks.length;
    }

    getTasks()
    {
        return this.tasks;
    }

    //добавить новую задачу
    appendNewTask(taskText)
    {
        if (taskText.lenght == 0)
        {
            taskText = 'Не было задано';
        }
        let newTask = new Task(null, taskText, this.user, this.status);
        this.tasks.push(newTask);
        return newTask;
    }

    //добавить список существующих задач
    appendTasks(taskList)
    {
        console.log(taskList.lenght);
        taskList.forEach(task => {                   
            let newTask = new Task(task.id,task.text,task.user,task.type);
            this.tasks.push(newTask);
        });
    }

    //добавление существующей задачи
    appendExistTask(task)
    {
        task.setType(this.status);
        this.tasks.push(task);
        updateInToStorage("id", task.getId(), task.getStorageKey(), "type",this.status);
        return true;
    }

    findByGuid(guid)
    {
       let taskToReturn = null;
        this.tasks.forEach(task => {
            if(task.getId()==guid)
            {
                taskToReturn = task;
            }
        }); 
        return taskToReturn;       
    }

    //переместить задачу
    removeTask(guid)
    {
        let i = 0;
        this.tasks.forEach(task => {
            if(task.getId() == guid)
            {
                this.tasks.splice(i,1);
            }
            i++;
        }); 
    }
}