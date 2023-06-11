import { Component, OnDestroy, OnInit, effect, signal } from '@angular/core';
import { User } from '../../interfaces/user-request.interface';

@Component({
  selector: 'signals-properties-page',
  templateUrl: './properties-page.component.html',
  styleUrls: ['./properties-page.component.css']
})

export class PropertiesPageComponent implements OnInit, OnDestroy {

  public user = signal<User>({
    avatar: "https://reqres.in/img/faces/1-image.jpg",
    email: "george.bluth@reqres.in",
    first_name: "George",
    id: 1,
    last_name: "Bluth"
  });

  public counter = signal(0);

  public userChangedEffect = effect(() => {
    console.log(this.user().first_name + ' ' + this.counter());
  })

  public onFieldUpdated(field: keyof User, value: string): void {

      this.user.update(current => ({
        ...current,
        [field]: value
      }))

    // this.user.mutate(current => {
    //   switch (field) {
    //       case 'email':
    //         current.email = value;
    //       break;
    //       case 'first_name':
    //         current.first_name = value;
    //       break;
    //       case 'last_name':
    //         current.last_name = value;
    //       break;
    //       case 'id':
    //         current.id = Number(value);
    //       break;
    //   }
    // })

    // this.user.set({ ...this.user(), [field]: value });
  }

  public increaseBy = (value: number) => {
    this.counter.update(current => current + value);
  }

  ngOnInit(): void {
    // setInterval(() => {
    //   this.increaseBy(+1);
    // }, 1000)
  }

  ngOnDestroy(): void {
    // this.userChangedEffect.destroy();
  }

}
