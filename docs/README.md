# **기능 요구 사항**

## Commit List

- [x] 1. 로또 구입 금액 입력
  - [x] (1) 입력 조건
  - [x] (2) 예외 처리
- [x] 2. 구입한 로또 수량 및 번호 출력
  - [x] (1) 출력 조건
- [x] 3. 당첨 번호 입력
  - [x] (1) 입력 조건
  - [x] (2) 예외 처리
- [x] 4. 보너스 번호 입력
  - [x] (1) 입력 조건
  - [x] (2) 예외 처리
- [x] 5. 당첨 내역 출력
  - [x] (1) 출력 조건
- [x] 6. 수익률 출력
  - [x] (1) 입력 조건

---

## **1. 로또 구입 금액 입력**

- 금액을 입력 받는다

> ### **입력 예시**
>
> ```
> 14000
> ```

> ### **입력 조건**
>
> - 숫자만 입력받는다.
> - 1,000원 단위로 입력받는다.

> ### **예외 처리**
>
> - 숫자 이외의 문자가 들어오면 throw
>
> ```javascript
> throw new Error("[ERROR] 숫자 이외의 문자를 입력하였습니다.");
> ```
>
> - 1000으로 나누어 떨어지지 않으면 throw
>
> ```javascript
> throw new Error("[ERROR] 1,000원 단위의 금액이 아닙니다.");
> ```
>
> - 1000 이하의 금액이 들어오면 throw
>
> ```javascript
> throw new Error("[ERROR] 로또를 구매할 수 없습니다.");
> ```

---

## **2. 구입한 로또 수량 및 번호 출력**

- 입력받은 금액으로 산 로또 수량 및 번호를 출력한다.
  1. 몇 개를 살 수 있는지 구한다.
  2. 출력한다.
  3. 그 갯수만큼 반복하며 로또를 뽑는다.  
     2-1. 한 차례의 로또를 뽑을 때, 중복이 없이 뽑는다.  
     2-2. 한 차례의 로또를 다 뽑았을 때, 오름차순으로 정렬한다.  
     2-3. 한 차례의 로또를 다 뽑았을 때, 이미 있는 로또 번호 목록이라도 추가한다.
  4. 출력한다.

> ### **출력 예시**
>
> ```
> 8개를 구매했습니다.
> [8, 21, 23, 41, 42, 43]
> [3, 5, 11, 16, 32, 38]
> [7, 11, 16, 35, 36, 44]
> [1, 8, 11, 31, 41, 42]
> [13, 14, 16, 38, 42, 45]
> [7, 11, 30, 40, 42, 43]
> [2, 13, 22, 32, 38, 45]
> [1, 3, 5, 14, 22, 45]
> ```

> ### **출력 조건**
>
> - 발행한 로또 수량을 먼저 출력한다.
> - 로또 번호는 오름차순으로 정렬하여 출력한다.

---

## **3. 당첨번호 입력**

- 당첨 번호를 입력받는다.

> ### **입력 예시**
>
> ```
> 1,2,3,4,5,6
> ```

> ### **입력 조건**
>
> - 번호와 쉼표(,)만 입력받는다.
> - 각 번호 범위는 1 ~ 45까지이다.
> - 중복되지 않아야 한다.
> - 6개의 번호를 입력받는다.

> ### **예외 처리**
>
> - 번호와 쉼표(,) 이외의 문자가 들어오면 throw
>
> ```javascript
> throw new Error("[ERROR] 번호와 쉼표(,) 이외의 문자를 입력하였습니다.");
> ```
>
> - 번호의 범위가 1 ~ 45가 아니면 throw
>
> ```javascript
> throw new Error("[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.");
> ```
>
> - 중복된 번호가 들어오면 throw
>
> ```javascript
> throw new Error("[ERROR] 번호가 중복되었습니다.");
> ```
>
> - 6개의 번호가 들오지 않으면 throw
>
> ```javascript
> throw new Error("[ERROR] 6개의 번호를 입력해주세요.");
> ```

---

## **4. 보너스 번호 입력**

- 보너스 번호를 입력받는다.

> ### **입력 예시**
>
> ```
> 7
> ```

> ### **입력 조건**
>
> - 번호만 입력받는다.
> - 입력한 당첨 번호 외의 번호를 입력한다.
> - 1부터 45사이의 번호를 입력한다.

> ### **예외 처리**
>
> - 번호 이외의 문자가 들어오면 throw
>
> ```javascript
> throw new Error("[ERROR] 번호 이외의 문자를 입력하였습니다.");
> ```
>
> - 입력한 당첨 번호에 있는 번호라면 throw
>
> ```javascript
> throw new Error("[ERROR] 입력한 당첨 번호들 이외의 번호를 입력해주세요.");
> ```
>
> - 입력한 당첨 번호에 있는 번호라면 throw
>
> ```javascript
> throw new Error("[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.");
> ```

---

## **5. 당첨 내역 출력**

- 당첨 내역을 출력한다.

> ### **출력 예시**
>
> ```
> 3개 일치 (5,000원) - 1개
> 4개 일치 (50,000원) - 0개
> 5개 일치 (1,500,000원) - 0개
> 5개 일치, 보너스 볼 일치 (30,000,000원) - 0개
> 6개 일치 (2,000,000,000원) - 0개
> ```

> ### **출력 조건**
>
> - 일치하는 개수가 낮은 번호부터 출력한다.
> - n개 일치에 해당하는 당첨 갯수를 출력한다.

---

## **6. 수익률 출력**

- 수익률(구입 금액 대비 당첨 금액의 비율)을 출력한다.
- 수익률 = (당첨 금액 총합 / 구입금액) \* 100

> ### **출력 예시**
>
> ```
> 총 수익률은 62.5%입니다.
> ```

> ### **출력 조건**
>
> - 수익률은 소수점 둘째 자리에서 반올림한다.  
>   Ex.) 100.0%, 51.5%, 1,000,000.0%

`questionUserCache
userCacheCallback
createUserLottos
printUserLottoInfo

questionWinningNumbers
winningNumberCallback

questionBonusNumber
bonusNumberCallback

createWinningLotto

makeStatistics

printMatchResult

endService`

About User Cache Controller
questionUserCache
userCacheCallback
createUserLottos
printUserLottoInfo

About WinningLotto Controller
questionWinningNumbers
winningNumberCallback

    questionBonusNumber
    	bonusNumberCallback

    createWinningLotto

About Statistics Controller
makeStatistics
printMatchResult

About End Controller
endService
