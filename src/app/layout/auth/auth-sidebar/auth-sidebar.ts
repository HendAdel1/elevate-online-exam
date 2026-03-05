import { LucideAngularModule, Brain, BookOpenCheck, RectangleEllipsis, FolderCode } from 'lucide-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'app-auth-sidebar',
  imports: [LucideAngularModule],
  templateUrl: './auth-sidebar.html',
  styleUrl: './auth-sidebar.css',
})
export class AuthSidebar {
      readonly FolderCode = FolderCode;
      readonly Brain = Brain;
      readonly BookOpenCheck = BookOpenCheck;
      readonly RectangleEllipsis = RectangleEllipsis;
}
