import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Checkbox } from 'primeng/checkbox';
import { Slider } from 'primeng/slider';
import { Button } from 'primeng/button';
import { Divider } from 'primeng/divider';

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
  checked?: boolean;
}

export interface FilterConfig {
  categories?: FilterOption[];
  priceRange?: { min: number; max: number };
  sortOptions?: FilterOption[];
}

export interface FilterState {
  selectedCategories: string[];
  priceRange: [number, number];
  sortBy: string;
}

@Component({
  selector: 'app-filter-sidebar',
  standalone: true,
  imports: [CommonModule, FormsModule, Checkbox, Slider, Button, Divider],
  templateUrl: './filter-sidebar.html',
  styleUrl: './filter-sidebar.css',
})
export class FilterSidebar {
  @Input() config: FilterConfig = {};
  @Input() title: string = 'Filtros';
  @Output() filterChange = new EventEmitter<FilterState>();

  selectedCategories: string[] = [];
  priceRange: [number, number] = [0, 1000];
  sortBy: string = '';

  ngOnInit() {
    // Inicializar rango de precios desde config
    if (this.config.priceRange) {
      this.priceRange = [this.config.priceRange.min, this.config.priceRange.max];
    }
  }

  onCategoryChange(categoryValue: string, checked: boolean) {
    if (checked) {
      this.selectedCategories.push(categoryValue);
    } else {
      this.selectedCategories = this.selectedCategories.filter(c => c !== categoryValue);
    }
    this.emitFilterChange();
  }

  onPriceRangeChange() {
    this.emitFilterChange();
  }

  onSortChange(sortValue: string) {
    this.sortBy = sortValue;
    this.emitFilterChange();
  }

  clearFilters() {
    this.selectedCategories = [];
    this.sortBy = '';
    if (this.config.priceRange) {
      this.priceRange = [this.config.priceRange.min, this.config.priceRange.max];
    }
    this.emitFilterChange();
  }

  private emitFilterChange() {
    this.filterChange.emit({
      selectedCategories: this.selectedCategories,
      priceRange: this.priceRange,
      sortBy: this.sortBy
    });
  }

  isCategorySelected(value: string): boolean {
    return this.selectedCategories.includes(value);
  }
}
