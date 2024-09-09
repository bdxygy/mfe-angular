import { loadRemoteModule } from '@angular-architects/module-federation';
import {
  Component,
  ComponentRef,
  OnInit,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(private vcr: ViewContainerRef) {}
  async ngOnInit(): Promise<void> {
    const profileDefault = await loadRemoteModule({
      type: 'module',
      remoteEntry: 'http://localhost:4300/entry.js',
      exposedModule: './ProfileComponent',
    });

    const componentRef: ComponentRef<any> = this.vcr.createComponent(
      profileDefault.ProfileComponent
    );

    console.log(componentRef.instance.title);
    componentRef.instance.title = 'Changed in Host';
    console.log(componentRef.instance.title);
  }
}
