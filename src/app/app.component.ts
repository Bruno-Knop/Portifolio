import { MenuService } from './Services/menu.service';
import { Component, OnInit } from '@angular/core';
// import { Network } from '@ionic-native/network/ngx';
import { Network } from '@ionic-native/network/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from './Services/authentication/auth-service.service';
import { ControllService } from './Services/controller.service';
import { StorageService } from './Services/storageService.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  usuario: string;
  codigo: number;
  darkmode: boolean;

  appPages = [
    { id: 1, title: 'Home', url: '/Home', icon: 'home', children: [] },
    { id: 2, title: 'Apontamento', url: '', icon: 'pencil', children: [
      { id: 3, title: 'Horas', url: '/ApontamentoHoras', icon: 'time', children: []},
      { id: 4, title: 'Despesas', url: '/ApontamentoDespesas', icon: 'wallet', children: [] },
      { id: 5, title: 'Produtos', url: '/ApontamentoProdutos', icon: 'file-tray-stacked', children: [] }
    ]},
    { id: 6, title: 'Ordem Servico', url: '/OrdemServico', icon: 'receipt', children: [] },
    { id: 7, title: 'Estoque', url: '/Estoque', icon: 'server', children: [] }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private network: Network,
    private controller: ControllService,
    private service: StorageService,
    private auth: AuthService,
    private menusService: MenuService
  ) {
    this.initializeApp();
    this.verificaConexao();
  };

  async ngOnInit() {
    if(await this.service.getUser().then((retorno) => retorno).catch(() => false) !== null){
      await this.service.getUser().then((retorno) => {
        this.usuario = retorno.nome;
        this.codigo = retorno.codigo;
      });
    };

    await this.service.getDarkMode().then(retorno => {
      this.menusService.toggleThemeDark(retorno);
    });
  };

  //LOAD
  async initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      setTimeout(() => {
        this.splashScreen.hide();
      }, 1000);
      this.auth.authState.subscribe(state => {
        if (state) {
          this.controller.navigateHome();
        } else {
          // this.controller.navigateLogin();
        }
      });
    });
  };

  //FUNCTION
  async verificaConexao() {
    this.network.onConnect().subscribe(() => {
      if(this.network.type === 'wifi'){
        this.controller.toastControllerBottom('Conectado!');
      };
    });

    this.network.onDisconnect().subscribe(() => {
        this.controller.toastControllerBottom('Desconectado!');
    });
  };
}
