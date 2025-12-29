import { Component, OnInit } from '@angular/core';
import { Material } from '../../../../../core/domain/material/material.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { Message } from 'primeng/message';
import { ProgressSpinner } from 'primeng/progressspinner';
import { MaterialFormModalComponent } from '../material-form-modal/material-form-modal.component';
import { Toast } from 'primeng/toast';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { MessageService, ConfirmationService } from 'primeng/api';
import { UpdateMaterialUseCase } from '../../../../../core/application/material/update-material.usecase';
import { GetAllMaterialsUseCase } from '../../../../../core/application/material/get-all-material.usecase';
import { MaterialStateService } from '../../../../../shared/presentation/state/material-state.service';

@Component({
  selector: 'app-material-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, Button, InputText,
    ProgressSpinner, Message, Toast, IconField, InputIcon, ConfirmDialog, Tag, MaterialFormModalComponent],
  providers: [MessageService, ConfirmationService],
  templateUrl: './material-admin.component.html',
  styleUrl: './material-admin.component.css',
})
export class MaterialAdminComponent implements OnInit {
  searchValue: string = '';
  showMaterialModal: boolean = false;
  selectedMaterial: Material | null = null;

  constructor(
    private getAllMaterials: GetAllMaterialsUseCase,
    private updateMaterial: UpdateMaterialUseCase,
    public materialState: MaterialStateService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  async ngOnInit() {
    await this.loadMaterials();
  }

  async loadMaterials() {
    this.materialState.setLoading(true);
    this.materialState.setError(null);
    try {
      const materials = await this.getAllMaterials.execute();
      this.materialState.setMaterials(materials);
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'No se pudieron cargar los materiales';
      this.materialState.setError(errorMsg);
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
    } finally {
      this.materialState.setLoading(false);
    }
  }

  addNewMaterial() {
    this.selectedMaterial = null;
    this.showMaterialModal = true;
  }

  editMaterial(material: Material) {
    this.selectedMaterial = material;
    this.showMaterialModal = true;
  }

  confirmDelete(material: Material) {
    this.confirmationService.confirm({
      message: `¿Está seguro de desactivar el material "${material.nombre}"?`,
      header: 'Confirmar Desactivación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, desactivar',
      rejectLabel: 'Cancelar',
      accept: () => this.deleteMaterialConfirmed(material)
    });
  }

  async deleteMaterialConfirmed(material: Material) {
    try {
      // Borrado lógico: cambiar estado a 2 (INACTIVO)
      const updatedMaterial = { ...material, estado: 2 };
      await this.updateMaterial.execute(updatedMaterial);

      // Actualizar el estado local
      this.materialState.updateMaterial(material.id!, updatedMaterial);

      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Material "${material.nombre}" desactivado correctamente` });
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Error al desactivar el material';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
    }
  }

  async handleMaterialSave(material: Material) {
    this.showMaterialModal = false;
    this.selectedMaterial = null;
    await this.loadMaterials();
  }

  handleMaterialCancel() {
    this.showMaterialModal = false;
    this.selectedMaterial = null;
  }

  getStatusSeverity(estado?: number): 'success' | 'danger' {
    return estado === 1 ? 'success' : 'danger';
  }

  getStatusLabel(estado?: number): string {
    return estado === 1 ? 'ACTIVO' : 'INACTIVO';
  }

}
