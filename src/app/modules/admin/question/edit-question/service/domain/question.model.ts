export class QuestionDetailModel {
  id: number = 0;
  seqNo: number = 0;
  marks: number = 0;
  quesDesc: string = '';
  isFile: boolean = false;
}

export class QuestionModel {
  id: number = 0;
  examLevel: string = '';
  session: string = '';
  year: string ='';
  subjectCode: string ='';
  quesDetail: QuestionDetailModel
}
export class DeleteQuestionModel{
  isFullQuesDelete: false;
  quesDetailsId: number = 0;
  quesId: number = 0
}










