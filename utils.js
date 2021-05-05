export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  localStorage.clear();
  const testUser = new User("test", "qwerty123");
  User.save(testUser);
};

//считываем все задачи
export const getTasksFromStorage = function (user, listNum) {
  let allTasks = JSON.parse(localStorage.getItem("task") || "[]");
  let returnList = [];
  
  console.log(user);
  console.log(listNum);

  allTasks.forEach(element => {

    console.log(element);  

    if(element.user == user && element.type==listNum){
      returnList.push(element);
    };
  });
  return returnList;
};