import { Routes } from '@angular/router';
import { OnInit } from '@angular/core';

export const routes: Routes = [];

//ngOnInit(): void { // for toggling between day and night background colors
    const hour = new Date().getHours();
    const isNight = hour < 6 || hour >= 18;
    document.body.classList.toggle('dark-mode', isNight);
  //}
