import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    role: new FormControl('user')  // Agregamos el rol por defecto
  })

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {

      const loading = await this.utilsSvc.loading();
      await loading.present();

      try {
        const res = await this.firebaseSvc.signUp(this.form.value as User);

        await this.firebaseSvc.updateUser(this.form.value.name);
        const uid = res.user.uid;
        this.form.controls.uid.setValue(uid);

        // Asignamos el rol aquí
        this.form.controls.role.setValue('user');

        await this.setUserInfo(uid);

        this.utilsSvc.saveInLocalStorage('user', this.form.value);
        this.utilsSvc.routerLink('/main/home');
        this.form.reset();

      } catch (error) {
        console.log(error);
        this.utilsSvc.presentToast({
          message: error.message,
          duration: 4500,
          color: 'danger',
          position: 'middle',
          icon: 'alert-circle-outline'
        });

      } finally {
        loading.dismiss();
      }
    }
  }

  async setUserInfo(uid: string) {
    const path = `users/${uid}`;
    const userData = { ...this.form.value };
    delete userData.password; // Remover el password antes de guardar

    try {
      await this.firebaseSvc.setDocument(path, userData);

    } catch (error) {
      console.log(error);
      this.utilsSvc.presentToast({
        message: error.message,
        duration: 4500,
        color: 'danger',
        position: 'middle',
        icon: 'alert-circle-outline'
      });
    }
  }
}
