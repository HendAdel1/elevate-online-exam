import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChevronDown, LUCIDE_ICONS, LucideAngularModule, LucideIconProvider } from 'lucide-angular';

@Component({
  selector: 'app-diplomas',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './diplomas.html',
  styleUrl: './diplomas.css',
  providers:[{
    provide: LUCIDE_ICONS,
    multi: true,
    useValue: new LucideIconProvider({ChevronDown}),
  }]
})
export class Diplomas {
  diplomas = [
    {
      id: '1',
      title: 'Flutter Development',
      description: 'Discover Flutter, the game-changing framework that lets...',
      image: 'images/flutter.png'
    },
    {
      id: '2',
      title: 'AI & ML Development',
      description: 'Explore the foundations and frontiers of Artificial Intelligence – from machine learning and neural networks to natural language processing and computer vision. Gain practical insight into how AI systems are built, trained, and deployed across industries, and understand the ethical implications shaping the future of intelligent technology.',
      image: 'images/flutter.png'
    },
    {
      id: '3',
      title: 'Back-End Web Development',
      description: 'Become a professional Backend Developer.',
      image: 'images/flutter.png'
    },
    {
      id: '4',
      title: 'Data Analysis',
      description: 'Master the art of data analysis...',
      image: 'images/flutter.png'
    },
    {
      id: '5',
      title: 'Software Testing',
      description: 'Ensure software quality...',
      image: 'images/flutter.png'
    },
    {
      id: '6',
      title: 'Cyber Security',
      description: 'Protect systems and networks...',
      image: 'images/flutter.png'
    }
  ];
}
