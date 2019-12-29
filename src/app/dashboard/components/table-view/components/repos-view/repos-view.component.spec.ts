import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReposViewComponent } from './repos-view.component';

describe('ReposViewComponent', () => {
  let component: ReposViewComponent;
  let fixture: ComponentFixture<ReposViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReposViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReposViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
