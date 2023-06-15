
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm: FormGroup;
  error: any = '';

  constructor(private http: HttpService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = this.fb.group({
      email: new FormControl('glaubertstransky@gmail.com', [Validators.required, Validators.email]),
      password: new FormControl('jfW2gl', [Validators.required]),
    });


  }

  ngOnInit() { }

  login() {
    this.router.navigateByUrl('/dash');
  
    
  }

}


