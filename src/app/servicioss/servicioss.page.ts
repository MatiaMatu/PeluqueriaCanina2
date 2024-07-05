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
    },
    {
      title: 'Vacunas',
      description: 'Protege la salud de tu mascota con nuestro servicio de vacunación. Nuestros veterinarios expertos administran vacunas específicas para prevenir enfermedades comunes, asegurando que tu compañero peludo esté protegido y saludable en todo momento.',
      image: '/assets/img/5fa52ef8267ad.jpeg',
      price: 15000
    },
    {
      title: 'Desparacitacion',
      description: 'Mantén a tu mascota libre de parásitos con nuestra desparasitación especializada. Utilizamos productos seguros y efectivos para eliminar garrapatas, pulgas y otros parásitos internos y externos, garantizando el bienestar y confort de tu amigo peludo.',
      image: '/assets/img/unnamed.jpg',
      price: 8000
    },
    {
      title: 'Limpieza Dental y Oidos',
      description: 'Cuida la salud bucal y auditiva de tu mascota con nuestra limpieza dental y de oídos. Nuestro equipo realiza procedimientos meticulosos para eliminar el sarro, prevenir enfermedades bucodentales y mantener los oídos libres de acumulaciones, promoviendo la salud general de tu compañero.',
      image: '/assets/img/Cómo-limpiar-las-orejas-a-un-perro.jpeg',
      price: 9000
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
