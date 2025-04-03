import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsletterAndBlogComponent } from './newsletter-and-blog.component';

describe('NewsletterAndBlogComponent', () => {
  let component: NewsletterAndBlogComponent;
  let fixture: ComponentFixture<NewsletterAndBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsletterAndBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewsletterAndBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
