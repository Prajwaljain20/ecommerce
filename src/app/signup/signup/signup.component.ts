import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { IUser } from 'src/app/models/user.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  userProfile!: IUser;
  hide = true;
  hideAdmin = true;
  uid = '';
  forms;
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.forms = fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[A-Za-z ]+$/),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
          ),
        ],
      ],
      admin: [false],
      key: [, [Validators.pattern('main-hu-admin'), Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {}

  get email(): string {
    return this.forms.get('email')?.value!;
  }
  get password(): string {
    return this.forms.get('password')?.value!;
  }
  get admin() {
    return this.forms.get('admin')?.value;
  }
  get name(): string {
    return this.forms.get('name')?.value!;
  }
  get nameErrors(): ValidationErrors | null {
    return this.forms.controls['name'].errors;
  }
  get emailErrors(): ValidationErrors | null {
    return this.forms.controls['email'].errors;
  }
  get passwordErrors(): ValidationErrors | null {
    return this.forms.controls['password'].errors;
  }
  get adminErrors() {
    return this.forms.controls['admin'].errors;
  }
  get key() {
    return this.forms.controls['key'];
  }
  onSubmit() {
    this.authService
      .signUp(this.name, this.email, this.password, this.admin!)
      .then((res) => {});
  }
  show() {
    this.hideAdmin = !this.hideAdmin;
    setTimeout(() => {
      if (this.admin) {
        this.key.addValidators([
          Validators.pattern('main-hu-admin'),
          Validators.minLength(1),
          Validators.required,
        ]);
      } else {
        this.key.removeValidators([
          Validators.pattern('main-hu-admin'),
          Validators.minLength(1),
          Validators.required,
        ]);
      }
    }, 0);
  }
}
