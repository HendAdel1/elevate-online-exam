import { AfterViewInit, Directive, ElementRef, HostListener, OnDestroy, inject, signal } from '@angular/core';

@Directive({
  selector: '[appOverflow]',
  exportAs: 'appOverflow',
})
export class OverflowDirective implements AfterViewInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly isOverflowing = signal(false);

  private observer?: ResizeObserver;

  ngAfterViewInit(): void {
    this.check();
    this.observer = new ResizeObserver(() => this.check());
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.check();
  }

  private check(): void {
    const e = this.el.nativeElement;
    this.isOverflowing.set(
      e.scrollHeight > e.clientHeight + 1 || e.scrollWidth > e.clientWidth + 1
    );
  }
}
