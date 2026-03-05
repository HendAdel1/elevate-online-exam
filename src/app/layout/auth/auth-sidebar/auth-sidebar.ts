import { BookOpenCheck, Brain, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, RectangleEllipsis} from 'lucide-angular';
import { Component } from '@angular/core';
import { Brand } from '../../../shared/components/brand/brand';

@Component({
  selector: 'app-auth-sidebar',
  imports: [LucideAngularModule, Brand],
  templateUrl: './auth-sidebar.html',
  styleUrl: './auth-sidebar.css',
  providers:[{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({Brain, BookOpenCheck, RectangleEllipsis}),
  }]
})
export class AuthSidebar {

}
