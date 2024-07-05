import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicioss',
  templateUrl: './servicioss.page.html',
  styleUrls: ['./servicioss.page.scss'],
})
export class ServiciossPage implements OnInit {
  services = [
    {
      title: 'Corte De Pelo',
      description: 'El corte de pelo es un aspecto crucial del cuidado de tu mascota, ayudando a mantener su pelaje manejable, saludable y atractivo. Nuestro equipo de estilistas profesionales ofrece cortes de pelo personalizados y meticulosos, asegurando que tu mascota se vea y se sienta lo mejor posible.',
      image: '/assets/img/crote de peloo.png',
      price: 15000
    },
    {
      title: 'Corte de Uñas',
      description: 'El corte de uñas de perros es un servicio esencial para el bienestar y la salud de tu mascota. Nuestro equipo de profesionales capacitados ofrece un corte de uñas preciso y cuidadoso, asegurando que tu perro se sienta cómodo y seguro durante todo el proceso.',
      image: '/assets/img/corte de uÑña.jpg',
      price: 5000
    },
    {
      title: 'Baños Especiales',
      description: 'El baño de mascotas es un servicio fundamental para mantener a tu compañero peludo limpio, saludable y feliz. Nuestro equipo de expertos en cuidado animal proporciona un baño completo y detallado, asegurando que tu mascota reciba la mejor atención posible en un entorno seguro y cómodo.',
      image: '/assets/img/baño.avif',
      price: 10000
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
