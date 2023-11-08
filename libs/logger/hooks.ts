export function useFormatRequestLogger(req) {
  return `Request original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Timestamp: ${new Date().toISOString()}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Uid: ${req.headers.authorization}
  Body: ${JSON.stringify(req.body)}`;
}

export function useFormatResponseLogger(req) {
  return `Response original url: ${req.originalUrl}
  Method: ${req.method}
  IP: ${req.ip}
  Timestamp: ${new Date().toISOString()}
  Uid: ${req.headers.authorization}`;
}

export function useFormatSplitLine(message) {
  return `>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  ${message}
>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>`;
}
