import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ProsemirrorComponent } from './prosemirror.component';


describe('ProsemirrorComponent', () => {
  let component: ProsemirrorComponent;
  let fixture: ComponentFixture<ProsemirrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProsemirrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProsemirrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
