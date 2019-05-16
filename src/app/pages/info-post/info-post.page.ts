
import { Component, OnInit } from '@angular/core';
import { Todo, TodoService } from 'src/app/services/todo.service';
import { NavController, ModalController, PopoverController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-info-post',
  templateUrl: './info-post.page.html',
  styleUrls: ['./info-post.page.scss'],
})
export class InfoPostPage implements OnInit {
  todos: Todo[];
  /*
  todo: Todo = {
    task: 'Test 123',
    createAt: new Date().getTime(),
    priority: 2
  }
  todoId = null;
  */

  constructor(
    private nav: NavController,
    private todoService: TodoService,
    private modalCtr: ModalController,
    private route: ActivatedRoute,
    private popoverCtrl: PopoverController,
    private loadingController: LoadingController,
    private router: Router

  ) { }


  /*
    ngOnInit() {
      this.todoService.getTodos().subscribe(res=>{
        this.todos=res;
      });
  
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
  */

  ngOnInit() {

    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  private i;
  remove(item) {

    for (this.i = 0; this.i < this.todos.length; this.i++) {
     
      this.todoService.removeTodo(item.id);

    }
  }

  


}
