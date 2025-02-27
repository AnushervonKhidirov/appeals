interface Type<T = any> extends Function {
  new (...args: any[]): T;
}

export declare function PartialType<T>(classRef: Type<T>): Type<Partial<T>>;
