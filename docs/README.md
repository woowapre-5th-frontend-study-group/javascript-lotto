# **리팩토링**

기존의 Lotto 구조에 MVC 패턴을 적용하고, 유효성 검사에 책임 연쇄 패턴을 적용하고, 비동기 작업을 효율적으로 관리할 수 있는 구독-발행(Subcribe-publish) 패턴을 적용해보았다.

## 기존에 아쉬웠던 부분

1. 유닛 테스트 코드가 알아보기 쉽지 않았던 것 같았다.
2. 상수화 및 선언부에 대한 정리가 되어있지 않았다.
3. Javascript 언어에 대한 이해가 부족해서 루프를 돌아야 한다는 틀에 갖혀있었다.
4. 통짜 파일

## 리팩토링 방향

### MVC패턴을 사용하자.

저번 주차에 이어서 MVC 적용에 대해 노력해보았다. 또한, 객체스럽게 메시지를 던지고 결과값만 받아오는 것에 주안점을 두었다.

- **Model: Lotto**
  - 각각의 번호가 아닌 6개의 번호가 있는 배열을 'Lotto'라는 모델로 보았다.
  - 컴퓨터가 생성해낸 6개의 번호, 사용자가 입력한 당첨 번호
- **Model: UserCache**
  - 사용자가 입력하는 금액을 'UserCache'라는 모델로 보았다.
  - 사용자가 입력한 금액
- **Model: UserLottos**
  - 사용자가 입력한 금액만큼 생성한 'Lotto'들을 'UserLottos'라는 모델로 보았다.
  - 컴퓨터가 생성해낸 랜덤한 Lotto들
- **Model: WinningLotto**
  - 당첨 번호와 보너스 번호를 모두 합쳐서 관리해주고 싶어서 'WinningLotto'라는 모델로 보았다.
  - 그렇게 하고 싶었던 이유는 구입한 로또들을 비교하기 위해선 당첨 번호와 보너스 번호가 필연적으로 필요하기 때문에, 이 둘을 같이 쓸 거라면 하나로 묶자는 생각이었다.
  - 유저가 입력한 당첨번호와 보너스 번호
- **Model: MatchResult**
  - 비교를 하고 난 뒤 결과를 저장하는 녀석을 'MatchResult'라는 모델로 보았다.
- **View: OutputView, InputView**
  - OutputView: 출력을 담당하는 View
  - InputView: 입력을 담당하는 View
- **Controller: UserCacheController, WinningLottoController, StatisticController**
  - 기본적으로 기능 단위로 Controller를 나누고자 했다.
  - 각 컨트롤러에서는 각자가 담당하는 모델 외엔 관심사X
  - 이때, 각 컨트롤러에서 다음 컨트롤러로 넘어가기 위해서 구독-발행(Subscribe-Publish) 패턴을 사용하였다.
    - A컨트롤러에서 B컨트롤러의 엔트리 함수를 직접 호출하는 것은 단일 책임에 어긋난다고 생각했기 때문.
      > **구독-발행(Subscribe-Publish) 패턴이란?**  
      > : 구독하고 있는 구독자(들)에게 정보를 발행해주는 것으로, 여기에서는 다음 컨트롤러의 엔트리 함수를 넘겨주었다.
  - **UserCacheController**: 유저 금액에 대한 입력, 유효성 검사, 연산, 출력을 담당한다
  - **WinningLottoController**: 당첨 로또 생성 및 유저 로또와 비교를 담당한다
  - **StatisticController**: 통계를 담당한다.

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
> throw new Error('[ERROR] 숫자 이외의 문자를 입력하였습니다.');
> ```
>
> - 1000으로 나누어 떨어지지 않으면 throw
>
> ```javascript
> throw new Error('[ERROR] 1,000원 단위의 금액이 아닙니다.');
> ```
>
> - 1000 이하의 금액이 들어오면 throw
>
> ```javascript
> throw new Error('[ERROR] 로또를 구매할 수 없습니다.');
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
> throw new Error('[ERROR] 번호와 쉼표(,) 이외의 문자를 입력하였습니다.');
> ```
>
> - 번호의 범위가 1 ~ 45가 아니면 throw
>
> ```javascript
> throw new Error('[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.');
> ```
>
> - 중복된 번호가 들어오면 throw
>
> ```javascript
> throw new Error('[ERROR] 번호가 중복되었습니다.');
> ```
>
> - 6개의 번호가 들오지 않으면 throw
>
> ```javascript
> throw new Error('[ERROR] 6개의 번호를 입력해주세요.');
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
> throw new Error('[ERROR] 번호 이외의 문자를 입력하였습니다.');
> ```
>
> - 입력한 당첨 번호에 있는 번호라면 throw
>
> ```javascript
> throw new Error('[ERROR] 입력한 당첨 번호들 이외의 번호를 입력해주세요.');
> ```
>
> - 입력한 당첨 번호에 있는 번호라면 throw
>
> ```javascript
> throw new Error('[ERROR] 1부터 45 사이가 아닌 번호를 입력하였습니다.');
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
