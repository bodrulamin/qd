export class QuestionDetailModel {
  id: number = 0;
  seqNo: number = 0;
  marks: number = 0;
  quesDesc: string = '';
  isFile: boolean = false;
  fileName: string;
  filePath: string;
  fileUrl: string;
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
  isFullQuesDelete: boolean;
  quesDetailsId: number = 0;
  quesId: number = 0
}


export class QuestionInfo {
  id: number;
  examId: number;
  examLevel: 62;
  session: string;
  year: string;
  subjectId: number;
  subjectCode: string;
  subjectName: string;

}









