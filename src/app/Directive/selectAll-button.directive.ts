import { AfterViewInit, ContentChild, Directive, HostListener, NgModule, Renderer2 } from '@angular/core';
import { IonSelect } from '@ionic/angular';

@Directive({
    selector: '[appSelectAllDirective]'
})
export class SelectAllDirective implements AfterViewInit {
    @ContentChild(IonSelect) ionSelect: any;

    constructor(private renderer: Renderer2) { }

    ngAfterViewInit() {
        this.ionSelect.el.style.pointerEvents = 'none';
    };

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostListener('click', ['$event']) onClick() {
        this.ionSelect.open().then((alert: any) => {
            const id = 'selectAllCheckBox';
            alert.message = `
              <ion-checkbox id="${id}"></ion-checkbox>
              <ion-label class="m-l-15">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Marcar todos</ion-label>
            `;

            setTimeout(() => {
                const selectAll: any = alert.querySelector('#' + id);
                const checkboxes = Array.from(alert.querySelectorAll('.alert-checkbox'));
                const setState = () => {
                    const isAllChecked = checkboxes.every((c: any) => c.ariaChecked === 'true');
                    const isAllUnChecked = checkboxes.every((c: any) => c.ariaChecked === 'false');
                    if (isAllChecked || isAllUnChecked) {
                        selectAll.indeterminate = false;
                        selectAll.checked = isAllChecked;
                    } else {
                        selectAll.indeterminate = true;
                    }
                };
                setState();

                const checkboxListeners = checkboxes.map(ci => this.renderer.listen(ci, 'click', () => {
                    setTimeout(setState);
                }));

                const selectAllListener = this.renderer.listen(selectAll, 'click', (event) => {
                    setTimeout(() => alert.inputs = alert.inputs.map((i: any) => { i.checked = event.target.checked; return i; }));
                });
                alert.onWillDismiss().then(() => {
                    selectAllListener();
                    checkboxListeners.forEach(i => i());
                });
            });
        });
    };
}

@NgModule({
  declarations: [ SelectAllDirective ],
  exports: [ SelectAllDirective ]
})

export class SelectAllDirectiveModule {}
