---
name: component-abstract-pattern
description: 이 문서는 react의 컴포넌트를 만들 때 지켜야하는 추상화 레벨을 정의합니다. 컴포넌트를 새롭게 만들어야 하거나, 기존의 컴포넌트를 리팩토링해야할 때, 그리고 코드리뷰를 진행할 때 이 스킬을 사용하세요.
---

# 리액트 컴포넌트 추상화 가이드라인

이 스킬은 모든 컴포넌트들 해당 프로젝트에서 지켜져야하는 컴포넌트 추상화 레벨을 정의합니다.

## 활성화 시점

- 새로운 컴포넌트 생성
- 컴포넌트 코드를 수정하거나 리팩토링
- 컴포넌트 코드 리뷰

## 핵심 원칙

모든 컴포넌트는 아래의 추상화 레벨을 지켜야만 합니다.
핵심적으로 모든 컴포넌트는 도메인 로직을 다루는 여부에 따라서 feature, common으로 나눕니다.

common 컴포넌트 내에서도 내부 로직, 그리고 ui를 다루는 컴포넌트인지에 따라서 나눌 수 있습니다.

feature 컴포넌트 내에서도 section 단위의 비교적 독립적으로 사용될 수 있는 큰 컴포넌트와, login-button과 같은 비교적 작은 컴포넌트로 나뉠 수 있습니다.

### 컴포넌트 종류

- feature/pages : section 단위의 독립적으로 사용될 수 있는 큰 컴포넌트. 도메인 로직을 포함합니다. 특정 페이지에서만 사용되는 종속된 컴포넌트입니다.
- feature/widget : 도메인 로직을 담은 컴포넌트입니다. 여러 페이지에서 재사용이 가능합니다.
- common/entities : 공통 ui와 내부 로직을 다룹니다.
- common/shared : 공통 ui만 다룹니다.

### 주의사항

- 각 페이지는 위의 컴포넌트들을 적절하게 조합되어 만들어집니다.
- 하나의 페이지를 보여주는 컴포넌트는 src/components 에 두지 않습니다. 해당 컴포넌트는 이 문서의 규칙을 따르지 않습니다.
- 각 컴포넌트 추상화는 feature > entities > shared 순서로 레벨을 가지며, 하위의 추상화 레벨만 사용할 수 있습니다. 상위의 레벨 컴포넌트는 사용이 불가능합니다.
  - 예를 들어 entities 컴포넌트에서는 shared를 조합해 구현이 가능하지만, shared는 entities를 사용할 수 없습니다.
  - feature 컴포넌트는 entities와 shared 컴포넌트를 적절히 조합해 구현이 가능하지만 그 역은 성립하지 않습니다.

#### feature/widget

- 도메인 로직을 다루는 컴포넌트
- 특정 페이지에서만 사용되지 않는 재사용 가능한 단위로 작성
- 만약 특정 페이지에서만 사용해야한다면 `feature/pages`에 작성
- e.g. TravelCalendar, ActiveMemberTab, DivisionSelector

#### feature/pages

- 도메인 로직을 다루는 컴포넌트
- 다른 페이지에서는 사용하기 힘든 특정 페이지에서만 사용되는 컴포넌트
- 특정 페이지의 컴포넌트라면 `feature/pages/[페이지 명]/컴포넌트`에 위치
- e.g. my-page/CustomerCenterSection, mountain/CourseDetailBottomSheetSection

#### common/entities

- 도메인을 다루지 않는 컴포넌트
- 내부 로직까지만 다룹니다.
- e.g. Calendar, Tab, SwitchCase, Selector

#### common/shared

- 내부 로직 및 도메인 로직을 다우지 않는 컴포넌트
- ui만 다루는 컴포넌트
- 종류에 따라서 `ui`, `layout`, `animation` 으로 나뉨
  - `ui` : 색상이나 모형 등 실체가 있는 컴포넌트
    - e.g. Button, Input, TextField, CalendarItem
  - `layout` : 특정 요소를 위치시키는 컴포넌트
    - e.g. Flex, Space, PositionBottom
  - `animation` : 특정 요소의 애니메이션을 다루는 컴포넌트. entities로 대체 가능
    - e.g. FadeIn, Slide

## 컴포넌트 구현하기

### 절차

1. 도메인 로직 확인하기

만약 산행 기록 캘린더 컴포넌트를 만들게 된다면 도메인 로직은 "산행 기록"입니다.

2. 추상화 레벨에 맞추어 구현 계획 세우기

산행 기록 캘린더 컴포넌트는 아래와 같이 추상화 될 수 있습니다.

- **산생 기록 캘린더 컴포넌트**는 `widget` 컴포넌트가 됩니다.
- 날짜를 변경하고, 선택하는 등의 기능을 담은 **캘린더 컴포넌트**는 `entities` 컴포넌트가 됩니다.
- 캘린더 컴포넌트에서 사용된 **재사용 가능한 ui 컴포넌트**는 `shared` 컴포넌트가 됩니다.
- 산행 기록 캘린더를 특정 페이지에서 section 단위로 사용하게 된다면 `pages` 컴포넌트가 됩니다.

3. 구현하기

---

**기억하세요**: 해당 문서에 나와있는 추상화 규칙을 제외하고는 절대로 불필요한 추상화는 해서는 안됩니다.
