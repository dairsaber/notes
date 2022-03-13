// 类型 和 值的概念

// typeof
// keyof
// never
// Pick
// Omit

type Recordable<T = any> = { [x: string]: T };

type Nullable<T = any> = T | null | undefined;

function inferDemo(args: string, mie: number): number {
  return Number(args) + mie;
}

// ReturnType
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// ParamsType
type MyParamsType<T> = T extends (...args: infer R) => any ? R : any;

//Parameters
type InferDemoParamsType2 = Parameters<typeof inferDemo>;

// 类型推断
// infer
type InferDemoType = MyReturnType<typeof inferDemo>;

type InferDemoParamsType = MyParamsType<typeof inferDemo>;

const obj = { a: "123", b: true, c: 123 };

type ObjType = typeof obj;

type ObjKeyType = keyof ObjType;

type ObjTypeOfA = ObjType["a"];

// Exclude

type ObjExclude = Exclude<"a" | "b" | "d", ObjKeyType>;

type ObjExclude2 = Exclude<"c" | "d", ObjKeyType>;

// in

type ObjToAnyType = { [K in ObjKeyType]: any };

// Pick
//type Pick<T, K extends keyof T> = { [P in K]: T[P];};

// 只想要 ab
type ObjABType = Pick<ObjType, "a" | "b">;

type ObjTypeWithoutC = Omit<ObjType, "c">;

// Partial
type PartialObjType = Partial<ObjType>;

//
type MyPartial<T extends Record<any, any>> = { [K in keyof T]?: T[K] };

type MyPartialObjType = MyPartial<ObjType>;

// 类型递归

const obj2 = {
  a: {
    b: "234",
    d: 123,
  },
};

type Obj2Type = typeof obj2;

type PowerPartial<T extends Record<any, any>> = {
  [K in keyof T]?: T[K] extends Record<any, any> ? PowerPartial<T[K]> : T[K];
};

type Obj2Partial = PowerPartial<Obj2Type>;

type A = { a: string; b: String };
type B = { a: number };

type C = A & B;

interface D {
  a: string;
  b: string;
}

interface E {
  a: number;
}

// 会报错
// interface F extends D, E {}

type F = { id: string };

type G = F & { name: string };
