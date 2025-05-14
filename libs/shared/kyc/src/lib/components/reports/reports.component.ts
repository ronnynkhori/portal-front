import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SnackbarService } from '../../services/snackbar.service';
import { DatePipe } from '@angular/common';
import * as feather from 'feather-icons';
import { FooterComponent } from '@btc/shared/layout';
import { Router } from '@angular/router';

interface AgentProgress {
  id: string;
  name: string;
  totalRegistrations: number;
  completedRegistrations: number;
  successRate: number;
  pendingApprovals: number;
}

interface ReportType {
  value: string;
  label: string;
  isAdminOnly?: boolean;
  icon?: string;
}

interface DatePreset {
  label: string;
  icon: string;
  startDate: Date;
  endDate: Date;
}

interface ExportHistory {
  id: string;
  type: string;
  format: string;
  date: Date;
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    DatePipe,
    FooterComponent
  ],
  providers: [DatePipe],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {
  reportForm!: FormGroup;
  isGenerating = false;
  isLoading = false;
  isAdmin = true; // This should come from your auth service
  agentProgress: AgentProgress[] = [];
  showPreview = false;
  showAdvancedFilters = false;
  recentExports: ExportHistory[] = [];

  datePresets: DatePreset[] = [
    {
      label: 'Today',
      icon: 'today',
      startDate: new Date(),
      endDate: new Date()
    },
    {
      label: 'Last 7 Days',
      icon: 'date_range',
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date()
    },
    {
      label: 'Last 30 Days',
      icon: 'calendar_month',
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date()
    },
    {
      label: 'This Month',
      icon: 'event_note',
      startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      endDate: new Date()
    }
  ];

  reportTypes: ReportType[] = [
    { value: 'daily', label: 'Daily Report', icon: 'today' },
    { value: 'weekly', label: 'Weekly Report', icon: 'calendar' },
    { value: 'monthly', label: 'Monthly Report', icon: 'event_note' },
    { value: 'custom', label: 'Custom Period', icon: 'date_range' },
    { value: 'agent-performance', label: 'Agent Performance Report', isAdminOnly: true, icon: 'assessment' },
    { value: 'system-usage', label: 'System Usage Report', isAdminOnly: true, icon: 'analytics' },
    { value: 'compliance', label: 'Compliance Report', isAdminOnly: true, icon: 'verified_user' }
  ];

  constructor(
    private fb: FormBuilder,
    private snackbarService: SnackbarService,
    private datePipe: DatePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadAgentProgress();
    this.loadExportHistory();
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }

  ngAfterViewInit() {
    try {
      feather.replace();
    } catch (error) {
      console.error('Error initializing feather icons:', error);
    }
  }

  private initializeForm(): void {
    this.reportForm = this.fb.group({
      reportType: ['daily', Validators.required],
      startDate: [null],
      endDate: [null],
      reportFormat: ['pdf', Validators.required],
      includeDetails: [true],
      agentId: [null],
      status: [[]],
      customField1: [''],
      customField2: [''],
      scheduleReport: [false],
      scheduleFrequency: ['daily'],
      deliveryMethod: [['email']]
    });

    // Add conditional validation for custom date range
    this.reportForm.get('reportType')?.valueChanges.subscribe(type => {
      const startDateControl = this.reportForm.get('startDate');
      const endDateControl = this.reportForm.get('endDate');
      const agentIdControl = this.reportForm.get('agentId');

      if (type === 'custom') {
        startDateControl?.setValidators([Validators.required]);
        endDateControl?.setValidators([Validators.required]);
      } else {
        startDateControl?.clearValidators();
        endDateControl?.clearValidators();
      }

      if (type === 'agent-performance') {
        agentIdControl?.setValidators([Validators.required]);
      } else {
        agentIdControl?.clearValidators();
      }

      startDateControl?.updateValueAndValidity();
      endDateControl?.updateValueAndValidity();
      agentIdControl?.updateValueAndValidity();
    });
  }

  applyDatePreset(preset: DatePreset): void {
    this.reportForm.patchValue({
      startDate: preset.startDate,
      endDate: preset.endDate
    });
  }

  togglePreview(): void {
    this.showPreview = !this.showPreview;
  }

  toggleAdvancedFilters(): void {
    this.showAdvancedFilters = !this.showAdvancedFilters;
  }

  getSelectedReportType(): ReportType | undefined {
    const selectedType = this.reportForm.get('reportType')?.value;
    return this.reportTypes.find(type => type.value === selectedType);
  }

  formatDateRange(): string {
    const startDate = this.reportForm.get('startDate')?.value;
    const endDate = this.reportForm.get('endDate')?.value;
    
    if (!startDate || !endDate) return '';
    
    return `${this.datePipe.transform(startDate, 'mediumDate')} - ${this.datePipe.transform(endDate, 'mediumDate')}`;
  }

  getExportIcon(format: string): string {
    switch (format.toLowerCase()) {
      case 'pdf':
        return 'picture_as_pdf';
      case 'excel':
        return 'table_chart';
      case 'csv':
        return 'grid_on';
      default:
        return 'description';
    }
  }

  async downloadExport(exportItem: ExportHistory): Promise<void> {
    try {
      // Simulate download
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.snackbarService.success('Export downloaded successfully');
    } catch (error) {
      console.error('Error downloading export:', error);
      this.snackbarService.error('Failed to download export');
    }
  }

  async resendExport(exportItem: ExportHistory): Promise<void> {
    try {
      // Simulate resend
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.snackbarService.success('Export resent successfully');
    } catch (error) {
      console.error('Error resending export:', error);
      this.snackbarService.error('Failed to resend export');
    }
  }

  async refreshExports(): Promise<void> {
    try {
      // Show loading state
      this.isGenerating = true;
      
      // Reload export history
      await this.loadExportHistory();
      
      // Show success message
      this.snackbarService.success('Export history refreshed');
    } catch (error) {
      console.error('Error refreshing exports:', error);
      this.snackbarService.error('Failed to refresh export history');
    } finally {
      this.isGenerating = false;
    }
  }

  private async loadAgentProgress(): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      this.agentProgress = [
        {
          id: '1',
          name: 'John Doe',
          totalRegistrations: 150,
          completedRegistrations: 120,
          successRate: 85,
          pendingApprovals: 5
        },
        {
          id: '2',
          name: 'Jane Smith',
          totalRegistrations: 200,
          completedRegistrations: 180,
          successRate: 90,
          pendingApprovals: 3
        }
      ];
    } catch (error) {
      console.error('Error loading agent progress:', error);
      this.snackbarService.error('Failed to load agent progress');
    }
  }

  private async loadExportHistory(): Promise<void> {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      this.recentExports = [
        {
          id: '1',
          type: 'Daily Report',
          format: 'PDF',
          date: new Date(),
          description: 'Daily activity summary',
          status: 'completed'
        },
        {
          id: '2',
          type: 'Agent Performance',
          format: 'Excel',
          date: new Date(new Date().setDate(new Date().getDate() - 1)),
          description: 'Agent performance metrics',
          status: 'completed'
        },
        {
          id: '3',
          type: 'Compliance Report',
          format: 'CSV',
          date: new Date(new Date().setDate(new Date().getDate() - 2)),
          description: 'Compliance audit data',
          status: 'completed'
        }
      ];
    } catch (error) {
      console.error('Error loading export history:', error);
      this.snackbarService.error('Failed to load export history');
    }
  }

  async generateReport(): Promise<void> {
    if (!this.reportForm.valid) {
      this.snackbarService.error('Please fill in all required fields');
      return;
    }

    try {
      this.isGenerating = true;
      const formData = this.reportForm.value;
      
      // Prepare report parameters
      const reportParams = {
        type: formData.reportType,
        format: formData.reportFormat,
        startDate: formData.startDate,
        endDate: formData.endDate,
        status: formData.status,
        agentId: formData.agentId,
        includeDetails: formData.includeDetails,
        customFields: {
          field1: formData.customField1,
          field2: formData.customField2
        }
      };

      // If report is scheduled, handle scheduling
      if (formData.scheduleReport) {
        const scheduleConfig = {
          frequency: formData.scheduleFrequency,
          deliveryMethods: formData.deliveryMethod
        };
        // TODO: Implement scheduling logic
        this.snackbarService.success('Report scheduled successfully');
      } else {
        // Generate report immediately
        // TODO: Implement actual report generation logic
        await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API call
        
        // Add to recent exports
        const newExport: ExportHistory = {
          id: Date.now().toString(),
          type: this.getSelectedReportType()?.label || 'Custom Report',
          format: formData.reportFormat.toUpperCase(),
          date: new Date(),
          description: this.formatReportDescription(reportParams),
          status: 'completed'
        };
        
        this.recentExports.unshift(newExport);
        this.snackbarService.success('Report generated successfully');
      }
    } catch (error) {
      console.error('Error generating report:', error);
      this.snackbarService.error('Failed to generate report');
    } finally {
      this.isGenerating = false;
    }
  }

  private formatReportDescription(params: any): string {
    let description = `${params.type} Report`;
    
    if (params.startDate && params.endDate) {
      description += ` (${this.datePipe.transform(params.startDate, 'shortDate')} - ${this.datePipe.transform(params.endDate, 'shortDate')})`;
    }
    
    if (params.agentId) {
      const agent = this.agentProgress.find(a => a.id === params.agentId);
      if (agent) {
        description += ` - Agent: ${agent.name}`;
      }
    }
    
    if (params.status?.length) {
      description += ` - Status: ${params.status.join(', ')}`;
    }
    
    return description;
  }

  getProgressPercentage(agent: AgentProgress): number {
    return (agent.completedRegistrations / agent.totalRegistrations) * 100;
  }

  getFilteredReportTypes(): ReportType[] {
    return this.reportTypes.filter(type => 
      !type.isAdminOnly || (type.isAdminOnly && this.isAdmin)
    );
  }

  goBack(): void {
    this.router.navigate(['/agent']);
  }
} 