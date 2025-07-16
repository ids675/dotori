exports.handler = async (event) => {
  const body = JSON.parse(event.body || "{}");
  const utterance = body.userRequest?.utterance || "서울";
  const city = utterance.split(" ")[0];
  return {
    statusCode: 200,
    body: JSON.stringify({
      version: "2.0",
      template: {
        outputs: [
          {
            simpleText: {
              text: `${city}의 현재 날씨는 맑음, 기온은 28°C (예시)`
            }
          }
        ]
      }
    }),
  };
};
