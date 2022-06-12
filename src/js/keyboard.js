export class Keyboard {
  // #(해쉬)를 붙이면 private
  #switchEl; //switch element
  #fontSelectEl; //font selecter element
  #containerEl; //container element로 부터 하위 element 탐색하는 방식으로..
  #keyboardEl; //keyboard element

  constructor() {
    this.#assignElement();
    this.#addEvent();
  }

  // #switchEl에 switch element 할당하기
  #assignElement() {
    this.#containerEl = document.getElementById("container");
    /*
    this.#switchEl = document.getElementById("switch");
    this.#fontSelectEl = document.getElementById("font");
    위처럼 document에서 탐색하는 방법보다 container에서부터 탐색하는 게 비용이 적음!!
    */
    this.#switchEl = this.#containerEl.querySelector("#switch");
    this.#fontSelectEl = this.#containerEl.querySelector("#font");
    this.#keyboardEl = this.#containerEl.querySelector("#keyboard");
  }

  #addEvent() {
    // 이벤트 핸들러는 따로 관리하는게 좋음 -> 화살표 함수보다는 따로 함수 만들기
    this.#switchEl.addEventListener("change", this.#onChangeTheme);
    this.#fontSelectEl.addEventListener("change", this.#onChangeFont);

    document.addEventListener("keydown", (event) => {
      console.log(event.code);
      // `(백틱)을 사용한 템플릿 문자열
      // keydown시, 해당 key에 active 클래스 추가
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.add("active");
    });

    document.addEventListener("keyup", (event) => {
      //console.log("keyup");
      // keyup시, 해당 key의 active 클래스 제거
      // ?. (옵셔널 체이닝) : 존재하면 실행, 안하면 undefined 리턴
      this.#keyboardEl
        .querySelector(`[data-code=${event.code}]`)
        ?.classList.remove("active");
    });
  }

  #onChangeTheme(event) {
    //documentElement == html
    document.documentElement.setAttribute(
      "theme",
      event.target.checked ? "dark-mode" : ""
    );
  }

  #onChangeFont(event) {
    document.body.style.fontFamily = event.target.value;
  }
}
