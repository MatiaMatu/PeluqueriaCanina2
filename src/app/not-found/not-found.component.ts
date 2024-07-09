import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    // Redireccionar al home después de 5 segundos
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 5000); // 5000 milisegundos = 5 segundos
  }

}