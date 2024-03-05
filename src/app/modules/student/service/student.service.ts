import { Injectable} from '@angular/core';
import {AuthService} from "../../auth/service/auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private authService: AuthService,
              private route: Router,
              private activatedRoute: ActivatedRoute) {

  }
}
