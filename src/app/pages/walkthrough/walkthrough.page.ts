import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, IonSlides, MenuController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';
import { DatabaseService } from '../../services/database.service';
import { UsuarioLoginApi } from 'src/app/interfaces/usuario-interfaces';

@Component({
  selector: 'app-walkthrough',
  templateUrl: './walkthrough.page.html',
  styleUrls: ['./walkthrough.page.scss'],
})

export class WalkthroughPage implements OnInit {
  @ViewChild('mySlider') slider: IonSlides;
  
  showSkip = true;
  slideOpts = {
    effect: 'flip',
    speed: 1000
  };
  dir: String = 'ltr';
  contadorVistas = 0;

  
  usuario: UsuarioLoginApi;

  slideList: Array<any> = [
    /* {
      title: '¿Quienes  <strong><span class="text-danger">SOMOS</span></strong>?',
      description: 'GRUPO MPE nace en 1996 como Servicio de Prevención de Riesgos Laborales, cuyo objetivo es velar por la seguridad y salud de los trabajadores.',
      image: 'assets/img/house01.png',
      login: false,
    },
    {
      title: ' <strong>¿A que nos dedicamos?</strong>',
      description: 'MPE tiene su mayor actividad como servicio de prevención de riesgos laborales, así como formación a empresas y particulares en todas sus modalidades, consultoría sistemas de gestión de calidad y otros muchos productos enfocados a su empresa.',
      image: 'assets/img/business01.png',
      login: false,
    }, */
    {
      title: '<strong>Ayuntamiento de Alcantarilla</strong>',
      description: 'Aplicación de Gestión Interna',
      image: 'assets/img/ionProperty-ico.png',
      login: true,
    }
  ];

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public router: Router,
    private usuarioService: UsuarioService,
    private databaseService: DatabaseService,
 
  ) {
    this.menuCtrl.enable(false);
  }

  ionViewWillEnter() {
  }

  async ngOnInit() {
    await this.usuarioService.dismiss();
    this.databaseService.estadoBD().then( async () => {

      console.log('BLANCO: Comprobamos si hay ultimo usuario...');
      await this.databaseService.obtenerUltimoUsuario().then( ultimoUsuario => {

        if (ultimoUsuario === null) {
          console.log('No hay usuarios en la BD');
          this.navCtrl.navigateRoot('/walkthrough');

        } else {

          this.usuario = {
            UserName: ultimoUsuario.UserName,
            Password: ultimoUsuario.Password,
            IdEmpleado: ultimoUsuario.IdEmpleado,
            NombreCompleto: ultimoUsuario.NombreCompleto,
            HorasSemanales: ultimoUsuario.HorasSemanales,
            Telefono: ultimoUsuario.Telefono,
            Email: ultimoUsuario.Email,
            TomarLocalizacion: ultimoUsuario.TomarLocalizacion,
          };

          this.usuarioService.guardarUsuario(this.usuario);

          console.log('BLANCO: Si hay usuario en BD: ', this.usuario);
          this.navCtrl.navigateRoot('/tareas-inicio');
        }
      });
    });
  }
  
  /*
  slideChanged(){
    this.slides.getActiveIndex().then((val) =>{
      console.log("changed_slide Event: ",val);
   });
    console.log("changed_slide Event: ");
    console.log(this.slides.getActiveIndex());
  }
*/
  onSlideChanged(e) {
    this.slider.getActiveIndex().then((val) =>{
      console.log("changed_slide Event: ",val);
   });
    console.log('On slide change event', e);
  }

  onSlideChangeStart(event) {
    /** isEnd true when slides reach at end slide */
    event.target.isEnd().then(isEnd => {
      console.log('End of slide', isEnd);
      console.log('End of slide event', event);
    });
  }

  onSlideNext() {
    this.contadorVistas++;
    if (this.contadorVistas === 3) {

      this.openLoginPage();

    }
    this.slider.slideNext(1000, false);
  }

  onSlidePrev() {
    console.log("changed_slide Event: ");
    console.log(this.slider.getActiveIndex());
    this.contadorVistas--;
    this.slider.slidePrev(300);
  }

   onLastSlide() {
     //this.slides.slideTo(3, 300)
     this.openLoginPage();
   }

  openHomeLocation() {
    this.navCtrl.navigateForward('/home-location');
    // this.router.navigateByUrl('/tabs/(home:home)');
  }

  openLoginPage() {
    this.navCtrl.navigateForward('/login');
  }

}