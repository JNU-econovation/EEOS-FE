/**
 * @url /comments
 * @method GET
 * @description 질문에 대한 답변 리스트를 반환한다.
 */
export const questionList = {
  comments: [
    {
      commentId: 2,
      teamId: 1,
      writer: "26기 박건규",
      accessRight: "edit",
      time: "2024-07-07 16:57:39.0",
      content:
        "사실 fetch api로도 모든 서버 요청을 할 수 있는데요..! 혹시 기술 스택으로 꼭 axios를 사용한 이유가 있을까요?",
      answers: [
        {
          commentId: 3,
          writer: "27기 홍길동",
          accessRight: "read_only",
          time: "2024-07-07 16:57:51.0",
          content:
            "fetch의 경우 요즘 최신 브라우저는 모두 잘 지원하지만, 간혹! 지원하지 않는 경우가 존재합니다. 추가적으로 json데이터를 자동으로 변환해준다는점과 인터셉터를 지원해주어서 반복되는 로직을 줄일 수 있다는 강력한 장점이 있기 때문입니다!",
        },
      ],
    },
    {
      commentId: 2,
      teamId: 1,
      writer: "26기 박건규",
      accessRight: "edit",
      time: "2024-07-07 16:57:39.0",
      content:
        "발표 잘 들었습니다! 제가 아직 프론트앤드를 잘 몰라서 그런데, 컴포넌트가 무엇인지 설명해주실 수 있나요?",
      answers: [
        {
          commentId: 3,
          writer: "27기 홍길동",
          accessRight: "read_only",
          time: "2024-07-07 16:57:51.0",
          content:
            "fetch의 경우 요즘 최신 브라우저는 모두 잘 지원하지만, 간혹! 지원하지 않는 경우가 존재합니다. 추가적으로 json데이터를 자동으로 변환해준다는점과 인터셉터를 지원해주어서 반복되는 로직을 줄일 수 있다는 강력한 장점이 있기 때문입니다!",
        },
      ],
    },
    {
      commentId: 2,
      teamId: 1,
      writer: "26기 박건규",
      accessRight: "edit",
      time: "2024-07-07 16:57:39.0",
      content:
        "바쁘신 와중에도 매번 리뷰를 해주시는 멘토님께 감사의 말씀 드립니다.\n## 해결과정\n- 우선 지금까지 커스텀훅으로 서버요청을 하던 로직을 react-query 로 교체하였습니다. \n- 이때, product를 가져올 때는 무한스크롤로 구현해야 했으며, useInfinityQuery와  useInView를 사용하였습니다. 구체적인 동작은 아래와 같습니다.\n  - useInView를 통해서 ref 하는 div를 하단에 위치하도록 합니다.\n  - div가 보여지면 inView 가 true가 되며, useEffect의 의존성배열에 추가되어있기에 useEffect 로직이 실행됩니다.\n  - 로직 안에는 useInfinityQuery가 반환하는 fetchNextPage 를 호출하여 다음 데이터를 받아오게 됩니다. \n\n리뷰해주신 부분을 적용해보았습니다. \n- [리뷰](https://github.com/kakao-tech-campus-2nd-step2/react-gift-goods-list/pull/70#discussion_r1675446992) List의 더보기 가능 상태를 useReducer로 변경하였습니다.\n- [리뷰](https://github.com/kakao-tech-campus-2nd-step2/react-gift-goods-list/pull/70#discussion_r1675445121) 에러를 타입가드로서, 만약 기존에 정의된 에러의 경우 새롭게 메시지를 만들어(만들어 둔 메시지로) 던지고, 아닌 경우 그대로 던지도록 수정하였습니다.\n- [리뷰](https://github.com/kakao-tech-campus-2nd-step2/react-gift-goods-list/pull/70#discussion_r1675447856) '응답값이 없는 경우 체크'를 옵셔널 체이닝으로 변경하였습니다. \n\n## 리뷰어에게\n- 처음 무한스크롤을 구현하다보니 위와 같이 구현하는게 맞을지 궁금합니다..! \n- 리뷰 내용이 잘 반영되었는지 확인 부탁드립니다..!\n\n이번주차도 리뷰해주심에 정말 감사드립니다!",
      answers: [
        {
          commentId: 3,
          writer: "27기 홍길동",
          accessRight: "read_only",
          time: "2024-07-07 16:57:51.0",
          content:
            "error 타입이 항상 axios 에서 던져주는 에러라고 가정 되어 있는데요..! 에러의 종류는 많기 때문에 타입가드로 변경 해주셔야합니다.",
        },
        {
          commentId: 4,
          writer: "26",
          accessRight: "read_only",
          time: "2024-07-07 16:57:57.0",
          content:
            "error 타입이 항상 axios 에서 던져주는 에러라고 가정 되어 있는데요..! 에러의 종류는 많기 때문에 타입가드로 변경 해주셔야합니다.",
        },
        {
          commentId: 5,
          writer: "27기 홍길동",
          accessRight: "edit",
          time: "2024-07-07 16:58:00.0",
          content: "요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```",
        },
        {
          commentId: 6,
          writer: "27기 홍길동",
          accessRight: "read_only",
          time: "2024-07-07 16:58:00.0",
          content:
            "요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n요렇게 작성해도 되겠네요\n\n ```\nconsole.log('hi');\n```\n",
        },
      ],
    },
  ],
};

/**
 * @url /comments
 * @method POST
 * @description 질문 혹은 답변을 등록한다.
 */
export const postQuestionList = { programId: 0 };
