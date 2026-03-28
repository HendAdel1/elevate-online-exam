import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthButton } from "../../../../shared/ui/auth-button/auth-button";

@Component({
  selector: 'app-email-form',
  imports: [AuthButton],
  templateUrl: './email-form.html',
  styleUrl: './email-form.css',
})
export class EmailForm implements AfterViewInit{


  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(private route: ActivatedRoute){}

  ngAfterViewInit(): void {
    const focus = this.route.snapshot.queryParamMap.get('focus');
    if(focus === 'email'){
              this.emailInput.nativeElement.focus();
    }
  }
}
