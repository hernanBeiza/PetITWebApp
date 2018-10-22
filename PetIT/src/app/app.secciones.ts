export const secciones: any = {
  admin:[
    { 
      nombre: "Inicio", link: "/admin/inicio", icono: "home", 
      titulo: "Inicio", bajada: "Desde aquí podrás revisar las estadísticas de tu clínica veterinaria",
      menu: true
    },
    { 
      nombre: "Generar Informe", link: "/admin/informe/generar", icono: "chart-bar", 
      titulo: "Reportes", bajada: "Genera tu reporte desde aquí",
      menu: true
    },
    { 
      nombre: "Cerrar Sesión", link: "/login", icono: "close",
      titulo: "Salir", bajada: "Cerrar sesión",
      menu: true
    }
  ],
  dueno:[
    { 
      nombre: "Inicio",link: "/dueno/inicio",icono: "home", 
      titulo: "Bienvenido al sistema Pet-IT", bajada: "Desde aquí podrás agendar horas para tu mascota",
      menu: true
    },
    { 
      nombre: "Consultar horas",link: "/dueno/horas/consultar",icono: "calendar-range", 
      titulo: "Consultar horas", bajada: "Desde aquí podrás agendar horas para tu mascota",
      menu: true
    },
    { 
      nombre: "Listar horas", link: "/dueno/horas/listar", icono: "calendar-range", 
      titulo: "Listar Horas", bajada: "Horas agendadas de tu mascota",
      menu: false
    },
    { 
      nombre: "Agendar horas", link: "/dueno/horas/agendar", icono: "calendar-range", 
      titulo: "Agendar Horas", bajada: "Agendar una hora para tu mascota",
      menu: false
    },
    { 
      nombre: "Modificar horas", link: "/dueno/horas/modificar", icono: "calendar-range", 
      titulo: "Modificar Horas", bajada: "Modificar la hora de tu mascota",
      menu: false
    },
    { 
      nombre: "Notificaciones",link: "/dueno/notificaciones/leer",icono: "send", 
      titulo: "Notificaciones", bajada: "Lee tus notificaciones",
      menu: true
    },
    { 
      nombre: "Cerrar Sesión",link: "/login",icono: "close",
      titulo: "Salir", bajada: "Cerrar sesión",
      menu: true
    },

  ],
  recepcionista:[
    { 
      nombre: "Inicio", link: "/recepcionista/inicio", icono: "home", 
      titulo: "Inicio", bajada: "Bienvenido al sistema Pet-IT. Desde aquí podrá gestionar su veterinaria",
      menu: true
    },
    { 
      nombre: "Gestionar dueños", link: "/recepcionista/duenos/consultar", icono: "account", 
      titulo: "Gestionar Dueños", bajada: "Gestiona los dueños",
      menu: true
    },
    { 
      nombre: "Agregar dueños", link: "/recepcionista/duenos/agregar", icono: "account", 
      titulo: "Agregar un Dueño", bajada: "Agrega un nuevo dueño",
      menu: false
    },
    { 
      nombre: "Modificar dueños", link: "/recepcionista/duenos/modificar", icono: "account", 
      titulo: "Modificar un Dueño", bajada: "Modifica los datos de un dueño",
      menu: false
    },
    { 
      nombre: "Cupos de atención", link: "/recepcionista/especialistas/bloques/consultar", icono: "clock", 
      titulo: "Cupos de Atención", bajada: "Desde aquí podrás realizar consultas de los horarios de los profesionales",
      menu: true
    },
    { 
      nombre: "Cupos de atención", link: "/recepcionista/especialistas/bloques/asignar", icono: "clock", 
      titulo: "Cupos de Atención", bajada: "Desde aqui podrás realizar la asignación de los horarios a los profesionales",
      menu: true
    },
    { 
      nombre: "Gestionar mascotas", link: "/recepcionista/mascotas/consultar", icono: "paw", 
      titulo: "Gestionar Mascotas", bajada: "Gestiona las mascotas",
      menu: true
    },
    { 
      nombre: "Registrar mascotas", link: "/recepcionista/mascotas/agregar", icono: "paw", 
      titulo: "Registrar una Mascota", bajada: "Registra una nueva mascota",
      menu: false
    },
    { 
      nombre: "Modificar mascotas", link: "/recepcionista/mascotas/modificar", icono: "paw", 
      titulo: "Modificar una Mascota", bajada: "Modifica los datos de una mascota",
      menu: false
    },
    { 
      nombre: "Consultar horas", link: "/recepcionista/horas/consultar", icono: "calendar-range", 
      titulo: "Consultar Horas", bajada: "Consulta horas",
      menu: true
    },
    { 
      nombre: "Listar horas", link: "/recepcionista/horas/listar", icono: "calendar-range", 
      titulo: "Listar Horas", bajada: "Horas agendadas de la mascota",
      menu: false
    },
    { 
      nombre: "Agendar horas", link: "/recepcionista/horas/agendar", icono: "calendar-range", 
      titulo: "Agendar Horas", bajada: "Agendar una hora para la mascota",
      menu: false
    },
    { 
      nombre: "Modificar horas", link: "/recepcionista/horas/modificar", icono: "calendar-range", 
      titulo: "Modificar Horas", bajada: "Modificar una hora para la mascota",
      menu: false
    },
    {
      nombre: "Notificaciones", link: "/recepcionista/notificaciones/enviar", icono: "send",
      titulo: "Notificaciones", bajada: "Envía notificaciones a los dueños de mascota",
      menu: true
    },
    {
      nombre: "Cerrar Sesión", link: "/login", icono: "close",
      titulo: "Salir", bajada: "Cerrar sesión",
      menu: true
    }
  ]
}
