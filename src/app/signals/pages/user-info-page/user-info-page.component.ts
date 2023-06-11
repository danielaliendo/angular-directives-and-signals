import { User } from './../../interfaces/user-request.interface';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { UsersServiceService } from '../../services/users-service.service';

@Component({
  selector: 'signals-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})

export class UserInfoPageComponent implements OnInit {

  private usersService = inject(UsersServiceService);

  public userId = signal(1);

  public currentUser = signal<undefined | User>(undefined);

  public userWasFound = signal(true);

  public fullName = computed(() => {
    const user = this.currentUser();
    if (!user) return '';
    return `${user.first_name} ${user.last_name}`;
  })

  ngOnInit(): void {
    this.loadUser(this.userId());
    // throw new Error('Method not implemented.');
  }

  public loadUser(id: number): void {
    if (id <= 0) return

    this.userId.set(id);
    this.currentUser.set(undefined);

    this.usersService.getUserById(id)
      .subscribe({
        next: (user) => {
          this.currentUser.set(user);
          this.userWasFound.set(true);
        },
        error: () => {
          this.userWasFound.set(false);
          this.currentUser.set(undefined);
        }
      })
  }

}
