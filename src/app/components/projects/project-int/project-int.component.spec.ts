import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectIntComponent } from './project-int.component';

describe('ProjectIntComponent', () => {
  let component: ProjectIntComponent;
  let fixture: ComponentFixture<ProjectIntComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectIntComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectIntComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
