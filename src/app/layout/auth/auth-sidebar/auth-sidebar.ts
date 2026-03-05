import { BookOpenCheck, Brain, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider, RectangleEllipsis} from 'lucide-angular';
import { Component } from '@angular/core';
import { Brand } from '../../../shared/components/brand/brand';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-sidebar',
  imports: [LucideAngularModule, Brand, CommonModule],
  templateUrl: './auth-sidebar.html',
  styleUrl: './auth-sidebar.css',
  providers:[{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({Brain, BookOpenCheck, RectangleEllipsis}),
  }]
})
export class AuthSidebar {

  features = [
    {
      icon: 'brain',
      title: 'Tailored Diplomas',
      text: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    },
    {
      icon: 'book-open-check',
      title: 'Focused Exams',
      text: 'Access topic-specific tests including HTML, CSS, JavaScript, and more.',
    },
    {
      icon: 'rectangle-ellipsis',
      title: 'Smart Multi-Step Forms',
      text: 'Choose from specialized tracks like Frontend, Backend, and Mobile Development.',
    }
  ]
}
