export class QuestionDetailModel {
  seqNo: number;
  marks: number = 0;
  quesDesc: string;
  isFile: boolean = false;
}

export class QuestionModel {
  id: number;
  examLevel: string;
  session: string;
  year: string;
  subjectCode: string;
  quesDetail: QuestionDetailModel
}











