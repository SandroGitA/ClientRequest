'use strict';

let URL_SEND; // адресс сервера на который отправляешь запрос POST (наприм. 'http://localhost:3000/posts')
let URL_ACCEPT; // адресс сервера с которого ЗАГРУЖАЕШЬ по запросу GET (наприм. 'http://localhost:3000/comments')

const GetBtn = document.querySelector('#GETBtn'); // кнопка отправки GET запроса
const PostBtn = document.querySelector('#POSTBtn'); // кнопка отправки POST запроса
const typeOutput = document.querySelector('#outputType'); // вывод типа запроса в HTML
const answerOutput = document.querySelector('#outputRequest'); // вывод ответа в HTML
const urlGetInput = document.querySelector('#getServer'); // инпут хранящий url для отправки GET
const urlPostInput = document.querySelector('#postServer'); // инпут хранящий url для отправки POST

const newTask = {
  id: new Date().getTime(), 
  dateBind: new Date().getTime(),
  dateCreate: new Date().getTime(),
  title: "task",
  descr: "jor",
  isPin: false,
  isComplete: false
};

// GET запрос (загружаю данные)
const backendLoad = () => {
  const getRequest = new XMLHttpRequest();

  URL_ACCEPT = urlGetInput.value; // получаем адресс на который отправлять GET

  typeOutput.textContent = ''; // очищаем вывод
  typeOutput.textContent = 'GET'; // выводим тип запроса в html
  getRequest.responseType = 'text'; // тип запроса json
  
  getRequest.addEventListener('load', () => {
    if (getRequest.status >= 200 && getRequest.status <= 210) {
      answerOutput.textContent = getRequest.response;
    } else {
      answerOutput.textContent = `Ошибка получения данных с сервера: ${getRequest.status} ${getRequest.statusText}`;
    }
  });

  getRequest.addEventListener('error', () => {
    answerOutput.textContent = `Произошла ошибка соединения`;
  });

  getRequest.addEventListener('timeout', () => {
    answerOutput.textContent = `Запрос не успел обработаться за ${xhr.timeout} мс`;
  });

  getRequest.timeout = 25000 // Таймаут через 25с.

  getRequest.open('GET', URL_ACCEPT);
	getRequest.send();
};

// POST запрос (отправляю данные)
const backendSave = (data = 1) => {
  const xhr = new XMLHttpRequest();

  URL_SEND = urlPostInput.value; // получаем адресс на который отправлять POST

  typeOutput.textContent = ''; // очищаем вывод
  typeOutput.textContent = 'POST'; // выводим тип запроса в html
  xhr.responseType = 'text'; // тип отправляемых данных

  xhr.addEventListener('load', () => {
    if (xhr.status >= 200 && xhr.status <= 210) {
      answerOutput.textContent = `на сервер отправлен ${xhr.response}`;
    } else {
      answerOutput.textContent = `Ошибка отправки данных на сервер: ${xhr.status} ${xhr.statusText}`;
    }
    
  });

  xhr.addEventListener('error', () => {
    answerOutput.textContent = `Ошибка соединения`;
  })

  xhr.open('POST', URL_SEND+"?jsonstring="+data);
  xhr.send();
};

GetBtn.addEventListener('click', backendLoad);
PostBtn.addEventListener('click', () => {
  backendSave(JSON.stringify(newTask));
});