function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    Weather(msg, replier);
 }
 
function Weather(msg, replier) {
    msg = msg.split(" ");
    if(msg[0] == "날씨" && msg[1] != undefined && msg[2] == undefined) {
        var str = "[현재 " + msg[1] + " 날씨]\n";
        var str2 = "";
 
        var data=org.jsoup.Jsoup.connect("https://m.search.naver.com/search.naver?&query=" + msg[1] + "%20날씨").get(); 
        w_stu = data.select(".text_info .figure_text") + "";
        w_num = data.select(".inner span.figure_result") + "";
        now_temp = data.select(".weather_graphic .temperature_text > strong") + "";
        up_temp = data.select(".up_temperature strong") + "";
        down_temp = data.select(".down_temperature strong") + "";
        feel_temp = data.select(".feeling_temperature strong") + "";
        text = data.select(".temperature_info .summary") + "";
       
        w_stu = w_stu.replace(/<[^>]+>/g,"");
        w_stu = w_stu.split("\n");
        w_num = w_num.replace(/<[^>]+>/g,""); w_num = w_num.split("\n");
        now_temp = now_temp.replace(/<[^>]+>/g,""); now_temp = now_temp.split("\n");
        up_temp = up_temp.replace(/<[^>]+>/g,""); up_temp = up_temp.split("\n");
        down_temp = down_temp.replace(/<[^>]+>/g,""); down_temp = down_temp.split("\n");
        feel_temp = feel_temp.replace(/<[^>]+>/g,""); feel_temp = feel_temp.split("\n");
        text = text.replace(/<[^>]+>/g,""); text = text.split("\n");
        
        //문자열 필터링
        text = text[0].split("아요");
        now_temp = now_temp[0].split("현재 온도");
 
        //출력
        str += 
            "온도 : " + now_temp[0] + "\n" +
            "최고:" + up_temp + " | 최저:" + down_temp + " | 체감:" + feel_temp + "\n" +
            text[0] + "습니다. (" + text[1] + ")";
        str2 = 
            "미세먼지 : " + w_num[0] + "(" + w_stu[0] + ") \n" +
            "초미세먼지 : " + w_num[1] + "(" + w_stu[1] + ") \n" +
            "자외선 : " + w_num[2] + "(" + w_stu[2] + ")";
        
        replier.reply(str);
        replier.reply(str2);
    }
}
