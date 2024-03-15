export class ExamQuestionDetailModel {
  id: number = 0;
  seqNo: number = 0;
  marks: number = 0;
  quesDesc: string = '';
  isFile: boolean = false;
  fileName: string;
  filePath: string;
  fileUrl: string;
}

export class ExamQuestionModel {
  id: number;
  examId: number;
  examLevel: string;
  session: string;
  year: string;
  subjectId: number;
  subjectCode: string;
  subjectName: string;
  examSet: string;
  examDate: Date;
  examStartsAt: Date;
  examEndsAt: Date;
  quizPwd: string;
  quesDetailsList: ExamQuestionDetailModel[];
  navigationId: number
}









