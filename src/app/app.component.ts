import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angularcomponents';
  public selectdrop;
  public selectdrop2;
  public values = [
    {id:1, value:"test1"},
    {id:2, value:"test2"},
    {id:3, value:"test3"},
    {id:4, value:"test4"},
    {id:5, value:"test5"},
  ]

  public values2 = [
    {id:1, value:"tesvcv"},
    {id:2, value:"teerersest2"},
    {id:3, value:"test123233"},
    {id:4, value:"vccvcdfd"},
    {id:5, value:"123fdcvcxvc"},
  ]

  getDate(data){
    console.log(data);
    
  }

}
