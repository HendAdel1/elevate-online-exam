import { Component } from '@angular/core';
import { FolderCode, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-brand',
  imports: [LucideAngularModule],
  templateUrl: './brand.html',
  styleUrl: './brand.css',
  providers:[{
      provide: LUCIDE_ICONS,
      multi: true,
      useValue: new LucideIconProvider({FolderCode}),
    }]
})
export class Brand {

}
