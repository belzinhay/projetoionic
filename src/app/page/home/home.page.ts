import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Produtos } from 'src/app/model/produto.model';

import { AlertController, LoadingController } from '@ionic/angular';
import { BancoService } from 'src/app/banco.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage implements OnInit{
img='https://cdn.pixabay.com/photo/2016/11/19/20/55/apples-1841132_960_720.jpg';

  armario: Produtos[] = [];
    constructor(
    private http: HttpClient,

    private loadCtrl: LoadingController,
    //Alerta
    private alertCtrl: AlertController,

    private banco: BancoService,
) {}

  ngOnInit(){
    //this.http.get<Produtos[]>('http://localhost:3000/produtos').subscribe(caixa => this.armario = caixa);
    this.banco.getProdutos().subscribe(results => this.armario = results);
  }

  //Deletar 
  deletar(id: number){
  this.banco.delProdutos(id);
}
  //Método do Carregando (load)

 async carregando() {
  const load = this.loadCtrl.create({
    message: 'Aguarde...',
    duration: 2000
  });

  (await load).present();
 }

 //Metodo do Alertando
 async alertando(){
  const alert = this.alertCtrl.create({
    mode:'ios',
    header:'Cadastro de Produtos',
   
    inputs: [
      {
        name: 'item',
        type: 'text',
        placeholder: 'Produto',
      },
      {
        name: 'qtd',
        type: 'text',
        placeholder: 'Quantidade'
      },
    ],

    buttons:[
      {
        text: 'cancelar',
        role: 'cancel',
        handler: () => {
          console.log("Cancelado")
        }
      },

      {
        text: 'Cadastrar',
        handler: (form) => {
          let item = {
            produto: form.item,
            quant: form.qtd
          
          }
          
          this.banco.postProduto(item);

          //Atualizar a Pagina
          location.reload();
        }
      }
    ],
  });

  (await alert).present();
 }

 

}
