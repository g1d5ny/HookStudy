# 리액트 훅을 활용한 마이크로 상태 관리

## 총정리

[전역 상태 관리 라이브러리 소개](https://www.notion.so/6-433f36227e4543a796413ab47abc1c52?pvs=21)

[Zustand, Jotai, Valtio 세 가지 전역 상태 라이브러리의 유사점과 차이점](https://www.notion.so/jiondeveloper/11-fa630a1fb3ac45b89c6bbfe4e14d7e9a?pvs=4)

## 1. 1. 리액트 훅과 마이크로 상태 관리

### 1. 객체 타입과 원시 타입의 동등 비교

자바스크립트의 모든 값은 크게 두가지의 데이터 타입으로 나눠진다.

-   **원시 타입**

    할당되는 시점에 메모리에 **값**을 직접 저장.

    **종류**

    `boolean, null, undefined, number, string, symbol, bigint`

    **특징**

    변수에 값을 저장하기 때문에 동등 비교를 할 때 **값**끼리 비교함.

    **예시**

    ```js
    let a = 2
    let b = 2
    a === b // true
    ```

-   **객체 타입 (참조 타입)**

    할당되는 시점에 메모리에 **참조 값 (주소 값)** 을 직접 저장.

    **종류**

    `object`

    **특징**
    변수에 메모리 주소 값을 저장하기 때문에 동등 비교를 할 때 참조하는 **주소 값**끼리 비교함. 객체 내 내용이 같아도 메모리 주소 값이 다르기 때문에 다른 값 취급함.

    **예시**

    ```js
    let a = { foo: "foo" }
    let b = { foo: "foo" }
    a === b // false
    ```

    **뽀나스 예시**

    ```js
    let a = { foo: "foo" }
    let b = { foo: "foo" }
    a.foo === b.foo // true
    ```

    참고: https://medium.com/@ian-white/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EC%9D%98-%EB%8F%99%EB%93%B1-%EB%B9%84%EA%B5%90-8829736662d7,
    https://kwtjdtn.tistory.com/15

### 2. 호이스팅

JavaScript에서 호이스팅(hoisting)이란,

-   인터프리터가 변수와 함수의 메모리 공간을 선언 전에 미리 할당하는 것

-   실제 코드의 위치는 변하지 않지만 브라우저가 js를 해석할 때 변수와 함수의 선언을 스코프의 최상단으로 끌어올리는 것

#### 1. 변수 호이스팅

변수는 선언 -> 초기화 -> 할당 단계 거침

-   var

    **특징**

    선언, 초기화 동시에 실행하므로 선언 전에 참조하면 undefined 반환

    **예시**

    ```js
    console.log(name) // undefined (😎: 호이스팅으로 선언 단계가 이루어지고 동시에 초기화도 진행)
    var name = "jiwon"
    console.log(name) //jiwon
    ```

    =

    ```js
    var name // (😎: var는 할당 없이 선언 가능. 선언과 동시에 undefined로 초기화 됨.)
    console.log(name) // undefined
    name = "jiwon" // jiwon으로 할당
    ```

-   let

    **특징**

    선언, 초기화 단계 분리되어 실행하므로 값이 호이스팅으로 먼저 참조해도 초기화가 되어있지 않아서 참조 에러남. 실제 선언 코드에 도달했을 때 초기화됨.

    ```js
    console.log(name) // ❗️ReferenceError: name is not defined at <anonymous>:1 (😎: 호이스팅으로 끌어올려졌지만, 초기화가 되지 않았음)
    let name // 선언과 동시에 undefined로 초기화
    console.log(name) // undefined
    ```

-   const

    **특징**

    선언, 초기화, 할당 동시에 실행함.

    ```js
    console.log(c) // ❗️ Uncaught ReferenceError: c is not defined (😎: 호이스팅으로 끌어올려졌지만, 초기화가 되지 않았음)
    const c // ❗️ Uncaught SyntaxError: Missing initializer in const declaration (😎: const는 선언 함과 동시에 초기화할 값을 할당해야함. 그렇지 않으면 문법 오류 발생)
    const c = 1 // 선언, 초기화, 할당 동시에 실행 완.^^
    ```

    ```js
    console.log(c) //
    const c = 1 // 선언, 초기화, 할당 동시에 실행 완.^^
    ```

-   TDZ (Temporal Dead Zone)

    일시적 사각지대 (일시적으로 잠시 죽은 곳)

    변수의 선언부터 초기화가 이루어지기 전까지의 구간 (선언한 변수는 호이스팅되었지만, **접근만**하지 못하는 구역)

    **예시**

    ```js
    console.log(name) // ❗️Uncaught ReferenceError: name is not defined (😎: 이 곳이 TDZ)
    let name = "jiwon"
    ```

<br>

**2. 함수 호이스팅**

-   **함수 선언식**

    일반적인 프로그래밍 언어에서의 함수 선언과 비슷한 형식으로,'function' 키워드로 시작하고 함수 이름을 명시함.

    **특징**

    호이스팅 가능! ⭕️

    **예시**

    ```js
    showLog()

    function showLog() {
        console.log("show log!")
    }
    ```

-   함수 표현식

    변수에 함수를 할당하여 선언하는 방식

    **특징**

    함수를 표현한 식(변수)은 호이스팅 가능!

    함수는 호이스팅 불가능 ❌

    **예시**

    ```js
    showLog() // TypeError: log is not a function 호이스팅 ❌
    showLog // undefined로 호이스팅 ⭕️

    const showLog = function () {
        console.log("show log!")
    }
    ```

    참고
    https://velog.io/@wlwl99/%EB%B3%80%EC%88%98-%EC%84%A0%EC%96%B8-%EC%B4%88%EA%B8%B0%ED%99%94-%ED%95%A0%EB%8B%B9-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85#var, https://velog.io/@saemileee/Javascript-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85-%ED%81%B4%EB%A1%9C%EC%A0%B8#var%EB%A1%9C-%EC%84%A0%EC%96%B8%ED%95%9C-%EB%B3%80%EC%88%98-%ED%98%B8%EC%9D%B4%EC%8A%A4%ED%8C%85
