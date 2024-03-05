import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'any'
})
export class BullySubjectService {
  protected subject$: Subject<Bully> = new Subject<Bully>();
  protected bSubject$: BehaviorSubject<Bully | null> = new BehaviorSubject<Bully | null>(null);

  constructor() {
    if (!this.subject$) {
      this.subject$ = new Subject<Bully>();
    }

    if (!this.bSubject$) {
      this.bSubject$ = new BehaviorSubject<Bully | null>(null);
    }
  }

  /**
   * 观察者模式·接收  -- BS -- 用于先订阅后发
   */
  public getSubject(): Observable<Bully> {
    return this.subject$.asObservable();
  }

/**
   * 观察者模式·发送  -- BS -- 用于先订阅后发
   * @param item Object
   */
  public setSubject(item: Bully) {
    this.subject$.next(item);
  }

  /**
   * 观察者模式·接收  -- BS -- 用于先发后订阅
   */
  public getBSubject(): Observable<Bully | null> {
    return this.bSubject$.asObservable();
  }

  /**
   * 观察者模式·发送  -- BS -- 用于先发后订阅
   * @param item Object
   */
  public setBSubject(item: Bully) {
    this.bSubject$.next(item);
  }

  /**
   * BS 重置
   */
  public resetBSubject(): void {
    this.bSubject$.next(null);
  }
}

export interface Bully {
  type: string;
  data?: any;
  carrier?: any; // 信息载体
}
