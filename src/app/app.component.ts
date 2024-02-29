import { Component } from '@angular/core';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = "SJS-Angular-IO-Excel";
  questionText = `
  <h4>Audit Engagement Discussion Points</h4>

    <h5>1. Audit Engagement in Attires Ltd.</h5>
    <p><strong>a)</strong> Being manager in an audit engagement in Attires Ltd., a readymade garments manufacturer, you discovered that the payroll officer had been defrauding the client through not deleting leavers from the payroll records until two months after departure. By doing it, he was pocketing the money for himself.</p>
    <p><strong>Requirement:</strong></p>
    <ol>
        <li>Informing the client? <span>[2 marks]</span></li>
        <li>The audit report? <span>[2 marks]</span></li>
    </ol>

    <h5>b) IAS-37 Recognition, Measurement, and Disclosure</h5>
    <p>IAS-37 deals with recognition, measurement and disclosure requirements of provisions, contingent liabilities, and contingent assets. As an audit professional, it often puts you in difficulty separately evaluating the appropriateness in the treatment provisions and contingent items.</p>
    <p><strong>Requirements:</strong></p>
    <ol>
        <li>You are required to define following items in the light of IAS-37: <span>[2 marks]</span>
            <ul>
                <li>Trade payables & Accruals</li>
                <li>Provisions</li>
            </ul>
        </li>
        <li>Distinguish between legal obligation and constructive obligation <span>[2 marks]</span></li>
    </ol>

    <h5>c) Auditors’ Independence</h5>
    <p>The auditors’ independence may be impaired include for providing:</p>
    <ol>
        <li>taxation services to the company and its directors;</li>
        <li>accountancy services, including preparing periodic management accounts and annual financial statements;</li>
        <li>management consultancy, including advice on new computer systems and systems of internal control.</li>
    </ol>
    <p><strong>Requirement:</strong></p>
    <p>Narrate how each of the situations mentioned above may compromise auditors’ independence, and the ways in which an audit firm can minimise the effect which the provision of other services has on independence. <span>[6 marks]</span></p>

    <h5>d) Rahman & Associates’ Client Portfolio</h5>
    <p>You are the Audit Manager at Rahman & Associates whose client portfolio includes ABC Credit Ltd. which is a listed financial institution offering loans and credit facilities to both commercial and retail customers. You have received an email from the Audit Supervisor who is currently supervising interim testing on systems and controls in relation to the audit of ABC Credit Ltd. for the year ending 31 October 2022. The email gives the following details for your consideration:</p>
    <ol>
        <li>One of the audit team members, Adeeba Sultana, has provisionally agreed to apply for a loan from ABC Credit Ltd. to finance the purchase of a domestic residence. The loan will be secured on a property and the client’s business manager has promised Adeeba Sultana that he will ensure that she gets ‘the very best deal which the bank can offer.’</li>
        <li>The payroll manager at ABC Credit Ltd. has asked the audit supervisor if it would be possible for Rahman & Associates to provide a member of staff on secondment to work in the payroll department. The payroll manager has struggled to recruit a new supervisor for the organisation’s main payroll system and wants to assign a qualified member of the audit firm’s staff for an initial period of six months.</li>
    </ol>
    <p><strong>Requirement:</strong></p>
    <p>Assess the ethical and professional implications of the issues raised with respect to the audit of ABC Credit Ltd. and recommend actions to be taken in each case by the audit firm.</p>
`
  public Editor = ClassicEditor;
  public editorConfig = {
    ckeditor5: {
      // Assuming you want to target the editor's main container for styling
      customConfig: `
        .ck-editor__editable_inline {
          height: 100%;
        }
      `
    }
  };
}
