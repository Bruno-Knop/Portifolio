import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Services/authentication/auth-service.service';
import { ControllService } from 'src/app/Services/controller.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private auth: AuthService,
    private controller: ControllService
  ) {};

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      senha: new FormControl('', [Validators.required, Validators.minLength(5)])
    });
  }

  //FUNCTIONS
  async login(){
    if(this.loginForm.controls.usuario.invalid){
      this.controller.toastControllerBottom('Campo Usuário é obrigatório!');
    } else if(this.loginForm.controls.senha.invalid){
      this.controller.toastControllerBottom('Campo Senha é obrigatório!');
    } else {
      const loader = await this.controller.loadingController('Por favor, aguarde...').then(retorno => retorno);

      await this.auth.login(this.loginForm.value).then(result => {
        if(result.success){
          loader.dismiss();
          this.controller.toastControllerBottom(result.message);
          this.controller.navigateHome();
        } else {
          loader.dismiss();
          this.loginForm.value.senha = '';
          this.controller.toastControllerBottom(result.message);
        };

      }).catch((err) => {
        loader.dismiss();
        this.controller.toastControllerBottom('Erro de conexão com api externa!');
      });
    };
  };

  async resetPassword(dados: any) {
    //this.controller.toastControllerBottom(await this.auth.resetPassword(dados).then(retorno => retorno));
  }

};
