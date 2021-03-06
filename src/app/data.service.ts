import { Injectable } from '@angular/core';
import { Http, HttpModule, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class DataService {

  constructor(
    private http: Http
  ) { }

  doLogin(username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      username: username,
      password: password
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/login-api/', body, options);
  }

  registerUser(firstName, lastName, email, username, password) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      username: username,
      password: password,
      first_name: firstName,
      last_name: lastName,
      email: email
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/register-api/', body, options);
  }

  getUserData(idPerson) {
    const headers = new Headers();
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.get('http://54.245.0.32:8000/person-api/' + idPerson + '/', options);
  }

  uploadImage(idPerson, imgBase64) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      person: idPerson,
      image: imgBase64
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/person-image-api/', body, options);
  }

  listQuestions(idPerson, allQuestions) {
    const headers = new Headers();
    const options = new RequestOptions();
    options.headers = headers;
    const params = new URLSearchParams();
    params.append('person_id', idPerson);
    if (allQuestions) {
      params.append('all_questions', 'true');
    }
    options.search = params;
    return this.http.get('http://54.245.0.32:8000/question/question-api/', options);
  }

  addQuestion(idPerson, title, description, tag) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const data = {
      creator: idPerson,
      title: title,
      statement: description
    };
    if (tag) {
      data['tag'] = tag.id;
    }
    const body = JSON.stringify(data);
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/question/question-api/', body, options);
  }

  getTags() {
    const headers = new Headers();
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.get('http://54.245.0.32:8000/question/tag-api/', options);
  }

  uploadQuestionImage(idQuestion, imgBase64) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      question: idQuestion,
      image: imgBase64
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/question/question-image-api/', body, options);
  }

  saveAnswer(idPerson, idQuestion, description) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      creator: idPerson,
      question: idQuestion,
      statement: description,
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/question/answer-api/', body, options);
  }

  getAnswers(idQuestion) {
    const headers = new Headers();
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.get('http://54.245.0.32:8000/question/answer-api/?question_id=' + idQuestion, options);
  }

  getImageQuestion(idQuestion) {
    const headers = new Headers();
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.get('http://54.245.0.32:8000/question/question-image-api/' + idQuestion + '/', options);
  }

  saveLikePerson(idPerson, idQuestion) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const body = JSON.stringify({
      person: idPerson,
      question: idQuestion
    });
    const options = new RequestOptions();
    options.headers = headers;
    return this.http.post('http://54.245.0.32:8000/question/person-like-api/', body, options);
  }

}
