import { Component, OnInit } from '@angular/core';
import {RegistroService} from '../servicio/registro/registro.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  
  firstname: String;
  lastname: String;
  birthdate: Date;
  identification: number;
  personas = []
  constructor(private alerta: AlertController, 
              private servicioRegistroUsuario: RegistroService,
              public alertController: AlertController) { }

  ngOnInit() {
    
  }

  registrarUsuario(){
    if(this.validarEdad()){
      this.servicioRegistroUsuario.servicioObtenerPersona()
    .subscribe(responseJS=>{
      let banderaPersona=false;
      this.personas = responseJS;

      for (let i in responseJS) {
       let valor= responseJS[i].identification 
        console.log(this.birthdate)
        //console.log(valor)
        if(valor==this.identification){
          this.presentAlert('La ' + this.identification + ' ya existe en la base de datos' );
          banderaPersona=false;
          break;
        }
        banderaPersona=true;
      }
      
      if(banderaPersona){
        this.servicioRegistroUsuario.servicioRegistro(this.firstname,
          this.lastname,
          this.birthdate,
          this.identification).subscribe(responseJS =>{
            console.log(responseJS.name);
          })
          this.presentAlert('Se registra correctamente en la base de datos');
      }
      
    });
    }else{
      this.presentAlert('La persona es menor de 18 año' );
    }
    
    }
  async presentAlert(mensaje) {
    const alert = await this.alertController.create({
                          header: 'Mensaje',
                          message: mensaje,
                          buttons: ['OK']
                          });                      
    await alert.present();
  }
  validarEdad():boolean{
    var hoy = new Date();
    var cumpleanos = new Date(this.birthdate);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    if(edad >= 18){
      return true;
    }else{
      return false;
    }
  }
}
