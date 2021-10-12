// LAS RUTAS DEBEN DE IR COMO HIJAS PARA QUE SE APLIQUE EL LAYOUT
// si las rutas no van dentro de children se interpretan como paginas independientes
// y no pone el titulo, o el pie de pagina o el menu a la izquierda
const routes = [
  {
    path: "/",
    //Name: "Pacientes",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "Pacientes",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/clinicas",
        name: "Clinicas",
        component: () => import("components/Clinicas/Clinicas.vue")
      },
      {
        path: "/clinica/nueva",
        name: "Nueva Clinica",
        component: () => import("components/Clinicas/AgregarEditarClinica.vue")
      },
      {
        path: "/clinica/editar/:id",
        name: "Editar Clinica",
        component: () => import("components/Clinicas/AgregarEditarClinica.vue")
      },
      {
        path: "/plantilla",
        component: () => import("pages/Plantilla.vue")
      },
      {
        path: "/galeria",
        component: () => import("src/pages/testGaleria.vue")
      },
      {
        path: "/galeria/component",
        component: () => import("src/pages/testGaleriaComponent.vue")
      },
      {
        path: "/template",
        name: "Template de facturas",
        component: () => import("src/pages/Configuraciones/template.vue")
      },
      {
        path: "/sitioweb",
        component: () => import("pages/SitioWeb.vue")
      }
    ]
  },
  {
    path: "/paciente",
    component: () => import("layouts/PacienteLayout.vue"),
    children: [
      {
        path: ":id",
        component: () => import("./../pages/ExpedientePaciente/Expediente.vue")
      }
    ]
  },
  {
    path: "/pasar-consulta/:id",
    component: () => import("./../pages/PasarConsulta/PasarConsultaView.vue")
  },
  {
    path: "/editar-consulta/:id",
    component: () => import("../pages/PasarConsulta/EditarConsultaView.vue")
  },
  {
    path: "/auth",
    component: () => import("layouts/Login.vue"),
    children: [
      {
        path: "",
        name: "Login",
        component: () => import("pages/PageAuth.vue")
      }
    ]
  },
  {
    path: "/registrar",
    component: () => import("layouts/Login.vue"),
    children: [
      {
        path: "",
        name: "Registrar",
        component: () => import("pages/Registrar.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
