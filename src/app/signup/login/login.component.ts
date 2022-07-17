import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;

  error = '';

  forms;

  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private cartService: CartService
  ) {
    this.forms = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  get email():string {
    return this.forms.get('email')?.value!;
  }
  get password():string {
    return this.forms.get('password')?.value!;
  }

  onSubmit() {
    this.authService.login(this.email, this.password).then((res) => {});
  }
}
