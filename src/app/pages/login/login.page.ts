import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { ModalController, NavController, LoadingController, MenuController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { TodoService, Todo } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  todo: Todo = {
    task: 'Your ride',
    createAt: new Date().getTime(),
    priority: new Date().getTime(),
    
    name: '',
    lastName: '',
    gender: '',
    email: '',
    mobile: null,

    start: '',
    end: '',
    timing: null,
    vehical: null,
    seat: null,
  }
  todoId = null;


  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private loadingController: LoadingController,
    private modalCtr: ModalController,
    private nav: NavController,
    public menuCtrl: MenuController) { }
  /*
    async openModal(){
      const modal= await this.modalCtr.create({
        component:ModalPage,
        componentProps:{
         // custom_id:this.value
          //foo:'hello'
        }
      });
     return await modal.present();
    }*/
  ionViewWillEnter() {

    this.menuCtrl.swipeEnable(false)
  }

  ionViewDidLeave() {

    this.menuCtrl.swipeEnable(true)
  }
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
        this.nav.navigateForward('/home');
      });
    } else {
      this.todoService.addTodo(this.todo).then(() => {
        loading.dismiss();
        this.nav.navigateForward('/home');
      });
    }

  }




}
