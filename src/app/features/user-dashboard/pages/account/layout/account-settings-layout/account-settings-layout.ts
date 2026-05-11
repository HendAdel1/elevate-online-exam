import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AccountSettingsAside } from '../../../../components/account-settings-aside/account-settings-aside';

@Component({
  selector: 'app-account-settings-layout',
  imports: [RouterOutlet, AccountSettingsAside],
  templateUrl: './account-settings-layout.html',
  host: {
    class: 'flex min-h-0 h-full flex-1 flex-col',
  },
})
export class AccountSettingsLayout {}
