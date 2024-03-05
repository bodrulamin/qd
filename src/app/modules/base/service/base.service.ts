import {Injectable} from '@angular/core';
import {HttpParams} from "@angular/common/http";

export interface PathParameters {
  [parameterName: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor() {
  }

  /**
   *
   * @param params
   * @returns
   */
  protected getHttpParams(params: Map<string, string>): HttpParams {
    let httpParams = new HttpParams();
    params.forEach((value: string, key: string) => {
      httpParams = httpParams.set(key, value);
    });
    return httpParams;
  }

  /**
   * Use to create url with path parameter.
   * e.g. create('context-path/url/{param1}/url2/{param2}', {'param1': 1, 'param2': 5})
   * This will return url like -- 'context-path/url/1/url2/5'
   *
   * @param url
   * @param parameters -- key-value pair. value must be string or number type.
   * @returns
   */
  protected create(url: string, parameters: PathParameters) {
    const placeholders = url.match(/({[a-zA-Z]*})/g);
    placeholders.forEach((placeholder: string) => {
      const key = placeholder.substr(1, placeholder.length - 2);
      const value = parameters[key];
      if (!value) throw new Error(`Parameter ${key} was not provided`);

      if (typeof value != 'string' && typeof value != 'number') throw new Error(`Value of Parameter ${key} should be either number or string`);

      url = url.replace(placeholder, encodeURIComponent(value + ""));
    });
    return url;
  }


}
