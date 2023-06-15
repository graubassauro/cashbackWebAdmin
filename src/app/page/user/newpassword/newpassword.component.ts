import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http/http.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.css']
})
export class NewpasswordComponent implements OnInit {


  loginForm: FormGroup;
  error: any = '';

  constructor(private http: HttpService,
              private fb: FormBuilder,
              private router: Router) {

    this.loginForm = this.fb.group({
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });


  }

  ngOnInit() { }

  login() {
    this.router.navigateByUrl('/confirmednewpassword');
  }

}
