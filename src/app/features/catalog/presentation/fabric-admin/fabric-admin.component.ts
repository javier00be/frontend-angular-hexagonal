import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { ProgressSpinner } from 'primeng/progressspinner';
import { Message } from 'primeng/message';
import { Toast } from 'primeng/toast';
import { MessageService, ConfirmationService } from 'primeng/api';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { Tag } from 'primeng/tag';
import { Fabric } from '../../../../core/domain/fabric/fabric.model';
import { GetAllFabricsUseCase } from '../../../../core/application/fabric/get-all-fabrics.usecase';
import { UpdateFabricUseCase } from '../../../../core/application/fabric/update-fabric.usecase';
import { FabricStateService } from '../../../../shared/presentation/state/fabric-state.service';
import { FabricFormModalComponent } from '../fabric-form-modal/fabric-form-modal.component';

@Component({
    selector: 'app-fabric-admin',
    standalone: true,
    imports: [CommonModule, FormsModule, TableModule, Button, InputText, ProgressSpinner, Message, Toast, IconField, InputIcon, ConfirmDialog, Tag, FabricFormModalComponent],
    providers: [MessageService, ConfirmationService],
    templateUrl: './fabric-admin.component.html'
})
export class FabricAdminComponent implements OnInit {
    searchValue: string = '';
    showFabricModal: boolean = false;
    selectedFabric: Fabric | null = null;

    constructor(private getAllFabrics: GetAllFabricsUseCase, private updateFabric: UpdateFabricUseCase, public fabricState: FabricStateService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    async ngOnInit() {
        await this.loadFabrics();
    }

    async loadFabrics() {
        this.fabricState.setLoading(true);
        this.fabricState.setError(null);
        try {
            const fabrics = await this.getAllFabrics.execute();
            this.fabricState.setFabrics(fabrics);
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'No se pudieron cargar las telas';
            this.fabricState.setError(errorMsg);
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        } finally {
            this.fabricState.setLoading(false);
        }
    }

    addNewFabric() {
        this.selectedFabric = null;
        this.showFabricModal = true;
    }

    editFabric(fabric: Fabric) {
        this.selectedFabric = fabric;
        this.showFabricModal = true;
    }

    confirmDelete(fabric: Fabric) {
        this.confirmationService.confirm({
            message: `¿Está seguro de desactivar la tela "${fabric.nombre}"?`,
            header: 'Confirmar Desactivación',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Sí, desactivar',
            rejectLabel: 'Cancelar',
            accept: () => this.deleteFabricConfirmed(fabric)
        });
    }

    async deleteFabricConfirmed(fabric: Fabric) {
        try {
            // Borrado lógico: cambiar estado a 2 (INACTIVO)
            const updatedFabric = { ...fabric, estado: 2 };
            await this.updateFabric.execute(updatedFabric);

            // Actualizar el estado local
            this.fabricState.updateFabric(fabric.id!, updatedFabric);

            this.messageService.add({ severity: 'success', summary: 'Éxito', detail: `Tela "${fabric.nombre}" desactivada correctamente` });
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Error al desactivar la tela';
            this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMsg });
        }
    }

    async handleFabricSave(fabric: Fabric) {
        this.showFabricModal = false;
        this.selectedFabric = null;
        await this.loadFabrics();
    }

    handleFabricCancel() {
        this.showFabricModal = false;
        this.selectedFabric = null;
    }

    getStatusSeverity(estado?: number): 'success' | 'danger' {
        return estado === 1 ? 'success' : 'danger';
    }

    getStatusLabel(estado?: number): string {
        return estado === 1 ? 'ACTIVO' : 'INACTIVO';
    }
}
