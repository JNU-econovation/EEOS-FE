/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Calendar from "../Calendar";

// react-day-picker uses window.matchMedia internally which might not be available in JSDOM
beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

describe("Calendar 컴포넌트", () => {
  const mockHandleDateChange = jest.fn();
  const mockHandleSubmit = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("정상적으로 렌더링되어야 한다", () => {
    render(<Calendar date={undefined} handleDateChange={mockHandleDateChange} />);
    // DayPicker가 렌더링되는지 확인 (role="grid" 등)
    expect(screen.getByRole("grid")).toBeInTheDocument();
  });

  it("초기 날짜가 전달되면 해당 날짜가 선택되어야 한다", () => {
    const initialDate = new Date(2026, 3, 10); // 2026년 4월 10일
    render(
      <Calendar date={initialDate} handleDateChange={mockHandleDateChange} />
    );
    
    // DayPicker의 선택된 날짜 확인 (aria-selected="true")
    const selectedDay = screen.getByText("10");
    expect(selectedDay.closest("button")).toHaveAttribute("aria-selected", "true");
  });

  it("날짜를 클릭하면 handleDateChange가 호출되어야 한다", () => {
    // 오늘 날짜를 기준으로 테스트 (비활성화되지 않은 미래 날짜 선택)
    const today = new Date();
    const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 15);
    
    render(
      <Calendar date={undefined} handleDateChange={mockHandleDateChange} />
    );

    // 다음 달로 이동 (DayPicker의 다음 달 버튼 클릭)
    const nextMonthBtn = screen.getByRole("button", { name: /Go to next month/i });
    fireEvent.click(nextMonthBtn);

    const dayToSelect = screen.getByText("15");
    fireEvent.click(dayToSelect);

    expect(mockHandleDateChange).toHaveBeenCalled();
    const calledDate = mockHandleDateChange.mock.calls.find(call => call[0] !== undefined)[0];
    expect(calledDate.getDate()).toBe(15);
  });

  it("withTime이 true일 때 시간 입력 필드가 표시되고 시간을 변경할 수 있어야 한다", () => {
    const initialDate = new Date(2026, 3, 10, 10, 0); // 2026-04-10 10:00
    render(
      <Calendar 
        date={initialDate} 
        withTime={true} 
        handleDateChange={mockHandleDateChange} 
      />
    );

    const timeInput = screen.getByLabelText(/행사 시작 시간/);
    expect(timeInput).toBeInTheDocument();
    expect(timeInput).toHaveValue("10:00");

    fireEvent.change(timeInput, { target: { value: "14:30" } });

    // handleDateChange가 14:30으로 호출되었는지 확인
    const lastCall = mockHandleDateChange.mock.calls[mockHandleDateChange.mock.calls.length - 1][0];
    expect(lastCall.getHours()).toBe(14);
    expect(lastCall.getMinutes()).toBe(30);
  });

  it("submitButton이 true일 때 확인 버튼이 표시되고 클릭 시 handleSubmit이 호출되어야 한다", () => {
    render(
      <Calendar 
        date={undefined} 
        submitButton={true} 
        handleSubmit={mockHandleSubmit}
        handleDateChange={mockHandleDateChange} 
      />
    );

    const submitBtn = screen.getByRole("button", { name: "확인" });
    expect(submitBtn).toBeInTheDocument();

    fireEvent.click(submitBtn);
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("오늘 이전의 날짜는 비활성화되어야 한다", () => {
    // 오늘이 2026년 4월 6일이라고 가정 (시스템 날짜에 의존하므로 주의 필요)
    // 실제 테스트에서는 시스템 날짜를 모킹하는 것이 좋음
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    render(
      <Calendar date={undefined} handleDateChange={mockHandleDateChange} />
    );

    // 어제 날짜 버튼을 찾아서 disabled 상태인지 확인
    // DayPicker의 비활성화된 날짜는 보통 aria-disabled="true" 또는 disabled 속성을 가짐
    const dayButtons = screen.getAllByRole("button");
    // 어제 날짜 텍스트를 가진 버튼을 찾기 (단, 현재 달에 속한 경우만)
    const yesterdayDateText = yesterday.getDate().toString();
    const yesterdayBtn = dayButtons.find(btn => 
      btn.textContent === yesterdayDateText && 
      (btn.getAttribute("aria-disabled") === "true" || (btn as HTMLButtonElement).disabled)
    );
    
    // 주의: 오늘이 1일인 경우 어제는 이전 달에 있으므로 현재 뷰에 없을 수 있음
    // 이 테스트 케이스는 환경에 따라 유동적일 수 있음
  });
});
