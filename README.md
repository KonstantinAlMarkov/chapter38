# chapter38
Делалось по варианту 3 блока задач
Задание 1
+Первоначально задача размещается в Ready для анализа. При клике на кнопку «+ Add card» должно появляться новое поле в конце списка, между последней задачей и кнопкой, для которого реализована возможность ввода. При этом кнопка «+ Add card» должна меняться на «Submit» Созданные задачи должны сохраняться в localStorage. Нажали кнопку — появилось поле для редактирования — ввели название — нажали кнопку «Submit» или ушли с поля (расфокусировались, кликнули и так далее) — название сохранилось — задача появилась в Ready .
+Задачи для списка In progress берутся из Ready. При клике на «+ Add card» в этом списке, должна быть предоставлена возможность выбора задач из Ready из дропдауна. При клике на кнопку в конце списка, между последней задачей и кнопкой появляется дропдаун с возможными вариантами. После клика на задачу из дропдауна, она должна появиться в списке последней.
+Задачи для списка Finished берутся из In progress. Реализация, аналогичная п.2.
+Если задач в списках In progress, Ready — нет, кнопку нужно задизейблить (убрать возможность клика).
+Когда задача попадает в следующий список, из текущего её нужно удалить. Например, когда в список In progress попадает задача из Ready, из Ready она должна быть удалена. По аналогии должно быть реализовано и для других списков.
+Добавить вывод активных и завершенных задач в футер. Active tasks — количество задач из Ready. Finished tasks — количество задач из списка Finished.
Задачи сохранаются в локалстор, но пока не подтягиваются назад

-Задание 2: Добавление user menu
-Задание 3: Реализация пользователей