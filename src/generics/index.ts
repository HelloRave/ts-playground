type ApiResponse<T extends object> = {
    data: T,
    isError: boolean,
}

type UserResponse = ApiResponse<{name: string, age: number}>

const response: UserResponse = {
    data: {
        name: 'A',
        age: 1,
    },
    isError: false,
}

function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }

export const parsed = map(["1", "2", "3"], (n) => parseInt(n));