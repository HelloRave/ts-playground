// To set in tsconfig - module: amd and outFile
/// <reference path='namespace/namespace-example.ts' />

namespace NameSpaceExample {
    function test(num: number) {
        return num++
    }
    
    console.log(test(VARIABLE_ONE))
}