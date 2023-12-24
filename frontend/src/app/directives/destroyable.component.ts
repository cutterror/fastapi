import { Subject } from 'rxjs';
import { Directive, OnDestroy } from '@angular/core';

// родительский класс для отписок при уничтожении компоненты
@Directive()
export abstract class DestroyableComponent implements OnDestroy {
    protected destroy$: Subject<void> = new Subject<void>();

    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
