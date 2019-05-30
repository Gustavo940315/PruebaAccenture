import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-prestamo',
  templateUrl: './prestamo.page.html',
  styleUrls: ['./prestamo.page.scss'],
})
export class PrestamoPage implements OnInit {

  nit:number;
  salario:number;
  fechaLaboral:Date;
  nombreEmpresa:String;
  constructor(public alertController: AlertController) { }

  ngOnInit() {
  }
  validarCredito(){
    if(this.validarFechaIngreso()){
      if(this.salario >0  && this.salario <=100000000  ){
        if(this.salario>=800000 ){
          if(this.validarDias()){
            if(this.salario>=800000 && this.salario<=1000000){
              this.presentAlert("Se da una aprobacion de 5000000")
            }else if(this.salario>1000000 && this.salario<4000000){
              this.presentAlert("Se da una aprobacion de 20000000")
            }else{
              this.presentAlert("Se da una aprobacion de 50000000")
            }
          }
        }else{
          this.presentAlert("Salario no cumple para prestamo")
        }
      }else{
        this.presentAlert("el salario debe estar entre 1 a 100000000")
      }
    }else{
      this.presentAlert("fecha Incorrecta")
    }
  }
  //validar que la fecha ingresada no sea mayor a la actual
  validarFechaIngreso():boolean{
    var hoy = new Date();
    var ingrLaboral = new Date(this.fechaLaboral);
    console.log(hoy + "-" + ingrLaboral)
    if(ingrLaboral  <=hoy ){
      return true;
    }else{
      return false;
    }
  }
  validarDias():boolean{
    var hoy = new Date();//hoy
    var ingreso = new Date(this.fechaLaboral);//fecha ingreso 
    var diasDif = hoy.getTime() - ingreso.getTime();
    var dias = Math.round(diasDif/(1000 * 60 * 60 * 24));
    if(dias>=365){
      return true;
    }else{
      this.presentAlert("No tiene un año en la compañia , prestamo rechazado los dias trabajados son" + dias)
      return false;
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
}
