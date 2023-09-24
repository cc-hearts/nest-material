export function useFormatRequestLogger(req) {
  const message = `Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Timestamp: ${new Date().toISOString()}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Uid: ${req.headers.authorization}
  Body: ${JSON.stringify(req.body)}`;
  return message;
}

export function useFormatSplitLine(message) {
  return `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  ${message}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
}
