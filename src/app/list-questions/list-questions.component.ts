import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './../data.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogAnswerComponent } from './../dialog-answer/dialog-answer.component';

@Component({
  selector: 'app-list-questions',
  templateUrl: './list-questions.component.html',
  styleUrls: ['./list-questions.component.css']
})
export class ListQuestionsComponent implements OnInit {

  dataExample: any[];
  listQuestions: any[];
  listAnswers: any[];
  animal: string;
  name: string;
  panelOpenState: boolean;

  constructor(
    private dataService: DataService,
    private router: Router,
    private dialog: MatDialog
  ) {
    /*
    this.dataExample = [
      {'name': 'Shiba Inu', 'type': 'Dog Breed',
      'imageAuthor': 'https://material.angular.io/assets/img/examples/shiba1.jpg',
      'imagePost': 'https://material.angular.io/assets/img/examples/shiba2.jpg',
      'textPost': 'The Shiba Inu is the smallest of the six original and distinct' +
      ' spitzbreeds of dog from Japan. A small, agile dog that copes very well' +
      ' with mountainous terrain, the Shiba Inu was originally bred for hunting.'},
      {'name': 'Golden Retriever', 'type': 'Dog Breed',
      'imageAuthor': 'https://i.pinimg.com/736x/13/09/aa/1309aa115ae375b0a5d6b27519fafd60--golden-retriever-puppies-retriever-dog.jpg',
      'imagePost': 'http://www.dogbreedslist.info/uploads/allimg/dog-pictures/Golden-Retriever-2.jpg',
      'textPost': 'The Golden Retriever is a large-sized breed of dog bred as gun dogs to retrieve' +
      ' shot waterfowl such as ducks and upland game birds during hunting and shooting parties,' +
      ' and were named "retriever" because of their ability to retrieve shot game undamaged.'},
      {'name': 'German Shepherd', 'type': 'Dog Breed',
      'imageAuthor': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7gdyFJYu_Dng0q4LiYnndilg_FGp34J1Dj6OnzgTOfLsNZtoJ',
      'imagePost': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJfJiYKl056zCOMM4p1rwgeinTn_y-n0lahNELXHnUU9dS1XrS',
      'textPost': 'The German Shepherd (German: Deutscher Schäferhund) is a breed ' +
      'of medium to large-sized working dog that originated in Germany.'}
    ];*/
  }

  ngOnInit() {
    this.panelOpenState = false;
    this.obtainListQuestions();
    // this.obtainAnswersQuestion();
  }

  logout() {
    this.router.navigate(['']);
  }

  goProfile() {
    this.router.navigate(['profile-user']);
  }

  goToAddQuestion() {
    this.router.navigate(['add-question']);
  }

  obtainListQuestions() {
    this.dataService.listQuestions(localStorage.getItem('person_id'), true).subscribe(
      response => {
        this.listQuestions = response.json();
      }
    );
  }

  obtainAnswersQuestion(idQuestion) {
    this.dataService.getAnswers(idQuestion).subscribe(
      response => {
        this.listAnswers = response.json();
      }
    );
  }

  openDialog(idQuest): void {
    this.dialog.open(DialogAnswerComponent, {
      width: '500px',
      data: { idQuestion: idQuest }
    });
  }

  voteQuestion(itemQuestion) {
    this.dataService.saveLikePerson(localStorage.getItem('person_id'), itemQuestion.id).subscribe(
        response => {
          console.log(response.json());
          itemQuestion.has_like = response.json().id;
          itemQuestion.likes += 1;
        }
      );
  }

  checkType(tags) {
    if (typeof tags !== 'string') {
      return true;
    }
    return false;
  }

}
