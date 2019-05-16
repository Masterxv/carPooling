import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-info-search',
  templateUrl: './info-search.page.html',
  styleUrls: ['./info-search.page.scss'],
})
export class InfoSearchPage implements OnInit {

  todo: Todo = {
    task: 'your ride',
    createAt: new Date().getTime(),
    priority: 2,
    name:'',
    lastName:'',
    gender:'',
    email:'',
    mobile:null,

  start:'',
  end:'',
  timing:null,
  vehical:null,
  seat:null,
  }
  todoId = null;
  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private nav: NavController) { }


  ngOnInit() {
    this.todoId = this.route.snapshot.params['id'];
    if (this.todoId) {
      this.loadTodo();
    }
  }

  async loadTodo() {
    const loading = await this.loadingController.create({
      message: 'Loading Todo..'
    });
    await loading.present();
    this.todoService.getTodo(this.todoId).subscribe(rec => {
      loading.dismiss();
      this.todo = rec;
    });
  }
  async saveTodo() {
    const loading = await this.loadingController.create({
      message: 'saving TodoService..'
    });
    await loading.present();

    if (this.todoId) {
      this.todoService.updateTodo(this.todo, this.todoId).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/info-post');
      });
    }

  }

}
