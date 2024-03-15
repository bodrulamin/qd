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


export class AnswerModel{
  id: number;
  studentId: number;
  enrolmentId: number;
  quesId: number;
  quesSeq: number;
  answerDesc: string
}
export class ExamInfo {
  isExamSubjectFoundToAllow: boolean;
  quesId: number;
  studentId: number;
  enrollmentId: number;
  examInstruction: string;
  examDate: Date;
  startTime:string;
  endTime: string;
  examLevel: string;
  session: string;
  year: string;
  subjectCode: string;
  subjectName: string;
  examName:string;
  navigationId: number
}






