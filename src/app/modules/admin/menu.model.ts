export const menues = [
  {
    label: '',
    items: [
      {
        label: 'Bulk Upload', icon: 'pi pi-fw pi-upload', items: [
          {label: 'Upload Student', icon: 'far fa-id-card', routerLink: ['/upload-student'] },
          {label: 'Upload Enrolement', icon: 'far fa-file-alt', routerLink: ['/upload-enrolement'] },
        ]
      },

      {
        label: 'Question', icon: 'far fa-question-circle', items: [
          {label: 'Create Question', icon: 'pi pi-fw pi-file-edit', routerLink: ['create-question'] },
          {label: 'Approve Question', icon: 'pi pi-fw pi-verified', routerLink: ['/approve-question'] },
        ]
      },
      {
        label: 'Configuration', icon: 'pi pi-fw pi-cog', items: [
          {label: 'Exam', icon: 'pi pi-fw pi-bars', routerLink: ['/exam-configuration'] },
          {label: 'Subject', icon: 'pi pi-fw pi-bars', routerLink: ['/subject-configuration'] },
        ]
      },
      {
        label: 'Assign', icon: 'pi pi-fw pi-th-large', items: [
          {label: 'Assign Answer', icon: 'pi pi-fw pi-bars', routerLink: ['/assign-answer'] },
        ]
      },
      {
        label: 'Results', icon: 'pi pi-fw pi-th-large', items: [
          {label: 'Exam Results', icon: 'pi pi-fw pi-bars', routerLink: ['/exam-results'] },
          {label: 'Re-assign Paper', icon: 'pi pi-fw pi-bars', routerLink: ['/reassign-papaer'] },
        ]
      },
    ]
  },

];
