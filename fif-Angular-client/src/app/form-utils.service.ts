import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  public validate(formField: string, fieldValue:string){
          switch(formField){
            case "username":
              if (fieldValue.length < 5){
                return "Username Must Be More Than 5 Characters";
              }
              return "";
            case "email":
              if (fieldValue.indexOf("@") === -1){
                return "Please Enter a Valid Email";
              }
              return "";
            case "password":
              if(fieldValue.length < 5){
                return "Password Must Be More Than 5 Characters"
              }
              return "";
            default:
              return "";
          }
    };
}
