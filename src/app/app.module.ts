import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HighlightDirective } from './directives/highlight.directive';
import { SortDirective } from './directives/sort.directive';

// * Angular Mats
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

// * Components
import { HeaderComponent } from './components/header/header.component';
import { PeopleComponent } from './components/people/people.component';
import { PersonFormComponent } from './components/person-form/person-form.component';

const routes = [
  { path: '', component: PeopleComponent },
  { path: 'add', component: PersonFormComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    PersonFormComponent,
    HighlightDirective,
    SortDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
