describe("Welcome Message Tests", () => {
  const welcomeMessages = {
    morning: {
      time: "morning",
      messages: ["좋은 아침입니다."],
    },
    afternoon: {
      time: "afternoon",
      messages: ["좋은 오후입니다."],
    },
    evening: {
      time: "evening",
      messages: ["좋은 저녁입니다."],
    },
  };

  const getWelcomeMessage = (currentHour: number) => {
    if (currentHour >= 6 && currentHour < 12) {
      return welcomeMessages.morning.messages[0];
    } else if (currentHour >= 12 && currentHour < 18) {
      return welcomeMessages.afternoon.messages[0];
    } else {
      return welcomeMessages.evening.messages[0];
    }
  };
  test("should return morning message between 6 AM and 12 PM", () => {
    const date = new Date("2023-10-01T08:00:00"); // 8 AM
    expect(getWelcomeMessage(date.getHours())).toBe("좋은 아침입니다.");
  });
});
