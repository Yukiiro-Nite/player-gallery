exports.logUtil = (header) => {
  return (message, debugLevel) => {
    if( !debugLevel ) {
      console.log(`[${header}] ${message}`);
    }
  }
};
