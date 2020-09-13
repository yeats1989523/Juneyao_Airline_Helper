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
