/* tslint:disable:no-unused-variable */

import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

describe('Component: User', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserComponent]
    });
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should use the user name from the service', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    // Inject our UserService
    const userService = fixture.debugElement.injector.get(UserService);
    // trigger change detection in the component
    fixture.detectChanges();
    expect(userService.user.name).toEqual(app.user.name);
  });

  it('should display the user name if user is logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    app.isLoggedIn = true;
    // trigger change detection in the component
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).toContain(app.user.name);
  });

  it('shouldn\'t display the user name if user is not logged in', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    // trigger change detection in the component
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('p').textContent).not.toContain(app.user.name);
  });

  it('shouldn\'t fetch data successfully if not called asynchronously', () => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    const dataService = fixture.debugElement.injector.get(DataService);
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    // trigger change detection in the component
    fixture.detectChanges();
    expect(app.data).toBe(undefined);
  });

  it('should fetch data successfully if called asynchronously', async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    // Inject our Data Service
    const dataService = fixture.debugElement.injector.get(DataService);
    // spy watches the data service for the method call getDetails
    // When the data service.getDetails is called, send back our dummy Data 'Data'
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    // trigger change detection in the component
    fixture.detectChanges();
    // fixture.whenStable() wait until ansychronous calls are complete
    fixture.whenStable().then(() => {
      expect(app.data).toBe('Data');
    });
  }));

  it('should fetch data successfully if called asynchronously', fakeAsync(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    // Inject our Data Service
    const dataService = fixture.debugElement.injector.get(DataService);
    // spy watches the data service for the method call getDetails
    // When the data service.getDetails is called, send back our dummy Data 'Data'
    const spy = spyOn(dataService, 'getDetails')
      .and.returnValue(Promise.resolve('Data'));
    // trigger change detection in the component
    fixture.detectChanges();
    // wait until ansychronous calls are complete, using fakeAsync
    tick();
    expect(app.data).toBe('Data');

  }));
});
