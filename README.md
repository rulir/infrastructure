[![Build Status](https://travis-ci.org/rulir/infrastructure.svg?branch=master)](https://travis-ci.org/rulir/infrastructure) 
[![bitHound Overall Score](https://www.bithound.io/github/rulir/infrastructure/badges/score.svg)](https://www.bithound.io/github/rulir/infrastructure) 
[![bitHound Dependencies](https://www.bithound.io/github/rulir/infrastructure/badges/dependencies.svg)](https://www.bithound.io/github/rulir/infrastructure/master/dependencies/npm) 
[![bitHound Dev Dependencies](https://www.bithound.io/github/rulir/infrastructure/badges/devDependencies.svg)](https://www.bithound.io/github/rulir/infrastructure/master/dependencies/npm) 
[![bitHound Code](https://www.bithound.io/github/rulir/infrastructure/badges/code.svg)](https://www.bithound.io/github/rulir/infrastructure)

# Задание по инфраструктуре  

### VCS-хостинг

В качестве VCS-хостинга использовался GitHub

### NodeJS приложение

Для задания я написал небольшое приложение. В основе Express. В качествесте шаблонизатора pug. Начальная страница содержит форму для ввода текста. Форма отправляет строку на сервер, а он возвращает строку, в которой буквы заменены соответсвующими позициями этих букв в русском алфавите. Символы не соответствующие буквам русского алфавита пропускаются. Приложение пишет логи: о времени рендеринга шаблонов и запуске сервера.

Приложение доступно по адресу: https://infrastructure-task.herokuapp.com/  

Проверено в Google Chrome и Mozilla Firefox.

### Проверка синтаксиса

Для проверки js синтаксиса настроен **ESLint**. Настроен автоформат CSS при помощи **csscomb**. Для проверки синтаксиса CSS настроен **Stylelint**. Весь линтинг запускается командой `npm lint`.

Настроен облачный линтер **bitHound**. Отчеты о его проверках видны сверху в виде плашек. Дает много полезной информации о зависимостях. Можно настроивать при помощи собственного конфига `.bithoundrc`. 

### Тесты

Для тестов используется mocha и chai. Запускаются командой `npm mocha`. Команда `npm test` запускает линтинг и тесты.

### Логирование Heroku

За сбор, обработку и представление логов в Heroku отвечает инструмент **Logplex**. Он так же предостоставляет средства для доступа к логам при помощи CLI или платформы Heroku. Логи в  Heroku - это поток событий с метками времени агрегированный из потоков всех запущенных процессов приложения, компонентов системы и сопутствующих сервисов. Все логи нашего приложения (`console.log()`) так же попадают в поток. При этом стоит учитывать, что логи в потоке могут выводится не в хронологическом порядке.

Самый простой способ посмотреть логи сервера с приложением, выполнить команду `heroku logs`. У этой команды несколько вариаций. Мы можем фильтровать логи и выводить интересующий тип:
 - Что бы посомтреть логи, которые пишет приложение и сервер используется флаг `--source` или `-s` с параметром `app`; параметр `heroku` выводит логи относящиеся непостредственно к платформе, информации о крешах, перезапусках, ошибках и активности приложения. При помощи флага `--dyno` можно отсортировать логи по компоненту, который их написал, например, `--dyno router` или `--dyno api`.
 - Можно указать для какого конкретно приложения необходимо вывести лог (флаг `-a` c наименованием приложения в качестве параметра)
 - Для просмотра потока логов в реальном времени используется флаг `--tail` или `-t`
 - Количесво выводимых строк логов можно ограничить флагом `--num` или `-n`

 #### Так выглядят логи транслируемые из загруженного nodejs приложения:

 ![](https://raw.githubusercontent.com/rulir/infrastructure/screens/app-server.png)

 #### Так выглядят логи который пишет компонент router dyno-контейнера. Эти логи касаются запросов и маршрутизации:

 ![](https://raw.githubusercontent.com/rulir/infrastructure/screens/router.png)

 #### Так выглядят логи api, которые касаются разнообразных административных действий (деплой и развертывание кода):

 ![](https://raw.githubusercontent.com/rulir/infrastructure/screens/api-release.png)

 #### Так выглядят логи относящиеся непосредственно к текущему состоянию dyno-контейнера (переходы между активными и неактивными состояниями):

 ![](https://raw.githubusercontent.com/rulir/infrastructure/screens/state-change.png)

 Документация сразу предупреждает, что Logplex предназначен для сбора и маршрутизации логов, но не для их хранения (хранит не более 1500 строк). Что бы хранить и обрабатывать логи существуют специальные дополнения. Так же heroku предоставляет api для направления логов в сторонние сервисы, которые могут быть отдельно разработаны для управления логированием.

### Мониторинг

Для мониторинга используется сервиc **UptimeRobot**. Он умеет слать запросы на сервер и реагировать на основании его ответов. Переодичность запросов можно настроить. В случае обнаружения проблем в работе сервера UptimeRobot отправит оповещение на электронную почту и в мобильное приложение.

![](https://raw.githubusercontent.com/rulir/infrastructure/screens/uptimerobot-desktop.png)
![](https://raw.githubusercontent.com/rulir/infrastructure/screens/uptimerobot-mobile.png)