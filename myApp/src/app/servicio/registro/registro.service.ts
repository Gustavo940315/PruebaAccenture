import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { AppSettings } from '../../constantes';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const cUrlRegistro= 'https://testbankapi.firebaseio.com/clients.json';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  RegistroTO:{
  firstname: String;
  lastname: String;
  birthdate: Date;
  identification: Number;
  }  
  constructor(private http:HttpClient) { }

  servicioRegistro( firstnameUser: String, lastnameUser: String, birthdateUser: Date,
    identificationUser: Number){
    this.RegistroTO={firstname: firstnameUser, 
                lastname: lastnameUser,
                birthdate: birthdateUser,
                identification: identificationUser}; 
    console.log(cUrlRegistro);
    console.log(this.RegistroTO);
    return this.http.post<any>(cUrlRegistro,this.RegistroTO,httpOptions);
     }
  servicioObtenerPersona(){
    return this.http.get<any>(cUrlRegistro);
  }

  
}
