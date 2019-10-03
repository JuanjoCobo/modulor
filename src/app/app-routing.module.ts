import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { ProjectIntComponent } from './components/projects/project-int/project-int.component';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'inicio', component: HomeComponent },
  { path: 'proyectos', component: ProjectListComponent },
  {
    path: 'proyectos-int',
    component: ProjectIntComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crear-proyecto',
    component: ProjectCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'editar-proyecto/:projectId',
    component: ProjectCreateComponent,
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
