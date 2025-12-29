import { Injectable, signal } from '@angular/core';
import { Material } from '../../../core/domain/material/material.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialStateService {
  private _materials = signal<Material[]>([]);
  private _isLoading = signal<boolean>(false);
  private _error = signal<string | null>(null);

  //Getters Públicos (readonly)
  materials = this._materials.asReadonly();
  isLoading = this._isLoading.asReadonly();
  error = this._error.asReadonly();

  setMaterials(materials: Material[]) {
    this._materials.set(materials);
  }

  addMaterial(material: Material) {
    this._materials.update(materials => [...materials, material]);
  }

  updateMaterial(id: number, updatedMaterial: Material) {
    this._materials.update(materials =>
      materials.map(material => material.id === id ? updatedMaterial : material)
    );
  }

  deleteMaterial(id: number) {
    this._materials.update(materials => materials.filter(material => material.id !== id));
  }

  setLoading(loading: boolean) {
    this._isLoading.set(loading);
  }

  setError(error: string | null) {
    this._error.set(error);
  }
}
