// LAS RUTAS DEBEN DE IR COMO HIJAS PARA QUE SE APLIQUE EL LAYOUT
// si las rutas no van dentro de children se interpretan como paginas independientes
// y no pone el titulo, o el pie de pagina o el menu a la izquierda
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name:"home", component: () => import('pages/Index.vue') },
      {
        path: '/auth',
        component: () => import('pages/PageAuth.vue')
      },
      {
        path: '/plantilla',
        component: () => import('pages/Plantilla.vue')
      },
      {
        path: '/galeria',
        component: () => import('src/pages/testGaleria.vue')
      }
    ]
    },
    {
      path: "/paciente",
      component: ()=> import('layouts/PacienteLayout.vue'),
      children: [
        {
          path: 'informacion-personal',
          component: () => import('./../pages/ExpedientePaciente/InformacionPersonal.vue')
        },
        {
          path: 'antecedentes',
          component: () => import('./../pages/ExpedientePaciente/Antecedentes.vue')

        },
        {
          path: 'recetas',
          component: () => import('./../pages/ExpedientePaciente/Recetas.vue')
          
        }

      ]
    },

    {
      path: '/pasar-consulta',
    component: () => import('pages/PasarConsulta/PasarConsultaView.vue')
    },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
