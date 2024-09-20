class Finnhub {
  constructor() {
    this.prefix = "https://finnhub.io/api/v1"; // Finnhub base URL
    this.token = `?token=${process.env.REACT_APP_finnhubToken}`; // Use your Finnhub token
  }

  getFullUrl(
    infixKey,
    symbol = "AAPL", // Default symbol
    suffixKey = null,
    parameter = null,
    query = null
  ) {
    if (!parameter) parameter = "";
    else if (parameter[0] === "?")
      this.token = `&token=${process.env.REACT_APP_finnhubToken}`;
    else if (parameter[0] !== "/" && parameter[0] !== "?")
      parameter = "/" + parameter;

    if (!query) query = "";
    else if (query[0] === "?")
      this.token = `&token=${process.env.REACT_APP_finnhubToken}`;
    else if (query[0] !== "/" && query[0] !== "?") query = "/" + query;

    const paraQuery = parameter + query;
    let url = this.prefix + Finnhub.getInfixUrls(infixKey);

    if (!symbol) {
      url = url + Finnhub.getSuffixUrls(suffixKey) + paraQuery + this.token;
    } else {
      return (
        url +
        Finnhub.getParameter(symbol) +
        Finnhub.getSuffixUrls(suffixKey) +
        paraQuery +
        this.token
      );
    }
  }

  static getParameter(...parameter) {
    if (parameter.length === 1 && typeof parameter[0] === "number")
      return parameter[0];
    if (parameter.length === 1) return parameter[0].toUpperCase();
    return parameter.map(symbol => symbol.toUpperCase()).join();
  }

  static getInfixUrls(key) {
    return {
      stock: "/quote",
      marketNews: "/news",
      companyNews: "/company-news",
      sentiment: "/news-sentiment",
      forex: "/forex/rates",
      crypto: "/crypto/candles",
      economicCalendar: "/calendar/economic",
      earnings: "/stock/earnings",
      financials: "/stock/financials-reported"
    }[key];
  }

  static getSuffixUrls(key) {
    return {
      quote: "/quote",
      news: "/news",
      sentiment: "/news-sentiment",
      earnings: "/earnings",
      financials: "/financials",
      companyNews: "/company-news"
    }[key];
  }
}

export default Finnhub;



// old code


// // https://iexcloud.io/docs/api/
// // parameters and string queries, refer to api for more information
// class IEXCloud {
//   constructor() {
//     // this.prefix = "https://cloud.iexapis.com/v1";
//     this.prefix = "https://sandbox.iexapis.com/v1"; // for testing
//     this.token = `?token=${process.env.REACT_APP_iexToken}`;
//   }

//   getFullUrl(
//     infixKey,
//     symbol = "SNAP", // Set as default to prevent TypeError
//     suffixKey = null,
//     parameter = null,
//     query = null
//   ) {
//     if (parameter === null || parameter === "") parameter = "";
//     else if (parameter[0] === "?")
//       this.token = `&token=${process.env.REACT_APP_iexToken}`;
//     else if (parameter[0] !== "/" && parameter[0] !== "?")
//       parameter = "/" + parameter;

//     if (query === null || query === "") query = "";
//     else if (query[0] === "?")
//       this.token = `&token=${process.env.REACT_APP_iexToken}`;
//     else if (query[0] !== "/" && query[0] !== "?") query = "/" + query;

//     const paraQuery = parameter + query;
//     let url = this.prefix + IEXCloud.getInfixUrls(infixKey);
//     if (symbol === null) {
//       url = url + IEXCloud.getSuffixUrls(suffixKey) + paraQuery + this.token;
//     } else if (infixKey === "timeSeries") {
//       return (
//         url +
//         IEXCloud.getSuffixUrls(suffixKey) +
//         IEXCloud.getParameter(symbol) +
//         paraQuery +
//         this.token
//       );
//     } else {
//       return (
//         url +
//         IEXCloud.getParameter(symbol) +
//         IEXCloud.getSuffixUrls(suffixKey) +
//         paraQuery +
//         this.token
//       );
//     }
//   }

//   static getParameter(...parameter) {
//     if (parameter.length === 1 && typeof parameter[0] === "number")
//       return parameter[0];
//     if (parameter.length === 1) return parameter[0].toUpperCase();
//     let allSymbols = [];
//     for (let symbol of parameter) {
//       allSymbols.push(symbol.toUpperCase());
//     }
//     return allSymbols.join();
//   }

//   static getInfixUrls(key) {
//     return {
//       stock: "/stock/",
//       market: "/stock/market",
//       crypto: "/crypto/",
//       search: "/search/",
//       refData: "/ref-data",
//       regionSymbols: "/ref-data/region/",
//       exchangeSymbols: "/ref-data/exchange/",
//       usHolidayNtradingDates: "/ref-data/us/dates/",
//       fx: "/fx",
//       timeSeries: "/time-series"
//     }[key];
//   }

//   static getSuffixUrls(key) {
//     return {
//       advancedStats: "/advanced-stats",
//       balanceSheet: "/balance-sheet",
//       batch: "/batch",
//       book: "/book",
//       cashFlow: "/cash-flow",
//       company: "/company",
//       delayedQuote: "/delayed-quote",
//       dividends: "/dividends/",
//       earnings: "/earnings",
//       earningsLast: "/earnings/",
//       estimates: "/estimates",
//       financials: "/financials",
//       fundOwnership: "/fund-ownership",
//       chart: "/chart",
//       historicalPrices: "/chart/",
//       incomeStatement: "/income",
//       insiderRoster: "/insider-roster",
//       insiderSummary: "/insider-summary",
//       insiderTransaction: "/insider-transactions",
//       institutionalOwnership: "/institutional-ownership",
//       intradayPrices: "/intraday-prices",
//       stats: "/stats",
//       largestTrades: "/largest-trades",
//       logo: "/logo",
//       news: "/news",
//       newsLast: "/news/last",
//       ohlc: "/ohlc",
//       options: "/options",
//       optionsExpiration: "/options/",
//       peers: "/peers",
//       prevDayPrice: "/previous",
//       price: "/price",
//       priceTarget: "/price-target",
//       quote: "/quote",
//       quoteField: "/quote/",
//       recommendationTrends: "/recommendation-trends",
//       splits: "/splits",
//       splitsRange: "/splits/",
//       upcomingEvents: "/upcoming-events",
//       upcomingEarnings: "/upcoming-earnings",
//       upcomingDividends: "/upcoming-dividends",
//       upcomingSplits: "/upcoming-splits",
//       upcomingIpos: "/upcoming-ipos",
//       todayIpos: "/today-ipos",
//       volByVenue: "/volume-by-venue",
//       ceoCompensation: "/ceo-compensation",
//       sentiment: "/sentiment/",
//       symbols: "/symbols",
//       todayEarnings: "/today-earnings",
//       marketVol: "/volume",
//       list: "/list/",
//       sectorPerformance: "/sector-performance",
//       collection: "/collection/",
//       fxSymbols: "/fx/symbols",
//       iexSymbols: "/iex/symbols",
//       internationalExchanges: "/exchanges",
//       mutualFundSymbols: "/mutual-funds/symbols",
//       optionSymbols: "/options/symbols",
//       otcSymbols: "/otc/symbols",
//       sectors: "/sectors",
//       tags: "/tags",
//       usExchanges: "/market/us/exchanges",
//       fxRate: "/rate/",
//       reportedFinancials: "/REPORTED_FINANCIALS/"
//     }[key];
//   }
// }

// export default IEXCloud;

