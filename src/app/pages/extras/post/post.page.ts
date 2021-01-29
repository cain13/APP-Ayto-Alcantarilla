import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../services/usuario.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {

  user = {
    name: 'João Firmino',
    profileImage: 'assets/img/avatar.jpeg',
    coverImage: 'assets/img/webapp-bg.jpg',
    occupation: 'Designer',
    location: 'Seattle, WA',
    description: 'A wise man once said: The more you do something, the better you will become at it.',
    followers: 456,
    following: 1052,
    posts: 35
  };

  posts = [{
    postImageUrl: 'assets/img/webapp-bg.jpg',
    title: 'Lorem Ipsum Donor',
    text: 'I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles.',
    date: 'November 5, 2016',
    likes: 12,
    comments: 4,
    timestamp: '11h ago'
  },{
    postImageUrl: 'assets/img/webapp-bg.jpg',
    title: 'Lorem Ipsum Donor',
    text: 'I believe in being strong when everything seems to be going wrong. I believe that happy girls are the prettiest girls. I believe that tomorrow is another day and I believe in miracles.',
    date: 'November 5, 2016',
    likes: 12,
    comments: 4,
    timestamp: '11h ago'
  }];

  /* usuario: UsuarioLoginApi;
  header = new HttpHeaders().set('Content-Type', 'application/json');
  postAPI: RespuestaAPIPost[];
 */
  constructor(private usuarioService: UsuarioService,
              private http: HttpClient) { }

  async ngOnInit() {
    /* await this.usuarioService.present('Cargando anuncios...');

    this.usuario = this.usuarioService.getUsuario(); */

/*   const usuarioPost: UsuarioPost = {

      tipoUsuario: this.usuario.Tipo

    };

    await this.obtenerPost(usuarioPost).then(resp => {

      console.log(resp);
      this.postAPI = resp;
      console.log(resp);


    }).catch( error => {

      console.log('ERROR CONEXION: ', error);

    });

    this.usuarioService.dismiss(); */

  }

  /* async obtenerPost(usuarioPost: UsuarioPost): Promise <RespuestaAPIPost[]> {
    // tslint:disable-next-line: no-shadowed-variable
    const URL = 'https://mpecronos.com/api/Fichar/Fichar';


    const respuesta = await  this.http.post<RespuestaAPIPost[]>(URL, usuarioPost, {headers: this.header}).toPromise();

    return respuesta;


  } */


}
