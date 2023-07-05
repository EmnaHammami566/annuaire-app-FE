import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Speciality } from 'src/app/speciality/speciality';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  allSpecialities: Speciality[] = [];
  userForm: User = {
    id: 0,
    email: '',
    username: '',
    password:'',
    speciality:{
      id :0,
      name:'',
      description:'',
    }
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private userService: UserService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }
 
  getById(id: number) {
    this.userService.getById(id).subscribe((data) => {
      this.userForm = data;
    });
  }
 
  update() {
    this.userService.updateUser(this.userForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/users/home"]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

}