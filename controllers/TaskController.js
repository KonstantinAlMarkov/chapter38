import { TaskList }  from "../models/TaskList";

//Класс для управления всеми списками задач и формой задач
export class TaskController{
    constructor(user, readyList, inProgressList, finishedList) {
        //выбираем все задачи, что есть и выводим
        this.user = user;
        //кнопки
        this.readyBtn = document.querySelector(".addReady");
        this.progressBtn = document.querySelector(".addProgressDT");
        this.finishedBtn = document.querySelector(".addFinishedDT");
        //статистика по задачам
        this.activeTasksP =  document.querySelector("#activeTasks");
        this.finishedTasksP = document.querySelector("#finishedTasks");   
        //эменты для вывода списков задач
        this.readyListHtml = document.querySelector("#readyCol");
        this.inProgressListHtml = document.querySelector("#inProgressCol");        
        this.finishedListHtml = document.querySelector("#finishedCol");
        //дропдауны
        this.addCardProgress = document.querySelector(".addProgress");
        this.addCardFinished = document.querySelector(".addFinished");
        //списки
        this.readyList = new TaskList(this.user, 0, this.readyListHtml);
        this.inProgressList = new TaskList(this.user, 1, this.inProgressListHtml);
        this.finishedList = new TaskList(this.user, 2, this.finishedListHtml);
        this.tasks = [];

        console.log(readyList);

        this.createLists(readyList, inProgressList, finishedList);
        this.checkDropDowns();
        this.updateStats();

        this.readyBtn.addEventListener('click', event => {
            this.getTaskName()
          });
    }   

    //вкл/выкл дропдауны
    checkDropDowns() {
        this.readyList.taskCount() > 0 ? this.progressBtn.disabled = false : this.progressBtn.disabled = true;            
        this.finishedList.taskCount() > 0 ? this.finishedBtn.disabled = false : this.finishedBtn.disabled = true; 
    }

    //отображаем статистику по задачам:
    updateStats()
    {
        this.activeTasksP.innerHTML = "Active tasks:" + this.inProgressList.taskCount();
        this.finishedTasksP.innerHTML = "Finished tasks:" + this.finishedList.taskCount();        
    }

    //предзаполняем списки задач
    createLists(readyList, inProgressList, finishedList)
    {
        if(readyList !==null && readyList.isArray() && readyList.length > 0)
        {
            this.readyList.appendTasks(readyList);
            this.readyList.viewTasks();
        }
        if(inProgressList !==null && inProgressList.isArray() && inProgressList.length > 0)
        {
            this.inProgressList.appendTasks(inProgressList);
            this.inProgressList.viewTasks();
        }
        if(finishedList !==null && finishedList.isArray() && finishedList.length > 0)
        {
            this.finishedList.appendTasks(finishedList);
            this.finishedList.viewTasks();
        }
    }

    //добавление новой задачи
    appendNewTask(taskText)
    {
        //создаём задачу
        let task = this.readyList.appendNewTask(taskText);
        this.readyList.viewTasks();
        //добавляем задачу в дропдаун Ready
        let newTask = document.createElement("button");
        newTask.setAttribute("class", "dropdown-item addProgressElement");
        newTask.setAttribute("guid", task.getId());
        newTask.setAttribute("type", "button");
        newTask.textContent = task.getText();
        this.addCardProgress.appendChild(newTask);
        this.checkDropDowns();        
        //добавляем листенеры
        document.querySelectorAll('.addProgressElement').forEach(item => {
            item.addEventListener('click', event => {
                this.moveToProgress(item.getAttribute('guid'),item);
            })
        })
    }

    getTaskName(){
        this.readyBtn.innerHTML = "Submit";
        let newTask = document.createElement("input");
        newTask.setAttribute("type", "text");
        newTask.setAttribute("class", "form-control-plaintext");
        newTask.setAttribute("id", "taskInput");
        this.readyListHtml.appendChild(newTask);        
        newTask.focus();

        newTask.addEventListener('focusout', (event) => {
            if(newTask.value.length > 0)
            {
                this.appendNewTask(newTask.value);
            }
            newTask.remove();
            this.readyBtn.innerHTML = "+ Add card";
        });
    }

    //перемещение задачи Ready > In Progress
    moveToProgress(guid, item)
    {
        let taskToMove = this.readyList.findByGuid(guid);
        if(taskToMove !== null)
        {
            if(this.inProgressList.appendExistTask(taskToMove))
            {
                //удаляем кнопку в дропдауне
                item.remove();

                //переносим задачу
                this.readyList.removeTask(taskToMove.getId());
                this.readyList.viewTasks();
                this.inProgressList.viewTasks();

                //добавляем задачу в дропдаун finished
                let newTask = document.createElement("button");
                newTask.setAttribute("class", "dropdown-item addFinishedElement");
                newTask.setAttribute("guid", taskToMove.getId());
                newTask.setAttribute("type", "button");
                newTask.textContent = taskToMove.getText();
                this.addCardFinished.appendChild(newTask);
                this.updateStats();
                this.checkDropDowns();
                //добавляем листенеры
                document.querySelectorAll('.addFinishedElement').forEach(item => {
                    item.addEventListener('click', event => {
                        this.moveToFinished(item.getAttribute('guid'),item);
                    })
                })
            }
        }
    }
    //перемещение задачи In Progress > Finished
    moveToFinished(guid, item)
    {
        let taskToMove = this.inProgressList.findByGuid(guid);
        if(taskToMove !== null)
        {
            if(this.finishedList.appendExistTask(taskToMove))
            {
                //удаляем кнопку в дропдауне
                item.remove();
                //переносим задачу
                this.inProgressList.removeTask(taskToMove.getId());
                this.inProgressList.viewTasks();
                this.finishedList.viewTasks();
                this.updateStats();
            }
        }       
    }
}