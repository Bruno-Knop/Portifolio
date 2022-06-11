import { Directive, ElementRef, NgModule } from '@angular/core';

@Directive({
  selector: '[appScrollbarTheme]'
})
export class ScrollbarThemeDirective {
  constructor(el: ElementRef) {
    const stylesheet = `
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: #adb5bd5d;
      }
      ::-webkit-scrollbar-thumb {
        background-color: #f5831f88;
        border-radius: 20px;
        border: 3px black;
      }
      ::-webkit-scrollbar-thumb:hover {
      }
    `;

    const styleElmt = el.nativeElement.shadowRoot.querySelector('style');

    if (styleElmt) {
      styleElmt.append(stylesheet);
    } else {
      const barStyle = document.createElement('style');
      barStyle.append(stylesheet);
      el.nativeElement.shadowRoot.appendChild(barStyle);
    }

  }
}

@NgModule({
  declarations: [ ScrollbarThemeDirective ],
  exports: [ ScrollbarThemeDirective ]
})
export class ScrollbarThemeModule {}
