import { Inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem("token")
  const rou = Inject(Router)
  if(!token){
    rou.navigate(['/'])
    localStorage.clear()
    return false
  } 
  return true;
};
