import { Injectable, signal } from '@angular/core';
import { Fabric } from '../../../core/domain/fabric/fabric.model';

/**
 * Servicio de estado para Telas usando Signals
 */
@Injectable({
    providedIn: 'root'
})
export class FabricStateService {
    private _fabrics = signal<Fabric[]>([]);
    private _isLoading = signal<boolean>(false);
    private _error = signal<string | null>(null);

    // Getters públicos (readonly)
    fabrics = this._fabrics.asReadonly();
    isLoading = this._isLoading.asReadonly();
    error = this._error.asReadonly();

    setFabrics(fabrics: Fabric[]) {
        this._fabrics.set(fabrics);
    }

    addFabric(fabric: Fabric) {
        this._fabrics.update(fabrics => [...fabrics, fabric]);
    }

    updateFabric(id: number, updatedFabric: Fabric) {
        this._fabrics.update(fabrics =>
            fabrics.map(f => f.id === id ? updatedFabric : f)
        );
    }

    deleteFabric(id: number) {
        this._fabrics.update(fabrics => fabrics.filter(f => f.id !== id));
    }

    setLoading(loading: boolean) {
        this._isLoading.set(loading);
    }

    setError(error: string | null) {
        this._error.set(error);
    }
}
