import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  loading: boolean = false;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToList() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.router.navigateByUrl('books/list')
    }, 1500);
  }

}
