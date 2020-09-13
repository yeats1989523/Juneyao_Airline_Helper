/* eslint-disable no-console */
const axios = require('axios');
const alert = require('alert');
const config = require('./data/config');
const FLIGHT_STATUS = require('./constants');
const presetSetionData = require('./data/payload');

const DURATION = 1680;

const f = async ({
  departureDate, arrCode, sendCode, blackBox,
}) => {
  const res = {
    msg: '',
    departureDate,
    arrCode,
    sendCode,
    flightStatus: [
      // {
      //   status: "",
      //   carrierNoName: "",
      //   depCityName: "",
      //   depAirportName: "",
      //   arrCityName: "",
      //   arrAirportName: "",
      //   depDateTime: "",
      //   arrDateTime: "",
      // },
    ],
  };

  try {
    const data = await axios({
      method: 'post',
      url: 'https://m.juneyaoair.com/server/v2/flight/AvFare',
      data: {
        arrAirportCode: null,
        arrCode,
        blackBox,
        sendCode,
        departureDate,
        ...config,
        returnDate: null,
        sendAirportCode: null,
      },
      headers: {
        clientVersion: '1.7.0',
        versionCode: '17000',
        channelCode: 'MWEB',
        platforminfo: 'MWEB',
        Connection:'keep-alive',
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36',
        'Content-Type':'application/json;charset=UTF-8',
        Accept:'application/json, text/plain, */*',
        Origin:'https://m.juneyaoair.com',
        'Sec-Fetch-Site':'same-origin',
        'Sec-Fetch-Mode':'cors',
        'Sec-Fetch-Dest':'empty',
        'Referer':'https://m.juneyaoair.com/flights/index.html',
        'Accept-Encoding':'gzip, deflate, br',
        'Accept-Language':'zh-CN,zh;q=0.9',
        Cookie:'c=3uBB0XAK-1600009195422-bcd07d8d1b342-1249283762; JSESSIONID=2C92EB500CDB01345A05FD90E202BE4B; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJbmZvIjoie1wiUmVzdWx0Q29kZVwiOlwiMTAwMDFcIixcImlkXCI6NjMzMTM1OSxcIm1lbWJlcklEXCI6XCIyOTAzODcwMDIzXCIsXCJuYW1lXCI6XCLkv57lvoHotoVcIixcInRpdGxlXCI6XCLlhYjnlJ9cIixcImxldmVsTmFtZVwiOlwi6YeR5Y2hXCIsXCJiYWxhbmNlT2ZNaWxlYWdlXCI6MCxcImxhc3QxME1vbnRoQ2x1Yk1pbGVzXCI6MCxcImxhc3QxME1vbnRoU2VnbWVudHNcIjowLFwibmVhcmluZ0V4cGlyZWRNaWxlc1wiOjAsXCJuZWFyaW5nRXhwaXJlZE1pbGVzMlwiOjAsXCJuZWFyaW5nRXhwaXJlZE1pbGVzM1wiOjAsXCJsb2dpbktleUluZm9cIjpcIkQ2QTIzOTJDMzJBMzBDRjdERTE1QTlCQTFENjU3NzcwXCIsXCJjZXJ0VHlwZVwiOlwiSURfQ0FSRFwiLFwiY2VydE51bWJlclwiOlwiMzEwMTA4MTk4OTA1MjMwNTUyXCIsXCJtZW1iZXJMZXZlbENvZGVcIjpcIjRcIixcIm1lbWJlclN0YXR1c0NvZGVcIjpcIkFDXCIsXCJtZW1iZXJUZWxcIjpcIjEzOTE2MTMxNzg4XCIsXCJtZW1iZXJFbWFpbFwiOlwiNjU2NzA0NzEwQHFxLmNvbVwiLFwic2V4XCI6XCJNYWxlXCIsXCJjTGFzdE5hbWVcIjpcIuS_nlwiLFwiY0ZpcnN0TmFtZVwiOlwi5b6B6LaFXCIsXCJlTGFzdE5hbWVcIjpcIllVXCIsXCJlRmlyc3ROYW1lXCI6XCJaSEVOR0NIQU9cIixcImJpcnRoZGF5XCI6XCIxOTg5LTA1LTIzXCIsXCJjdXN0b21lckNlcnRpZmljYXRlSW5mb3NcIjpbe1wiY2VydFR5cGVcIjpcIklEX0NBUkRcIixcImNlcnROdW1iZXJcIjpcIjMxMDEwODE5ODkwNTIzMDU1MlwifV0sXCJuZXdVc2VyXCI6ZmFsc2UsXCJ0b2tlblwiOlwiOTVjYzg1YTBmYTM3MTdmMDYzMDk1NGFkNDE3YjhlMGFcIixcImV4cGlyeVRpbWVcIjpcIjE2MDUxOTMyNjcwMDBcIixcImhlYWRJbWFnZVVybFwiOlwiXCJ9IiwiY3JtVG9rZW4iOiI5NWNjODVhMGZhMzcxN2YwNjMwOTU0YWQ0MTdiOGUwYSIsIm1lbWJlckNhcmRObyI6IjI5MDM4NzAwMjMiLCJleHAiOjE2MDAwMDk0NDgsImNoYW5uZWxDb2RlIjoiTVdFQiJ9.qIl1ANAEz5TORfKyvIFrgBt4886BCeHqGNFQa_0txZg; MemberInfo={%22id%22:6331359%2C%22memberID%22:%222903870023%22%2C%22name%22:%22%E4%BF%9E%E5%BE%81%E8%B6%85%22%2C%22title%22:%22%E5%85%88%E7%94%9F%22%2C%22levelName%22:%22%E9%87%91%E5%8D%A1%22%2C%22balanceOfMileage%22:0%2C%22last10MonthClubMiles%22:0%2C%22last10MonthSegments%22:0%2C%22nearingExpiredMiles%22:0%2C%22nearingExpiredMiles2%22:0%2C%22nearingExpiredMiles3%22:0%2C%22loginKeyInfo%22:%22D6A2392C32A30CF7DE15A9BA1D657770%22%2C%22memberLevelCode%22:%224%22%2C%22memberTel%22:%2213916131788%22%2C%22memberEmail%22:%22656704710@qq.com%22%2C%22sex%22:%22Male%22%2C%22cLastName%22:%22%E4%BF%9E%22%2C%22cFirstName%22:%22%E5%BE%81%E8%B6%85%22%2C%22eLastName%22:%22YU%22%2C%22eFirstName%22:%22ZHENGCHAO%22%2C%22customerCertificateInfos%22:[{%22certType%22:%22ID_CARD%22%2C%22certNumber%22:%22310108198905230552%22}]%2C%22newUser%22:false}; Hm_lvt_9c948f76bf5f6acd6b2eedfe3a337744=1600009182,1600009240,1600009271; _xid=KfcB0boXQ2KkTQEFaViH%2FRFDA2GXtCDCVsxhAIjZ29adU4c4svkQGmC0x%2BO7Rj2HDp43hs04BQWfgLNvsiUAsA%3D%3D; _fmdata=wfLr4ejNLup5%2BHP9%2Fs%2F2UgDlkvSRq8rfpMntovywlxLI3kZ4INT9mpCoZyJwlt1b7krfnqTpq4m4QDcEcIMngQvaZz0iEp%2FMYlVGr4lR3dw%3D; Hm_lpvt_9c948f76bf5f6acd6b2eedfe3a337744=1600009302',
        token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZW1iZXJJbmZvIjoie1wiUmVzdWx0Q29kZVwiOlwiMTAwMDFcIixcImlkXCI6NjMzMTM1OSxcIm1lbWJlcklEXCI6XCIyOTAzODcwMDIzXCIsXCJuYW1lXCI6XCLkv57lvoHotoVcIixcInRpdGxlXCI6XCLlhYjnlJ9cIixcImxldmVsTmFtZVwiOlwi6YeR5Y2hXCIsXCJiYWxhbmNlT2ZNaWxlYWdlXCI6MCxcImxhc3QxME1vbnRoQ2x1Yk1pbGVzXCI6MCxcImxhc3QxME1vbnRoU2VnbWVudHNcIjowLFwibmVhcmluZ0V4cGlyZWRNaWxlc1wiOjAsXCJuZWFyaW5nRXhwaXJlZE1pbGVzMlwiOjAsXCJuZWFyaW5nRXhwaXJlZE1pbGVzM1wiOjAsXCJsb2dpbktleUluZm9cIjpcIkQ2QTIzOTJDMzJBMzBDRjdERTE1QTlCQTFENjU3NzcwXCIsXCJjZXJ0VHlwZVwiOlwiSURfQ0FSRFwiLFwiY2VydE51bWJlclwiOlwiMzEwMTA4MTk4OTA1MjMwNTUyXCIsXCJtZW1iZXJMZXZlbENvZGVcIjpcIjRcIixcIm1lbWJlclN0YXR1c0NvZGVcIjpcIkFDXCIsXCJtZW1iZXJUZWxcIjpcIjEzOTE2MTMxNzg4XCIsXCJtZW1iZXJFbWFpbFwiOlwiNjU2NzA0NzEwQHFxLmNvbVwiLFwic2V4XCI6XCJNYWxlXCIsXCJjTGFzdE5hbWVcIjpcIuS_nlwiLFwiY0ZpcnN0TmFtZVwiOlwi5b6B6LaFXCIsXCJlTGFzdE5hbWVcIjpcIllVXCIsXCJlRmlyc3ROYW1lXCI6XCJaSEVOR0NIQU9cIixcImJpcnRoZGF5XCI6XCIxOTg5LTA1LTIzXCIsXCJjdXN0b21lckNlcnRpZmljYXRlSW5mb3NcIjpbe1wiY2VydFR5cGVcIjpcIklEX0NBUkRcIixcImNlcnROdW1iZXJcIjpcIjMxMDEwODE5ODkwNTIzMDU1MlwifV0sXCJuZXdVc2VyXCI6ZmFsc2UsXCJ0b2tlblwiOlwiOTVjYzg1YTBmYTM3MTdmMDYzMDk1NGFkNDE3YjhlMGFcIixcImV4cGlyeVRpbWVcIjpcIjE2MDUxOTMyNjcwMDBcIixcImhlYWRJbWFnZVVybFwiOlwiXCJ9IiwiY3JtVG9rZW4iOiI5NWNjODVhMGZhMzcxN2YwNjMwOTU0YWQ0MTdiOGUwYSIsIm1lbWJlckNhcmRObyI6IjI5MDM4NzAwMjMiLCJleHAiOjE2MDAwMDk0NDgsImNoYW5uZWxDb2RlIjoiTVdFQiJ9.qIl1ANAEz5TORfKyvIFrgBt4886BCeHqGNFQa_0txZg',
      },
    });

    const flightInfoDetail = data.data.flightInfoList;

    const juneyaoFlights = flightInfoDetail.filter(
      (flight) => flight.saleInfo === null,
    );

    juneyaoFlights.forEach((flight) => {
      const happyFlight = flight.cabinFareList.filter(
        (cabin) => cabin.cabinLabel === '折扣经济舱'
          && cabin.cabinCode === 'X'
          && cabin.refundedRules.length === 0,
      );

      const flightStatus = {
        msg: [
          `日期: ${departureDate}`,
          // `检测到 ${flightInfoDetail.length} 次航班`,
          // `其中 ${juneyaoFlights.length} 次航班是吉祥承办`,
          `航班: ${flight.carrierNoName}`,
          `${flight.depCityName} ${flight.depAirportName} - ${flight.arrCityName} ${flight.arrAirportName}`,
          `时间: ${flight.depDateTime} - ${flight.arrDateTime}`,
        ].join('\n'),
      };

      if (happyFlight.length === 0) {
        flightStatus.status = FLIGHT_STATUS.FLIGHT_SOLDOUT; // `机票卖完啦`;
      } else if (happyFlight[0].cabinNumber === 'A') {
        flightStatus.status = FLIGHT_STATUS.FLIGHT_AVAILABLE; // 有票
      } else {
        flightStatus.status = FLIGHT_STATUS.FLIGHT_UNAVAILABLE; // `机票有售, 随心飞卖完了`;
      }
      res.msg = '请求成功';
      res.flightStatus.push(flightStatus);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error: ', error);
    res.msg = '网络请求失败';
  }

  res.flightStatus.map((singleFlightStatus) => {
    if (singleFlightStatus.status === FLIGHT_STATUS.FLIGHT_AVAILABLE) {
      alert(singleFlightStatus.msg);
    }
  });

  console.log('res: ', res);
};

const request = () => {
  presetSetionData.forEach((section) => {
    section.departureDate.map((date) => f({
      ...section,
      departureDate: date,
    }));
  });
};

request();
setInterval(request, DURATION * 1000);
