import { Component } from '@angular/core';
import { AuthSubTitle } from "../../../../../../shared/ui/auth-sub-title/auth-sub-title";
import { UserInfoForm } from "../../../../components/user-info-form/user-info-form";

@Component({
  selector: 'app-user-info',
  imports: [AuthSubTitle, UserInfoForm],
  templateUrl: './user-info.html',
  styleUrl: './user-info.css',
})
export class UserInfo {

}
