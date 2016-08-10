[![Build Status](https://travis-ci.org/rulir/infrastructure.svg?branch=master)](https://travis-ci.org/rulir/infrastructure) 
[![bitHound Overall Score](https://www.bithound.io/github/rulir/infrastructure/badges/score.svg)](https://www.bithound.io/github/rulir/infrastructure) 
[![bitHound Dependencies](https://www.bithound.io/github/rulir/infrastructure/badges/dependencies.svg)](https://www.bithound.io/github/rulir/infrastructure/master/dependencies/npm) 
[![bitHound Dev Dependencies](https://www.bithound.io/github/rulir/infrastructure/badges/devDependencies.svg)](https://www.bithound.io/github/rulir/infrastructure/master/dependencies/npm) 
[![bitHound Code](https://www.bithound.io/github/rulir/infrastructure/badges/code.svg)](https://www.bithound.io/github/rulir/infrastructure)

# Задание по инфраструктуре  


## Логирование Heroku

За сбор, обработку и представление логов в Heroku отвечает инструмент Logplex. Он так же предостоставляет средства для доступа к логам при помощи CLI или платформы Heroku. Логи в  Heroku - это поток событий с метками времени агрегированный из потоков всех запущенных процессов приложения, компонентов системы и сопутствующих сервисов. Все логи нашего приложения (`console.log()`) так же попадают в поток.

Самый простой способ посмотреть логи сервера с приложением, выполнить команду `heroku logs`. У этой команды несколько вариаций. Мы можем фильтровать логи и выводить интересующий тип:
 - Что бы посомтреть логи, которые пишет приложение и сервер используется флаг `--source` или `-s` с параметром `app`; параметр `heroku` выводит логи относящиеся непостредственно к платформе, информации о крешах, перезапусках, ошибках и активности приложения. При помощи флага `--dyno` можно отсортировать логи по компоненту, который их написал, например, `--dyno router`
 - Можно указать для какого конкретно приложения необходимо вывести лог (флаг `-a` c наименованием приложения в качестве параметра)
 - Для просмотра потока логов в реальном времени используется флаг `--tail` или `-t`
 - Количесво выводимых строк логов можно ограничить флагом `--num` или `-n`

 Документация сразу предупреждает, что Logplex предназначен для сбора и маршрутизации логов, но не для их хранения (хранит не более 1500 строк). Что бы хранить и обрабатывать логи существуют специальные дополнения.