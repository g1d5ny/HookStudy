let base = 1
const addBase = n => n + base

// 위는 언제 변할지 모르는 base에 의존하기 때문에 재사용성이 떨어지고
// 아래와 같이 객체를 만드는 것이 더 모듈화된 접근 방식
const createContainer = () => {
    let base = 1
    const addBase = n => n + base
    const changeBase = b => {
        base = b
    }
    return { addBase, changeBase }
}
