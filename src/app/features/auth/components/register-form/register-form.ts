import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthButton } from '../../../../shared/ui/auth-button/auth-button';
import { Eye, EyeOff, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-form',
  imports: [AuthButton, LucideAngularModule],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
  providers: [{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ EyeOff, Eye }),
  }]
})
export class RegisterForm implements AfterViewInit {

  @ViewChild('emailInput') emailInput!: ElementRef;

  constructor(private route: ActivatedRoute){}

  ngAfterViewInit(): void {
    const focus = this.route.snapshot.queryParamMap.get('focus');
    if(focus === 'email'){
              this.emailInput.nativeElement.focus();
    }
  }

}
