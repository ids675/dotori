const axios = require('axios');
const cheerio = require('cheerio');

exports.handler = async function(event, context) {
  try {
    const query = (event.queryStringParameters && event.queryStringParameters.q) || "";
    const msgParts = query.split(" ");

    if (msgParts[0] !== "날씨" || !msgParts[1]) {
      return {
        statusCode: 400,
        body: "올바른 형식: 날씨 [지역]"
      };
    }

    const region = msgParts[1];

    const url = `https://m.search.naver.com/search.naver?query=${encodeURIComponent(region)}%20날씨`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    let now_temp = $(".weather_graphic .temperature_text > strong").text().trim();
    let up_temp = $(".up_temperature strong").text().trim();
    let down_temp = $(".down_temperature strong").text().trim();
    let feel_temp = $(".feeling_temperature strong").text().trim();
    let summary = $(".temperature_info .summary").text().trim();

    let w_stu = $(".text_info .figure_text").map((i, el) => $(el).text().trim()).get();
    let w_num = $(".inner span.figure_result").map((i, el) => $(el).text().trim()).get();

    let summary1 = summary;
    let summary2 = "";
    if (summary.includes("아요")) {
      [summary1, summary2] = summary.split("아요");
      summary1 += "아요";
    }

    // 최종 문자열로 구성
    let reply = `[현재 ${region} 날씨]\n` +
      `온도 : ${now_temp}\n` +
      `최고: ${up_temp} | 최저: ${down_temp} | 체감: ${feel_temp}\n` +
      `${summary1} (${summary2.trim()})\n` +
      `미세먼지 : ${w_num[0]}(${w_stu[0]})\n` +
      `초미세먼지 : ${w_num[1]}(${w_stu[1]})\n` +
      `자외선 : ${w_num[2]}(${w_stu[2]})`;

    return {
      statusCode: 200,
      body: reply
    };

  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "날씨 정보를 가져오는 중 오류 발생"
    };
  }
};
