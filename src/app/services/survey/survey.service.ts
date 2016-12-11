
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

const VARIABLES_URL = 'http://localhost:4200/assets/variables.json';
const ORDER_URL = 'http://localhost:4200/assets/order.json';

/**
 * Acts as an HTTP layer and notification service for survey data.
 */
@Injectable()
export class SurveyService {

  // storage maps for subjects of all queried order and variables elements
  private variablesElementsMap = new Map<string, Subject<VariablesElement>>();
  private orderElementsMap = new Map<string, Subject<OrderElement>>();

  // notifies listeners of the most recently queried VariablesElement
  private _currentVariables = new Subject<VariablesElement>();

  // notifies listeners of the most recently queried OrderElement
  private _currentOrder = new Subject<OrderElement>();

  constructor(
    public http: Http
  ) { }

  currentVariables(): Observable<VariablesElement> {
    return this._currentVariables.asObservable();
  }

  /**
   * Asynchronously request variables data for a given survey.
   *
   * @returns VariablesElement observable that will be notified upon successful data retrieval
   */
  variables(survey: string): Observable<VariablesElement> {
    var variablesSubject = this.variablesElementsMap.get(survey) // TODO: is this thread safe?
    if (!variablesSubject) {
      variablesSubject = new Subject<VariablesElement>();
      this.variablesElementsMap.set(survey, variablesSubject);
    }
    this.http.get(this.variablesUrlForSurvey(survey))
      .map(res => res.json())
      .subscribe((data: VariablesElement) => {
        this.updateVariables(data, variablesSubject);
      }, error => console.log(`Failed to load variables element for survey [${survey}].`));
    return variablesSubject.asObservable();
  }

  currentOrder(): Observable<OrderElement> {
    return this._currentOrder.asObservable();
  }

  /**
   * Asynchronously request order data for a given survey.
   *
   * @returns OrderElement observable that will be notified upon successful data retrieval
   */
  order(survey: string): Observable<OrderElement> {
    var orderSubject = this.orderElementsMap.get(survey) // TODO: is this thread safe?
    if (!orderSubject) {
      orderSubject = new Subject<OrderElement>();
      this.orderElementsMap.set(survey, orderSubject);
    }
    this.http.get(this.orderUrlForSurvey(survey))
      .map(res => res.json())
      .subscribe((data: OrderElement) => {
        this.updateOrder(data, orderSubject);
      }, error => console.log(`Failed to load order element for survey [${survey}].`));
    return orderSubject.asObservable();
  }

  private variablesUrlForSurvey(survey: string): string {
    // TODO: update with actual REST endpoint construction when defined
    return VARIABLES_URL;
  }

  private orderUrlForSurvey(survey: string): string {
    // TODO: update with actual REST endpoint construction when defined
    return ORDER_URL;
  }

  /**
    * Sets the current variables and notifies subscribers of both a given specific subject
    * and the currentVariables subject.
    */
  private updateVariables(
    data: VariablesElement,
    variablesSubject: Subject<VariablesElement> = undefined
  ) {
    this._currentVariables.next(data);
    if (variablesSubject) variablesSubject.next(data)
  }

  /**
    * Sets the current order and notifies subscribers of both a given specific subject
    * and the currentOrder subject.
    */
  private updateOrder(
    data: OrderElement,
    orderSubject: Subject<OrderElement> = undefined
  ) {
    this._currentOrder.next(data);
    if (orderSubject) orderSubject.next(data)
  }

}
